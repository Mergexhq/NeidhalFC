"use client";

/**
 * KeeperSprite.tsx - PNG-based goalkeeper with 4 image states.
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

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { KeeperAction, GamePhase } from "@/types/game";

interface KeeperSpriteProps {
  keeperPos: KeeperAction;
  phase: GamePhase;
  shootT?: number;
}

// URL-encoded paths (spaces → %20)
const IMG_REST = "/game/sprites/keeper-rest.png";
const IMG_LEFT = "/game/sprites/left-catch.png";
const IMG_RIGHT = "/game/sprites/right-catch.png";

function getKeeperImage(keeperPos: KeeperAction, isShooting: boolean, shootT: number): string {
  if (isShooting && shootT >= 0.35) {
    if (keeperPos === "left") return IMG_LEFT;
    if (keeperPos === "right") return IMG_RIGHT;
  }
  return IMG_REST;
}

// Dive translation - expressed as vw so it scales with viewport
// During aiming: no movement (keeper sway is just visual wobble via sprite)
// During shooting: freeze at center, then dive after reaction delay
function getDiveX(keeperPos: KeeperAction, isShooting: boolean, shootT: number): string {
  if (!isShooting) {
    // Gentle visual sway during aiming phase (very small, just a hint)
    if (keeperPos === "left") return "-1.5vw";
    if (keeperPos === "right") return "1.5vw";
    return "0vw";
  }

  // Shooting phase: freeze at center during reaction time
  const reactionDelay = 0.35;
  if (shootT < reactionDelay) {
    return "0vw";
  }

  // After reaction: dive toward committed direction
  const diveProgress = Math.min((shootT - reactionDelay) / (0.80 - reactionDelay), 1);
  // Cubic ease-out for natural deceleration
  const easedProgress = 1 - Math.pow(1 - diveProgress, 3);

  if (keeperPos === "left") return `${-14 * easedProgress}vw`;
  if (keeperPos === "right") return `${14 * easedProgress}vw`;
  return "0vw";
}

// Keeper stays at ground level - no upward movement on dive
function getDiveY(): string {
  return "0vw";
}

function getDiveRotate(): number {
  return 0;
}

function getDiveScale(): number {
  return 1;
}

export function KeeperSprite({ keeperPos, phase, shootT = 0 }: KeeperSpriteProps) {
  const isShooting = phase === "shooting" || phase === "result";
  const imgSrc = getKeeperImage(keeperPos, isShooting, shootT);
  const spring = isShooting
    ? { type: "tween" as const, ease: "linear" as const, duration: 0.05 }
    : { type: "spring" as const, stiffness: 40, damping: 12 };

  // Detect window width to set correct goal center (Desktop: 53%, Mobile: 41%)
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goalCenter = isMobile ? "41%" : "53%";

  return (
    <div
      className="absolute pointer-events-none z-10"
      style={{
        bottom: "14%",
        left: goalCenter,
        marginLeft: "-12%",
        width: "24%",
      }}
    >
      {/* Animated wrapper - handles dive/sway */}
      <motion.div
        className="w-full origin-bottom"
        animate={{
          x: getDiveX(keeperPos, isShooting, shootT),
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
