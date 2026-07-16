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

      {/* ── Image Banner Container (Cropped like Image 1 with Parallax) ── */}
      <div
        ref={containerRef}
        className="relative w-full h-full overflow-hidden bg-black"
      >
        {/* Parallax Background Image */}
        <motion.div
          style={{ y }}
          className="absolute inset-0 w-full h-[120%] -top-[10%] z-0"
        >
          <Image
            src="/images/about/about_hero_bg.webp"
            alt="About Neidhal FC background"
            fill
            priority
            unoptimized
            className="object-cover object-bottom pointer-events-none select-none"
          />
        </motion.div>

        {/* --- MAIN HERO CONTENT (Overlaying the image at bottom-left) --- */}
        <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 lg:left-16 z-20 max-w-4xl text-left">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-start gap-3"
          >
            {/* Massive Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-[90px] font-medium tracking-tight leading-none text-[#0B1F3A] uppercase"
            >
              OUR STORY
            </motion.h1>

            {/* Story Subtitle */}
            <motion.h2
              variants={itemVariants}
              className="text-xl sm:text-2xl md:text-3xl font-light text-[#0B1F3A] leading-tight max-w-2xl mt-1 mb-2"
            >
              Where Every Great Story Begins
            </motion.h2>

            {/* Staggered Paragraphs */}
            <div className="space-y-3 max-w-2xl text-[#0B1F3A]/85 font-light text-xs sm:text-sm md:text-base leading-relaxed font-sans">
              <motion.p variants={itemVariants}>
                In 2016, two friends met on the shores of Chennai with nothing but a football and a love for the game.
              </motion.p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
