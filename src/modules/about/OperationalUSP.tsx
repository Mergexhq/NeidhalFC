"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, UserCheck } from "lucide-react";

export const OperationalUSP: React.FC = () => {
  return (
    <section
      id="chapter-five"
      className="py-20 md:py-28 bg-[#FAF7F2] text-[#0B1F3A] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* --- PART 1: THE STANDARD (2:1 coaching ratio details) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-24">
          
          {/* Left Column: Premium Backshot Studio Photo (lg:col-span-6) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-xl bg-slate-100 border border-black/5 group"
          >
            <Image
              src="/images/home/coach_ratio.jpg"
              alt="Neidhal FC Head Coach actively managing field space"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
              priority
            />
            {/* Soft dark vignette overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1f3a]/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-[#0b1f3a]/10 pointer-events-none" />

            {/* Float Badge */}
            <div className="absolute bottom-8 left-8 bg-white text-[#0B1F3A] px-6 py-4 rounded-2xl border border-black/5 shadow-md text-left backdrop-blur-md">
              <span className="font-condensed font-black text-3xl leading-none text-[#0077b6] block">2:1 RATIO</span>
              <span className="text-[9px] uppercase tracking-widest font-extrabold text-[#0B1F3A] mt-1 block">Lead + Assistant Coach</span>
            </div>
          </motion.div>

          {/* Right Column: Copy & Details (lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-extrabold text-[#0077b6] mb-6">
              <Sparkles size={12} />
              Chapter 05 &mdash; The Standard
            </span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-display tracking-wide leading-[1.1] text-[#0B1F3A] mb-8">
              We do the simple things correctly.<br />
              <span className="text-[#0077b6]">That is rarer than it sounds.</span>
            </h2>
            
            <div className="text-slate-600 text-sm sm:text-base leading-relaxed font-light max-w-xl mb-12 space-y-6">
              <p>
                Every single session at Neidhal FC runs with one main coach and one assistant coach. Always. No exceptions. This is not a marketing claim &mdash; it is a structural decision we made from day one and have never compromised on.
              </p>
              <p>
                What this means for your child: they are never lost in a crowd. They are seen. They are corrected in real time. They are pushed at the right moment.
              </p>
            </div>

            {/* Three-Column Stat Layout */}
            <div className="grid grid-cols-3 gap-6 w-full border-t border-black/5 pt-10 mb-10 text-left">
              <div>
                <span className="font-display font-bold text-2xl sm:text-3xl text-[#0077b6] block">2:1</span>
                <span className="text-[10px] text-slate-500 font-normal leading-relaxed block mt-1">Two coaches in every session. Every location, every touch watched.</span>
              </div>
              <div className="border-l border-black/5 pl-4">
                <span className="font-display font-bold text-2xl sm:text-3xl text-[#0077b6] block">2016</span>
                <span className="text-[10px] text-slate-500 font-normal leading-relaxed block mt-1">Eight years of beach training and local youth growth.</span>
              </div>
              <div className="border-l border-black/5 pl-4">
                <span className="font-display font-bold text-2xl sm:text-3xl text-[#0077b6] block">3 Hubs</span>
                <span className="text-[10px] text-slate-500 font-normal leading-relaxed block mt-1">Three coastal coaching facilities active in Chennai.</span>
              </div>
            </div>

            {/* Closing Line */}
            <p className="text-slate-400 italic text-xs font-normal border-t border-black/5 pt-4 w-full">
              The photograph of a coach leading from the front, kids fanning out behind &mdash; that is not a posed shot. That is what Tuesday morning looks like at Neidhal FC.
            </p>

          </div>

        </div>

        {/* --- PART 2: THE CONCLUSION & CTA (Image 3 style) --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-8 border-t border-black/5">
          
          {/* Left card: Large player image with overlay badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative aspect-square lg:aspect-auto min-h-[380px] rounded-[2rem] overflow-hidden shadow-md border border-black/5 group"
          >
            <Image
              src="/images/about/slider_coaching.jpg"
              alt="Two Neidhal Football Club Players Training"
              fill
              sizes="(max-w-768px) 100vw, 50vw"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
            />
            {/* Deep color wash */}
            <div className="absolute inset-0 bg-[#122415]/10 pointer-events-none" />
            
            {/* Floating Top Badge */}
            <div className="absolute top-6 left-6 bg-[#0077b6] text-white px-4 py-2 rounded-full border border-white/10 shadow-md flex items-center gap-2">
              <UserCheck size={12} />
              <span className="text-[10px] font-bold uppercase tracking-wider">172+ Active Members</span>
            </div>
          </motion.div>

          {/* Right card: Dark booking container */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 bg-[#16271c] text-white rounded-[2rem] p-8 sm:p-10 md:p-12 flex flex-col justify-between text-left shadow-lg border border-white/5 min-h-[380px]"
          >
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/15 text-[9px] font-bold uppercase tracking-widest text-[#D9C3A5] mb-4">
                Reserve slot
              </span>
              <h3 className="font-display font-semibold text-3xl sm:text-4xl text-white leading-tight mb-3">
                Effortless Booking for Your Next Session
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#D9C3A5]/70 block mb-6">
                Exceptional Experience
              </span>
              
              <div className="w-16 h-[2px] bg-white/20 mb-8" />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 mt-4">
              {/* Button */}
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-white text-[#16271c] hover:bg-[#D9C3A5] hover:text-[#16271c] text-xs font-sans font-bold uppercase tracking-widest px-6 py-3 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-95 group shrink-0"
              >
                <span>Contact Us</span>
                <div className="h-5 w-5 rounded-full bg-[#16271c] text-white flex items-center justify-center shrink-0 group-hover:translate-x-0.5 transition-transform duration-300">
                  <ArrowRight size={10} />
                </div>
              </Link>

              {/* Sub-text */}
              <p className="text-white/60 text-[11px] sm:text-xs leading-relaxed max-w-xs">
                Pick your hub location, choose a convenient date, and let your child play with freedom.
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default OperationalUSP;
