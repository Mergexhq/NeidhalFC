"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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

export const CoachSection: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Horizontal scroll animation only on desktop screens
      const isMobile = window.innerWidth < 768;
      if (isMobile) return;

      const track = trackRef.current;
      if (!track) return;

      // Calculate translation amount (total scrollable width minus visible width of track container)
      const scrollAmount = track.scrollWidth - track.clientWidth;

      gsap.to(track, {
        x: -scrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: () => `+=${scrollAmount}`,
          pin: true,
          scrub: 0.15,
          invalidateOnRefresh: true,
        },
      });
    },
    { scope: triggerRef }
  );

  return (
    <section ref={triggerRef} className="w-full bg-[#FAF7F2] text-primary relative overflow-hidden border-b border-black/5">
      {/* Decorative subtle background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,31,58,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,31,58,0.012)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none z-0" />

      {/* Grid wrapper: Left (Static Title block), Right (Horizontal Coach track) */}
      <div className="flex flex-col md:flex-row relative z-10 w-full min-h-screen">
        
        {/* --- LEFT SIDE: Static Title and Philosophy --- */}
        <div className="w-full md:w-[40%] md:h-screen sticky top-0 flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-16 md:py-0 border-r border-black/5 bg-[#FAF7F2] z-20">
          <div className="flex flex-col items-start gap-4 text-left max-w-md">
            <div className="flex items-center gap-3">
              <span className="font-sans text-xs font-bold text-primary/40 tracking-wider">(01)</span>
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-accent bg-sand/15 px-2.5 py-1 rounded-full">
                The Mentors
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-semibold font-display tracking-wide leading-tight text-primary font-sans mt-2">
              Two Coaches. Every Session.
            </h2>
            
            <p className="text-[#5A6E85] text-xs sm:text-sm font-sans font-light leading-relaxed mt-2">
              Every session runs with a strict 2:1 coaching ratio cap. One lead coach directing play, and one assistant tracking touch metrics.
            </p>
            
            <p className="text-sm sm:text-base font-sans font-light leading-relaxed text-[#5A6E85] mt-4 pt-4 border-t border-black/5">
              Our training is driven by a deep passion for developing fearless, creative decision-makers with street-style touches and structured coaching.
            </p>
          </div>
        </div>

        {/* --- RIGHT SIDE: Horizontal Scrollable Coach Track --- */}
        <div className="w-full md:w-[60%] md:h-screen flex items-center overflow-x-auto md:overflow-x-hidden px-6 md:px-12 py-12 md:py-0 z-10 scrollbar-none">
          <div 
            ref={trackRef} 
            className="flex gap-8 md:gap-12 flex-nowrap pr-12 md:pr-24"
          >
            {COACHES.map((coach) => (
              <div
                key={coach.name}
                className="coach-card w-[80vw] md:w-[45vw] lg:w-[38vw] h-[65vh] md:h-[70vh] relative rounded-[2.5rem] overflow-hidden shrink-0 shadow-2xl bg-[#0B1F3A] flex flex-col justify-between"
              >
                {/* Background Coach Portrait Image */}
                <Image
                  src={coach.image}
                  alt={coach.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 600px"
                  className="object-cover transition-transform duration-700 hover:scale-[1.03] z-0"
                />

                {/* Dark Gradients to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/85 z-10" />

                {/* Card Content Layout */}
                <div className="absolute inset-0 z-20 p-8 sm:p-10 flex flex-col justify-between box-border">
                  {/* Top Content (Credentials) */}
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#C8A96B]">
                      {coach.role}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-white/70 font-sans font-semibold uppercase tracking-widest bg-white/10 px-2.5 py-0.5 rounded border border-white/10 w-fit mt-1">
                      {coach.credentials}
                    </span>
                  </div>

                  {/* Bottom Content (Biography & CTA) */}
                  <div className="flex flex-col items-start gap-4">
                    <h3 className="font-sans font-semibold text-2xl sm:text-4xl text-white tracking-wide">
                      {coach.name}
                    </h3>
                    
                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed font-sans font-light max-w-md">
                      {coach.description}
                    </p>

                    {/* Custom Styled Learn More CTA */}
                    <Link
                      href="/about"
                      className="inline-flex items-center gap-2 group cursor-pointer mt-1"
                    >
                      <span className="font-sans font-bold text-[10px] tracking-widest uppercase border border-white/20 hover:border-white/60 text-white px-5 py-2 rounded-full transition-colors duration-300">
                        Learn More
                      </span>
                      <span className="h-8 w-8 rounded-full bg-white text-[#0B1F3A] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-0.5 shadow-md">
                        <ArrowUpRight size={13} />
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default CoachSection;
