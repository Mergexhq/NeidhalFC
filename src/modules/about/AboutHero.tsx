"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Navbar from "@/components/layout/Navbar";

export const AboutHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // 1. Scroll-triggered parallax depth offsets
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Background text moves down slightly slower, cutout moves up slightly faster
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const cutoutY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  // 2. Mouse-move interactive floating parallax offsets
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 120 };

  // Generate slightly different multipliers for each element to separate layers in 3D depth
  const textXSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), springConfig);
  const textYSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [-12, 12]), springConfig);

  const leftXSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);
  const leftYSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), springConfig);

  const rightXSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-28, 28]), springConfig);
  const rightYSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [-28, 28]), springConfig);

  const centerXSpring = useSpring(useTransform(mouseX, [-0.5, 0.5], [-35, 35]), springConfig);
  const centerYSpring = useSpring(useTransform(mouseY, [-0.5, 0.5], [-35, 35]), springConfig);

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    // Map coordinate values to a range of [-0.5, 0.5] relative to the center
    const x = (clientX / innerWidth) - 0.5;
    const y = (clientY / innerHeight) - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full min-h-screen bg-[#FAF7F2] relative overflow-hidden flex flex-col justify-center"
    >
      <Navbar forceWhiteText={false} />

      {/* Main Creative Center Area */}
      <div className="flex-1 w-full flex items-center justify-center relative py-12 md:py-20 z-0">
        
        {/* Relative wrapper to group the big heading and small offset texts */}
        <div className="relative w-full max-w-7xl mx-auto flex flex-col items-center justify-center px-6">
          
          {/* Text Layer with Parallax */}
          <motion.div 
            style={{ y: textY }}
            className="relative w-full flex flex-col items-center justify-center py-20"
          >
            <motion.div 
              style={{ x: textXSpring, y: textYSpring }}
              className="relative"
            >
              {/* Small top tag: NEIDHAL FOOTBALL CLUB aligned above 'OUR' */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute -top-4 sm:-top-5 md:-top-5 lg:-top-7 left-1/2 -translate-x-1/2 sm:left-[3%] sm:translate-x-0 md:left-[4%] z-20 text-center sm:text-left w-full sm:w-auto"
              >
                <span className="font-raleway font-bold text-[10px] xs:text-[11px] sm:text-[2.4vw] md:text-[1.8vw] lg:text-[1.5vw] uppercase tracking-[0.2em] text-[#0B1F3A] whitespace-nowrap">
                  NEIDHAL FOOTBALL CLUB
                </span>
              </motion.div>

              {/* Big center heading with background-clip displaying the image through letters */}
              <motion.h1 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="hidden md:block font-raleway font-bold uppercase text-transparent bg-clip-text bg-cover tracking-[0.03em] text-[14vw] leading-none text-center select-none"
                style={{
                  backgroundImage: "url('/images/about/about_hero_bg_desktop.webp')",
                  backgroundPosition: "center 45%",
                }}
              >
                OUR STORY
              </motion.h1>
              
              <motion.h1 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="block md:hidden font-raleway font-bold uppercase text-transparent bg-clip-text bg-cover tracking-[0.03em] text-[18vw] leading-none text-center select-none"
                style={{
                  backgroundImage: "url('/images/about/about_hero_bg_mobile.webp')",
                  backgroundPosition: "center center",
                }}
              >
                OUR STORY
              </motion.h1>
            </motion.div>
          </motion.div>

          {/* Foreground Cutout Image Layer (overlaps the text layer) */}
          <motion.div 
            style={{ y: cutoutY }}
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          >
            {/* Desktop Cutouts (3 Images Composition with separate float springs) */}
            <div className="relative w-full h-[90%] max-w-7xl hidden md:block mt-8">
              {/* Left Cutout */}
              <motion.div 
                style={{ x: leftXSpring, y: leftYSpring }}
                className="absolute left-[2%] bottom-[5%] w-[32%] h-[75%] z-10"
              >
                <Image
                  src="/images/about/about_hero_nobg_left.webp"
                  alt="Left cutout player"
                  fill
                  priority
                  className="object-contain object-bottom drop-shadow-[0_15px_30px_rgba(11,31,58,0.15)]"
                />
              </motion.div>

              {/* Right Cutout */}
              <motion.div 
                style={{ x: rightXSpring, y: rightYSpring }}
                className="absolute right-[2%] bottom-[5%] w-[32%] h-[75%] z-10"
              >
                <Image
                  src="/images/about/about_hero_nobg_right.webp"
                  alt="Right cutout player"
                  fill
                  priority
                  className="object-contain object-bottom drop-shadow-[0_15px_30px_rgba(11,31,58,0.15)]"
                />
              </motion.div>

              {/* Center Cutout (Slightly leftwards, near 'S') */}
              <motion.div 
                style={{ x: centerXSpring, y: centerYSpring }}
                className="absolute left-[28%] right-[30%] bottom-0 h-[88%] z-20"
              >
                <Image
                  src="/images/about/about_hero_nobg_desktop.webp"
                  alt="Center cutout player"
                  fill
                  priority
                  className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(11,31,58,0.2)]"
                />
              </motion.div>
            </div>
            
            {/* Mobile Cutout */}
            <div className="relative w-full h-[80%] block md:hidden mt-4">
              <Image
                src="/images/about/about_hero_nobg_mobile.webp"
                alt="Cutout foreground"
                fill
                priority
                className="object-contain object-center drop-shadow-[0_15px_30px_rgba(11,31,58,0.15)]"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default AboutHero;
