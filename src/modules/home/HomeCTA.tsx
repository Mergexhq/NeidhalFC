"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const HomeCTA: React.FC = () => {
  return (
    <section className="py-24 bg-[#FAF7F2] relative overflow-hidden border-t border-black/5">
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-accent mb-4 block">
          Get Started
        </span>
        <h2 className="text-4xl md:text-5xl font-semibold text-primary font-display tracking-wide mb-6">
          Book a Free Trial Session
        </h2>
        <p className="text-[#6F6F6F] text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-10 font-normal">
          Give your child the opportunity to train with licensed coaches and experience our coastal coaching pods first-hand. Zero obligation, zero cost.
        </p>

        <Link
          href="/book-trial"
          className="inline-flex items-center gap-2 bg-primary hover:bg-accent text-white font-sans font-bold text-xs uppercase tracking-wider px-10 py-5 rounded-xl shadow-lg transition-transform hover:scale-[1.02] cursor-pointer group"
        >
          <span>Schedule Free Trial Now</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
};

export default HomeCTA;
