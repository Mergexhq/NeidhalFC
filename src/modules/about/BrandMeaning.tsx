"use client";

import React from "react";
import { Compass } from "lucide-react";
import { ScrollTextRise } from "@/components/ruixen/scroll-text-rise";

export const BrandMeaning: React.FC = () => {
  return (
    <section
      id="chapter-two"
      className="py-24 md:py-32 bg-[#FAF7F2] text-[#0B1F3A] relative overflow-visible border-b border-black/5"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Subtitle */}
        <div className="text-center mb-6">
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-extrabold text-[#0077b6]">
            <Compass size={12} className="animate-spin-slow" />
            Why Neidhal?
          </span>
        </div>

        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-[#0B1F3A] tracking-tight">
            Named After Our Roots
          </h2>
        </div>

        {/* Narrative Intro Box (Centered ScrollTextRise) */}
        <div className="max-w-5xl mx-auto text-center">
          <ScrollTextRise
            textClassName="font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-relaxed font-light"
            text="In ancient Tamil literature, __Neidhal__ is the landscape where the **sea** **meets** **the** **shore.** The beach wasn't just where we played. It shaped how we believe football should be played—**free,** **fearless,** and **full** **of** **expression.**"
          />
        </div>
      </div>
    </section>
  );
};

export default BrandMeaning;
