"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";

export const CoachesGroup: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Scroll tracking on the section container for vertical scroll parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scroll offsets: text moves faster for dynamic 3D depth separation
  const scrollTextY = useTransform(scrollYProgress, [0, 1], [-80, 80]);
  const scrollCoachesY = useTransform(scrollYProgress, [0, 1], [-25, 25]);

  // Motion values for interactive 3D mouse parallax tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Transform coordinates for background text (moves slightly with mouse)
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
      className="relative w-full h-[450px] sm:h-[550px] md:h-[650px] lg:h-[720px] bg-[#FAF7F2] overflow-hidden flex items-end"
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

      {/* Giant Backdrop BRAND text (NEIDHAL FC) with combined Scroll + Mouse Parallax */}
      <motion.div
        style={{ y: scrollTextY }}
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none overflow-hidden"
      >
        <motion.div 
          style={{ x: textX, y: textY }}
          className="text-[16vw] font-raleway font-extrabold text-[#0B1F3A] opacity-[0.16] tracking-tighter leading-none select-none text-center whitespace-nowrap"
        >
          NEIDHAL FC
        </motion.div>
      </motion.div>

      {/* Coaches Group Foreground Cutout with combined Scroll + Mouse Parallax */}
      <motion.div 
        style={{ y: scrollCoachesY }}
        className="absolute inset-x-0 bottom-0 h-[80%] max-w-5xl mx-auto z-10 flex justify-center items-end"
      >
        <motion.div 
          style={{ x: coachesX, y: coachesY }}
          className="relative w-full h-[95%] max-h-[420px] sm:max-h-[520px] md:max-h-[600px] flex justify-center items-end"
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/about/about_coaches_group.webp"
              alt="Neidhal FC Coaches Group"
              fill
              priority
              className="object-contain object-bottom pointer-events-none"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom white/cream smudge gradient overlay - reduced height and density, shifted slightly down */}
      <div className="absolute inset-x-0 -bottom-2 h-28 bg-gradient-to-t from-[#FAF7F2] via-[#FAF7F2]/40 to-transparent z-20 pointer-events-none" />
    </section>
  );
};

export default CoachesGroup;
