"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const OperationalUSP: React.FC = () => {
  return (
    <section id="chapter-four" className="py-24 md:py-32 relative overflow-hidden bg-primary text-white border-t border-b border-white/5">
      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Premium Backshot Studio Photo (lg:col-span-6) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl bg-primary-dark border border-white/10 group"
          >
            <Image
              src="/images/home/coach_ratio.png"
              alt="Neidhal FC Head Coach actively managing field space"
              fill
              sizes="(max-w-768px) 100vw, 50vw"
              className="object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              priority
            />
            {/* Soft dark vignette overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-primary/20 pointer-events-none" />

            {/* Float Badge */}
            <div className="absolute bottom-8 left-8 bg-sand text-primary px-6 py-4 rounded-2xl border border-white/10 shadow-lg text-left backdrop-blur-md">
              <span className="font-condensed font-black text-3xl leading-none block">2:1 RATIO</span>
              <span className="text-[9px] uppercase tracking-widest font-extrabold text-primary-dark mt-1 block">Main + Assistant Coach</span>
            </div>
          </motion.div>

          {/* Right Column: Copy & Details (lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-sand mb-8 block font-sans"
            >
              Chapter 04 — The Standard
            </motion.span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-display tracking-wide leading-[1.1] text-white mb-8">
              We do the simple things correctly.<br />
              <span className="text-sand">That is rarer than it sounds.</span>
            </h2>
            
            <div className="text-slate-300 text-sm md:text-base leading-relaxed font-light font-sans max-w-xl mb-12 space-y-6">
              <p>
                Every single session at Neidhal FC runs with one main coach and one assistant coach. Always. No exceptions. This is not a marketing claim &mdash; it is a structural decision we made from day one and have never compromised on.
              </p>
              <p>
                What this means for your child: they are never lost in a crowd. They are seen. They are corrected in real time. They are pushed at the right moment.
              </p>
            </div>

            {/* Three-Column Stat Layout */}
            <div className="grid grid-cols-3 gap-6 w-full border-t border-white/10 pt-10 mb-10 text-left">
              <div>
                <span className="font-display font-bold text-3xl md:text-4xl text-sand block">2:1</span>
                <span className="text-[10px] text-slate-400 font-normal leading-relaxed block mt-1">Player-to-coach ratio. Every session, every location, every time.</span>
              </div>
              <div className="border-l border-white/10 pl-4">
                <span className="font-display font-bold text-3xl md:text-4xl text-sand block">2016</span>
                <span className="text-[10px] text-slate-400 font-normal leading-relaxed block mt-1">The year we started. Eight years of doing this the right way.</span>
              </div>
              <div className="border-l border-white/10 pl-4">
                <span className="font-display font-bold text-3xl md:text-4xl text-sand block">3 Hubs</span>
                <span className="text-[10px] text-slate-400 font-normal leading-relaxed block mt-1">Kottivakkam. Injambakkam. Nandanam. More coming.</span>
              </div>
            </div>

            {/* Closing Line */}
            <p className="text-slate-400 italic text-xs font-normal border-t border-white/5 pt-4 w-full">
              The photograph of a coach leading from the front, kids fanning out behind &mdash; that is not a posed shot. That is what Tuesday morning looks like at Neidhal FC.
            </p>

          </div>

        </div>
      </div>
    </section>
  );
};

export default OperationalUSP;
