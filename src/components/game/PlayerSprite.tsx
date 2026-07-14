"use client";

/**
 * PlayerSprite.tsx - PNG-based kicker.
 *
 * During aiming:       /player1.png         (standing, bottom-left)
 * During/after kick:   /player 1 kick.png   (follow-through pose)
 *
 * No movement animation - only a quick image crossfade on kick.
 * The player image itself already shows the kick pose; no lunge needed.
 */

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { GamePhase } from "@/types/game";

interface PlayerSpriteProps {
  phase: GamePhase;
}

export function PlayerSprite({ phase }: PlayerSpriteProps) {
  const isShooting = phase === "shooting" || phase === "result";
  const imgSrc = isShooting ? "/player%201%20kick.png" : "/player1.png";

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-20">
      <AnimatePresence mode="wait">
        <motion.img
          key={imgSrc}
          src={imgSrc}
          alt={isShooting ? "Player kicking" : "Player ready"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.08 }}
          className="w-full h-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
}
