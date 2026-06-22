"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles } from "lucide-react";

export const AboutHero: React.FC = () => {
  return (
    <section className="bg-[#FAF7F2] px-4 pt-4 md:px-6 md:pt-6 pb-0 relative overflow-hidden">
      {/* Cinematic Rounded Hero Box */}
      <div className="relative w-full min-h-[95vh] rounded-[2.5rem] bg-[#122415] text-white p-6 sm:p-10 md:p-12 lg:p-16 flex flex-col justify-between overflow-hidden shadow-2xl">
        
        {/* Grass Background Image */}
        <Image
          src="/grass_bg.png"
          alt="Neidhal FC Football Field Turf"
          fill
          sizes="100vw"
          className="object-cover object-center pointer-events-none select-none z-0 opacity-80"
          priority
        />
        
        {/* Double dark overlays for text legibility and contrast */}
        <div className="absolute inset-0 bg-[#0d1c10]/65 mix-blend-multiply z-[1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#122415]/75 via-transparent to-[#0d1c10]/85 z-[1]" />

        {/* --- MAIN HERO BODY: Backstory Floating Card on the Right --- */}
        <div className="relative z-10 flex justify-end pt-8 md:pt-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.2 }}
            className="w-full max-w-sm bg-black/45 backdrop-blur-md border border-white/10 p-4 rounded-3xl flex items-center gap-4 hover:border-white/20 transition-all duration-300"
          >
            {/* Thumbnail */}
            <div className="relative h-16 w-16 rounded-2xl overflow-hidden shrink-0 bg-white/10">
              <Image
                src="/soccer_thumb.png"
                alt="Neidhal Beach Training Session"
                fill
                sizes="64px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#122415]/20" />
            </div>
            
            {/* Content */}
            <div className="flex flex-col text-left gap-1">
              <span className="text-[10px] uppercase font-bold tracking-widest text-sand flex items-center gap-1">
                <Sparkles size={10} />
                Our Backstory
              </span>
              <h3 className="font-sans font-bold text-xs text-white uppercase tracking-wide">
                How we started in 2016
              </h3>
              <Link
                href="#chapter-two"
                className="inline-flex items-center gap-1.5 text-[10px] font-sans font-bold uppercase tracking-wider text-white/70 hover:text-white transition-colors duration-200 mt-1"
              >
                <span>Read Story</span>
                <Play size={8} className="fill-white/75" />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* --- BOTTOM HERO FOOTER (GRID) --- */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end border-t border-white/10 pt-8 mt-8">
          
          {/* Bottom Left Info / Tags & Headline */}
          <div className="lg:col-span-7 flex flex-col items-start text-left gap-4">
            
            {/* Chapter Label */}
            <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-sand">
              Chapter 01 &mdash; The Beginning
            </span>

            {/* Tag Pills */}
            <div className="flex flex-wrap gap-2">
              {["Barefoot", "Street Flair", "ECR Sand", "Free Decisions"].map((tag) => (
                <span
                  key={tag}
                  className="px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/80"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Massive Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-normal font-display leading-[0.95] tracking-tight text-white max-w-2xl mt-2"
            >
              Play with <em className="italic text-sand font-light">flair</em> & <em className="italic text-sand font-light">freedom.</em>
            </motion.h1>
          </div>

          {/* Bottom Right Info / Description & CTA */}
          <div className="lg:col-span-5 flex flex-col items-start text-left gap-6 lg:pl-8">
            <p className="text-white/80 text-sm md:text-base leading-relaxed font-light">
              We don&apos;t build tactical robots. We build fearless, creative players who play with street-style touch. It started on the ECR shoreline in 2016 with just a ball and the sea breeze.
            </p>

            {/* CTA Book Now Button */}
            <Link
              href="/book-trial"
              className="inline-flex items-center gap-3 bg-white text-[#122415] hover:bg-sand hover:text-[#122415] text-sm font-sans font-bold uppercase tracking-widest px-7 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-95 group"
            >
              <span>Book Now</span>
              <div className="h-6 w-6 rounded-full bg-[#122415] text-white flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform duration-300">
                <ArrowRight size={14} />
              </div>
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutHero;
