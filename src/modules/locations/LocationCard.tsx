"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from "framer-motion";
import { MapPin, Calendar, Clock, User, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, SliderContainer, Slider, SliderDotButton } from "@/components/carousel";

export interface LocationData {
  chapter: string;
  id: string;
  title: string;
  tagline: string;
  personality: string;
  address: string;
  days: string;
  times: string;
  coach: string;
  images: string[];
  embedUrl: string;
}

interface LocationCardProps {
  loc: LocationData;
}

/* ─────────────────────────────────────────────
   PARALLAX CAROUSEL BACKGROUND
 ───────────────────────────────────────────── */
function ParallaxCarousel({ images, y }: { images: string[]; y: MotionValue<string> }) {
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  if (images.length === 0) {
    return <div className="w-full h-full bg-[#03070E]" />;
  }

  // If there's only a single image, skip the carousel setup completely
  if (images.length === 1) {
    return (
      <div className="w-full h-full relative overflow-hidden">
        <motion.div
          style={{
            y,
            position: "absolute",
            top: "-15%",
            bottom: "-15%",
            left: 0,
            right: 0,
            width: "100%",
            height: "130%",
          }}
          className="z-0"
        >
          <Image
            src={images[0]}
            alt="Training Ground View"
            fill
            sizes="100vw"
            className="object-cover object-center select-none pointer-events-none"
            priority
          />
        </motion.div>
        {/* Subtle vignette/dark overlay for visual depth */}
        <div className="absolute inset-0 bg-black/15 pointer-events-none z-[1]" />
      </div>
    );
  }

  // If there are multiple images, show the interactive autostart carousel
  return (
    <Carousel
      options={{ loop: true }}
      plugins={[autoplayPlugin.current]}
      className="w-full h-full relative"
    >
      <SliderContainer className="w-full h-full">
        {images.map((img, idx) => (
          <Slider key={idx} className="relative w-full h-full flex-[0_0_100%] min-w-0 overflow-hidden">
            {/* The parallax layer is isolated inside the slide */}
            <motion.div
              style={{
                y,
                position: "absolute",
                top: "-15%",
                bottom: "-15%",
                left: 0,
                right: 0,
                width: "100%",
                height: "130%",
              }}
              className="z-0"
            >
              <Image
                src={img}
                alt="Training Ground View"
                fill
                sizes="100vw"
                className="object-cover object-center select-none pointer-events-none"
                priority={idx === 0}
              />
            </motion.div>
          </Slider>
        ))}
      </SliderContainer>

      {/* Dots overlay for slide control - always visible at the bottom of the main frame */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
        <SliderDotButton activeClass="bg-white dark:bg-white" className="gap-2" />
      </div>

      {/* Subtle vignette/dark overlay for visual depth - positioned over the slider container but below the dots */}
      <div className="absolute inset-0 bg-black/15 pointer-events-none z-[1]" />
    </Carousel>
  );
}

/* ─────────────────────────────────────────────
   LOCATION CARD MAIN COMPONENT
 ───────────────────────────────────────────── */
export const LocationCard: React.FC<LocationCardProps> = ({ loc }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax Scroll tracking
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  
  // Transform background Y position to create a smooth parallax scrolling effect
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as const
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      id={loc.id}
      className="relative w-full flex flex-col justify-center bg-[#FAF7F2]"
    >
      {/* ── 1. Centered Title and Description (Outside of Card) ── */}
      <div className="w-full max-w-8xl mx-auto px-6 sm:px-8 md:px-12 text-center pt-16 pb-12 select-none">
        <h2 className="font-display font-light text-5xl sm:text-6xl lg:text-[68px] text-[#0B1F3A] tracking-tight leading-none">
          {loc.title}
        </h2>
        <p className="text-lg sm:text-xl lg:text-2xl text-[#5A6E85] font-light max-w-none mx-auto mt-4 leading-relaxed italic">
          &ldquo;{loc.personality}&rdquo;
        </p>
      </div>

      {/* ── 2. Full-Width Parallax Image Carousel ── */}
      <div 
        ref={containerRef}
        className="relative w-full h-[360px] md:h-[480px] lg:h-[520px] overflow-hidden bg-[#03070E]"
      >
        <ParallaxCarousel images={loc.images} y={y} />
      </div>

      {/* ── 3. Bounded Card Layout (Info, CTA & Map - Styled like Image 2) ── */}
      <div className="relative bg-[#FAF7F2] pt-12 pb-20 sm:pb-28">
        <div className="w-full max-w-8xl mx-auto px-6 sm:px-8 md:px-12">
          
          <div className="w-full bg-[#F5EFE6] border border-[#0B1F3A]/10 rounded-[12px] shadow-[0_8px_30px_rgba(0,0,0,0.03)] p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Side: Session Details & CTA Button */}
              <div className="lg:col-span-6 flex flex-col gap-8 text-[#0B1F3A] text-left font-clean">
                <div className="flex flex-col gap-6">
                  <span className="text-lg sm:text-2xl font-semibold uppercase tracking-[0.2em] text-[#0077b6] border-b border-[#0B1F3A]/10 pb-3">
                    Academy Session Information
                  </span>
                  
                  <div className="flex flex-col gap-6">
                    {/* Days */}
                    <div className="flex items-start gap-4">
                      <Calendar className="text-[#0077b6] shrink-0 mt-0.5" size={20} />
                      <div>
                        <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#0B1F3A]/55">Weekly Schedule</span>
                        <span className="block text-sm sm:text-base font-medium text-[#0B1F3A] mt-0.5">{loc.days}</span>
                      </div>
                    </div>

                    {/* Timings */}
                    <div className="flex items-start gap-4">
                      <Clock className="text-[#0077b6] shrink-0 mt-0.5" size={20} />
                      <div>
                        <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#0B1F3A]/55">Training Times</span>
                        <span className="block text-sm sm:text-base font-medium text-[#0B1F3A] mt-0.5 whitespace-pre-line leading-normal">{loc.times}</span>
                      </div>
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-4">
                      <MapPin className="text-[#0077b6] shrink-0 mt-0.5" size={20} />
                      <div>
                        <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#0B1F3A]/55">Training Pitch Location</span>
                        <span className="block text-sm sm:text-base font-medium text-[#0B1F3A] mt-0.5 leading-relaxed">{loc.address}</span>
                      </div>
                    </div>

                    {/* Coach */}
                    <div className="flex items-start gap-4">
                      <User className="text-[#0077b6] shrink-0 mt-0.5" size={20} />
                      <div>
                        <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#0B1F3A]/55">Head Coach</span>
                        <span className="block text-sm sm:text-base font-medium text-[#0B1F3A] mt-0.5">{loc.coach}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="text-left pt-2">
                  <Link
                    href="/contact"
                    className="group inline-flex items-center gap-2.5 justify-center px-6 py-4 rounded-xl bg-[#0B1F3A] hover:bg-white text-white hover:text-[#0B1F3A] border border-[#0B1F3A] font-semibold text-xs uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-xl shrink-0 cursor-pointer"
                  >
                    Contact Us / Book Trial
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
              </div>

              {/* Right Side: Map (No outer card, direct full-size iframe) */}
              <div className="lg:col-span-6 w-full h-[360px] md:h-[460px] rounded-[12px] overflow-hidden border border-[#0B1F3A]/10">
                <iframe
                  src={loc.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  title={`${loc.title} on Google Maps`}
                  className="w-full h-full"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default LocationCard;
