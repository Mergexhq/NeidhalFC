"use client";

import React from "react";
import Image from "next/image";
import { Award, Users, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export const NeidhalStandard: React.FC = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-primary text-white border-t border-b border-white/5">
      {/* Decorative background grid and blurs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-size-[4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Image with Float Badge (lg:col-span-6) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative aspect-video sm:aspect-[16/10] lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl bg-primary-dark border border-white/10 group"
          >
            <Image
              src="/images/home/coach_ratio.png"
              alt="Neidhal FC coaching session with dual coaches"
              fill
              sizes="(max-w-768px) 100vw, 50vw"
              className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
            />
            {/* Soft dark overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-primary/20 pointer-events-none" />

            {/* Float Badge */}
            <div className="absolute bottom-8 left-8 bg-sand text-primary px-6 py-4 rounded-2xl border border-white/10 shadow-lg text-left backdrop-blur-md">
              <span className="font-condensed font-black text-3xl leading-none block">2:1 RATIO</span>
              <span className="text-[9px] uppercase tracking-widest font-extrabold text-primary-dark mt-1 block">Main + Assistant Coach</span>
            </div>
          </motion.div>

          {/* Right Column: Content (lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-sand flex items-center justify-center gap-1.5 mb-6">
              <Sparkles size={12} className="text-sand" />
              The Standard
            </span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold font-display tracking-wide leading-[1.1] text-white mb-8">
              1 Main Coach + 1 Assistant Coach.<br />
              <span className="text-sand">Every Session. No Exceptions.</span>
            </h2>

            <div className="text-slate-300 text-sm md:text-base leading-relaxed font-light font-sans max-w-xl mb-12 space-y-6">
              <p>
                {"Every pod session at Neidhal FC is run with two coaches: one licensed lead coach designing technical drills, and one assistant coach tracking touches and delivering real-time corrections. No exceptions."}
              </p>
              <p>
                {"We refuse to pack 30 players under a single coach. This structured setup guarantees that your child is seen, supported, and guided through every individual touch. That is how player progression is locked in."}
              </p>
            </div>

            {/* Sub-features or icons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full border-t border-white/10 pt-10">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 text-sand flex items-center justify-center shrink-0">
                  <Users size={18} />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-white uppercase tracking-wider">Strict 2:1 Coaching Ratio</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">No child is lost in the crowd. Every player gets micro feedback.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 text-sand flex items-center justify-center shrink-0">
                  <Award size={18} />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-sm text-white uppercase tracking-wider">Licensed Pedigree</h4>
                  <p className="text-slate-400 text-xs mt-1 leading-relaxed">Lead coaches hold active AFC (Asian Football Conf.) and AIFF licensing.</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default NeidhalStandard;
