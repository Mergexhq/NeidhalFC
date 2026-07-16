"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, animate } from "framer-motion";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const SEASONAL_PROGRAMS = [
  {
    id: "summer-camp",
    tabName: "01 / Summer Camp",
    overlayTitle: ["Summer", "Camp."],
    dates: "May 10 - June 5, 2026",
    timings: "6:00 AM - 8:00 AM Daily",
    location: "Kottivakkam Beach Turf",
    priceAmount: 3500,
    priceSuffix: " / Full Camp",
    description: "Our signature annual camp covering street football styles, beach sand physical conditioning, and 1v1 skill mastery. Open for U6 to U16.",
    image: "/images/gallery/gallery-09.webp"
  },
  {
    id: "annual-reg",
    tabName: "02 / Annual Enrollment",
    overlayTitle: ["Annual", "Member."],
    dates: "June 15 onwards",
    timings: "Scheduled Weekday/Weekend Slots",
    location: "Kottivakkam, Injambakkam & Nandanam",
    priceAmount: 2500,
    priceSuffix: " / Monthly Fee",
    description: "Join our main academy training structure. Includes official Neidhal kit bag, customized coaching diagnostics, and participation in coastal leagues.",
    image: "/images/gallery/gallery-04.webp"
  },
];

const NumberTicker: React.FC<{ value: number }> = ({ value }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 80,
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!hasAnimated) {
      motionValue.set(0);
      const controls = animate(motionValue, value, {
        duration: 1.5,
        ease: "easeOut",
        onComplete: () => setHasAnimated(true),
      });
      return () => controls.stop();
    }
  }, [value, motionValue, hasAnimated]);

  useEffect(() => {
    if (hasAnimated) {
      if (ref.current) {
        ref.current.textContent = Intl.NumberFormat("en-IN", {
          maximumFractionDigits: 0,
        }).format(value);
      }
    } else {
      return springValue.on("change", (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat("en-IN", {
            maximumFractionDigits: 0,
          }).format(latest);
        }
      });
    }
  }, [value, springValue, hasAnimated]);

  return <span ref={ref} />;
};

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
    <section className="py-14 relative overflow-hidden bg-transparent">
      {/* Subtle grid pattern to match original aesthetic */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,31,58,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,31,58,0.01)_1px,transparent_1px)] bg-size-[4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h2 className="font-raleway font-semibold text-[#0B1F3A] uppercase tracking-tight leading-none text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-center">
            Active Programs & Camps
          </h2>
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

        {/* Large Rounded Showcase Card - Nested Card Style */}
        <div className="relative w-full max-w-4xl mx-auto rounded-[2rem] bg-white border border-primary/10 p-2 sm:p-3 md:p-4 shadow-xl group">
          
          {/* Top Section: Nested Image Container */}
          <div className="relative w-full aspect-[16/10] md:aspect-[21/9] rounded-[1.5rem] overflow-hidden bg-neutral-950">
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
          </div>

          {/* Bottom Section: Details below the image */}
          <div className="pt-4 sm:pt-5 flex flex-col gap-4 text-left px-2 pb-2">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-primary/5 pb-4">
              <div>
                {/* Title */}
                <h3 className="font-raleway font-semibold text-2xl sm:text-3xl text-primary uppercase tracking-tight">
                  {SEASONAL_PROGRAMS[activeIndex].overlayTitle.join(" ")}
                </h3>
                
                {/* Dates & Logistics */}
                <div className="flex flex-col gap-2.5 text-xs font-semibold text-[#8B6330] mt-3">
                  <span className="flex items-center gap-2">
                    <Calendar size={14} className="text-[#8B6330]" />
                    {SEASONAL_PROGRAMS[activeIndex].dates}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock size={14} className="text-[#8B6330]" />
                    {SEASONAL_PROGRAMS[activeIndex].timings}
                  </span>
                  <span className="flex items-center gap-2">
                    <MapPin size={14} className="text-[#8B6330]" />
                    {SEASONAL_PROGRAMS[activeIndex].location}
                  </span>
                </div>
              </div>

              {/* Fee Block (Right aligned next to logistics) */}
              <div className="flex flex-col items-start md:items-end shrink-0">
                <span className="text-[10px] uppercase font-semibold tracking-widest text-[#8B6330]/60 mb-1">
                  Program Fee
                </span>
                <div className="font-sans font-semibold text-3xl sm:text-4xl lg:text-[40px] text-primary leading-none">
                  ₹<NumberTicker value={SEASONAL_PROGRAMS[activeIndex].priceAmount} />
                </div>
                <span className="text-[11px] text-slate-500 font-medium mt-1.5">
                  {SEASONAL_PROGRAMS[activeIndex].priceSuffix.replace(/^\s*\/\s*/, "")}
                </span>
              </div>
            </div>

            {/* Footer Row inside Card: CTA */}
            <div className="flex justify-end gap-4 mt-2 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-[#1a355c] text-white font-sans font-bold text-xs uppercase tracking-wider px-8 py-3 sm:py-3.5 rounded-full shadow-md transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer group"
              >
                <span>Enquire Now</span>
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
