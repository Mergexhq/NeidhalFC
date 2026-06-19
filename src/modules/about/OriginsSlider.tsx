"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Button from "@/components/common/Button";

const SLIDES = [
  {
    year: "2016",
    title: "The beach had no rules.",
    description: "In 2016, two people found each other on the shores of the Bay of Bengal. No pitch. No permission slips. Just the open stretch of ECR sand and a football. They played because they loved it. That was enough to begin.",
    image: "/images/about/backstory_2016.png",
  },
  {
    year: "2017",
    title: "They kept showing up.",
    description: "Days turned into weeks. More people joined. The game grew louder than the waves. What started as two friends kicking a ball became something harder to explain — a tribe forming around a shared belief that football should feel like freedom.",
    image: "/images/about/going_roots.png",
  },
  {
    year: "2018",
    title: "Then came the dolphins.",
    description: "Just thirty feet from where they played, dolphins moved through the Bay of Bengal. Most people in Chennai do not know this. They did — because they were there every morning, watching the sea the way you only can when you belong to it. The dolphin became their symbol. Not chosen. Earned.",
    image: "/images/about/slider_dolphins.png",
  },
  {
    year: "2020",
    title: "They built something permanent.",
    description: "What began on the beach became a structure. A coaching program. A philosophy. Locations across the coastline. A name rooted in the land they came from. Neidhal FC was not founded in a boardroom. It was founded in the sand.",
    image: "/images/about/beach_soccer_legal.png",
  },
  {
    year: "Present",
    title: "And they never forgot where they started.",
    description: "Every session, every drill, every player we train carries the spirit of that original game on the shore. Unscripted. Uninhibited. Alive. That is what Neidhal FC is still trying to give every child who steps onto the pitch.",
    image: "/images/about/slider_coaching.png",
  },
];

export const OriginsSlider: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % SLIDES.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };

  return (
    <section id="chapter-two" className="py-24 md:py-32 relative overflow-hidden bg-[#FAF7F2] border-b border-black/5">
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-sand/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-16 max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-accent mb-4 block font-sans"
          >
            Chapter 02 — The Story
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-semibold font-display tracking-wide text-primary leading-tight">
            How It All Started
          </h2>
        </div>

        {/* Two-Column Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Column A: Typographic & Description (lg:col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col"
              >
                {/* Year Badge */}
                <div className="text-sand-dark font-display font-bold text-5xl md:text-6xl leading-none mb-4">
                  {SLIDES[activeIdx].year}
                </div>
                
                {/* Title */}
                <h3 className="font-sans font-extrabold text-2xl md:text-3xl text-primary mb-6 leading-tight uppercase tracking-wide">
                  {SLIDES[activeIdx].title}
                </h3>
                
                {/* Description */}
                <p className="text-[#6F6F6F] text-sm md:text-base leading-relaxed font-normal mb-8">
                  {SLIDES[activeIdx].description}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Interactive Control Row */}
            <div className="flex items-center gap-6 mt-4">
              <div className="flex gap-3">
                <button
                  onClick={handlePrev}
                  className="h-12 w-12 rounded-full border border-sand/30 bg-white text-primary flex items-center justify-center hover:scale-[1.05] active:scale-95 hover:bg-sand-light transition-all shadow-xs cursor-pointer"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={handleNext}
                  className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center hover:scale-[1.05] active:scale-95 hover:bg-primary-light transition-all shadow-md cursor-pointer"
                  aria-label="Next slide"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Progress Indicators */}
              <div className="flex gap-2">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      activeIdx === idx ? "w-8 bg-accent" : "w-2.5 bg-sand-dark/40 hover:bg-sand-dark"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Trial CTA link */}
            <div className="mt-10">
              <Button href="/book-trial" variant="outline" className="flex items-center gap-2">
                Book a Free Trial Session
                <ArrowRight size={16} />
              </Button>
            </div>
          </div>

          {/* Column B: Dynamic Ghibli Canvas (lg:col-span-7) */}
          <div className="lg:col-span-7 relative aspect-[4/3] sm:aspect-[16/10] rounded-[2.5rem] overflow-hidden shadow-2xl bg-[#000000]/10 border border-sand/15">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIdx}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={SLIDES[activeIdx].image}
                  alt={SLIDES[activeIdx].title}
                  fill
                  sizes="(max-w-768px) 100vw, 60vw"
                  className="object-cover"
                  priority
                />
                {/* Soft gradient blend */}
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent pointer-events-none" />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default OriginsSlider;
