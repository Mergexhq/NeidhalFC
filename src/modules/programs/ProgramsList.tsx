"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Shield, Trophy } from "lucide-react";

const DETAILED_PROGRAMS = [
  {
    age: "U6 - U8",
    title: "Foundation Academy",
    badge: "Ages 5 to 8",
    description: "Introducing players to the joy of football through structured, play-based training. We focus heavily on basic coordination, foot-eye speed, and introducing ball mastery techniques.",
    highlights: [
      "Ball familiarity & basic dribbling",
      "Coordination & running mechanics",
      "Introduction to 1v1 play",
      "Fun skill games to build confidence"
    ],
    icon: <Star className="h-5 w-5 text-sand" />,
    borderColor: "border-sand/20",
    glowColor: "shadow-sand/5"
  },
  {
    age: "U9 - U12",
    title: "Creative Development Academy",
    badge: "Ages 9 to 12",
    description: "Developing individual expression and street-style football on the pitch. Players are encouraged to take risks, perform dribbles in tight spaces, and master 1v1 dynamics.",
    highlights: [
      "Creative dribbling tricks & flair",
      "Fakes, turns, and spatial awareness",
      "Small-sided games (3v3, 4v4)",
      "High repetition of touch drills"
    ],
    icon: <Shield className="h-5 w-5 text-accent" />,
    borderColor: "border-accent/20",
    glowColor: "shadow-accent/5"
  },
  {
    age: "U13 - U16",
    title: "Advanced Tactical Academy",
    badge: "Ages 13 to 16",
    description: "Bridging the gap between individual flair and team systems. We prepare players for match situations, building positional discipline without suppressing their natural creativity.",
    highlights: [
      "Positional training & team shapes",
      "Transition mechanics & tactical reading",
      "Match play analysis & decision making",
      "Conditioning & high-tempo scrimmages"
    ],
    icon: <Trophy className="h-5 w-5 text-indigo-400" />,
    borderColor: "border-indigo-500/20",
    glowColor: "shadow-indigo-500/5"
  }
];

export const ProgramsList: React.FC = () => {
  return (
    <section className="py-24 relative bg-primary-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center justify-center gap-2 text-sand font-display text-xs uppercase tracking-widest font-semibold mb-4">
            <span className="h-px w-4 bg-sand" />
            Training Tiers
            <span className="h-px w-4 bg-sand" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white font-display tracking-tight leading-tight">
            Our Program Curriculum
          </h2>
          <p className="text-slate-400 font-light text-base md:text-lg mt-4">
            Designed to match the physical, emotional, and technical maturity stages of young players.
          </p>
        </div>

        {/* List Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {DETAILED_PROGRAMS.map((prog, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`glass-card rounded-3xl p-8 border ${prog.borderColor} shadow-lg ${prog.glowColor} flex flex-col justify-between`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="font-display font-black text-3xl text-white">
                    {prog.age}
                  </span>
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {prog.icon}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="font-display font-black text-xl text-white mb-1">
                    {prog.title}
                  </h3>
                  <span className="text-xs text-sand font-semibold uppercase tracking-wider block">
                    {prog.badge}
                  </span>
                </div>

                <p className="text-slate-300 text-sm font-light leading-relaxed mb-8">
                  {prog.description}
                </p>

                <div className="border-t border-white/5 pt-6">
                  <h4 className="font-display font-bold text-xs uppercase tracking-widest text-slate-400 mb-4">
                    Core Focus Points
                  </h4>
                  <ul className="space-y-3">
                    {prog.highlights.map((hl, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs text-slate-300 font-light">
                        <span className="h-1.5 w-1.5 rounded-full bg-sand shrink-0" />
                        {hl}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProgramsList;
