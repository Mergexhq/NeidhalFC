"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Waves, Sun } from "lucide-react";

export const BrandMeaning: React.FC = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-primary text-white border-b border-white/5">
      {/* Background visual details */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-size-[5rem_5rem] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-sand/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        {/* Navigation icon */}
        <div className="h-12 w-12 rounded-full border border-sand/20 flex items-center justify-center text-sand mb-8 animate-spin-slow">
          <Compass size={20} />
        </div>

        <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-sand mb-4 block font-sans">
          Chapter 1: The Land
        </span>
        
        {/* Big Bold Emotional Headline */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black font-display tracking-tight text-white uppercase leading-tight max-w-2xl mb-8">
          Born where ECR sands meet the deep blue.
        </h2>

        {/* 3-4 Lines of Strong Brand Copy (Neythal concept / feeling) */}
        <p className="text-[#FAF7F2]/85 text-base sm:text-lg md:text-xl leading-relaxed font-light font-sans max-w-3xl mb-16 text-center">
          {"Neythal represents the seashore in classical Tamil thinai—a landscape defined by resilience, grit, and infinite horizons. We play in the sand to build raw touch, and train under the ECR sun to build fearless character. Our crest holds the dolphin because we believe football should be played like native marine life: with intelligence, tight-knit teamwork, and pure, uninhibited joy."}
        </p>

        {/* Dynamic Concept Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 w-full border-t border-white/10 pt-12 text-left">
          {/* Card 1: Sand */}
          <div className="flex flex-col gap-3">
            <span className="font-condensed font-black text-2xl text-sand uppercase tracking-wider">The Sand</span>
            <p className="text-[#FAF7F2]/60 text-xs md:text-sm font-normal leading-relaxed">
              Grit, roots, and barefoot beginnings. Sand forces muscle memory, balance, and quick decision-making under load.
            </p>
          </div>

          {/* Card 2: Deep Blue */}
          <div className="flex flex-col gap-3">
            <span className="font-condensed font-black text-2xl text-sand uppercase tracking-wider">Deep Blue</span>
            <p className="text-[#FAF7F2]/60 text-xs md:text-sm font-normal leading-relaxed">
              Fluidity, scope, and infinite vision. The Bay of Bengal waters define our spatial awareness and tactical reach.
            </p>
          </div>

          {/* Card 3: The Dolphin */}
          <div className="flex flex-col gap-3">
            <span className="font-condensed font-black text-2xl text-sand uppercase tracking-wider">The Dolphin</span>
            <p className="text-[#FAF7F2]/60 text-xs md:text-sm font-normal leading-relaxed">
              Playfulness, smarts, and community. We play together as a pod, adapting instantly to the waves of the match.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BrandMeaning;
