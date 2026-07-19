import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { ShotResult } from "@/types/game";

interface ResultProps {
  result: ShotResult;
  onTryAgain: () => void;
  onClose: () => void;
}

function ConfettiCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const colors = ["#FAF7F2", "#C5A880", "#005f73", "#e9d8a6", "#0B1F3A", "#94D2BD", "#EE9B00", "#CA6702", "#BB3E03", "#AE2012"];
    const particles: any[] = [];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * -height - 20,
        r: Math.random() * 5 + 3,
        d: Math.random() * height,
        color: colors[Math.floor(Math.random() * colors.length)],
        tilt: Math.random() * 10 - 5,
        tiltAngleIncremental: Math.random() * 0.07 + 0.02,
        tiltAngle: 0,
        vx: Math.random() * 3 - 1.5,
        vy: Math.random() * 3 + 2,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        p.tiltAngle += p.tiltAngleIncremental;
        p.y += p.vy;
        p.x += p.vx;
        p.tilt = Math.sin(p.tiltAngle - idx / 3) * 15;

        // Draw particle
        ctx.beginPath();
        ctx.lineWidth = p.r;
        ctx.strokeStyle = p.color;
        ctx.moveTo(p.x + p.tilt + p.r / 2, p.y);
        ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r / 2);
        ctx.stroke();

        // Reset particle if it drifts off screen
        if (p.y > height || p.x > width || p.x < 0) {
          particles[idx] = {
            ...p,
            x: Math.random() * width,
            y: -20,
            tilt: Math.random() * 10 - 5,
            tiltAngle: 0,
            vx: Math.random() * 3 - 1.5,
            vy: Math.random() * 3 + 2,
          };
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

export function Result({ result, onTryAgain, onClose }: ResultProps) {
  const isGoal = result === "goal";

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };

  const item = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
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

      {/* Confetti canvas for Goal */}
      {isGoal && <ConfettiCanvas />}

      <motion.div
        className="relative z-10 text-center max-w-lg w-full"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {/* ── Main result word ─────────────────────────────────────────────── */}
        <motion.h2
          variants={item}
          className="font-condensed leading-[0.95] uppercase tracking-wide select-none text-center"
          style={{
            fontSize: "clamp(48px, 11vw, 120px)",
            color: isGoal ? "#FFFFFF" : "rgba(255,255,255,0.75)",
            textShadow: isGoal
              ? "0 0 120px rgba(255,255,255,0.12)"
              : "none",
          }}
        >
          {isGoal ? "GOAL" : result === "saved" ? "SAVED" : "MISSED"}
        </motion.h2>

        {/* ── Sub-copy ─────────────────────────────────────────────────────── */}
        {isGoal ? (
          <motion.p
            variants={item}
            className="text-[#D9C3A5] font-sans text-xs sm:text-sm md:text-base uppercase tracking-[0.28em] font-semibold pt-6 pb-2 mb-10"
          >
            Ready for the real pitch?
          </motion.p>
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
          {/* Book Trial - always present */}
          <Link
            href="/contact"
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
            Contact Us
          </Link>

          {/* Try Again / Retry - always present */}
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
              <path d="M23 4v6h-6" />
              <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
            </svg>
            Try Again
          </button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

