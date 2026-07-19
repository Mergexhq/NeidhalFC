"use client";

import React from "react";
import Image from "next/image";
import { RevealText } from "@/components/ui/reveal-text";
import { DiaText } from "@/components/ui/dia-text";

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

      {/* SECTION HEADER */}
      {/* ======================================================= */}
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 pt-24 pb-12 md:pt-28 md:pb-16 text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
          <RevealText
            as="h2"
            split="word"
            text="The Coaches of Neidhal FC"
            className="font-raleway font-semibold text-[#0B1F3A] uppercase tracking-tight leading-none text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-center"
            whileInView
            once
          />
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════
          STACKED HORIZONTAL CARD BARS  (Responsive Mobile & Desktop)
          ═══════════════════════════════════════════════════════ */}
      <div className="relative z-10 w-full px-4 sm:px-10 md:px-16 pb-20 md:pb-28">
        <div className="max-w-7xl mx-auto flex flex-col gap-4">

          {COACHES.map((coach, index) => {
            /* Odd index = image LEFT, even index = image RIGHT */
            const imageLeft = index % 2 === 0;
            const leftImageSrc = imageLeft ? coach.image : coach.image2;
            const rightImageSrc = imageLeft ? coach.image2 : coach.image;

            return (
              <div
                key={coach.id}
                /* overflow-visible - image floats above, card is flush at bottom */
                className="group relative flex items-end overflow-visible h-[110px] md:h-[194px]"
              >
                {/* ── The card bar itself - flush at bottom, inset at top ── */}
                <div
                  className="
                    absolute inset-x-0
                    flex items-center
                    rounded-2xl
                    transition-all duration-500
                    top-[30px] md:top-[64px]
                    bottom-0
                  "
                  style={{
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
                    className="relative shrink-0 z-20 w-[100px] sm:w-[130px] md:w-[220px] lg:w-[250px] h-[110px] sm:h-[140px] md:h-[194px] ml-2 sm:ml-4 md:ml-8 lg:ml-10"
                  >
                    <Image
                      src={leftImageSrc}
                      alt={`${coach.name} left visual`}
                      fill
                      sizes="(max-width: 768px) 120px, 250px"
                      className="
                        object-contain object-bottom
                        drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)] md:drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)]
                        transition-transform duration-500
                      "
                      priority={index < 2}
                    />
                  </div>
                )}

                {/* ── TEXT CONTENT WRAPPER ── */}
                <div
                  className="relative z-10 flex-1 flex items-center justify-center px-4 md:px-8 h-[80px] md:h-[130px]"
                >
                  <h3
                    className="font-sans font-bold uppercase tracking-[0.06em] text-center leading-[1.0] text-sm sm:text-base md:text-2xl lg:text-[34px] xl:text-[40px]"
                    style={{ color: "#0B1F3A" }}
                  >
                    <DiaText
                      text={coach.name}
                      colors={["#0B1F3A", "#C5A880", "#005f73", "#e9d8a6", "#0B1F3A"]}
                      textColor="#0B1F3A"
                      duration={1.2}
                      delay={index * 0.08}
                      triggerOnView={true}
                      once={true}
                    />
                  </h3>
                </div>

                {/* ── RIGHT PHOTO (overflows TOP only, flush at bottom) ── */}
                {rightImageSrc && (
                  <div
                    className="relative shrink-0 z-20 w-[100px] sm:w-[130px] md:w-[220px] lg:w-[250px] h-[110px] sm:h-[140px] md:h-[194px] mr-2 sm:mr-4 md:mr-8 lg:mr-10"
                  >
                    <Image
                      src={rightImageSrc}
                      alt={`${coach.name} right visual`}
                      fill
                      sizes="(max-width: 768px) 120px, 250px"
                      className="
                        object-contain object-bottom
                        drop-shadow-[0_10px_20px_rgba(0,0,0,0.35)] md:drop-shadow-[0_15px_30px_rgba(0,0,0,0.4)]
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

    </div>
  );
};

export default CoachSection;
