"use client";

import React from "react";
import { motion } from "framer-motion";
import { Heart, Users, ShieldAlert, Sparkles, Smile } from "lucide-react";

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ValueCard: React.FC<ValueCardProps> = ({ icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white border border-sand/15 rounded-[2rem] p-8 md:p-10 shadow-xs hover:shadow-xl hover:border-sand/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col gap-6"
    >
      <div className="h-12 w-12 rounded-2xl bg-sand/10 border border-sand/20 flex items-center justify-center text-accent shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-sans font-extrabold text-xl md:text-2xl text-primary mb-3 leading-tight">
          {title}
        </h3>
        <p className="text-[#6F6F6F] text-sm md:text-base leading-relaxed font-normal">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export const ValueSystem: React.FC = () => {
  const VALUES = [
    {
      icon: <Smile className="h-6 w-6" />,
      title: "Fearless Youth Development",
      description: "We focus entirely on unlocking each player's creative instinct and flair. Our curriculum gives them the freedom to try and make mistakes, developing real confidence on the pitch.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Community & Belonging",
      description: "Football is about connection. We build a tight-knit family where every child feels they belong—fostering deep friendships and mutual respect, regardless of competitive skill level.",
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Purpose Over Trophies",
      description: "We choose character building, teamwork, and growth over celebrity culture or chasing trophies. We develop secure individuals who understand that true success is about collective effort.",
    },
  ];

  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-[#FAF7F2] border-t border-black/5">
      {/* Decorative Blur Backgrounds */}
      <div className="absolute top-1/4 right-0 w-[450px] h-[450px] rounded-full bg-sand/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[450px] h-[450px] rounded-full bg-accent/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Block */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-accent mb-4 block font-sans">
            Our Value System
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-primary font-display tracking-tight leading-tight uppercase mb-6">
            Developing the Individual, Not Just the Player
          </h2>
          <div className="w-16 h-1 bg-sand mx-auto rounded-full mb-6" />
          <p className="text-[#6F6F6F] text-base md:text-lg leading-relaxed font-normal max-w-2xl mx-auto">
            At Neidhal FC, we reject the toxic trophy-chasing academy culture. We believe in building confidence, teamwork, and a lifelong love for the game.
          </p>
        </div>

        {/* Values Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {VALUES.map((val, idx) => (
            <ValueCard 
              key={idx}
              icon={val.icon}
              title={val.title}
              description={val.description}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueSystem;
