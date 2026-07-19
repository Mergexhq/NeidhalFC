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
const IMG_REST = "/game/sprites/keeper-rest.webp";
const IMG_LEFT = "/game/sprites/left-catch.webp";
const IMG_RIGHT = "/game/sprites/right-catch.webp";

// Preload all sprites on module load to prevent flash
if (typeof window !== "undefined") {
  [IMG_REST, IMG_LEFT, IMG_RIGHT].forEach((src) => {
    const img = new Image();
    img.src = src;
  });
}

function getKeeperImage(keeperPos: KeeperAction, isShooting: boolean, shootT: number): string {
  if (isShooting && shootT >= 0.35) {
    if (keeperPos === "left") return IMG_LEFT;
    if (keeperPos === "right") return IMG_RIGHT;
  }
  return IMG_REST;
}

// Dive translation - expressed as % of container width so it scales with keeper size
// During aiming: no movement (keeper sway is just visual wobble via sprite)
// During shooting: freeze at center, then dive after reaction delay
function getDiveX(keeperPos: KeeperAction, isShooting: boolean, shootT: number, isPortrait: boolean): string {
  if (!isShooting) {
    // Gentle visual sway during aiming phase (very small, just a hint)
    if (keeperPos === "left") return "-6%";
    if (keeperPos === "right") return "6%";
    return "0%";
  }

  // Shooting phase: freeze at center during reaction time
  const reactionDelay = 0.35;
  if (shootT < reactionDelay) {
    return "0%";
  }

  // After reaction: dive toward committed direction
  const diveProgress = Math.min((shootT - reactionDelay) / (0.80 - reactionDelay), 1);
  // Cubic ease-out for natural deceleration
  const easedProgress = 1 - Math.pow(1 - diveProgress, 3);

  // Desktop: container is 36% wide, dive 13% parent width -> 13/36 = ~36% of container width
  // Mobile: container is 74% wide, dive 19% parent width -> 19/74 = ~26% of container width
  const maxDivePercent = isPortrait ? 26 : 36;

  if (keeperPos === "left") return `-${maxDivePercent * easedProgress}%`;
  if (keeperPos === "right") return `${maxDivePercent * easedProgress}%`;
  return "0%";
}

// Keeper stays at ground level - no upward movement on dive
function getDiveY(): string {
  return "0%";
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

  // Detect window aspect ratio to set correct goal center (Desktop/Landscape: 53%, Mobile/Portrait/Tablet: 50%)
  const [isPortrait, setIsPortrait] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsPortrait(window.innerWidth < window.innerHeight);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const goalCenter = isPortrait ? "50%" : "53%";
  const keeperWidth = isPortrait ? "74%" : "36%";
  const keeperMarginLeft = isPortrait ? "-37%" : "-18%";
  const keeperBottom = isPortrait ? "28.5%" : "29%";

  return (
    <div
      className="absolute pointer-events-none z-10"
      style={{
        bottom: keeperBottom,
        left: goalCenter,
        marginLeft: keeperMarginLeft,
        width: keeperWidth,
      }}
    >
      {/* Animated wrapper - handles dive/sway */}
      <motion.div
        className="w-full origin-bottom"
        animate={{
          x: getDiveX(keeperPos, isShooting, shootT, isPortrait),
          y: getDiveY(),
          rotate: getDiveRotate(),
          scale: getDiveScale(),
        }}
        transition={spring}
        style={{ aspectRatio: "669 / 373" }}
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

