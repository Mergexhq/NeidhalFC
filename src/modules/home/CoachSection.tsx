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

/* ── Coach data ──────────────────────────────────────────── */
const COACHES = [
  {
    id: "01",
    name: "Pradeep Ramesh",
    role: "Co-Founder & Head Coach",
    credentials: "AIFF / AFC Licensed · Former Pro Player",
    description:
      "Specializes in spatial game intelligence, beach-soccer physical conditioning, and structured tactical progression. Guided local Chennai talent to national-level exposure since 2016.",
    image: "/coaches-nobg/coach-1.png",
    image2: "/coaches-nobg/coach-1.1.png",
    accent: "#C8A96B",
  },
  {
    id: "02",
    name: "Vijay Balan",
    role: "Co-Founder & Head Coach",
    credentials: "AIFF / AFC Licensed · Technical Director",
    description:
      "Focuses on technical micro-diagnostics, dribbling mechanics, and street-style creative decision-making. Passionate about youth development and instilling a love for the game.",
    image: "/coaches-nobg/coach-2.png",
    image2: "/coaches-nobg/coach-2.2.png",
    accent: "#7BA7BC",
  },
  {
    id: "03",
    name: "Dharun Raj",
    role: "Lead Academy Coach",
    credentials: "AIFF D Licensed · Youth Specialist",
    description:
      "Focuses on grassroots talent acquisition, physical agility programs, and spatial awareness drills for our sub-junior development squads.",
    image: "/coaches-nobg/coach-3.png",
    image2: "/coaches-nobg/coach-3.3.png",
    accent: "#C8A96B",
  },
  {
    id: "04",
    name: "Sanjivi Kumar",
    role: "Youth Development Coach",
    credentials: "AIFF C Licensed · Technical Coach",
    description:
      "Specializes in ball mastery, passing execution under pressure, and micro-positioning dynamics for high-intensity match situations.",
    image: "/coaches-nobg/coach-4.png",
    image2: "/coaches-nobg/coach-4.4.png",
    accent: "#7BA7BC",
  },
  {
    id: "05",
    name: "Karthik S",
    role: "Goalkeeping Coach",
    credentials: "AIFF D Licensed · GK Trainer",
    description:
      "Dedicated to developing reflex agility, positioning, and aerial control for our goalkeepers across all age groups.",
    image: "/coaches-nobg/coach-5.png",
    accent: "#C8A96B",
  },
];

/* ── How much the photo overflows ABOVE the card bar ── */
const CARD_H = 130;   // card bar height px
const OVERFLOW_TOP = 64; // how far image pops above card

