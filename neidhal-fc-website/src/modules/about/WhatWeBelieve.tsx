"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const CARDS = [
  {
    bigWord: "Creativity",
    subtitle: "Creative Decisions",
    copy: "Read the game, solve problems, and make confident decisions.",
    image: "/images/about/philosophy_ocean.webp",
    bgColor: "#E5EFF2", // Muted Ocean Blue
    accentColor: "#0B3C5D", // Dark Ocean Blue
  },
  {
    bigWord: "Flair",
    subtitle: "Street-Style Expression",
    copy: "Develop your own style, not someone else's.",
    image: "/images/about/philosophy_sand.webp",
    bgColor: "#F4EEE3", // Warm Sand Beige
    accentColor: "#8C7355", // Sand Brown
  },
  {
    bigWord: "Confidence",
    subtitle: "1v1 Courage",
    copy: "Trust your instincts and embrace challenges.",
    image: "/images/about/philosophy_palm.webp",
    bgColor: "#E6EFE8", // Palm Green
    accentColor: "#2D5A27", // Deep Palm Green
  },
  {
    bigWord: "Freedom",
    subtitle: "Freedom to Improvise",
    copy: "Understand the game so you can adapt naturally.",
    image: "/images/about/philosophy_turf.webp",
    bgColor: "#E1EDE3", // Turf Green
    accentColor: "#1B4A23", // Deep Turf Green
  },
  {
    bigWord: "Joy",
    subtitle: "Love for the Game",
    copy: "Because football should always be fun to play.",
    image: "/images/about/philosophy_sunset.webp",
    bgColor: "#FAF1E1", // Sunset Gold
    accentColor: "#C98B2C", // Sunset Gold/Orange
  },
];

export const WhatWeBelieve: React.FC = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section 
      className="py-24 md:py-32 bg-[#FAF7F2] text-primary border-b border-black/5 relative overflow-hidden"
    >
      {/* Subtle background grid texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0B1F3A/3_1px,transparent_1px),linear-gradient(to_bottom,#0B1F3A/3_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-20" />

      {/* Centered Section Intro (Constrained width) */}
      <div className="max-w-7xl mx-auto px-6 relative z-10 mb-16 md:mb-24">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="font-raleway font-semibold text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight leading-none text-primary flex flex-wrap items-center justify-center gap-x-2 sm:gap-x-3 gap-y-1 mb-6">
            <span>THE</span>
            <span className="inline-flex items-center">
              F
              <img
                src="/images/decorations/football-handle.svg"
                alt="O"
                className="w-[0.85em] h-[0.85em] mx-[0.02em] inline-block -translate-y-[0.05em]"
              />
              <img
                src="/images/decorations/football-handle.svg"
                alt="O"
                className="w-[0.85em] h-[0.85em] mx-[0.02em] inline-block -translate-y-[0.05em]"
              />
              TBALL
            </span>
            <span>WE BELIEVE IN</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            The Best Players Don't Just Follow the Game. They Shape It.
          </p>
        </div>
      </div>

      {/* Full-width Card Grid Layer */}
      <div className="w-full relative z-10">
        {/* Vertical Editorial Cards Grid (Flush side-by-side on desktop, embedded in the page bg) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-5 border-b border-primary/10 w-full"
        >
          {CARDS.map((card, idx) => (
            <motion.div
              key={card.bigWord}
              variants={cardVariants}
              className={`relative flex flex-col justify-between pt-3 pb-8 px-6 md:pt-4 md:pb-10 md:px-8 min-h-[660px] md:min-h-[660px] transition-colors duration-500 group border-b md:border-b-0 overflow-hidden ${
                idx < CARDS.length - 1 ? "md:border-r border-primary/10" : ""
              }`}
            >
              {/* Full Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <Image
                  src={card.image}
                  alt={`${card.bigWord} background`}
                  fill
                  sizes="(max-width: 768px) 100vw, 20vw"
                  className="object-cover object-center"
                  priority
                />
              </div>

              {/* Gradient Overlay for blending image with page bg (#FAF7F2) - transparent at bottom */}
              <div 
                className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
                style={{
                  background: `linear-gradient(to bottom, #FAF7F2 0%, #FAF7F2 15%, rgba(250, 247, 242, 0.6) 30%, rgba(250, 247, 242, 0) 60%)`
                }}
              />

              {/* Noise Grain Overlay - opacity increases on hover */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-10 group-hover:opacity-20 transition-opacity duration-300 z-10 mix-blend-overlay"
                style={{
                  backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")"
                }}
              />

              {/* Top part: Big Condensed Nike-style Heading and Description Copy */}
              <div className="relative z-20 w-full flex flex-col items-center text-center -mt-3 md:-mt-4">
                <h3 
                  className={`font-raleway font-bold uppercase tracking-tighter leading-none select-none transition-transform duration-300 group-hover:-translate-y-1 mb-4 ${
                    card.bigWord === "Confidence"
                      ? "text-3xl sm:text-4xl md:text-[2.7vw]"
                      : "text-4xl sm:text-5xl md:text-[3.2vw]"
                  }`}
                  style={{ color: card.accentColor }}
                >
                  {card.bigWord}
                </h3>
                <p className="text-slate-800 text-xs sm:text-sm font-semibold leading-relaxed font-clean max-w-[280px]">
                  {card.copy}
                </p>
              </div>

              {/* Spacer to push elements */}
              <div className="flex-1" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhatWeBelieve;
