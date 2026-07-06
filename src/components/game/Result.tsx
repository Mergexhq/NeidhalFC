"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ShotResult } from "@/types/game";

interface ResultProps {
  result:      ShotResult;
  onTryAgain:  () => void;
  onClose:     () => void;
}

/**
 * Result screen — editorial, minimal.
 *
 * GOAL   → "GOAL."   + brand copy + Book Trial
 * SAVED  → "SAVED."  + miss copy  + Try Again + Book Trial
 * MISSED → "MISSED." + miss copy  + Try Again + Book Trial
 */
export function Result({ result, onTryAgain, onClose }: ResultProps) {
  const isGoal = result === "goal";

  const container = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const item = {
    hidden:  { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y:       0,
      transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <motion.div
      className="absolute inset-0 z-30 flex flex-col items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      role="status"
      aria-live="polite"
    >
      {/* Dark scrim */}
      <div className="absolute inset-0 bg-[#07111F]/85 backdrop-blur-[6px]" />

      <motion.div
        className="relative z-10 text-center max-w-lg w-full"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* ── Main result word ─────────────────────────────────────────────── */}
        <motion.h2
          variants={item}
          className="font-condensed leading-[0.9] uppercase tracking-wide select-none"
          style={{
            fontSize:   "clamp(80px, 22vw, 200px)",
            color:      isGoal ? "#FFFFFF" : "rgba(255,255,255,0.75)",
            textShadow: isGoal
              ? "0 0 120px rgba(255,255,255,0.12)"
              : "none",
          }}
        >
          {isGoal ? "GOAL." : result === "saved" ? "SAVED." : "MISSED."}
        </motion.h2>

        {/* ── Sub-copy ─────────────────────────────────────────────────────── */}
        {isGoal ? (
          <>
            <motion.p
              variants={item}
              className="text-white/45 font-sans text-sm md:text-base font-normal tracking-wider mb-1"
            >
              Every journey begins on the shore.
            </motion.p>
            <motion.p
              variants={item}
              className="text-[#D9C3A5] font-sans text-[11px] uppercase tracking-[0.28em] font-semibold mb-10"
            >
              Ready for the real pitch?
            </motion.p>
          </>
        ) : (
          <motion.p
            variants={item}
            className="text-white/40 font-sans text-sm md:text-base font-normal tracking-wide mb-10 mt-2"
          >
            Every great footballer misses.
          </motion.p>
        )}

        {/* ── CTAs ─────────────────────────────────────────────────────────── */}
        <motion.div
          variants={item}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Book Trial — always present */}
          <Link
            href="/book-trial"
            onClick={onClose}
            className="
              inline-flex items-center gap-2
              bg-white text-[#0B1F3A]
              font-sans font-bold text-[11px] uppercase tracking-[0.22em]
              px-9 py-[1.1rem] rounded-full
              hover:bg-[#D9C3A5] hover:scale-[1.03]
              transition-all duration-300
              shadow-[0_8px_30px_rgba(0,0,0,0.3)]
              focus-visible:outline focus-visible:outline-2 focus-visible:outline-white
            "
          >
            Book a Free Trial
          </Link>

          {/* Try Again — only on miss */}
          {!isGoal && (
            <button
              onClick={onTryAgain}
              className="
                inline-flex items-center gap-2
                border border-white/20 text-white/70
                font-sans font-bold text-[11px] uppercase tracking-[0.22em]
                px-9 py-[1.1rem] rounded-full
                hover:border-white/50 hover:text-white hover:bg-white/5
                transition-all duration-300
                cursor-pointer
                focus-visible:outline focus-visible:outline-2 focus-visible:outline-white
              "
            >
              <svg
                width="12" height="12" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5"
                strokeLinecap="round" strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M23 4v6h-6"/>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
              </svg>
              Try Again
            </button>
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
