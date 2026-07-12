"use client";

/**
 * KeeperSprite.tsx — PNG-based goalkeeper with 4 image states.
 *
 * FIX 1: Paths with spaces ("/keeper rest.png") were not reliably loaded.
 *         Now URL-encoded ("/keeper%20rest.png" etc.).
 *
 * FIX 2: Inline style.transform:"translateX(-50%)" was conflicting with
 *         framer-motion's own transform system.  Now using a static wrapper
 *         div for horizontal centering and a child motion.div for animations.
 *
 * FIX 3: Size was too small (12% → 18%) and bottom positioning adjusted so
 *         the keeper sits inside the goal properly.
 */

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { KeeperAction, GamePhase } from "@/types/game";

interface KeeperSpriteProps {
  keeperPos: KeeperAction;
  phase: GamePhase;
}

// URL-encoded paths (spaces → %20)
const IMG_REST  = "/keeper%20rest.png";
const IMG_LEFT  = "/left%20catch.png";
const IMG_RIGHT = "/rigth%20catch.png";  // matches actual filename "rigth"

function getKeeperImage(keeperPos: KeeperAction, isShooting: boolean): string {
  if (isShooting) {
    if (keeperPos === "left")  return IMG_LEFT;
    if (keeperPos === "right") return IMG_RIGHT;
  }
  return IMG_REST;
}

// Dive translation in pixels — expressed as vw so it scales with viewport
function getDiveX(keeperPos: KeeperAction, isShooting: boolean): string {
  if (isShooting) {
    if (keeperPos === "left")  return "-15vw";
    if (keeperPos === "right") return "15vw";
  }
  // Gentle sway during aiming
  if (keeperPos === "left")  return "-2vw";
  if (keeperPos === "right") return "2vw";
  return "0vw";
}

// Keeper stays at ground level — no upward movement on dive
function getDiveY(): string {
  return "0vw";
}

function getDiveRotate(): number {
  return 0;
}

function getDiveScale(): number {
  return 1;
}

export function KeeperSprite({ keeperPos, phase }: KeeperSpriteProps) {
  const isShooting = phase === "shooting" || phase === "result";
  const imgSrc     = getKeeperImage(keeperPos, isShooting);
  const spring     = isShooting
    ? { type: "spring" as const, stiffness: 200, damping: 20 }
    : { type: "spring" as const, stiffness: 40,  damping: 12 };

  return (
    <div
      className="absolute pointer-events-none z-10"
      style={{
        bottom: "14%",
        left: "46%",
        marginLeft: "-12%",
        width: "24%",
      }}
    >
      {/* Animated wrapper — handles dive/sway */}
      <motion.div
        className="w-full origin-bottom"
        animate={{
          x: getDiveX(keeperPos, isShooting),
          y: getDiveY(),
          rotate: getDiveRotate(),
          scale: getDiveScale(),
        }}
        transition={spring}
        style={{ aspectRatio: "0.72 / 1" }}
      >
        {/* Image crossfade */}
        <AnimatePresence mode="wait">
          <motion.img
            key={imgSrc}
            src={imgSrc}
            alt={
              isShooting
                ? keeperPos === "left"
                  ? "Goalkeeper diving left"
                  : keeperPos === "right"
                    ? "Goalkeeper diving right"
                    : "Goalkeeper saving"
                : "Goalkeeper ready"
            }
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
              display: "block",
            }}
          />
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
