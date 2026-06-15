"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Button from "@/components/common/Button";

const SLIDES = [
  {
    year: "2016",
    title: "The Sunset Pact",
    description: "It began as a simple friendship. In 2016, a group of friends gathered on Chennai's beaches to play recreational football during golden hour. Playing barefoot on the heavy sand, they fell in love with the uninhibited freedom, raw touch, and creative flair that beach football demanded.",
    image: "/images/about/backstory_2016.png",
  },
  {
    year: "2018",
    title: "Legalizing Beach Soccer",
    description: "What started as an informal game quickly faced local hurdles. To protect and formalize their playing area, the founders worked with local coastal authorities and community leaders, legalizing beach soccer courts on the shoreline. They set up proper goalposts and created a safe haven for youth training.",
    image: "/images/about/beach_soccer_legal.png",
  },
  {
    year: "2020+",
    title: "Going Back to Our Roots",
    description: "As the project scaled to elite turfs in Kottivakkam and Nandanam, we noticed traditional academies over-coached young players, stripping away their flair. Neidhal FC was established to go back to our roots—bringing the raw, fearless decision-making of sand soccer onto the turf.",
    image: "/images/about/going_roots.png",
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
    <section className="py-24 md:py-32 relative overflow-hidden bg-[#FAF7F2] border-b border-black/5">
      {/* Background elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-sand/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-left mb-16 max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-accent mb-3 block">
            How We Started
          </span>
          <h2 className="text-4xl md:text-6xl font-black font-display tracking-tight text-primary uppercase leading-tight">
            Our Origins
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
                <div className="text-sand-dark font-display font-black text-6xl md:text-7xl leading-none mb-4">
                  {SLIDES[activeIdx].year}
                </div>
                
                {/* Title */}
                <h3 className="font-sans font-extrabold text-2xl md:text-3xl text-primary mb-6 leading-tight">
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
