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
    id: "01",
    name: "Pradeep Ramesh",
    role: "Co-Founder & Head Coach",
    credentials: "AIFF / AFC Licensed · Former Pro Player",
    description:
      "Specializes in spatial game intelligence, beach-soccer physical conditioning, and structured tactical progression. Guided local Chennai talent to national-level exposure since 2016.",
    image: "/coaches/coach-1.webp",
    hoverImage: "/coaches/coach-1.1.webp",
  },
  {
    id: "02",
    name: "Vijay Balan",
    role: "Co-Founder & Head Coach",
    credentials: "AIFF / AFC Licensed · Technical Director",
    description:
      "Focuses on technical micro-diagnostics, dribbling mechanics, and street-style creative decision-making. Passionate about youth development and instilling a love for the game.",
    image: "/coaches/coach-2.webp",
    hoverImage: "/coaches/coach-2.2.webp",
  },
  {
    id: "03",
    name: "Dharun Raj",
    role: "Lead Academy Coach",
    credentials: "AIFF D Licensed · Youth Specialist",
    description:
      "Focuses on grassroots talent acquisition, physical agility programs, and spatial awareness drills for our sub-junior development squads.",
    image: "/coaches/coach-3.webp",
    hoverImage: "/coaches/coach-3.3.webp",
  },
  {
    id: "04",
    name: "Sanjivi Kumar",
    role: "Youth Development Coach",
    credentials: "AIFF C Licensed · Technical Coach",
    description:
      "Specializes in ball mastery, passing execution under pressure, and micro-positioning dynamics for high-intensity match situations.",
    image: "/coaches/coach-4.webp",
    hoverImage: "/coaches/coach-4.4.webp",
  },
  {
    id: "05",
    name: "Karthik S",
    role: "Goalkeeping Coach",
    credentials: "AIFF D Licensed · GK Trainer",
    description:
      "Dedicated to developing reflex agility, positioning, and aerial control for our goalkeepers across all age groups.",
    image: "/coaches/coach-5.webp",
    hoverImage: "/coaches/coach-5.webp",
  },
];

