"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const DolphinMascot: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const textWrapperRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!triggerRef.current || !textWrapperRef.current || !logoWrapperRef.current) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "center center",
          end: "+=120%",
          pin: true,
          scrub: 0.5,
        },
      });

      // Animate text sliding up and fading out
      tl.to(textWrapperRef.current, {
        y: "-80px",
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
      });

      // Animate logo sliding in and fading in
      tl.fromTo(
        logoWrapperRef.current,
        {
          y: "80px",
          opacity: 0,
        },
        {
          y: "0px",
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
        },
        "-=0.6" // overlap animations
      );
    },
    { scope: triggerRef }
  );

  return (
    <div ref={triggerRef} className="w-full relative bg-black">
      {/* Pinned Viewport Container */}
      <section className="w-full h-screen md:h-[75vh] bg-black overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Left Column: Text & Logo reveal */}
        <div className="relative flex flex-col justify-center items-center px-6 sm:px-12 md:px-16 lg:px-20 py-16 text-[#FAF7F2] bg-black h-[55vh] md:h-full overflow-hidden order-2 md:order-1">

          {/* Copy Wrapper */}
          <div
            ref={textWrapperRef}
            className="absolute inset-y-6 inset-x-6 sm:inset-x-12 md:inset-x-16 lg:inset-x-20 flex flex-col items-start justify-center max-w-xl mx-auto h-full"
          >
            {/* Section Title */}
            <h2 className="font-raleway font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[46px] uppercase tracking-tight leading-none text-[#FAF7F2] mb-6">
              Why the Dolphin?
            </h2>

            {/* Editorial Tagline */}
            <p className="text-lg sm:text-xl font-display font-medium text-[#FAF7F2]/95 italic border-l-2 border-[#D9C3A5] pl-4 mb-6 leading-snug">
              Every mascot has a story. Ours begins in the Bay of Bengal.
            </p>

            {/* Body Text */}
            <p className="text-[#FAF7F2]/80 font-sans text-sm sm:text-base leading-relaxed font-light">
              Before Neidhal FC had training grounds, we trained on the beach. During those early mornings, pods of dolphins would often swim just beyond the waves, sometimes only 30 feet from where we played. The dolphin became more than something we saw-it became part of our journey. Today, it proudly represents the club and the coastal roots that continue to define who we are.
            </p>
          </div>

          {/* Logo Wrapper */}
          <div
            ref={logoWrapperRef}
            className="absolute inset-y-6 inset-x-6 sm:inset-x-12 md:inset-x-16 lg:inset-x-20 flex flex-col items-center justify-center max-w-xl mx-auto h-full pointer-events-none"
            style={{ opacity: 0 }}
          >
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56">
              <Image
                src="/logo/neidhal_logo.png"
                alt="Neidhal FC Mascot Crest"
                fill
                sizes="(max-width: 640px) 160px, 224px"
                className="object-contain"
                priority
              />
            </div>
          </div>

        </div>

        {/* Right Column: Pinned Image */}
        <div className="relative h-[45vh] md:h-full w-full overflow-hidden bg-black order-1 md:order-2">
          <Image
            src="/images/about/dolphin.webp"
            alt="Neidhal FC Dolphin Mascot"
            fill
            unoptimized
            className="object-cover object-center pointer-events-none select-none"
          />
        </div>

      </section>
    </div>
  );
};

export default DolphinMascot;
