"use client";

/**
 * Scene2D.tsx - 2D game backdrop + layered R3F ball + PNG sprites.
 *
 * Layers (bottom → top):
 *   1. Environment image background (with warm overlay)
 *   2. KeeperSprite (PNG, z-10)
 *   3. Ball3D - R3F canvas overlay (z-10)
 *   4. PlayerSprite - kicker PNG (z-20)
 *
 * Shadows: removed per request.
 */

import React from "react";
import { motion } from "framer-motion";
import type { GamePhase, AimTarget, KeeperAction } from "@/types/game";
import { Ball3D } from "./Ball3D";
import { KeeperSprite } from "./KeeperSprite";
import { PlayerSprite } from "./PlayerSprite";

interface Scene2DProps {
  className?: string;
  phase: GamePhase;
  shootT: number;
  aimTarget: AimTarget;
  keeperPos: KeeperAction;
  cameraShake: boolean;
  netShake: boolean;
}

export function Scene2D({
  className = "",
  phase,
  shootT,
  aimTarget,
  keeperPos,
  cameraShake,
}: Scene2DProps) {
  const isShooting = phase === "shooting" || phase === "result";

  // ── Ball trajectory coordinates ──────────────────────────────────────────
  const getBallPos = () => {
    if (!isShooting) {
      return { left: 50, top: 76, scale: 1 };
    }

    const startX = 50;
    const startY = 76;
    const targetX = 50 + aimTarget.x * 13;
    const targetY = 65 - aimTarget.y * 21;

    const curX = startX + shootT * (targetX - startX);
    const curY = startY + shootT * (targetY - startY);

    // Parabolic arc upward
    const arcHeight = 12 + Math.abs(aimTarget.y - 0.5) * 6;
    const yOffset = arcHeight * Math.sin(Math.PI * shootT);
    const ballY = curY - yOffset;

    // Depth scale (1.0 → 0.35 over flight)
    const scale = 1.0 - shootT * 0.65;

    return { left: curX, top: ballY, scale };
  };

  const ballPos = getBallPos();

  return (
    <motion.div
      className={`absolute inset-0 select-none overflow-hidden ${className}`}
      animate={
        cameraShake
          ? {
            x: [0, -6, 6, -5, 5, -3, 3, 0],
            y: [0, 4, -4, 3, -3, 1, -1, 0],
          }
          : {}
      }
      transition={{ duration: 0.5, ease: "easeInOut" as const }}
    >
      {/* Desktop background - hidden on mobile */}
      <div
        className="absolute inset-0 hidden md:block"
        style={{
          backgroundImage: "url('/game/backgrounds/environment.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* Mobile background - hidden on desktop */}
      <div
        className="absolute inset-0 block md:hidden"
        style={{
          backgroundImage: "url('/game/backgrounds/environment-mobile.png')",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
        }}
      />
      {/* ── Warm overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/5 via-transparent to-sky-400/5 mix-blend-overlay pointer-events-none" />

      {/* ── Goalkeeper PNG sprite ── */}
      <KeeperSprite keeperPos={keeperPos} phase={phase} />

      {/* ── 3D GLTF Ball (R3F Canvas) ── */}
      <Ball3D
        left={ballPos.left}
        top={ballPos.top}
        scale={ballPos.scale}
        shootT={shootT}
        aimTarget={aimTarget}
        isShooting={isShooting}
      />

      {/* ── Kicker PNG sprite ── */}
      <PlayerSprite phase={phase} />
    </motion.div>
  );
}
