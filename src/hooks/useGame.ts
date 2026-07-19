"use client";

/**
 * useGame.ts - R3F game state machine (no physics engine).
 *
 * Ball movement is driven by parabolic arc math (ballTrajectory.ts).
 * Keeper sways on a timer; commits to a dive direction when ball is shot.
 * All game state is plain React state - no WebWorker, no Matter.js.
 */

import { useCallback, useRef, useState } from "react";
import type { GamePhase, ShotResult, AimDrag, AimTarget, KeeperAction } from "@/types/game";
import { determineOutcome, SHOT_DURATION_MS } from "@/lib/ballTrajectory";

// ── Keeper sway cycle ──────────────────────────────────────────────────────────
const KEEPER_CYCLE: KeeperAction[] = ["center", "left", "center", "right", "center"];
const KEEPER_STEP_MS = 1300;

export function useGame() {
  // ── State ──────────────────────────────────────────────────────────────────
  const [phase, setPhase] = useState<GamePhase>("idle");
  const [shotResult, setShotResult] = useState<ShotResult | null>(null);
  const [aim, setAim] = useState<AimDrag | null>(null);
  const [keeperPos, setKeeperPos] = useState<KeeperAction>("center");
  const [cameraShake, setCameraShake] = useState(false);

  // Shoot progress: 0 → 1, drives ball arc in Scene3D
  const [shootT, setShootT] = useState(0);

  // Committed aim target (set when shot is fired)
  const [aimTarget, setAimTarget] = useState<AimTarget>({ x: 0, y: 0.5 });

  // ── Refs (never stale inside callbacks) ───────────────────────────────────
  const keeperTimerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const keeperCycleIdx = useRef(0);
  const isPressingRef = useRef(false);
  const aimRef = useRef<AimDrag | null>(null);
  const shotFiredRef = useRef(false);
  const shotRAFRef = useRef(0);

  // ── Keeper sway ────────────────────────────────────────────────────────────
  const startKeeperSway = useCallback(() => {
    keeperCycleIdx.current = 0;
    keeperTimerRef.current = setInterval(() => {
      keeperCycleIdx.current = (keeperCycleIdx.current + 1) % KEEPER_CYCLE.length;
      setKeeperPos(KEEPER_CYCLE[keeperCycleIdx.current]);
    }, KEEPER_STEP_MS);
  }, []);

  const stopKeeperSway = useCallback(() => {
    clearInterval(keeperTimerRef.current);
    keeperTimerRef.current = undefined;
  }, []);

  // ── Open / countdown complete ──────────────────────────────────────────────
  const openGame = useCallback(async () => {
    setPhase("ready");
    setShotResult(null);
    setAim(null);
    aimRef.current = null;
    setCameraShake(false);
    setShootT(0);
    shotFiredRef.current = false;
    isPressingRef.current = false;

    startKeeperSway();
    setTimeout(() => setPhase("aiming"), 600);

    const { initSounds, playCrowd } = await import("@/lib/sounds");
    await initSounds();
    playCrowd();
  }, [startKeeperSway]);

  const onCountdownComplete = useCallback(() => {
    setPhase("ready");
    startKeeperSway();
    setTimeout(() => setPhase("aiming"), 600);
  }, [startKeeperSway]);

  // ── Fire the shot ──────────────────────────────────────────────────────────
  const fireShot = useCallback(async (target: AimTarget, keeperAction: KeeperAction) => {
    if (shotFiredRef.current) return;
    shotFiredRef.current = true;

    // Lock keeper
    stopKeeperSway();
    setKeeperPos(keeperAction); // keeper commits to dive now
    setAimTarget(target);
    setPhase("shooting");

    const { playKick } = await import("@/lib/sounds");
    playKick();

    // Animate ball: increment shootT from 0 → 1 over SHOT_DURATION_MS
    const startTime = performance.now();
    const tick = () => {
      const elapsed = performance.now() - startTime;
      const t = Math.min(elapsed / SHOT_DURATION_MS, 1);
      setShootT(t);
      if (t < 1) {
        shotRAFRef.current = requestAnimationFrame(tick);
        return;
      }

      // Flight complete - determine result
      const result = determineOutcome(target.x, target.y, keeperAction);
      setShotResult(result);

      if (result === "goal") {
        import("@/lib/sounds").then(({ playNet, stopCrowd }) => { playNet(); stopCrowd(); });
        setCameraShake(true);
        setTimeout(() => setCameraShake(false), 600);
      } else {
        import("@/lib/sounds").then(({ stopCrowd }) => stopCrowd());
      }
      setTimeout(() => setPhase("result"), 750);
    };
    shotRAFRef.current = requestAnimationFrame(tick);
  }, [stopKeeperSway]);

  // ── Pointer handlers (called from AimOverlay) ──────────────────────────────
  const handlePointerDown = useCallback((
    e: React.PointerEvent,
    overlayRect: DOMRect,
  ) => {
    if (phase !== "aiming") return;
    const x = e.clientX - overlayRect.left;
    const y = e.clientY - overlayRect.top;

    // Ball sits at 50% x, 76% y - only allow drag from near the ball
    const ballX = overlayRect.width * 0.50;
    const ballY = overlayRect.height * 0.76;
    const distToBall = Math.sqrt((x - ballX) ** 2 + (y - ballY) ** 2);
    if (distToBall > 72) return;          // outside hit-zone → ignore

    isPressingRef.current = true;
    const drag: AimDrag = { startX: x, startY: y, currentX: x, currentY: y };
    aimRef.current = drag;
    setAim(drag);
  }, [phase]);

  const handlePointerMove = useCallback((
    e: React.PointerEvent,
    overlayRect: DOMRect,
  ) => {
    if (!isPressingRef.current || phase !== "aiming") return;
    const x = e.clientX - overlayRect.left;
    const y = e.clientY - overlayRect.top;
    const drag = aimRef.current
      ? { ...aimRef.current, currentX: x, currentY: y }
      : null;
    aimRef.current = drag;
    setAim(drag);
  }, [phase]);

  const handlePointerUp = useCallback((overlayW: number, overlayH: number) => {
    if (!isPressingRef.current) return;
    isPressingRef.current = false;

    const drag = aimRef.current;
    aimRef.current = null;
    setAim(null);

    if (phase !== "aiming" || !drag) return;

    // dx/dy are reversed (slingshot: drag down → shoot up)
    const dx = drag.startX - drag.currentX;
    const dy = drag.startY - drag.currentY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 12) return;

    // Map drag to aim target
    const sensitivity = 1.6;
    const rawX = (dx / (overlayW * 0.4)) * sensitivity;
    const rawY = (dy / (overlayH * 0.4)) * 0.8 + 0.5; // center aim vertically
    const aimX = Math.max(-1, Math.min(1, rawX));
    const aimY = Math.max(0, Math.min(1, rawY));

    // Keeper dives toward the ball direction with some chance of guessing wrong
    // This creates realistic behavior: keeper reads the shot direction
    const r = Math.random();
    let keeperDive: KeeperAction;

    if (Math.abs(aimX) < 0.25) {
      // Center shot: keeper has a ~40% chance of staying center, else dives randomly
      keeperDive = r < 0.40 ? "center" : r < 0.70 ? "left" : "right";
    } else if (aimX < 0) {
      // Ball going left: keeper dives left 55%, wrong direction 25%, stays center 20%
      keeperDive = r < 0.55 ? "left" : r < 0.80 ? "right" : "center";
    } else {
      // Ball going right: keeper dives right 55%, wrong direction 25%, stays center 20%
      keeperDive = r < 0.55 ? "right" : r < 0.80 ? "left" : "center";
    }

    fireShot({ x: aimX, y: aimY }, keeperDive);
  }, [phase, fireShot]);

  // ── Reset / close ──────────────────────────────────────────────────────────
  const handleTryAgain = useCallback(async () => {
    cancelAnimationFrame(shotRAFRef.current);
    stopKeeperSway();
    shotFiredRef.current = false;
    isPressingRef.current = false;
    aimRef.current = null;
    setPhase("ready");
    setShotResult(null);
    setAim(null);
    setKeeperPos("center");
    setCameraShake(false);
    setShootT(0);
    setAimTarget({ x: 0, y: 0.5 });

    startKeeperSway();
    setTimeout(() => setPhase("aiming"), 600);

    const { playCrowd } = await import("@/lib/sounds");
    playCrowd();
  }, [stopKeeperSway, startKeeperSway]);

  const handleClose = useCallback(() => {
    cancelAnimationFrame(shotRAFRef.current);
    stopKeeperSway();
    shotFiredRef.current = false;
    isPressingRef.current = false;
    aimRef.current = null;
    setPhase("idle");
    setShotResult(null);
    setAim(null);
    setKeeperPos("center");
    setCameraShake(false);
    setShootT(0);
    setAimTarget({ x: 0, y: 0.5 });
  }, [stopKeeperSway]);

  return {
    phase,
    shotResult,
    aim,
    keeperPos,
    cameraShake,
    shootT,
    aimTarget,
    openGame,
    onCountdownComplete,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
    handleTryAgain,
    handleClose,
  } as const;
}
