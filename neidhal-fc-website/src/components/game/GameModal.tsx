"use client";

/**
 * GameModal.tsx - Fullscreen 2D penalty mini-game.
 *
 * Hierarchy:
 *   GameModal
 *   ├── Scene2D (2D canvas - fills viewport)
 *   ├── AimOverlay (2D SVG drag layer + UI hints)
 *   └── Result   (GOAL / SAVED / MISSED)
 *
 * useGame drives all state. Nothing here holds business logic.
 */

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useGame } from "@/hooks/useGame";
import { Scene2D } from "./Scene2D";
import { AimOverlay } from "./AimOverlay";
import { Result } from "./Result";

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

  const isAiming = phase === "aiming";
  const isShooting = phase === "shooting" || phase === "result";
  const netShake = shotResult === "goal" && phase === "result";

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[999] bg-[#07111F] flex items-center justify-center overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Full-screen game box */}
        <div
          className="relative w-full h-full overflow-hidden bg-black"
        >
          {/* ── 2D Scene fills the aspect box ── */}
          <Scene2D
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
            className="absolute top-5 right-5 z-40 w-10 h-10 rounded-full
                       bg-white/10 hover:bg-white/20 backdrop-blur-sm
                       flex items-center justify-center
                       text-white/70 hover:text-white
                       transition-all duration-200"
          >
            <X size={18} />
          </button>

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
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
