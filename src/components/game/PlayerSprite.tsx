"use client";

/**
 * PlayerSprite.tsx - PNG-based kicker.
 *
 * During aiming:       player-ready.webp  (standing, bottom-left)
 * During/after kick:   player-kick.webp   (follow-through pose)
 *
 * Both images preloaded on module load to prevent flash on kick.
 */

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { GamePhase } from "@/types/game";

const IMG_READY = "/game/sprites/player-ready.webp";
const IMG_KICK = "/game/sprites/player-kick.webp";

// Preload both sprites on module load
if (typeof window !== "undefined") {
  [IMG_READY, IMG_KICK].forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

interface PlayerSpriteProps {
  phase: GamePhase;
}

export function PlayerSprite({ phase }: PlayerSpriteProps) {
  const isShooting = phase === "shooting" || phase === "result";
  const imgSrc = isShooting ? IMG_KICK : IMG_READY;

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
          className="w-full h-full object-fill"
        />
      </AnimatePresence>
    </div>
  );
}

