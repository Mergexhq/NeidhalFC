"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame, useVelocity, MotionValue } from "framer-motion";
import { Camera } from "lucide-react";
import Lenis from "lenis";

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

  const skewX = useTransform(smoothVelocity, [-500, 500], [-4, 4]);
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

// ─── DESKTOP PARALLAX COLUMN ───
type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div
      className="relative -top-[45%] flex h-full w-1/4 min-w-[80px] sm:min-w-[150px] md:min-w-[220px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%]"
      style={{ y }}
    >
      {images.map((src, i) => (
        <div key={i} className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem] border border-black/5 shadow-lg bg-slate-100">
          <Image
            src={src}
            alt="Neidhal FC Coastal Football training session"
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="pointer-events-none object-cover transition-transform duration-500 hover:scale-105"
            priority={i === 0}
          />
        </div>
      ))}
    </motion.div>
  );
};

// ─── MAIN COMPONENT ───
export const LifeAtNeidhal: React.FC = () => {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 1.5]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 2.5]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.1]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 2.2]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
      lenis.destroy();
    };
  }, []);

  return (
    <section
      className="py-24 bg-[#FAF7F2] relative overflow-hidden"
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

        {/* Original 4-Column Parallax Gallery Container */}
        <div
          ref={gallery}
          className="relative box-border flex h-[150vh] gap-[2vw] overflow-hidden bg-[#FAF7F2] p-[2vw] rounded-[2.5rem] mx-4 md:mx-12 border border-black/5"
        >
          <Column images={[IMAGES[0], IMAGES[1], IMAGES[2]]} y={y} />
          <Column images={[IMAGES[3], IMAGES[4], IMAGES[5]]} y={y2} />
          <Column images={[IMAGES[6], IMAGES[7], IMAGES[0]]} y={y3} />
          <Column images={[IMAGES[1], IMAGES[2], IMAGES[3]]} y={y4} />
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
          <p className="text-[#5A6E85] text-xs mt-2 leading-relaxed max-w-xs">
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
