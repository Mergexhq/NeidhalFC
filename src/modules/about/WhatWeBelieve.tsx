"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const PRINCIPLES = [
  { id: "01", label: "Creative Decisions" },
  { id: "02", label: "Street-Style Flair" },
  { id: "03", label: "Confidence in 1v1" },
  { id: "04", label: "Freedom to Improvise" },
  { id: "05", label: "Love for the Game" },
];

export const WhatWeBelieve: React.FC = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="py-24 md:py-32 bg-[#FAF7F2] text-primary border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Eyebrow and Section title */}
        <div className="text-left mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-extrabold text-[#BCA688] mb-4">
            <Heart size={12} className="text-[#BCA688]" />
            What We Believe
          </span>
          <h2 className="font-raleway font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[46px] uppercase tracking-tight leading-none text-primary">
            Football Should Feel Free.
          </h2>
        </div>

        {/* Two-column Layout: Principles on left, Philosophy Quote on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Principles Stack (Left column - 7 cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="lg:col-span-7 flex flex-col gap-4"
          >
            {PRINCIPLES.map((principle) => (
              <motion.div
                key={principle.id}
                variants={itemVariants}
                className="flex items-center justify-between bg-white border border-primary/5 hover:border-primary/15 p-5 sm:p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 group"
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  <span className="font-sans font-extrabold text-sm sm:text-base text-[#BCA688]/70 tracking-widest">
                    {principle.id}
                  </span>
                  <span className="font-raleway font-semibold text-base sm:text-lg md:text-xl text-primary tracking-tight">
                    {principle.label}
                  </span>
                </div>
                {/* Visual marker element */}
                <div className="h-2 w-2 rounded-full bg-[#BCA688] scale-75 group-hover:scale-100 transition-transform duration-300" />
              </motion.div>
            ))}
          </motion.div>

          {/* Philosophy Sidebar (Right column - 5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 w-full"
          >
            <div className="bg-white border border-primary/10 rounded-[2rem] p-8 sm:p-10 shadow-xl flex flex-col justify-center relative overflow-hidden group">
              {/* Decorative brand tint line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#BCA688]/60" />
              
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#BCA688] mb-4 block">
                OUR CORE PHILOSOPHY
              </span>
              <blockquote className="font-raleway font-semibold text-xl sm:text-2xl md:text-[23px] text-primary leading-relaxed relative z-10">
                We don&apos;t train players to follow every instruction. We help them understand the game, trust their instincts, and enjoy playing it.
              </blockquote>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default WhatWeBelieve;
