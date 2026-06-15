"use client";

import React from "react";
import { Sparkles } from "lucide-react";

export const TrialIntro: React.FC = () => {
  return (
    <section className="pt-24 pb-12 bg-[#FAF7F2] relative overflow-hidden">
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
        
        <h2 className="text-3xl md:text-5xl font-black font-display tracking-tight text-primary uppercase leading-tight max-w-2xl mb-6">
          Step onto the Shore
        </h2>

        <p className="text-[#6F6F6F] text-sm md:text-base leading-relaxed font-normal max-w-2xl text-center">
          {"We do not run high-pressure assessment screenings. A trial session at Neythal is simply an invitation for your child to feel the ECR sea breeze, run on the turf with our U6-U16 coaching pods, and experience training run by licensed coaches. There are no expectations or evaluations—just come, play, and see if they belong."}
        </p>

        {/* Expectation bullets */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-2xl mt-12 border-t border-black/5 pt-8 text-left text-[#6F6F6F]">
          <div>
            <span className="font-sans font-bold text-xs uppercase text-primary block">1. Coach Greeting</span>
            <span className="text-[11px] leading-relaxed block mt-1">Pradeep or Vijay will meet you at the turf entrance to introduce your child to their age group pod.</span>
          </div>
          <div>
            <span className="font-sans font-bold text-xs uppercase text-primary block">2. Barefoot Warmups</span>
            <span className="text-[11px] leading-relaxed block mt-1">We often run micro barefoot ball-mastery drills to build spatial balance and comfort before turf games.</span>
          </div>
          <div>
            <span className="font-sans font-bold text-xs uppercase text-primary block">3. Pod Integration</span>
            <span className="text-[11px] leading-relaxed block mt-1">Your child joins training with a strict 2:1 coaching ratio cap, ensuring constant guidance and support.</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TrialIntro;
