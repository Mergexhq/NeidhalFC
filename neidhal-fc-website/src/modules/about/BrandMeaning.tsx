"use client";

import React from "react";
import { ScrollTextRise } from "@/components/ruixen/scroll-text-rise";

export const BrandMeaning: React.FC = () => {
  return (
    <section
      id="chapter-two"
      className="relative bg-[#FAF7F2] text-[#0B1F3A] overflow-visible border-b border-black/5"
    >
      {/* Decorative background grid like homepage */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0B1F3A/3_1px,transparent_1px),linear-gradient(to_bottom,#0B1F3A/3_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-20" />

      {/* Pinned Scroll Container */}
      <ScrollTextRise
        header={
          <h2 className="font-raleway font-semibold text-4xl sm:text-5xl md:text-6xl lg:text-[56px] text-[#0B1F3A] uppercase tracking-tight leading-none text-center">
            Where Our Name Comes From
          </h2>
        }
        textClassName="font-raleway font-medium text-[#0B1F3A]/90 text-base sm:text-lg md:text-xl lg:text-[26px] leading-[1.7] max-w-4xl"
        text="__Neidhal__ is the ancient Tamil word for the **coastal** **landscape** where the **sea** **meets** **the** **shore.** Long before it became our club's name, it was the place where our journey began on the sand. The beach didn't just shape our memories - it shaped our philosophy: football should be played with **freedom,** **creativity,** and **courage.**"
      />
    </section>
  );
};

export default BrandMeaning;
