"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useVelocity, useAnimationFrame, useTransform } from "framer-motion";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  Slider,
  SliderContainer,
  ThumbsSlider,
  SliderPrevButton,
  SliderNextButton,
  SliderSnapDisplay,
} from "@/components/ui/carousel";
import type { EmblaOptionsType } from "embla-carousel";

const IMAGES = [
  "/Gallery/_12A3901.JPG",
  "/Gallery/_12A3910.JPG",
  "/Gallery/_12A3942.JPG",
  "/Gallery/_12A4002.JPG",
  "/Gallery/_12A4014.JPG",
  "/Gallery/_12A4048.JPG",
  "/Gallery/_12A4066.JPG",
  "/Gallery/_12A4077.JPG",
];

const ASPECT_RATIOS = [
  "4/3",
  "2/3",
  "1/1",
  "3/4",
  "4/3",
  "1/1",
  "2/3",
  "4/3",
];

const ROW_WIDTHS = ["w-36", "w-44", "w-32", "w-52", "w-40", "w-36", "w-48", "w-36"];

// ─── MOBILE VELOCITY ROW ───
type VelocityRowProps = {
  images: string[];
  baseVelocity?: number;
  widthOffset?: number;
  ratioOffset?: number;
};

function VelocityRow({ images, baseVelocity = -2, widthOffset = 0, ratioOffset = 0 }: VelocityRowProps) {
  const scrollY = useMotionValue(0);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const x = useMotionValue(0);
  const directionFactor = useRef(1);
  const stripRef = useRef<HTMLDivElement>(null);
  const [stripWidth, setStripWidth] = useState(0);

  // Helper function to map scrollY
  useEffect(() => {
    const onScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollY]);

  useEffect(() => {
    if (stripRef.current) setStripWidth(stripRef.current.scrollWidth / 2);
  }, []);

  useAnimationFrame((_, delta) => {
    const moveBy = directionFactor.current * baseVelocity * (delta / 16);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    const extra = directionFactor.current * moveBy * Math.abs(velocityFactor.get());
    const newX = x.get() + moveBy + extra;
    x.set(stripWidth ? ((newX % stripWidth) - stripWidth) % -stripWidth : newX);
  });

  // Custom transform instead of useTransform on local components
  const skewX = useSpring(useMotionValue(0));
  useEffect(() => {
    return smoothVelocity.on("change", (latest) => {
      const skewVal = Math.min(Math.max(latest / 125, -4), 4);
      skewX.set(skewVal);
    });
  }, [smoothVelocity, skewX]);

  const doubled = [...images, ...images];

  return (
    <div className="overflow-hidden">
      <motion.div
        ref={stripRef}
        className="flex gap-2"
        style={{ x, skewX, width: "max-content" }}
      >
        {doubled.map((src, i) => {
          const widthClass = ROW_WIDTHS[(i + widthOffset) % ROW_WIDTHS.length];
          const ratio = ASPECT_RATIOS[(i + ratioOffset) % ASPECT_RATIOS.length];
          return (
            <div
              key={"vel-" + i}
              className={`${widthClass} shrink-0 overflow-hidden rounded-lg border border-black/5 shadow-sm bg-slate-100`}
              style={{ aspectRatio: ratio }}
            >
              <Image
                src={src}
                alt="Neidhal FC training"
                width={240}
                height={180}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

// ─── MAIN COMPONENT ───
export const LifeAtNeidhal: React.FC = () => {
  const OPTIONS: EmblaOptionsType = {
    loop: true,
    axis: "y",
  };

  return (
    <section
      className="py-24 bg-transparent relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,31,58,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,31,58,0.01)_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none" />

      {/* ─── DESKTOP LAYOUT (md+) ─── */}
      <div className="hidden md:block">
        {/* Stacked Header */}
        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 md:px-12 relative z-10 mb-16">
          <div className="flex flex-row items-end justify-between gap-6">
            <div className="flex flex-col items-start gap-3 text-left">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-accent flex items-center gap-1.5">
                <Camera size={12} />
                Media Gallery
              </span>
              <h2 className="text-3xl sm:text-5xl font-semibold font-display tracking-wide leading-none text-primary font-sans">
                Life at Neidhal
              </h2>
              <p className="text-[#5A6E85] text-xs sm:text-sm max-w-md mt-1 leading-relaxed">
                Glance through daily pod routines, intense barefoot conditioning, and coastal turf training action.
              </p>
            </div>

            <div className="flex items-center gap-4 max-w-xs shrink-0 self-end">
              <div className="flex-1 h-px bg-[#0B1F3A]/10 w-16" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#0077b6]" />
              <div className="flex-1 h-px bg-[#0B1F3A]/10 w-16" />
            </div>
          </div>
        </div>

        {/* Vertical Thumbnail Slider Container */}
        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 md:px-12 relative z-10">
          <Carousel
            options={OPTIONS}
            className="relative flex flex-row gap-8 h-[600px] w-full items-stretch"
          >
            {/* Thumbnail Slider (Left side) */}
            <ThumbsSlider
              className="w-24 shrink-0"
              thumbsClassName="h-[600px] flex flex-col gap-4 py-2"
              thumbsSliderClassName="border-[#0B1F3A]/10 hover:border-accent/40 rounded-xl overflow-hidden shadow-sm"
            />

            {/* Main Images (Right side) */}
            <div className="flex-1 relative h-full">
              <SliderContainer className="h-[600px] w-full">
                {IMAGES.map((src, idx) => (
                  <Slider key={idx} className="h-full w-full" thumbnailSrc={src}>
                    <div className="relative w-full h-[600px] rounded-2xl overflow-hidden border border-black/5 shadow-md bg-transparent">
                      <Image
                        src={src}
                        alt={`Life at Neidhal training session ${idx + 1}`}
                        fill
                        sizes="(max-width: 1200px) 80vw, 55vw"
                        className="pointer-events-none object-cover transition-transform duration-500 hover:scale-102"
                        priority={idx === 0}
                      />
                      
                      {/* Subtle elegant gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none" />
                      
                      {/* Caption or Indicator */}
                      <div className="absolute bottom-6 left-6 z-10 text-white font-sans text-left">
                        <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#D9C3A5] block mb-1">
                          Training Moment {idx + 1}
                        </span>
                        <h4 className="text-lg font-bold">Neidhal Coastal Turf</h4>
                      </div>
                    </div>
                  </Slider>
                ))}
              </SliderContainer>

              {/* Prev / Next Buttons overlayed on the bottom right of the main image */}
              <div className="absolute bottom-6 right-6 flex items-center gap-3 z-20">
                <SliderPrevButton className="w-10 h-10 rounded-full flex items-center justify-center bg-white/95 hover:bg-white text-primary border border-black/5 shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer">
                  <ChevronLeft size={18} />
                </SliderPrevButton>
                <SliderNextButton className="w-10 h-10 rounded-full flex items-center justify-center bg-white/95 hover:bg-white text-primary border border-black/5 shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer">
                  <ChevronRight size={18} />
                </SliderNextButton>
              </div>

              {/* Snap display indicators (dots / counter) */}
              <div className="absolute top-6 right-6 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white font-sans text-xs font-semibold z-20 flex items-center gap-2">
                <SliderSnapDisplay className="text-white" />
              </div>
            </div>
          </Carousel>
        </div>
      </div>

      {/* ─── MOBILE LAYOUT (< md) ─── */}
      <div className="md:hidden">
        <div className="px-5 mb-8">
          <span className="text-[10px] uppercase tracking-widest font-extrabold text-accent flex items-center gap-1.5 mb-3">
            <Camera size={12} />
            Media Gallery
          </span>
          <h2 className="text-2xl font-semibold font-display tracking-tight leading-tight text-primary">
            Life at <span className="italic font-light">Neidhal</span>
          </h2>
          <p className="text-[#5A6E85] text-xs mt-2 leading-relaxed max-w-xs text-left">
            Glance through daily pod routines, intense barefoot conditioning,
            and coastal turf training action.
          </p>
        </div>

        <div className="mb-2">
          <VelocityRow images={IMAGES} baseVelocity={-0.6} widthOffset={0} ratioOffset={0} />
        </div>
        <VelocityRow images={[...IMAGES].reverse()} baseVelocity={0.6} widthOffset={3} ratioOffset={2} />
      </div>
    </section>
  );
};

export default LifeAtNeidhal;
