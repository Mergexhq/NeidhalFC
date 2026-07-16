"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, UserCheck, ShieldCheck, MapPin, Gift, Trophy } from "lucide-react";

const ESSENTIALS = [
  {
    icon: Users,
    title: "2 Coaches Every Session",
    desc: "Every training session has dual leadership to track player mechanics and provide simultaneous technical feedback.",
  },
  {
    icon: ShieldCheck,
    title: "Small Training Groups",
    desc: "Strict player-to-coach ratios to maximize ball contact time, tactical focus, and specialized attention.",
  },
  {
    icon: Trophy,
    title: "Beach & Turf Development",
    desc: "We combine ECR beach sand physical conditioning with precision turf football for optimal athletic adaptability.",
  },
  {
    icon: MapPin,
    title: "Three Chennai Locations",
    desc: "Operating hubs in Kottivakkam, Injambakkam, and Nandanam covering the central city and coastal stretch.",
  },
  {
    icon: Gift,
    title: "Free Trial Sessions",
    desc: "Book a complimentary session with no initial deposit or commitment to experience our method firsthand.",
  },
  {
    icon: UserCheck,
    title: "Player-First Coaching",
    desc: "We focus on encouraging creativity, instinct, and building confidence rather than enforcing strict systems.",
  },
];

export const HowWeCoach: React.FC = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="py-24 md:py-32 bg-[#FAF7F2] text-primary border-b border-black/5">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Eyebrow & Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-extrabold text-[#BCA688] mb-4">
            How We Coach
          </span>
          <h2 className="font-raleway font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[46px] uppercase tracking-tight leading-none text-primary">
            Simple. Structured. Consistent.
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm md:text-base font-light mt-4 max-w-xl mx-auto">
            We focus strictly on what matters. Here are the core pillars that define the Neidhal training experience.
          </p>
        </div>

        {/* 6-Card Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {ESSENTIALS.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                className="bg-white border border-primary/5 hover:border-primary/15 p-6 sm:p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01] flex flex-col items-start gap-4 text-left"
              >
                {/* Icon bubble */}
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-primary/5 text-primary flex items-center justify-center">
                  <IconComponent size={20} className="sm:size-[22px]" />
                </div>
                <div>
                  <h3 className="font-raleway font-bold text-base sm:text-lg text-primary uppercase tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-medium">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default HowWeCoach;
