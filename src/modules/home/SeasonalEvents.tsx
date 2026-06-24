"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

const SEASONAL_PROGRAMS = [
  {
    id: "summer-camp",
    tabName: "01 / Summer Camp",
    overlayTitle: ["Summer", "Camp."],
    dates: "May 10 - June 5, 2026",
    timings: "6:00 AM - 8:00 AM Daily",
    location: "Kottivakkam Beach Turf",
    price: "₹3,500 / Full Camp",
    description: "Our signature annual camp covering street football styles, beach sand physical conditioning, and 1v1 skill mastery. Open for U6 to U16.",
    image: "/images/beach_soccer.jpg"
  },
  {
    id: "annual-reg",
    tabName: "02 / Annual Enrollment",
    overlayTitle: ["Annual", "Member."],
    dates: "June 15 onwards",
    timings: "Scheduled Weekday/Weekend Slots",
    location: "Kottivakkam, Injambakkam & Nandanam",
    price: "₹2,500 / Monthly Fee",
    description: "Join our main academy training structure. Includes official Neidhal kit bag, customized coaching diagnostics, and participation in coastal leagues.",
    image: "/images/coaching_ratio.jpg"
  },
];

export const SeasonalEvents: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play interval (slower: every 8 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SEASONAL_PROGRAMS.length);
    }, 8000);

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
            Chapter 4: {"What's Happening"}
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold font-display tracking-wide text-primary text-center mb-6 select-none">
            Active Programs & Camps
          </h2>
          <p className="text-[#6F6F6F] text-xs md:text-sm font-normal max-w-xl mx-auto leading-relaxed">
            Keep track of our seasonal intakes and clinics. Book a trial session to secure a spot in any active program.
          </p>
        </div>

        {/* Interactive Tabs */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 md:gap-x-12 mb-12 border-b border-primary/10 pb-6">
          {SEASONAL_PROGRAMS.map((item, index) => (
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
        <div className="relative w-full aspect-[4/3.2] md:aspect-[2.2/1] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden flex flex-col justify-end p-6 sm:p-10 md:p-14 lg:p-16 text-white group shadow-2xl bg-neutral-950 min-h-[440px] md:min-h-[480px]">
          
          {/* Card Background image with smooth AnimatePresence transition */}
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.img
                key={activeIndex}
                src={SEASONAL_PROGRAMS[activeIndex].image}
                alt={SEASONAL_PROGRAMS[activeIndex].overlayTitle.join(" ")}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>
            {/* Dark black gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
          </div>

          {/* Large Overlaid Text inside Card */}
          <div className="relative z-10 flex-1 flex items-center justify-center md:justify-end text-center md:text-right mb-6 md:mb-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col select-none"
              >
                <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display leading-[0.85] uppercase text-white font-semibold">
                  {SEASONAL_PROGRAMS[activeIndex].overlayTitle[0]}
                </span>
                <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display leading-[0.85] uppercase text-white font-semibold">
                  {SEASONAL_PROGRAMS[activeIndex].overlayTitle[1]}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Row: Description & Info */}
          <div className="relative z-10 w-full flex flex-col lg:flex-row lg:items-end justify-between gap-8 mt-auto pt-8 md:pt-10 border-t border-white/15">
            <div className="max-w-4xl text-left">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-4"
                >
                  <p className="text-white/85 text-xs sm:text-sm md:text-base font-normal leading-relaxed font-sans">
                    {SEASONAL_PROGRAMS[activeIndex].description}
                  </p>
                  
                  {/* Logistics Grid inside card */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-300 pt-2">
                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                      <Calendar size={13} className="text-sand" />
                      {SEASONAL_PROGRAMS[activeIndex].dates}
                    </span>
                    <span className="text-slate-500 hidden sm:inline">•</span>
                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                      <Clock size={13} className="text-sand" />
                      {SEASONAL_PROGRAMS[activeIndex].timings}
                    </span>
                    <span className="text-slate-500 hidden sm:inline">•</span>
                    <span className="flex items-center gap-1.5 whitespace-nowrap">
                      <MapPin size={13} className="text-sand" />
                      {SEASONAL_PROGRAMS[activeIndex].location}
                    </span>
                  </div>

                  {/* Fee on a separate line, styled larger */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-slate-400">Fee:</span>
                    <span className="text-sand font-bold text-sm sm:text-base md:text-lg">{SEASONAL_PROGRAMS[activeIndex].price}</span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Register button */}
            <div className="shrink-0 text-left">
              <Link
                href={`/book-trial?program=${SEASONAL_PROGRAMS[activeIndex].id}`}
                className="inline-flex items-center gap-2 bg-white hover:bg-sand text-primary hover:text-primary font-sans font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.02] cursor-pointer group"
              >
                <span>Register Now</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default SeasonalEvents;
