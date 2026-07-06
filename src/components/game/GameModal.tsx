"use client";

/**
 * GameModal.tsx — Fullscreen R3F penalty mini-game.
 *
 * Hierarchy:
 *   GameModal
 *   ├── Scene3D (R3F Canvas — fills viewport)
 *   ├── AimOverlay (2D SVG drag layer)
 *   ├── Countdown (Framer Motion 3-2-1)
 *   └── Result   (GOAL / SAVED / MISSED)
 *
 * useGame drives all state. Nothing here holds business logic.
 */

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useGame }     from "@/hooks/useGame";
import { Scene3D }     from "./Scene3D";
import { AimOverlay }  from "./AimOverlay";
import { Countdown }   from "./Countdown";
import { Result }      from "./Result";

interface GameModalProps {
  onClose: () => void;
}

export default function GameModal({ onClose }: GameModalProps) {
  const {
    phase, shotResult, aim, keeperPos, cameraShake,
    shootT, aimTarget,
    openGame, onCountdownComplete,
    handlePointerDown, handlePointerMove, handlePointerUp,
    handleTryAgain, handleClose,
  } = useGame();

  // Start game on mount
  useEffect(() => { openGame(); }, [openGame]);

  const close = () => { handleClose(); onClose(); };

  const isAiming   = phase === "aiming";
  const isShooting = phase === "shooting" || phase === "result";
  const netShake   = shotResult === "goal" && phase === "result";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* ── 3D Scene fills entire viewport ── */}
        <Scene3D
          className="absolute inset-0 w-full h-full"
          phase={phase}
          shootT={shootT}
          aimTarget={aimTarget}
          keeperPos={keeperPos}
          cameraShake={cameraShake}
          netShake={netShake}
        />

        {/* ── 2D aim drag overlay ── */}
        <AimOverlay
          active={isAiming}
          aim={aim}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        />

        {/* ── Close button ── */}
        <button
          onClick={close}
          aria-label="Close game"
          className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full
                     bg-white/10 hover:bg-white/20 backdrop-blur-sm
                     flex items-center justify-center
                     text-white/70 hover:text-white
                     transition-all duration-200"
        >
          <X size={18} />
        </button>

        {/* ── Neidhal FC wordmark ── */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-20">
          <span
            className="text-white/50 text-xs tracking-[0.35em] uppercase select-none"
            style={{ fontFamily: "var(--font-primary, sans-serif)" }}
          >
            Neidhal FC
          </span>
        </div>

        {/* ── Countdown overlay ── */}
        <AnimatePresence>
          {phase === "countdown" && (
            <Countdown onComplete={onCountdownComplete} />
          )}
        </AnimatePresence>

        {/* ── Phase label (READY / AIM) ── */}
        <AnimatePresence>
          {phase === "ready" && (
            <motion.div
              className="absolute bottom-28 left-1/2 -translate-x-1/2 z-20 text-center select-none"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p
                className="text-white/80 text-sm tracking-[0.3em] uppercase"
                style={{ fontFamily: "var(--font-primary, sans-serif)" }}
              >
                Get ready…
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── SHOOT label while aiming ── */}
        <AnimatePresence>
          {isAiming && !aim && (
            <motion.div
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-center select-none"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
            >
              <span
                className="text-white/40 text-xs tracking-[0.4em] uppercase"
                style={{ fontFamily: "var(--font-primary, sans-serif)" }}
              >
                Release to shoot
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Ball in flight label ── */}
        <AnimatePresence>
          {phase === "shooting" && (
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, times: [0, 0.3, 1] }}
            >
              <span
                className="text-white/70 text-[11px] tracking-[0.5em] uppercase"
                style={{ fontFamily: "var(--font-primary, sans-serif)" }}
              >
                Shoot!
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Result overlay ── */}
        <AnimatePresence>
          {phase === "result" && shotResult && (
            <Result
              result={shotResult}
              onTryAgain={handleTryAgain}
              onClose={close}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
