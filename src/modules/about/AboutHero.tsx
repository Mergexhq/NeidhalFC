"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export const AboutHero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen w-full overflow-hidden flex flex-col items-center justify-end text-center px-6 pb-24 md:pb-32 bg-[#D4ECE1]">
      
      {/* Ghibli Watercolor Background Image */}
      <Image
        src="/images/about/about_ghibli_hero.png"
        alt="Ghibli Style Coastal Seashore"
        fill
        className="object-cover object-bottom pointer-events-none select-none"
        priority
      />

      {/* Subtle overlay tint to match Ghibli reference tones */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#D4ECE1]/10 via-[#FAF7F2]/20 to-[#FAF7F2] pointer-events-none" />

      {/* Hero Content Layer (aligned to bottom) */}
      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center mt-auto">
        {/* Subtitle stack (now bigger and at the bottom) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.2 }}
          className="space-y-3 sm:space-y-4 select-none"
        >
          <p className="font-sans font-semibold text-lg sm:text-2xl md:text-3xl uppercase tracking-[0.3em] text-[#054a54] leading-tight">
            From The Shores Of Chennai
          </p>
          <p className="font-sans font-medium text-xs sm:text-base md:text-lg uppercase tracking-[0.25em] text-[#054a54]/85">
            To The Next Generation Of Footballers
          </p>
        </motion.div>
      </div>

      {/* Wave bottom transition line to blend with subsequent chapters */}
      <div className="absolute bottom-0 left-0 right-0 h-16 w-full bg-gradient-to-t from-[#FAF7F2] to-transparent pointer-events-none" />
    </section>
  );
};

export default AboutHero;
