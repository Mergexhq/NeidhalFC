"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Trophy, Users, Star } from "lucide-react";

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[92vh] sm:min-h-screen w-full bg-[#0B1F3A] pt-24 sm:pt-28 pb-16 flex items-center overflow-hidden">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-1/4 left-[-10%] w-[50vw] h-[50vw] rounded-full bg-sand/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-10 right-[-10%] w-[40vw] h-[40vw] rounded-full bg-accent/5 blur-[120px] pointer-events-none z-0" />
      
      {/* Background Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* --- LEFT COLUMN: Typography & Action --- */}
          <div className="lg:col-span-7 flex flex-col items-start text-left gap-6">
            
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sand text-[10px] uppercase font-bold tracking-widest"
            >
              <Sparkles size={10} />
              <span>Chennai's Premium Coastal Football Club</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal font-display leading-[0.92] tracking-tight text-white max-w-3xl font-sans"
            >
              Play with <br className="hidden sm:inline" />
              <em className="italic text-sand font-light">flair</em> & <em className="italic text-sand font-light">freedom.</em>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-white/80 text-sm sm:text-base md:text-lg leading-relaxed font-sans font-light max-w-xl"
            >
              Developing fearless, creative players who play with street-style touch and structured coaching. Rooted on Chennai's ECR sand since 2016.
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto"
            >
              <Link
                href="/book-trial"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-sand hover:bg-white text-[#0B1F3A] font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:scale-[1.02] cursor-pointer"
              >
                Book a Free Trial
                <ArrowRight size={13} />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/20 hover:border-white text-white font-sans font-bold text-xs uppercase tracking-wider transition-colors duration-200 cursor-pointer"
              >
                Read Our Story
              </Link>
            </motion.div>

          </div>

          {/* --- RIGHT COLUMN: Bento Glass Graphic --- */}
          <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative w-full max-w-[460px] aspect-[4/5] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-900/40 p-4 flex flex-col justify-between"
            >
              {/* Overlay Graphic Container */}
              <div className="absolute inset-0 z-0">
                <Image
                  src="/beach_soccer.png"
                  alt="Neidhal Beach Football Roots"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover object-center opacity-85 transition-transform duration-700 hover:scale-105"
                  priority
                />
                {/* Vignette Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/90 via-[#0B1F3A]/10 to-black/25 z-[1]" />
              </div>

              {/* Bento Content - Top Badges */}
              <div className="relative z-10 flex justify-between items-start">
                <div className="flex flex-col gap-2">
                  <span className="px-3 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-white font-sans font-semibold text-[9px] uppercase tracking-widest flex items-center gap-1.5 w-fit">
                    <Trophy size={10} className="text-sand" />
                    Est. 2016
                  </span>
                  <span className="px-3 py-1 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-white font-sans font-semibold text-[9px] uppercase tracking-widest flex items-center gap-1.5 w-fit">
                    <Users size={10} className="text-sand" />
                    2:1 Coach Ratio
                  </span>
                </div>
                
                <span className="h-10 w-10 rounded-full bg-sand text-[#0B1F3A] flex items-center justify-center shadow-lg font-display font-extrabold text-sm border border-white/20 select-none">
                  U16
                </span>
              </div>

              {/* Bento Content - Bottom Info Card */}
              <div className="relative z-10 bg-black/45 backdrop-blur-md border border-white/10 p-5 rounded-[1.8rem] flex flex-col gap-2.5">
                <div className="flex items-center gap-1 text-sand">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={10} className="fill-sand" />
                  ))}
                  <span className="text-[9px] text-white/60 font-bold ml-1.5 uppercase tracking-widest">Chennai's Shoreline</span>
                </div>
                <h3 className="font-display font-extrabold text-lg text-white leading-tight">
                  Beach training builds grit. Turf training builds tactical intelligence.
                </h3>
                <p className="text-white/70 text-[11px] font-sans font-normal leading-relaxed">
                  We combine the agility and touch of shoreline play with the structure of tactical field development across our Kottivakkam, Injambakkam, and YMCA Nandanam hubs.
                </p>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
