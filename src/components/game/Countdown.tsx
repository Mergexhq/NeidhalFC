"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CountdownProps {
  onComplete: () => void;
}

const STEPS = ["3", "2", "1", "SHOOT"] as const;
const STEP_MS = 950; // ms per step

/**
 * Countdown - large Bebas Neue numerals fading in/out.
 * Fires onComplete after the final step clears.
 */
export function Countdown({ onComplete }: CountdownProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= STEPS.length) {
      onComplete();
      return;
    }
    const t = setTimeout(() => setIndex(i => i + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [index, onComplete]);

  const current = index < STEPS.length ? STEPS[index] : null;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
      aria-live="assertive"
      aria-label={current ?? "Go"}
    >
      <AnimatePresence mode="wait">
        {current && (
          <motion.span
            key={current}
            className="font-condensed leading-none select-none text-white"
            style={{
              fontSize: "clamp(100px, 28vw, 240px)",
              textShadow: "0 4px 60px rgba(0,0,0,0.4)",
              letterSpacing: "0.04em",
            }}
            initial={{ opacity: 0, scale: 0.65, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.25, y: -20 }}
            transition={{
              duration: 0.28,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {current}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
