"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Sparkles, Heart } from "lucide-react";

interface PhilosophyCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  index: number;
}

const PhilosophyCard: React.FC<PhilosophyCardProps> = ({ icon, title, desc, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white border border-sand/20 rounded-[2rem] p-8 md:p-10 shadow-xs hover:shadow-xl hover:border-sand/40 hover:-translate-y-1 transition-all duration-300 flex flex-col gap-6"
    >
      <div className="h-10 w-10 rounded-xl bg-accent/5 border border-accent/15 flex items-center justify-center text-accent shrink-0">
        {icon}
      </div>
      <div className="text-left">
        <h4 className="font-sans font-extrabold text-lg text-primary mb-3 leading-tight uppercase tracking-wide">
          {title}
        </h4>
        <p className="text-[#6F6F6F] text-xs md:text-sm font-normal leading-relaxed">
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

export const Philosophy: React.FC = () => {
  const VALUES = [
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Street-Style Instinct",
      desc: "Our training was born on Chennai's beaches. We reject rigid coordinates and robotic instructions. We build instinctual street-style decision makers who play with natural flair.",
    },
    {
      icon: <Sparkles className="h-5 w-5" />,
      title: "Flair & Freedom",
      desc: "We prioritize technical expression over physical size. Our sessions grant U6-U16 players the creative autonomy to try new skills, make mistakes, and discover the joy of absolute freedom.",
    },
    {
      icon: <Heart className="h-5 w-5" />,
      title: "A Soccer Movement",
      desc: "We are not a commercial academy chasing quick trophies. Neythal is a community built on belonging. We measure success by how deeply our players fall in love with the game.",
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#FAF7F2] relative overflow-hidden border-b border-black/5">
      {/* Visual background rings */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-sand/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Chapter Indicator */}
        <div className="text-center mb-6">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-accent block font-sans">
            Chapter 3: The Belief
          </span>
        </div>

        {/* Big Manifesto Quote Container */}
        <div className="max-w-4xl mx-auto text-center mb-20 md:mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative p-8 md:p-16 rounded-[2.5rem] bg-white border border-sand/15 shadow-sm overflow-hidden"
          >
            {/* Quote decoration */}
            <span className="absolute -top-6 -left-2 text-[12rem] font-display text-sand/15 select-none leading-none">“</span>
            
            <h3 className="font-display italic font-normal text-2xl sm:text-3xl md:text-4xl text-primary leading-snug md:leading-normal relative z-10">
              &ldquo;Everyone can coach football, but very few can create players who make people fall in love with the game.&rdquo;
            </h3>
            
            <div className="w-12 h-[2px] bg-sand mx-auto mt-8 relative z-10" />
            
            <p className="text-[#6F6F6F] text-xs uppercase tracking-widest font-bold font-sans mt-4 relative z-10">
              The Neythal Football Philosophy
            </p>
          </motion.div>
        </div>

        {/* Grid of core pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {VALUES.map((value, idx) => (
            <PhilosophyCard
              key={idx}
              icon={value.icon}
              title={value.title}
              desc={value.desc}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
