"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowUpRight, Compass, Sparkles, Trophy } from "lucide-react";

const SETS = [
  {
    id: "origins",
    label: "Origins (2016 - 2018)",
    cards: [
      {
        type: "large",
        year: "2016",
        title: "A ball and the sea breeze.",
        description: "Two friends met on the Bay of Bengal shoreline. No training kits, no permission slips, no boundary lines. Just a ball, heavy ECR sand, and a love for the game. We played because we had to.",
        image: "/images/about/backstory_2016.jpg",
        tag: "Chapter 03 &mdash; The Start",
        icon: Compass,
      },
      {
        type: "medium",
        year: "2017",
        title: "They kept showing up.",
        description: "More players joined the beach circle. What was a morning kickabout became a tribe forming around a shared belief that football is about freedom, not systems.",
        image: "/images/about/going_roots.jpg",
        tag: "The Tribe",
      },
      {
        type: "medium",
        year: "2018",
        title: "Spotted in the waves.",
        description: "Dolphins would surface just thirty feet from our beach training. They became our mascot-quick, fluid, and belonging to the sea.",
        image: "/images/about/slider_dolphins.jpg",
        tag: "The Mascot",
      }
    ]
  },
  {
    id: "structure",
    label: "Structure (2020 - Present)",
    cards: [
      {
        type: "large",
        year: "2020",
        title: "From the sand to a structure.",
        description: "We built a training academy to give Chennai's youth a real alternative. Locations opened along the ECR coast. The beach drills became a structured methodology.",
        image: "/images/about/beach_soccer_legal.jpg",
        tag: "Chapter 03 &mdash; Evolution",
        icon: Trophy,
      },
      {
        type: "medium",
        year: "Present",
        title: "The raw beach touch.",
        description: "No matter how large we grow, we never forget the shoreline. Every drill carries the unscripted energy of the beach.",
        image: "/images/about/slider_coaching.jpg",
        tag: "The Spirit",
      },
      {
        type: "medium",
        year: "Join",
        title: "Start your chapter.",
        description: "Bring your child to experience the Neidhal wave at Kottivakkam, Injambakkam, or Nandanam. Let them play.",
        image: "/images/advanced_match.jpg",
        tag: "Free Trial",
      }
    ]
  }
];

export const OriginsSlider: React.FC = () => {
  const [activeSetIdx, setActiveSetIdx] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const handleNext = () => {
    setDirection(1);
    setActiveSetIdx((prev) => (prev + 1) % SETS.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setActiveSetIdx((prev) => (prev - 1 + SETS.length) % SETS.length);
  };

  const currentSet = SETS[activeSetIdx];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
      transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as const },
    }),
  };

  return (
    <section
      id="chapter-three"
      className="py-20 md:py-28 bg-[#FAF7F2] text-[#0B1F3A] relative overflow-hidden border-b border-black/5"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header Block with Navigation Arrows on the right (Image 1 Style) */}
        <div className="flex items-end justify-between mb-12">
          <div className="text-left">
            <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-extrabold text-[#0077b6] mb-3">
              <Sparkles size={12} />
              Chapter 03 &mdash; The Milestones
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-[#0B1F3A]">
              Experience More Than Just Football
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="h-10 w-10 rounded-full border border-black/10 bg-white text-[#0B1F3A] flex items-center justify-center hover:scale-[1.05] active:scale-95 transition-all shadow-xs cursor-pointer"
              aria-label="Previous slide set"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="h-10 w-10 rounded-full border border-black/10 bg-white text-[#0B1F3A] flex items-center justify-center hover:scale-[1.05] active:scale-95 transition-all shadow-xs cursor-pointer"
              aria-label="Next slide set"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Slide Container (Interactive Grid matching Image 1 layout) */}
        <div className="relative min-h-[500px]">
          <AnimatePresence mode="wait" initial={false} custom={direction}>
            <motion.div
              key={activeSetIdx}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
            >
              {currentSet.cards.map((card, idx) => {
                if (card.type === "large") {
                  const CardIcon = card.icon || Compass;
                  return (
                    <div
                      key={idx}
                      className="col-span-1 lg:col-span-6 bg-[#16271c] text-white rounded-[2rem] overflow-hidden flex flex-col md:flex-row shadow-lg border border-white/5 group"
                    >
                      {/* Left: Image */}
                      <div className="relative w-full md:w-1/2 min-h-[250px] md:min-h-full">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          sizes="(max-w-768px) 100vw, 30vw"
                          className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-[#16271c]/25 pointer-events-none" />
                      </div>

                      {/* Right: Copy */}
                      <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between text-left">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <span className="text-[9px] uppercase font-bold tracking-widest text-[#D9C3A5]">
                              {card.year}
                            </span>
                            <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D9C3A5]">
                              <CardIcon size={14} />
                            </div>
                          </div>
                          <h3 className="font-display font-semibold text-lg sm:text-xl leading-tight text-white mb-3">
                            {card.title}
                          </h3>
                          <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-light">
                            {card.description}
                          </p>
                        </div>

                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#D9C3A5] hover:text-white transition-colors duration-200 mt-6"
                        >
                          <span>Learn more</span>
                          <ArrowUpRight size={14} />
                        </Link>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div
                      key={idx}
                      className="col-span-1 lg:col-span-3 relative rounded-[2rem] overflow-hidden shadow-lg border border-black/5 group min-h-[320px] lg:min-h-full flex flex-col justify-end"
                    >
                      {/* Background Image */}
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-w-768px) 100vw, 20vw"
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                      {/* Deep dark gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-[1]" />

                      {/* Card Content Overlay */}
                      <div className="relative z-10 p-6 text-left">
                        <span className="inline-block px-3 py-1 rounded-full bg-[#0077b6]/85 border border-[#0077b6]/30 text-[9px] font-bold uppercase tracking-widest text-white mb-3">
                          {card.tag}
                        </span>
                        <div className="text-[10px] uppercase font-bold tracking-widest text-[#D9C3A5] mb-1">
                          {card.year}
                        </div>
                        <h3 className="font-display font-semibold text-base text-white leading-snug mb-2 uppercase">
                          {card.title}
                        </h3>
                        <p className="text-white/80 text-[11px] leading-relaxed font-light line-clamp-3">
                          {card.description}
                        </p>
                      </div>
                    </div>
                  );
                }
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Global Section Footer Arrow Link (Image 1 style) */}
        <div className="flex justify-center mt-12">
          <Link
            href="/locations"
            className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-widest text-[#0B1F3A] hover:text-[#0077b6] transition-colors duration-200"
          >
            <div className="h-8 w-8 rounded-full border border-black/10 flex items-center justify-center bg-white shadow-xs">
              <ArrowUpRight size={14} className="rotate-[45deg]" />
            </div>
            <span>Learn more about our hubs</span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default OriginsSlider;
