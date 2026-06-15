"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const FeaturedPrograms: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#FAF7F2] border-t border-black/5">
      {/* Visual background lights */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-sand/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 items-start">
          
          {/* Column 1: Intro Text Block */}
          <div className="flex flex-col items-start pr-0 md:pr-4">
            {/* Small rounded visual thumbnail (using local stock asset) */}
            <div className="w-16 h-12 rounded-xl overflow-hidden bg-sand/15 border border-sand/30 shadow-sm">
              <img 
                src="/soccer_thumb.png" 
                alt="Soccer training ball close up" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Big bold sans-serif title to match the reference style */}
            <h2 className="font-sans font-extrabold text-3xl lg:text-[2.25rem] text-primary tracking-tight leading-tight mt-6 mb-4">
              A Structured<br />Coaching Journey
            </h2>
            
            {/* Description */}
            <p className="font-sans text-[#6F6F6F] text-sm md:text-base leading-relaxed font-normal">
              Every training session is meticulously organized around age-specific technical curriculums designed to bring out individual flair, decision-making, and street-style skills.
            </p>
            
            {/* Link button */}
            <Link
              href="/programs"
              className="font-sans font-bold text-xs uppercase tracking-wider text-accent hover:text-primary transition-all duration-200 group cursor-pointer inline-flex items-center gap-2 mt-8"
            >
              View All Programs
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Column 2: Card 1 (Foundation & Development Stage) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="relative w-full aspect-[4/5] rounded-[1.75rem] overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
          >
            {/* Full Card Background Image (using local stock asset) */}
            <img 
              src="/foundation_drill.png" 
              alt="Foundation & Development Stage" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent transition-opacity duration-300 group-hover:from-primary/100" />
            
            {/* Overlaid Text Content at the bottom */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white z-10">
              <div className="pr-10 text-left">
                <h3 className="font-sans font-extrabold text-lg lg:text-xl leading-tight mb-2 text-white">
                  Foundation & Development
                </h3>
                <p className="font-sans text-white/80 text-xs font-normal">
                  U6 - U12 / Ball Mastery & Flair
                </p>
              </div>
              
              {/* Arrow bottom-right */}
              <div className="absolute bottom-8 right-8 text-white/70 group-hover:text-white transition-colors duration-200">
                <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>

          {/* Column 3: Card 2 (Advanced Performance Stage) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative w-full aspect-[4/5] rounded-[1.75rem] overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-300 group cursor-pointer"
          >
            {/* Full Card Background Image (using local stock asset) */}
            <img 
              src="/advanced_match.png" 
              alt="Advanced Performance Stage" 
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/30 to-transparent transition-opacity duration-300 group-hover:from-primary/100" />
            
            {/* Overlaid Text Content at the bottom */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 text-white z-10">
              <div className="pr-10 text-left">
                <h3 className="font-sans font-extrabold text-lg lg:text-xl leading-tight mb-2 text-white">
                  Advanced Performance
                </h3>
                <p className="font-sans text-white/80 text-xs font-normal">
                  U13 - U16 / Tactics & Game Dynamics
                </p>
              </div>
              
              {/* Arrow bottom-right */}
              <div className="absolute bottom-8 right-8 text-white/70 group-hover:text-white transition-colors duration-200">
                <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedPrograms;
