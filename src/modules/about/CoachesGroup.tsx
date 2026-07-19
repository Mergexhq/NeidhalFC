"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export const CoachesGroup: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Motion values for interactive 3D mouse parallax tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Transform coordinates for background text (moves slightly)
  const textX = useTransform(springX, [-0.5, 0.5], ["-12px", "12px"]);
  const textY = useTransform(springY, [-0.5, 0.5], ["-8px", "8px"]);

  // Transform coordinates for coaches cutout (moves more in foreground for depth separation)
  const coachesX = useTransform(springX, [-0.5, 0.5], ["-24px", "24px"]);
  const coachesY = useTransform(springY, [-0.5, 0.5], ["-12px", "12px"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Normalize coordinates to -0.5 to 0.5 range
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    // Smoothly animate back to center
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[450px] sm:h-[550px] md:h-[650px] lg:h-[720px] bg-[#FAF7F2] overflow-hidden flex items-end border-b border-black/5"
    >
      {/* Subtle grid pattern background to ground the section */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0B1F3A/2_1px,transparent_1px),linear-gradient(to_bottom,#0B1F3A/2_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-20 z-0" />

      {/* Header Info */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-30 pointer-events-none">
        <span className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.25em] font-extrabold text-[#BCA688] mb-2">
          The Coaching Staff
        </span>
        <h2 className="font-raleway font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-[#0B1F3A]">
          Led by Experience
        </h2>
      </div>

      {/* Giant Backdrop BRAND text (NEIDHAL FC) */}
      <motion.div 
        style={{ 
          x: textX, 
          y: textY,
          left: "50%",
          top: "55%",
          translateX: "-50%",
          translateY: "-50%"
        }}
        className="absolute text-[16vw] font-raleway font-extrabold text-[#0B1F3A] opacity-[0.08] tracking-tighter leading-none select-none z-0 text-center whitespace-nowrap pointer-events-none"
      >
        NEIDHAL FC
      </motion.div>

      {/* Coaches Group Foreground Cutout */}
      <motion.div 
        style={{ x: coachesX, y: coachesY }}
        className="absolute inset-x-0 bottom-0 h-[80%] max-w-5xl mx-auto z-10 flex justify-center items-end"
      >
        <div className="relative w-full h-full max-h-[420px] sm:max-h-[520px] md:max-h-[600px]">
          <Image
            src="/images/about/about_coaches_group.webp"
            alt="Neidhal FC Coaches Group"
            fill
            priority
            className="object-contain object-bottom pointer-events-none"
          />
        </div>
      </motion.div>

      {/* Bottom white/cream smudge gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/80 to-transparent z-20 pointer-events-none" />
    </section>
  );
};

export default CoachesGroup;
