"use client";

import React from "react";
import { Sparkles } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

export const TrialIntro: React.FC = () => {
  return (
    <section className="pt-24 pb-12 bg-[#FAF7F2] relative overflow-hidden">
      <Navbar />
      {/* Background light details */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-sand/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        {/* Soft welcome icon */}
        <div className="h-10 w-10 rounded-full bg-sand/10 border border-sand/30 flex items-center justify-center text-accent mb-6 animate-pulse">
          <Sparkles size={16} />
        </div>

        <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-accent mb-3 block">
          Chapter 1: The Invitation
        </span>
        
        <h2 className="text-3xl md:text-5xl font-semibold font-display tracking-wide text-primary mb-6">
          Step onto the Shore
        </h2>

        <p className="text-[#6F6F6F] text-sm md:text-base leading-relaxed font-normal max-w-2xl text-center">
          {"We do not run high-pressure assessment screenings. A trial session at Neythal is simply an invitation for your child to feel the ECR sea breeze, run on the turf with our U6-U16 coaching pods, and experience training run by licensed coaches. There are no expectations or evaluations—just come, play, and see if they belong."}
        </p>


      </div>
    </section>
  );
};

export default TrialIntro;
