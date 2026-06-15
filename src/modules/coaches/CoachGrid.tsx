"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Star, Trophy, Users, Shield, Target } from "lucide-react";

const COACHES = [
  {
    name: "Vijay Balan",
    role: "Co-Founder & Head Coach",
    experience: "8+ Years Youth Development",
    certifications: ["AFC 'C' License", "AIFF Youth Coaching Certificate"],
    focus: "Technical Training & Advanced Tactics",
    icon: <Trophy className="h-10 w-10 text-sand" />,
  },
  {
    name: "Pradeep Ramesh",
    role: "Co-Founder & Operations Coach",
    experience: "6+ Years Football Conditioning",
    certifications: ["AIFF 'D' License", "Sports Conditioning Specialist"],
    focus: "Foot Speed & Ball Mastery coordination",
    icon: <Shield className="h-10 w-10 text-accent" />,
  },
  {
    name: "Rajesh Kumar",
    role: "Assistant Youth Coach",
    experience: "4+ Years Coaching Grassroots",
    certifications: ["AIFF Grassroots Leader Certificate", "First Aid Certified"],
    focus: "U6 - U8 Coordination & Skill games",
    icon: <Users className="h-10 w-10 text-slate-300" />,
  },
  {
    name: "Shalini Devi",
    role: "Assistant Performance Coach",
    experience: "State Representative & Coach",
    certifications: ["AIFF 'D' License", "Physical Education Graduate"],
    focus: "U9 - U12 1v1 Skill Flair & Positioning",
    icon: <Target className="h-10 w-10 text-indigo-400" />,
  },
];

export const CoachGrid: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center justify-center gap-2 text-sand font-display text-xs uppercase tracking-widest font-semibold mb-4">
            <span className="h-px w-4 bg-sand" />
            The Academy Staff
            <span className="h-px w-4 bg-sand" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white font-display tracking-tight leading-tight">
            Meet Our Coaching Staff
          </h2>
          <p className="text-slate-400 font-light text-base md:text-lg mt-4">
            Every session is led by a minimum of 1 Main Coach and 1 Assistant Coach, ensuring detailed attention and structural safety.
          </p>
        </div>

        {/* Coach Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {COACHES.map((coach, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-3xl p-8 border border-white/5 flex flex-col justify-between"
            >
              <div>
                <div className="h-24 w-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 mx-auto shadow-md">
                  {coach.icon}
                </div>

                <div className="text-center mb-6">
                  <h3 className="font-display font-black text-lg text-white leading-tight">
                    Coach {coach.name}
                  </h3>
                  <span className="text-[11px] text-sand font-semibold uppercase tracking-wider block mt-1">
                    {coach.role}
                  </span>
                </div>

                <div className="space-y-4 border-t border-white/5 pt-6 text-xs text-slate-300 font-light">
                  <div className="flex gap-2">
                    <Briefcase size={14} className="text-accent shrink-0 mt-0.5" />
                    <span>{coach.experience}</span>
                  </div>
                  <div className="flex gap-2">
                    <Star size={14} className="text-sand shrink-0 mt-0.5" />
                    <span>{coach.focus}</span>
                  </div>
                </div>
              </div>

              {/* Certifications footer */}
              <div className="border-t border-white/5 pt-6 mt-6">
                <span className="text-[9px] uppercase tracking-widest font-bold text-slate-500 block mb-2">Certifications</span>
                <div className="flex flex-wrap gap-1.5">
                  {coach.certifications.map((cert, i) => (
                    <span
                      key={i}
                      className="inline-block px-2.5 py-1 rounded bg-accent/10 border border-accent/20 text-accent text-[10px] font-semibold"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CoachGrid;
