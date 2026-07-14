"use client";

import React, { useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

/**
 * FootballCTA - idle section placed between HomeCTA and Footer.
 *
 * Hero visual: beach penalty watercolor illustration.
 * Entire illustration is clickable; opens the fullscreen penalty experience.
 */
export const FootballCTA: React.FC = () => {
  const router = useRouter();

  const handlePlay = useCallback(() => {
    router.push("/play");
  }, [router]);

  const dragX = useMotionValue(0);
  const dragRotate = useTransform(dragX, [0, 256], [0, 360]);
  const fillWidth = useTransform(dragX, (val) => `${val + 48}px`);

  return (
    <>
      {/* ── Idle section ──────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-16 md:py-24"
        style={{
          background:
            "linear-gradient(180deg, #FAF7F2 0%, #FAF2E6 35%, #F3E6CE 65%, #ECDAB9 100%)",
        }}
        aria-label="Take the penalty - interactive experience"
      >
        {/* Sand texture blobs */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `
              radial-gradient(ellipse at 15% 85%, rgba(190,145,70,0.10) 0%, transparent 55%),
              radial-gradient(ellipse at 82% 60%, rgba(200,155,80,0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 50% 100%, rgba(180,135,65,0.18) 0%, transparent 40%)
            `,
          }}
        />



        <div className="max-w-5xl mx-auto px-6 text-center relative z-30">

          {/* Chapter label */}
          <motion.span
            className="text-[11px] uppercase tracking-[0.28em] font-bold text-[#8B6330] mb-4 block font-sans"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            From the Shore
          </motion.span>

          {/* Headline */}
          <motion.h2
            className="font-condensed text-5xl md:text-7xl lg:text-[90px] leading-none tracking-wider text-[#0B1F3A] uppercase mb-3"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.08 }}
          >
            Take The Shot
          </motion.h2>

          <motion.p
            className="text-[#8B6330]/55 font-sans text-xs md:text-sm tracking-[0.22em] uppercase font-medium mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.16 }}
          >
            From the shores of Chennai to the football pitch
          </motion.p>

          {/* ── Illustration - main clickable hero ──────────────────────────────── */}
          <motion.button
            onClick={handlePlay}
            className="relative w-full max-w-3xl mx-auto block cursor-pointer focus-visible:outline-none mb-8 group"
            aria-label="Open penalty kick experience"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Illustration container */}
            <div className="relative overflow-hidden rounded-2xl">
              {/* Illustration image */}
              <Image
                src="/Tap to play illustration.png"
                alt="Player about to take a beach penalty - tap to play the game"
                width={1344}
                height={896}
                priority
                className="w-full h-auto object-contain transition-all duration-500 scale-[1.06] group-hover:brightness-[1.04]"
              />
            </div>

            {/* Depth shadow beneath illustration */}
            <div
              className="absolute -bottom-2 left-[12%] right-[12%] h-6 pointer-events-none"
              style={{
                background: "radial-gradient(ellipse, rgba(100,65,10,0.13) 0%, transparent 70%)",
                filter: "blur(10px)",
              }}
            />
          </motion.button>
          {/* Slide-to-Play Capsule Button (above overlay, z-30) */}
          <motion.div
            className="relative h-[60px] w-[280px] mx-auto bg-[#0B1F3A] border border-[#0B1F3A] rounded-full flex items-center p-[5px] shadow-[0_6px_24px_rgba(11,31,58,0.18)] select-none z-30 overflow-hidden"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.32 }}
          >
            {/* Background Track Text (White/Soft) */}
            <span className="absolute inset-x-[5px] inset-y-[5px] flex items-center justify-center font-sans font-bold text-[12px] uppercase tracking-[0.25em] text-white/40 pointer-events-none select-none">
              Slide to Play
            </span>

            {/* Subtle arrow helper in background (White/Soft) */}
            <div className="absolute right-5 text-white/25 pointer-events-none flex items-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </div>

            {/* Slide color change overlay - dynamic width behind the ball (White Fill) */}
            <motion.div
              style={{ width: fillWidth }}
              className="absolute left-[5px] top-[5px] bottom-[5px] bg-white rounded-full overflow-hidden pointer-events-none"
            >
              {/* Dark Navy text aligned exactly in place (width matches container minus padding) */}
              <span className="absolute inset-y-0 left-0 w-[268px] flex items-center justify-center font-sans font-bold text-[12px] uppercase tracking-[0.25em] text-[#0B1F3A] select-none">
                Slide to Play
              </span>
            </motion.div>

            {/* Football Handle */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 220 }}
              dragElastic={0.05}
              dragMomentum={false}
              style={{ x: dragX, rotate: dragRotate }}
              onDragEnd={() => {
                if (dragX.get() >= 200) {
                  handlePlay();
                }
                animate(dragX, 0, { type: "spring", stiffness: 320, damping: 28 });
              }}
              className="h-[48px] w-[48px] rounded-full cursor-grab active:cursor-grabbing flex items-center justify-center bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] z-40 shrink-0"
            >
              <Image
                src="/1380575802.svg"
                alt="Football handle"
                width={40}
                height={40}
                className="pointer-events-none select-none"
              />
            </motion.div>
          </motion.div>

        </div>

        {/* ── Bottom smudge overlay - fades section into the footer ── */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none z-20"
          style={{
            background: "linear-gradient(to top, #FAF7F2 0%, #FAF7F2 20%, rgba(250,247,242,0.85) 50%, transparent 100%)",
          }}
        />
      </section>

    </>
  );
};

export default FootballCTA;
