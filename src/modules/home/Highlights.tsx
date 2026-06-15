"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HIGHLIGHTS = [
  {
    tabName: "01 / Beach Roots",
    overlayTitle: ["Beach", "Born."],
    title: "Founded in 2016",
    description: "Formed originally as a beach football project, developing Chennai's players with a street-style touch for a decade.",
    image: "/beach_soccer.png"
  },
  {
    tabName: "02 / Venues",
    overlayTitle: ["Three", "Venues."],
    title: "3 Locations in Chennai",
    description: "Daily coaching programs in Kottivakkam, Injambakkam, and Nandanam with state-of-the-art turf access.",
    image: "/advanced_match.png"
  },
  {
    tabName: "03 / Methodology",
    overlayTitle: ["Structured.", "Coaching."],
    title: "Structured Coaching",
    description: "Sessions are planned using a specific technical curriculum rather than raw scrimmage, building decision-making skills.",
    image: "/foundation_drill.png"
  },
  {
    tabName: "04 / Attention",
    overlayTitle: ["Double", "Ratio."],
    title: "Double Coach Ratio",
    description: "We guarantee a minimum of 1 Main Coach and 1 Assistant Coach working on the field for every session to track progress.",
    image: "/coaching_ratio.png"
  },
];

export const Highlights: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play interval
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HIGHLIGHTS.length);
    }, 6000); // changes every 6s

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-24 relative overflow-hidden bg-[#FAF7F2] border-b border-black/5">
      {/* Subtle grid pattern to match original aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,31,58,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,31,58,0.01)_1px,transparent_1px)] bg-size-[4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-accent mb-4 block font-sans">
            Achieve Your Football Goals
          </span>
          <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-condensed leading-[0.85] tracking-tight uppercase text-primary text-center mb-10 select-none">
            Why Neidhal<br />Stands Out
          </h2>
        </div>

        {/* Interactive Tabs */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 md:gap-x-12 mb-12 border-b border-primary/10 pb-6">
          {HIGHLIGHTS.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`relative pb-6 text-xs md:text-sm font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeIndex === index ? "text-primary" : "text-[#A0A0A0] hover:text-primary"
              }`}
            >
              {item.tabName}
              {activeIndex === index && (
                <motion.div
                  layoutId="activeTabUnderline"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Large Rounded Showcase Card */}
        <div className="relative w-full aspect-[4/3] md:aspect-[16/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden flex flex-col justify-end p-8 md:p-16 text-white group shadow-2xl bg-primary min-h-[400px]">
          
          {/* Card Background image with smooth AnimatePresence transition */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={HIGHLIGHTS[activeIndex].image}
                alt={HIGHLIGHTS[activeIndex].title}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/95 via-primary/40 to-primary/20" />
          </div>

          {/* Large Overlaid Text inside Card */}
          <div className="relative z-10 flex-1 flex items-center justify-center md:justify-end text-center md:text-right">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col select-none"
              >
                <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-condensed leading-[0.85] uppercase text-white font-black">
                  {HIGHLIGHTS[activeIndex].overlayTitle[0]}
                </span>
                <span className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-condensed leading-[0.85] uppercase text-white font-black">
                  {HIGHLIGHTS[activeIndex].overlayTitle[1]}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Row: Description */}
          <div className="relative z-10 w-full flex flex-col md:flex-row md:items-end justify-between gap-6 mt-auto pt-6 border-t border-white/15">
            <div className="max-w-xl text-left">
              <AnimatePresence mode="wait">
                <motion.p
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="text-white/80 text-sm md:text-base font-normal leading-relaxed font-sans"
                >
                  {HIGHLIGHTS[activeIndex].description}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default Highlights;
