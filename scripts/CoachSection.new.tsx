"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const COACHES = [
  {
    id: "01",
    name: "Pradeep Ramesh",
    role: "Co-Founder & Head Coach",
    credentials: "AIFF / AFC Licensed · Former Pro Player",
    description:
      "Specializes in spatial game intelligence, beach-soccer physical conditioning, and structured tactical progression. Guided local Chennai talent to national-level exposure since 2016.",
    image: "/coaches-nobg/coach-1.png",
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

export const CoachSection: React.FC = () => {
  return (
    <div className="relative w-full bg-[#03070E] text-white">

      {/* ── Subtle grid texture ── */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "linear-gradient(to right,rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(to bottom,rgba(255,255,255,0.012) 1px,transparent 1px)",
          backgroundSize: "5rem 5rem",
        }}
      />

      {/* ══════════════════════════════════════════════
          HEADER
          ══════════════════════════════════════════════ */}
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 pt-24 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8 md:gap-20">

          {/* Left: eyebrow + title */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-white/35 tracking-widest font-sans">
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

      {/* ══════════════════════════════════════════════
          STACKED HORIZONTAL CARD BARS
          ══════════════════════════════════════════════ */}
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 pb-28">
        <div className="max-w-7xl mx-auto flex flex-col gap-5">

          {COACHES.map((coach, index) => {
            const isImageLeft = index % 2 === 0; // 1, 3, 5 → image left; 2, 4 → image right

            return (
              <div
                key={coach.id}
                className="group relative flex items-center rounded-2xl overflow-visible"
                style={{
                  background: "linear-gradient(135deg, rgba(255,255,255,0.055) 0%, rgba(255,255,255,0.03) 100%)",
                  border: "1px solid rgba(255,255,255,0.09)",
                  backdropFilter: "blur(12px)",
                  minHeight: "140px",
                }}
              >
                {/* Accent glow on hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(ellipse at ${isImageLeft ? "20%" : "80%"} 50%, ${coach.accent}18 0%, transparent 65%)`,
                  }}
                />

                {/* ── IMAGE SIDE ── overflows the card */}
                <div
                  className={`relative shrink-0 ${isImageLeft ? "order-first" : "order-last"}`}
                  style={{
                    width: "clamp(160px, 20vw, 260px)",
                    height: "clamp(180px, 22vw, 290px)",
                    /* Overflow: push image up so it pops above the card */
                    marginTop: isImageLeft ? "-30px" : "-24px",
                    marginBottom: isImageLeft ? "-30px" : "-24px",
                    [isImageLeft ? "marginLeft" : "marginRight"]: "-8px",
                  }}
                >
                  <Image
                    src={coach.image}
                    alt={coach.name}
                    fill
                    sizes="(max-width: 768px) 50vw, 22vw"
                    className="object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>

                {/* ── TEXT CONTENT ── */}
                <div
                  className={`flex flex-col justify-center flex-1 py-7 ${isImageLeft ? "pl-6 pr-8 md:pl-8 md:pr-10" : "pl-8 pr-6 md:pl-10 md:pr-8"}`}
                >
                  {/* Number + role */}
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="font-sans font-bold text-white/25 tracking-widest"
                      style={{ fontSize: "10px", letterSpacing: "0.22em" }}
                    >
                      ({coach.id})
                    </span>
                    <span
                      className="font-sans font-bold uppercase tracking-[0.18em]"
                      style={{ fontSize: "10px", color: coach.accent }}
                    >
                      {coach.role}
                    </span>
                  </div>

                  {/* Name */}
                  <h3
                    className="font-sans font-semibold text-white tracking-tight leading-[1.1] mb-2"
                    style={{ fontSize: "clamp(20px, 2.2vw, 32px)" }}
                  >
                    {coach.name}
                  </h3>

                  {/* Credentials */}
                  <span
                    className="inline-block font-sans font-semibold uppercase tracking-widest text-white/55 bg-white/5 border border-white/10 px-2.5 py-1 rounded-md w-fit mb-3"
                    style={{ fontSize: "9px" }}
                  >
                    {coach.credentials}
                  </span>

                  {/* Description - hidden on small screens */}
                  <p
                    className="hidden md:block font-sans font-light text-slate-400 leading-relaxed max-w-sm"
                    style={{ fontSize: "clamp(12px, 1.1vw, 14px)" }}
                  >
                    {coach.description}
                  </p>
                </div>

                {/* ── CTA ARROW (far side of text) ── */}
                <Link
                  href="/about"
                  className={`hidden md:flex shrink-0 items-center justify-center mr-6 ml-4 h-10 w-10 rounded-full bg-white/8 border border-white/15 text-white/60 hover:bg-white hover:text-[#03070E] transition-all duration-300 group-hover:border-white/40 ${!isImageLeft ? "order-first ml-6 mr-4" : ""}`}
                  aria-label={`Learn more about ${coach.name}`}
                >
                  <ArrowUpRight size={15} />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center mt-12">
          <Link
            href="/about"
            className="inline-flex items-center gap-3 group cursor-pointer"
          >
            <span
              className="font-sans font-bold uppercase tracking-widest border border-white/20 hover:border-white/60 text-white px-7 py-3 rounded-full transition-colors duration-300"
              style={{ fontSize: "10px" }}
            >
              Meet The Full Staff
            </span>
            <span className="h-10 w-10 rounded-full bg-white text-[#03070E] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-0.5 shadow-md">
              <ArrowUpRight size={15} />
            </span>
          </Link>
        </div>
      </div>

      {/* ── MOBILE LAYOUT - stacked cards ── */}
      {/* NOTE: On mobile the cards already stack naturally above because we removed md:hidden.
          The card layout is responsive at all widths. */}

    </div>
  );
};

export default CoachSection;
