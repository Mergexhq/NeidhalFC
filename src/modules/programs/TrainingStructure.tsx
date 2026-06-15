"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Zap, Sword, Play } from "lucide-react";

const PILLARS = [
  {
    icon: <Award className="h-6 w-6 text-sand" />,
    title: "1. Technical Training",
    description: "Focuses on ball-handling mechanics, precise touches with all surfaces of the foot, proper passing form, and developing a soft receiving touch.",
  },
  {
    icon: <Zap className="h-6 w-6 text-accent" />,
    title: "2. Skill Development",
    description: "Introducing feints, body swerves, and dribbles (street-style tricks) to enable players to bypass opponents confidently in 1v1 situations.",
  },
  {
    icon: <Sword className="h-6 w-6 text-sand" />,
    title: "3. Small-Sided Games",
    description: "High-paced games (2v2, 3v3) that maximize touch repetitions, demand quick decision making under pressure, and develop small-space intelligence.",
  },
  {
    icon: <Play className="h-6 w-6 text-accent" />,
    title: "4. Match Play",
    description: "Applying tactical concepts, field spacing, and positional awareness in larger structured match formats while maintaining individual freedom to create.",
  },
];

export const TrainingStructure: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-primary border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center justify-center gap-2 text-sand font-display text-xs uppercase tracking-widest font-semibold mb-4">
            <span className="h-px w-4 bg-sand" />
            Session Blueprint
            <span className="h-px w-4 bg-sand" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white font-display tracking-tight leading-tight">
            How We Train
          </h2>
          <p className="text-slate-400 font-light text-base md:text-lg leading-relaxed mt-4">
            Every 90-minute session is divided into four highly-structured phases designed to develop well-rounded, expressive players.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PILLARS.map((pillar, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex gap-5 p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-sand/15 transition-all duration-300"
            >
              <div className="h-12 w-12 rounded-2xl bg-primary-light border border-white/10 flex items-center justify-center shrink-0">
                {pillar.icon}
              </div>
              <div>
                <h3 className="font-display font-black text-lg text-white mb-2 leading-tight">
                  {pillar.title}
                </h3>
                <p className="text-slate-400 text-sm font-light leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TrainingStructure;
