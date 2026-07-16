"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/* ── Coach data ──────────────────────────────────────────── */
const COACHES = [
  {
    id: "01",
    name: "Pradeep Ramesh",
    image: "/images/coaches/coach-1.png",
    image2: "/images/coaches/coach-1.1.png",
    accent: "#C8A96B",
  },
  {
    id: "02",
    name: "Vijay Balan",
    image: "/images/coaches/coach-2.png",
    image2: "/images/coaches/coach-2.2.png",
    accent: "#7BA7BC",
  },
  {
    id: "03",
    name: "Dharun Raj",
    image: "/images/coaches/coach-3.png",
    image2: "/images/coaches/coach-3.3.png",
    accent: "#C8A96B",
  },
  {
    id: "04",
    name: "Sanjivi Kumar",
    image: "/images/coaches/coach-4.png",
    image2: "/images/coaches/coach-4.4.png",
    accent: "#7BA7BC",
  },
  {
    id: "05",
    name: "Karthik S",
    image: "/images/coaches/coach-5.png",
    image2: "/images/coaches/coach-5.5.png",
    accent: "#C8A96B",
  },
];

/* ── How much the photo overflows ABOVE the card bar ── */
const CARD_H = 130;   // card bar height px
const OVERFLOW_TOP = 64; // how far image pops above card

export const CoachSection: React.FC = () => {
  return (
    <div className="relative w-full bg-[#FAF7F2] text-[#0B1F3A] overflow-x-clip">

      {/* Subtle dot-grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(11,31,58,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* ═══════════════════════════════════════════════════════
          SECTION HEADER
          ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 pt-24 pb-12 md:pt-28 md:pb-16 text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
          <h2 className="font-raleway font-semibold text-[#0B1F3A] uppercase tracking-tight leading-none text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-center">
            The Coaches of Neidhal FC
          </h2>
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
                className="group relative flex items-end overflow-visible"
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
                    background: "#F5EFE6",
                    border: "1px solid rgba(11,31,58,0.08)",
                    boxShadow: "0 8px 32px rgba(11,31,58,0.06)",
                  }}
                >
                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at ${imageLeft ? "15%" : "85%"} 50%, ${coach.accent}15 0%, transparent 60%)`,
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
            className="flex flex-col gap-5 px-6 py-10 border-t border-[#0B1F3A]/10 first:border-0"
          >
            <h3 className="font-sans font-bold uppercase tracking-[0.06em] text-[#0B1F3A] text-3xl tracking-tight leading-tight">
              {coach.name}
            </h3>
            <div
              className="relative w-full rounded-2xl overflow-hidden bg-[#F5EFE6] border border-[#0B1F3A]/10"
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
