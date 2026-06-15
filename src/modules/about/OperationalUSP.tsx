"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Zap } from "lucide-react";

export const OperationalUSP: React.FC = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-primary text-white border-t border-b border-white/5">
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
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-sand mb-4 block font-sans">
              Operational Quality
            </span>
            <h2 className="text-4xl md:text-6xl font-black font-display tracking-tight leading-[0.95] text-white uppercase mb-8">
              Guaranteed<br />Double-Coach<br />System
            </h2>
            
            <p className="text-[#FAF7F2]/80 text-sm md:text-base leading-relaxed font-normal mb-8 max-w-xl">
              We never leave a single trainer alone with a squad. To ensure maximum technical attention and safety, every Neidhal session is run by a **Main Coach** managing tactical space, paired with an **Assistant Coach** providing individual corrections.
            </p>

            {/* Feature List */}
            <ul className="space-y-4 w-full mb-10">
              {[
                {
                  title: "Active Space Management",
                  desc: "Our head coaches actively position themselves to read body shape, movement timing, and space management."
                },
                {
                  title: "Individual Dribbling Diagnostics",
                  desc: "The assistant coach analyzes ball contacts, dribble selection, and micro-techniques on a 1v1 basis."
                },
                {
                  title: "Structured 20-Player Cap",
                  desc: "We strictly enforce a limit of 20 players per session to guarantee a real 10:1 player-to-coach training block."
                }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-4 items-start">
                  <div className="h-6 w-6 rounded-full bg-sand/10 border border-sand/30 flex items-center justify-center text-sand shrink-0 mt-0.5">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <div>
                    <span className="font-sans font-extrabold text-sm md:text-base text-white block">
                      {item.title}
                    </span>
                    <span className="text-[#FAF7F2]/60 text-xs md:text-sm font-normal block mt-0.5">
                      {item.desc}
                    </span>
                  </div>
                </li>
              ))}
            </ul>

            {/* Trust badge */}
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 max-w-md">
              <ShieldCheck className="h-6 w-6 text-sand shrink-0" />
              <p className="text-[11px] md:text-xs text-[#FAF7F2]/70 leading-normal font-normal text-left">
                Every member of our coaching staff is licensed by the AIFF (All India Football Federation) and vetted for high-caliber developmental academy environments.
              </p>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default OperationalUSP;
