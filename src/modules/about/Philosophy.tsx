"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trophy } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const PHILOSOPHIES = [
  {
    id: "flair",
    title: "Creative Flair",
    quote: "Modern football trains the joy out of kids. Tactical systems, strict shapes, repetitive drills. We focus on the player who dribbles because it delights them, who tries the impossible trick, who makes the sidelines hold their breath.",
    author: "Senior Coach, Coastal Facility",
    role: "AFC 'B' Licensed Pedigree",
    image: "/soccer_thumb.png",
  },
  {
    id: "decisions",
    title: "Individual Decisions",
    quote: "We believe in confidence in 1v1 situations. We don't scream directions from the touchline. We teach kids to see the field, read the defender, and make their own decisions in the moment.",
    author: "Vijay Balan",
    role: "Co-Founder & Chief Instructor",
    image: "/neidhal testimonial.png",
  },
  {
    id: "agility",
    title: "Beach Agility",
    quote: "Standard turf is easy. Sand is challenging. Running in sand builds ankle strength, explosive power, and barefoot touch. It creates a player who is light on their feet and adapts to any pitch.",
    author: "Pradeep Ramesh",
    role: "Co-Founder & Lead Coach",
    image: "/beach_soccer.png",
  },
  {
    id: "robotfree",
    title: "Robot-Free Play",
    quote: "We do not build tactical robots. We build creative thinkers. A child who trains with us will learn to express themselves, make mistakes without fear, and fall in love with the game.",
    author: "Parent of U-12 Academy Player",
    role: "Kottivakkam Hub Member",
    image: "/coaching_ratio.png",
  }
];

export const Philosophy: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const pinnedGridRef = useRef<HTMLDivElement>(null);
  const activeIdxRef = useRef(0);

  useGSAP(() => {
    const pinContainer = pinContainerRef.current;
    const pinnedGrid = pinnedGridRef.current;
    if (!pinContainer || !pinnedGrid) return;

    // Pin only the grid in the center while the long scroll track scrolls past
    ScrollTrigger.create({
      trigger: pinContainer,
      start: "top top",
      end: "bottom bottom",
      pin: pinnedGrid,
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const index = Math.min(3, Math.floor(progress * 4));
        if (index !== activeIdxRef.current) {
          activeIdxRef.current = index;
          setActiveIdx(index);
        }
      }
    });
  }, { scope: pinContainerRef });

  const current = PHILOSOPHIES[activeIdx];

  const handleTabClick = (idx: number) => {
    const pinContainer = pinContainerRef.current;
    if (!pinContainer) return;
    const rect = pinContainer.getBoundingClientRect();
    const containerTop = window.scrollY + rect.top;
    const scrollRange = pinContainer.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (idx / (PHILOSOPHIES.length - 1)) * scrollRange;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <>
      {/* ── Section 1: Heading — scrolls away normally ── */}
      <div className="bg-[#FAF7F2] w-full pt-20 pb-16 text-center">
        <div className="max-w-5xl mx-auto px-6">
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-extrabold text-[#0077b6] mb-4">
            <Sparkles size={12} />
            Chapter 04 &mdash; The Belief
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-light leading-[1.15] text-[#0B1F3A] tracking-tight">
            Everyone can coach football.
            <br />
            <span className="font-extrabold text-[#0077b6] md:whitespace-nowrap">
              Very few can make a child fall in love with it.
            </span>
          </h2>
        </div>
      </div>

      {/* ── Section 2: Scroll-pinned interactive grid ── */}
      {/* This tall container provides the scroll distance for the pin */}
      <div ref={pinContainerRef} className="relative h-[400vh] bg-[#FAF7F2] w-full">
        {/* The pinned element — only the grid, vertically centered */}
        <div
          ref={pinnedGridRef}
          className="h-screen w-full flex items-center justify-center"
        >
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

              {/* Left Column: Vertical tab titles */}
              <div className="lg:col-span-5 flex flex-col gap-5 md:gap-7 text-left">
                {PHILOSOPHIES.map((p, idx) => {
                  const isActive = activeIdx === idx;
                  return (
                    <button
                      key={p.id}
                      onClick={() => handleTabClick(idx)}
                      className="group flex items-center gap-4 text-left border-none bg-transparent cursor-pointer outline-none focus:outline-none"
                    >
                      {/* Active indicator line */}
                      <span
                        className={`h-[2px] bg-[#0b1f3a] shrink-0 transition-all duration-300 ${
                          isActive ? "w-6 opacity-100" : "w-0 opacity-0"
                        }`}
                      />
                      <span
                        className={`font-display text-2xl sm:text-3xl md:text-4xl tracking-tight transition-all duration-300 ${
                          isActive
                            ? "text-[#0B1F3A] font-extrabold"
                            : "text-[#5A6E85]/40 font-semibold group-hover:text-[#5A6E85]/70"
                        }`}
                      >
                        {p.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Image card */}
              <div className="lg:col-span-7 relative h-[400px] sm:h-[460px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-xl border border-black/5">

                {/* Animated background image */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={current.image}
                      alt={current.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 55vw"
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-0 bg-[#0B1F3A]/20 pointer-events-none" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent pointer-events-none" />
                  </motion.div>
                </AnimatePresence>

                {/* Card overlay content */}
                <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between h-full text-left text-white">

                  {/* Top badges */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="inline-block px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[9px] font-bold uppercase tracking-widest text-[#D9C3A5]">
                      The Philosophy
                    </span>
                    <div className="flex items-center gap-3 bg-black/45 backdrop-blur-md border border-white/15 px-4 py-2 rounded-2xl shadow-md">
                      <Trophy size={14} className="text-[#D9C3A5]" />
                      <div className="flex flex-col text-left">
                        <span className="font-condensed font-black text-sm leading-none text-[#D9C3A5]">
                          150+ PLAYERS
                        </span>
                        <div className="flex text-amber-400 gap-0.5 mt-1">
                          {"★★★★★".split("").map((star, i) => (
                            <span key={i} className="text-[8px] leading-none">{star}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom: quote + author */}
                  <div className="flex flex-col gap-4 mt-auto">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={current.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <p className="font-display italic text-sm sm:text-base md:text-lg text-white leading-relaxed font-light">
                          &ldquo;{current.quote}&rdquo;
                        </p>
                        <div className="flex items-center gap-3 pt-2">
                          <div className="h-0.5 w-6 bg-[#0077b6] shrink-0" />
                          <div>
                            <span className="font-sans font-bold text-xs sm:text-sm text-white block leading-none">
                              {current.author}
                            </span>
                            <span className="text-[10px] text-white/60 block font-medium mt-1.5 leading-none">
                              {current.role}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* ── Section 3: Closing manifesto box ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 text-center bg-[#FAF7F2]">
        <div className="max-w-3xl mx-auto bg-white border border-black/5 rounded-[2rem] p-8 shadow-sm">
          <p className="text-[#6F6F6F] text-xs sm:text-sm font-normal leading-relaxed">
            We cannot promise trophies. No honest coach can. What we can promise is this &mdash; a child who trains with us will learn to think on the pitch, express themselves in the game, and love football for the rest of their life. That is a bigger gift than any medal.
          </p>
        </div>
      </div>
    </>
  );
};

export default Philosophy;
