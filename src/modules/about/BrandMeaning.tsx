"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Compass, Sparkles, Anchor, Scale } from "lucide-react";
import { ScrollTextRise } from "@/components/ruixen/scroll-text-rise";

export const BrandMeaning: React.FC = () => {
  // Animation variants for text reveal
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="chapter-two"
      className="py-20 md:py-28 bg-[#FAF7F2] text-[#0B1F3A] relative overflow-visible border-b border-black/5"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Cinematic Chapter Label */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-extrabold text-[#0077b6]">
            <Compass size={12} className="animate-spin-slow" />
            Chapter 02 &mdash; The Land
          </span>
        </div>

        {/* Narrative Intro Box (Image 2 style) */}
        <div className="max-w-5xl mx-auto text-center mb-16">
          <ScrollTextRise
            textClassName="font-display"
            text="We coach a **fearless,** **creative** **style** of football where the **sea** **meets** **the** **shore.** In ancient Tamil, this coastal strip of salt and sand is called __Neidhal.__ Rooted here since 2016, we teach kids to play with **flair** **and** **freedom,** not robotic systems."
          />
        </div>

        {/* Two-Column Assets Row (Image 2 style) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center border-t border-black/5 pt-16">
          
          {/* Left: Two Small Images Side-by-Side */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square rounded-[2rem] overflow-hidden shadow-md border border-black/5 hover:scale-[1.02] transition-transform duration-300"
            >
              <Image
                src="/images/beach_soccer.jpg"
                alt="Neidhal FC Barefoot Beach Football Practice"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#0d1c10]/10" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="relative aspect-square rounded-[2rem] overflow-hidden shadow-md border border-black/5 hover:scale-[1.02] transition-transform duration-300"
            >
              <Image
                src="/images/soccer_thumb.jpg"
                alt="Neidhal FC Kids Beach Soccer Drill"
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#0d1c10]/10" />
            </motion.div>
          </div>

          {/* Right: Four Pillar Icons & Labels */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-x-8 gap-y-10">
            {/* Universal */}
            <div className="flex flex-col items-start text-left gap-3">
              <div className="h-10 w-10 rounded-full bg-[#0077b6]/10 text-[#0077b6] flex items-center justify-center border border-[#0077b6]/20">
                <Compass size={18} />
              </div>
              <div>
                <h4 className="font-sans font-bold text-xs text-[#0B1F3A] uppercase tracking-wider">The Shore</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  We train barefoot on sand. It builds natural agility, balance, and raw ankle strength.
                </p>
              </div>
            </div>

            {/* Flair */}
            <div className="flex flex-col items-start text-left gap-3">
              <div className="h-10 w-10 rounded-full bg-[#0077b6]/10 text-[#0077b6] flex items-center justify-center border border-[#0077b6]/20">
                <Sparkles size={18} />
              </div>
              <div>
                <h4 className="font-sans font-bold text-xs text-[#0B1F3A] uppercase tracking-wider">The Flair</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Street-style touch over system drills. We encourage kids to try the impossible.
                </p>
              </div>
            </div>

            {/* Shoreline */}
            <div className="flex flex-col items-start text-left gap-3">
              <div className="h-10 w-10 rounded-full bg-[#0077b6]/10 text-[#0077b6] flex items-center justify-center border border-[#0077b6]/20">
                <Anchor size={18} />
              </div>
              <div>
                <h4 className="font-sans font-bold text-xs text-[#0B1F3A] uppercase tracking-wider">The Ratio</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Two coaches in every single session. One to guide, one to watch every touch.
                </p>
              </div>
            </div>

            {/* 2:1 Ratio */}
            <div className="flex flex-col items-start text-left gap-3">
              <div className="h-10 w-10 rounded-full bg-[#0077b6]/10 text-[#0077b6] flex items-center justify-center border border-[#0077b6]/20">
                <Scale size={18} />
              </div>
              <div>
                <h4 className="font-sans font-bold text-xs text-[#0B1F3A] uppercase tracking-wider">The Open Door</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Every child, regardless of skill, gets the freedom to discover the game.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Detailed Backstory Narrative & Pull Quote (Unified cinematic layout) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 border-t border-black/5 pt-16 mt-16 items-start"
        >
          {/* Left Column: Historical context */}
          <motion.div variants={itemVariants} className="md:col-span-7 text-left space-y-6">
            <h3 className="font-display font-semibold text-xl sm:text-2xl text-[#0B1F3A] leading-tight">
              Landscape of Salt & Sand
            </h3>
            <div className="text-slate-600 text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                Thousands of years ago, Tamil poets categorized the world into five landscapes: mountain, forest, desert, and farmland. The fifth they called <strong className="text-[#0077b6] font-semibold">Neidhal</strong>—the coast where the sea meets the shore.
              </p>
              <p>
                We did not choose this name to sound poetic. We chose it because the shore is our teacher. The sea does not ask permission to move, and neither does the kind of football we believe in. We teach kids to play like the ocean—fluid, powerful, and free.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Pull Quote */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-5 bg-white border border-[#D9C3A5]/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs relative"
          >
            {/* Quote Marks Background */}
            <div className="absolute top-4 right-6 text-7xl font-serif text-[#0077b6]/10 select-none pointer-events-none">
              &ldquo;
            </div>
            
            <p className="font-display italic text-lg sm:text-xl text-[#0B1F3A] leading-relaxed relative z-10">
              &ldquo;The sea does not ask permission to move. Neither does the kind of football we believe in.&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-0.5 w-6 bg-[#0077b6]" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#0077b6]">
                Neidhal FC Manifesto
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandMeaning;