export const CoachSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>(".parallax-card-row");
      cards.forEach((card) => {
        const images = card.querySelectorAll(".parallax-coach-img");
        if (images.length === 0) return;

        gsap.fromTo(
          images,
          { y: 35 },
          {
            y: -35,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.2,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative w-full bg-[#03070E] text-white overflow-x-clip">

      {/* Subtle dot-grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ═══════════════════════════════════════════════════════
          SECTION HEADER
          ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8 md:gap-20">

          {/* Left: eyebrow + heading */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-white/30 tracking-widest font-sans">
                (01)
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#C8A96B] bg-[#C8A96B]/10 px-3 py-1 rounded-full font-sans">
                The Mentors
              </span>
            </div>
            <h2
              className="font-sans font-semibold text-white tracking-tight leading-tight"
              style={{ fontSize: "clamp(30px, 3.8vw, 52px)" }}
            >
              Two Coaches.<br />Every Session.
            </h2>
          </div>

          {/* Right: description */}
          <p
            className="font-sans font-light text-slate-300 leading-relaxed max-w-md md:max-w-[400px] md:text-right md:pt-8"
            style={{ fontSize: "clamp(14px, 1.5vw, 17px)" }}
          >
            Our training is driven by a deep passion for{" "}
            <br className="hidden md:inline" />
            developing fearless, creative decision-makers{" "}
            <br className="hidden md:inline" />
            with street-style touches and structured coaching.
          </p>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          5 STACKED HORIZONTAL CARD BARS  (desktop)
          ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 hidden md:block w-full px-6 sm:px-10 md:px-16 pb-28">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">

          {COACHES.map((coach, index) => {
            /* Odd index = image LEFT, even index = image RIGHT */
            const imageLeft = index % 2 === 0;
            const leftImageSrc = imageLeft ? coach.image : coach.image2;
            const rightImageSrc = imageLeft ? coach.image2 : coach.image;

            return (
              <div
                key={coach.id}
                /* overflow-visible — image floats above, card is flush at bottom */
                className="group relative flex items-end overflow-visible parallax-card-row"
                style={{ minHeight: `${CARD_H + OVERFLOW_TOP}px` }}
              >
                {/* ── The card bar itself — flush at bottom, inset at top ── */}
                <div
                  className="
                    absolute inset-x-0
                    flex items-center
                    rounded-2xl
                    transition-all duration-500
                  "
                  style={{
                    top: `${OVERFLOW_TOP}px`,
                    bottom: 0,
                    background: "#ffffff",
                    border: "1px solid rgba(11,31,58,0.08)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at ${imageLeft ? "15%" : "85%"} 50%, ${coach.accent}22 0%, transparent 60%)`,
                    }}
                  />
                </div>

                {/* ── LEFT PHOTO (overflows TOP only, flush at bottom) ── */}
                {leftImageSrc && (
                  <div
                    className="relative shrink-0 z-20"
                    style={{
                      width: "clamp(180px, 20vw, 250px)",
                      height: `${CARD_H + OVERFLOW_TOP}px`,
                      marginLeft: "clamp(16px, 2.5vw, 40px)",
                    }}
                  >
                    <Image
                      src={leftImageSrc}
                      alt={`${coach.name} left visual`}
                      fill
                      sizes="(max-width: 1280px) 20vw, 250px"
                      className="
                        object-contain object-bottom
                        drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)]
                        transition-transform duration-500
                        group-hover:scale-[1.04]
                        parallax-coach-img
                      "
                      priority={index < 2}
                    />
                  </div>
                )}

                {/* ── TEXT & CTA CONTENT WRAPPER ── */}
                <div
                  className="relative z-10 flex-1 flex items-center justify-center px-8"
                  style={{ height: `${CARD_H}px` }}
                >
                  <h3
                    className="font-sans font-bold uppercase tracking-[0.06em] text-center leading-[1.0]"
                    style={{ fontSize: "clamp(28px, 3.2vw, 44px)", color: "#0B1F3A" }}
                  >
                    {coach.name}
                  </h3>

                  <Link
                    href="/about"
                    className="
                      absolute right-8
                      shrink-0 flex items-center justify-center
                      h-9 w-9 rounded-full
                      transition-all duration-300
                      hover:scale-105
                    "
                    style={{ background: "#0B1F3A", color: "#ffffff" }}
                    aria-label={`Learn more about ${coach.name}`}
                  >
                    <ArrowUpRight size={14} />
                  </Link>
                </div>


                {/* ── RIGHT PHOTO (overflows TOP only, flush at bottom) ── */}
                {rightImageSrc && (
                  <div
                    className="relative shrink-0 z-20"
                    style={{
                      width: "clamp(180px, 20vw, 250px)",
                      height: `${CARD_H + OVERFLOW_TOP}px`,
                      marginRight: "clamp(16px, 2.5vw, 40px)",
                    }}
                  >
                    <Image
                      src={rightImageSrc}
                      alt={`${coach.name} right visual`}
                      fill
                      sizes="(max-width: 1280px) 20vw, 250px"
                      className="
                        object-contain object-bottom
                        drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)]
                        transition-transform duration-500
                        group-hover:scale-[1.04]
                        parallax-coach-img
                      "
                      priority={index < 2}
                    />
                  </div>
                )}
              </div>
            );

          })}
        </div>


      </div>

      {/* ═══════════════════════════════════════════════════════
          MOBILE — stacked cards
          ═══════════════════════════════════════════════════════ */}
      <div className="md:hidden flex flex-col gap-0 pb-16 relative z-10">
        {COACHES.map((coach, index) => (
          <div
            key={coach.id}
            className="flex flex-col gap-5 px-6 py-10 border-t border-white/10 first:border-0"
          >
            <h3 className="font-sans font-bold uppercase tracking-[0.06em] text-white text-3xl tracking-tight leading-tight">
              {coach.name}
            </h3>
            <div
              className="relative w-full rounded-2xl overflow-hidden bg-white/4 border border-white/8"
              style={{ aspectRatio: "4/3" }}
            >
              <Image
                src={coach.image}
                alt={coach.name}
                fill
                sizes="100vw"
                className="object-contain object-bottom drop-shadow-[0_16px_32px_rgba(0,0,0,0.5)]"
                priority={index === 0}
              />
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2.5 group cursor-pointer w-fit"
            >
              <span className="font-sans font-bold text-[10px] uppercase tracking-widest border border-white/20 text-white px-6 py-2.5 rounded-full">
                Learn More
              </span>
              <span className="h-9 w-9 rounded-full bg-white text-[#03070E] flex items-center justify-center shadow-md">
                <ArrowUpRight size={14} />
              </span>
            </Link>
          </div>
        ))}
      </div>

    </div>
  );
};

export default CoachSection;
