"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";

export const AboutGlimpse: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden border-b border-black/5">
      {/* Decorative background grid and blurs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,31,58,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,31,58,0.01)_1px,transparent_1px)] bg-size-[5rem_5rem] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-80 h-80 rounded-full bg-sand/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        {/* Soft icon details */}
        <div className="h-10 w-10 rounded-full bg-sand/10 border border-sand/30 flex items-center justify-center text-accent mb-6">
          <Compass size={16} />
        </div>

        <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-accent mb-3 block">
          Our Backstory
        </span>
        
        <h2 className="text-3xl md:text-5xl font-semibold font-display tracking-wide text-primary leading-tight max-w-2xl mb-8">
          The meaning of Neidhal
        </h2>

        <div className="text-[#6F6F6F] text-sm md:text-base leading-relaxed font-normal max-w-2xl text-center space-y-6 mb-12">
          <p>
            {"Neidhal is the ancient Tamil word for the coastal land where the sea meets the shore. It is the landscape of salt in the air and sand under every step. We did not choose this name for decoration—we chose it because the shore is exactly where our game began."}
          </p>
          <p>
            {"In 2016, we started training youth along the ECR shoreline with just a football and the open sea breeze. We believe football should be played with street-style touch, barefoot agility, and individual decision-making. We started in the sand, and we never forgot where we came from."}
          </p>
        </div>

        {/* Read Our Story Link */}
        <Link
          href="/about"
          className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#0077b6] hover:text-[#005f73] transition-colors group cursor-pointer"
        >
          <span>Read Our Story</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default AboutGlimpse;
