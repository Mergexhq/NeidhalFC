"use client";

import React from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";

export const LocationsHero: React.FC = () => {
  return (
    <div className="w-full relative z-20">

      {/* ── SECTION 1: Light Cream Hero Text Block ── */}
      <section className="relative pt-36 pb-24 overflow-hidden bg-[#FAF7F2] text-[#0B1F3A] flex flex-col justify-center text-center">
        <Navbar />

        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary-light)/5,_transparent_70%)] pointer-events-none z-0" />

        {/* Wide layout wrapper */}
        <div className="relative z-10 w-full max-w-4xl px-6 mx-auto flex flex-col items-center gap-6">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay: 0.1 }}
            className="font-display font-medium text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-7xl text-[#0B1F3A] uppercase tracking-tight leading-none whitespace-nowrap"
          >
            Find Your Training Hub.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#0B1F3A]/70 font-sans text-base sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed max-w-4xl mt-3"
          >
            Three coastal training hubs across South Chennai ECR - where football meets the sea. Designed for elite player development.
          </motion.p>

        </div>
      </section>

    </div>
  );
};

export default LocationsHero;
