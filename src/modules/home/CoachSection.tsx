"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, Users, Award, Shield, CheckCircle } from "lucide-react";

const COACHES = [
  {
    name: "Pradeep Ramesh",
    role: "Co-Founder & Head Coach",
    credentials: "AIFF / AFC Licensed • Former Pro Player",
    description: "Specializes in spatial game intelligence, beach-soccer physical conditioning, and structured tactical progression. Guided local Chennai talent to national-level exposure since 2016.",
    image: "/images/advanced_match.jpg",
  },
  {
    name: "Vijay Balan",
    role: "Co-Founder & Head Coach",
    credentials: "AIFF / AFC Licensed • Technical Director",
    description: "Focuses on technical micro-diagnostics, dribbling mechanics, and street-style creative decision-making. Passionate about youth development and instilling a love for the game.",
    image: "/images/coaching_ratio.jpg",
  },
];

const RATIO_DETAILS = [
  {
    title: "Licensed Lead Coach",
    desc: "Orchestrates complex technical drills, manages spatial playing structures, and drives dynamic team match scenarios.",
    icon: Award,
  },
  {
    title: "Dedicated Assistant Coach",
    desc: "Tracks individual contact points, monitors body positioning, tracks touch count, and delivers real-time micro-corrections.",
    icon: Users,
  },
  {
    title: "Diagnostic Feedback",
    desc: "Every player is observed and diagnosed individually, ensuring no child gets lost in the crowd or left behind.",
    icon: Shield,
  },
];

export const CoachSection: React.FC = () => {
  return (
    <section className="py-24 bg-[#0B1F3A] text-white relative overflow-hidden">
      {/* Decorative radial gradients */}
      <div className="absolute top-1/2 left-[-10%] w-[40vw] h-[40vw] rounded-full bg-sand/5 blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] rounded-full bg-accent/5 blur-[120px] pointer-events-none z-0" />

      {/* Decorative Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0" />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16 flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-widest font-extrabold text-sand flex items-center gap-1.5">
            <Sparkles size={12} />
            The Standard
          </span>
          <h2 className="text-3xl sm:text-5xl font-semibold font-display tracking-wide leading-tight font-sans">
            Two Coaches. Every Session.
          </h2>
          <p className="text-white/60 text-xs sm:text-sm max-w-lg mt-2">
            Every session runs with a strict 2:1 coaching ratio cap. One lead coach directing play, and one assistant tracking touch metrics.
          </p>
        </div>

        {/* --- DUAL COACH CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-20 max-w-6xl mx-auto">
          {COACHES.map((coach, index) => (
            <motion.div
              key={coach.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="group relative flex flex-col sm:flex-row gap-6 p-6 rounded-[2rem] bg-slate-900/40 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 shadow-xl"
            >
              {/* Profile Image */}
              <div className="relative w-full sm:w-[180px] aspect-square sm:h-auto rounded-2xl overflow-hidden bg-white/5 shrink-0">
                <Image
                  src={coach.image}
                  alt={coach.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 180px"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-[#0B1F3A]/20 group-hover:opacity-0 transition-opacity duration-300" />
              </div>

              {/* Profile Info */}
              <div className="flex flex-col items-start justify-between gap-4 text-left">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-sand">
                    {coach.role}
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-white">
                    {coach.name}
                  </h3>
                  <span className="text-[10px] text-white/55 font-sans font-medium uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded border border-white/5 w-fit">
                    {coach.credentials}
                  </span>
                </div>
                <p className="text-white/70 text-xs sm:text-sm font-sans font-light leading-relaxed">
                  {coach.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* --- 2:1 ADVANTAGE GRID --- */}
        <div className="border-t border-white/10 pt-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {RATIO_DETAILS.map((detail, index) => {
              const Icon = detail.icon;
              return (
                <motion.div
                  key={detail.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="flex flex-col items-start gap-4 p-5 rounded-2xl bg-white/[0.02] border border-white/5"
                >
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 text-sand flex items-center justify-center">
                    <Icon size={18} />
                  </div>
                  <div className="text-left">
                    <h4 className="font-sans font-bold text-sm text-white uppercase tracking-wider">
                      {detail.title}
                    </h4>
                    <p className="text-white/50 text-xs mt-2 leading-relaxed">
                      {detail.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CoachSection;