export const CoachSection: React.FC = () => {
  const outerRef = useRef<HTMLDivElement>(null);
  const runwayRef = useRef<HTMLDivElement>(null);
  const pinnedRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const isMobile = window.innerWidth < 768;
      const runway = runwayRef.current;
      const pinned = pinnedRef.current;
      const track = trackRef.current;
      if (!runway || !pinned || !track) return;
      if (isMobile) return;

      const cardWidth = window.innerWidth;
      const scrollDist = cardWidth * (COACHES.length - 1);

      // Create a timeline that handles both pinning and horizontal scroll
      // with a pause before and after the horizontal movement.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: runway,
          start: "top top",
          end: "bottom bottom",
          pin: pinned,
          anticipatePin: 1,
          scrub: 0.25,
          refreshPriority: -1,
          invalidateOnRefresh: true,
        },
      });

      // 1st card rest state: no movement for 0.6 relative duration
      tl.to({}, { duration: 0.6 });

      // Slide track to show next card: 1.0 relative duration
      tl.to(track, {
        x: -scrollDist,
        ease: "power2.inOut",
        duration: 1.0,
      });

      // 2nd card rest state: no movement for 0.4 relative duration before unpinning
      tl.to({}, { duration: 0.4 });

      // After one animation frame the Hero spacer element is fully committed;
      // force a global recalculation so our start position is correct.
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    },
    { scope: outerRef }
  );

  return (
    /* ── Outer wrapper - both sections live here ── */
    <div ref={outerRef} className="relative w-full bg-[#FAF7F2]">

      {/* ══════════════════════════════════════════════
          SECTION 1 - Header: natural flow, scrolls away
          ══════════════════════════════════════════════ */}
      <div className="w-full px-6 sm:px-10 md:px-16 pt-24 pb-20 md:pt-28 md:pb-24">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-8 md:gap-20">

          {/* Left: eyebrow + title */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-bold text-[#0B1F3A]/35 tracking-widest font-sans">
                (01)
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-extrabold text-[#C8A96B] bg-[#C8A96B]/10 px-3 py-1 rounded-full font-sans">
                The Mentors
              </span>
            </div>
            <h2
              className="font-sans font-semibold text-[#0B1F3A] tracking-tight leading-tight"
              style={{ fontSize: "clamp(30px, 3.8vw, 52px)" }}
            >
              Two Coaches.<br />Every Session.
            </h2>
          </div>

          {/* Right: description - ~3 lines */}
          <p
            className="font-sans font-light text-[#5A6E85] leading-relaxed max-w-md md:max-w-[400px] md:text-right md:pt-8"
            style={{ fontSize: "clamp(14px, 1.5vw, 17px)" }}
          >
            Our training is driven by a deep passion for<br className="hidden md:inline" />{" "}
            developing fearless, creative decision-makers<br className="hidden md:inline" />{" "}
            with street-style touches and structured coaching.
          </p>

        </div>
      </div>

      {/* ══════════════════════════════════════════════
          SECTION 2 - Scroll runway + Pinned card area
          Each coach card = 1 viewport of scroll space
          ══════════════════════════════════════════════ */}
      <div
        ref={runwayRef}
        /* Dynamic height based on number of coaches to preserve scrolling speed */
        style={{ height: `${(COACHES.length + 1) * 100}vh` }}
        className="relative w-full"
      >
        {/* Pinned element: full viewport card area */}
        <div
          ref={pinnedRef}
          className="w-full overflow-hidden bg-[#FAF7F2]"
          style={{ height: "100vh" }}
        >
          {/* Subtle grid texture */}
          <div
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              backgroundImage:
                "linear-gradient(to right,rgba(11,31,58,0.012) 1px,transparent 1px),linear-gradient(to bottom,rgba(11,31,58,0.012) 1px,transparent 1px)",
              backgroundSize: "5rem 5rem",
            }}
          />

          {/* Horizontal track - GSAP slides this left */}
          <div
            ref={trackRef}
            className="flex flex-row flex-nowrap h-full will-change-transform"
            style={{ width: `${COACHES.length * 100}vw` }}
          >
            {COACHES.map((coach) => (
              <div
                key={coach.id}
                className="flex flex-row h-full shrink-0"
                style={{ width: "100vw" }}
              >
                {/* ── LEFT COLUMN: Coach info ── */}
                <div
                  className="flex flex-col justify-center h-full text-left"
                  style={{
                    width: "50vw",
                    paddingLeft: "clamp(40px, 6vw, 100px)",
                    paddingRight: "clamp(32px, 4vw, 72px)",
                    paddingTop: "clamp(56px, 7vh, 96px)",
                    paddingBottom: "clamp(56px, 7vh, 96px)",
                  }}
                >
                  {/* Coach index */}
                  <span
                    className="font-sans font-bold text-[#0B1F3A]/20 tracking-widest mb-5"
                    style={{ fontSize: "11px", letterSpacing: "0.25em" }}
                  >
                    ({coach.id})
                  </span>

                  {/* Role */}
                  <span
                    className="font-sans font-bold uppercase tracking-[0.2em] text-[#C8A96B] mb-4"
                    style={{ fontSize: "11px" }}
                  >
                    {coach.role}
                  </span>

                  {/* Coach name */}
                  <h3
                    className="font-sans font-semibold text-[#0B1F3A] tracking-tight leading-[1.1] mb-5"
                    style={{ fontSize: "clamp(34px, 4.2vw, 58px)" }}
                  >
                    {coach.name}
                  </h3>

                  {/* Credentials pill */}
                  <span
                    className="inline-block font-sans font-semibold uppercase tracking-widest text-[#0B1F3A]/50 bg-[#0B1F3A]/5 border border-[#0B1F3A]/8 px-3 py-1.5 rounded-md w-fit mb-8"
                    style={{ fontSize: "10px" }}
                  >
                    {coach.credentials}
                  </span>

                  {/* Description */}
                  <p
                    className="font-sans font-light text-[#5A6E85] leading-relaxed max-w-[420px] mb-10"
                    style={{ fontSize: "clamp(14px, 1.4vw, 16px)" }}
                  >
                    {coach.description}
                  </p>

                  {/* CTA */}
                  <Link
                    href="/about"
                    className="inline-flex items-center gap-3 group cursor-pointer w-fit"
                  >
                    <span
                      className="font-sans font-bold uppercase tracking-widest border border-[#0B1F3A]/20 hover:border-[#0B1F3A]/60 text-[#0B1F3A] px-7 py-3 rounded-full transition-colors duration-300"
                      style={{ fontSize: "10px" }}
                    >
                      Learn More
                    </span>
                    <span className="h-10 w-10 rounded-full bg-[#0B1F3A] text-white flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:translate-x-0.5 shadow-md">
                      <ArrowUpRight size={15} />
                    </span>
                  </Link>
                </div>

                {/* ── RIGHT COLUMN: Coach image ── */}
                <div
                  className="flex items-center justify-start h-full"
                  style={{
                    width: "50vw",
                    padding: "20px",
                  }}
                >
                  <div
                    className="relative w-full h-full overflow-hidden bg-[#0B1F3A] group/image"
                    style={{ borderRadius: "2rem" }}
                  >
                    {/* Main Image */}
                    <Image
                      src={coach.image}
                      alt={coach.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 44vw"
                      className="object-cover transition-all duration-700 ease-in-out group-hover/image:scale-[1.025] group-hover/image:opacity-0"
                    />
                    {/* Hover Image */}
                    <Image
                      src={coach.hoverImage}
                      alt={`${coach.name} hover`}
                      fill
                      sizes="(max-width: 768px) 100vw, 44vw"
                      className="object-cover absolute inset-0 transition-all duration-700 ease-in-out opacity-0 group-hover/image:opacity-100 group-hover/image:scale-[1.025]"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── MOBILE LAYOUT - stacked cards, no GSAP ── */}
      <div className="md:hidden flex flex-col gap-0 pb-16">
        {COACHES.map((coach) => (
          <div
            key={coach.id}
            className="flex flex-col gap-6 px-6 py-10 border-t border-[#0B1F3A]/8 first:border-0"
          >
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8A96B]">
              {coach.role}
            </span>
            <h3 className="font-sans font-semibold text-[#0B1F3A] text-3xl tracking-tight leading-tight">
              {coach.name}
            </h3>
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-xl bg-[#0B1F3A] group/image">
              {/* Main Image */}
              <Image
                src={coach.image}
                alt={coach.name}
                fill
                sizes="100vw"
                className="object-cover transition-all duration-700 ease-in-out group-hover/image:opacity-0"
              />
              {/* Hover Image */}
              <Image
                src={coach.hoverImage}
                alt={`${coach.name} hover`}
                fill
                sizes="100vw"
                className="object-cover absolute inset-0 transition-all duration-700 ease-in-out opacity-0 group-hover/image:opacity-100"
              />
            </div>
            <p className="font-sans font-light text-[#5A6E85] leading-relaxed text-sm">
              {coach.description}
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2.5 group cursor-pointer w-fit"
            >
              <span className="font-sans font-bold text-[10px] uppercase tracking-widest border border-[#0B1F3A]/20 text-[#0B1F3A] px-6 py-2.5 rounded-full">
                Learn More
              </span>
              <span className="h-9 w-9 rounded-full bg-[#0B1F3A] text-white flex items-center justify-center shadow-md">
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
