"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "@/components/layout/Navbar";

export const AboutHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Setup parallax scroll tracking on the banner container (relative to viewport top)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Moves the background image slowly relative to the scroll position
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Stagger variants for the copy reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="w-full h-screen bg-[#FAF7F2] relative overflow-hidden flex flex-col">
      <Navbar forceWhiteText={false} />

      {/* ── Image Banner Container with Parallax ── */}
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden bg-black"
      >
        {/* Parallax Background Image */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
        >
          {/* Desktop Version */}
          <Image
            src="/images/about/about_hero_bg_desktop.webp"
            alt="About Neidhal FC background"
            fill
            priority
            unoptimized
            className="hidden md:block object-cover object-bottom pointer-events-none select-none"
          />
          {/* Mobile Version */}
          <Image
            src="/images/about/about_hero_bg_mobile.webp"
            alt="About Neidhal FC background"
            fill
            priority
            unoptimized
            className="block md:hidden object-cover object-bottom pointer-events-none select-none"
          />
        </motion.div>

        {/* --- MAIN HERO CONTENT --- */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-10 md:p-16 lg:p-20">
          <div className="max-w-7xl mx-auto w-full">
            
            {/* Headline and Copy Block (Left side, no floating cards/overlays) */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="max-w-3xl text-left flex flex-col items-start gap-1"
            >
              <motion.h1
                variants={itemVariants}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-[100px] font-raleway font-semibold text-[#0B1F3A] uppercase tracking-tight leading-none"
              >
                OUR STORY
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-[#0B1F3A]/90 text-lg sm:text-xl md:text-2xl leading-relaxed font-sans font-light max-w-3xl mt-4"
              >
                Every club has an origin. Ours began on the sand.
              </motion.p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
