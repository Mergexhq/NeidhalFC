"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { Camera } from "lucide-react";
import Lenis from "lenis";

const IMAGES = [
  "/images/beach_soccer.jpg",
  "/images/advanced_match.jpg",
  "/images/coaching_ratio.jpg",
  "/images/foundation_drill.jpg",
  "/images/soccer_thumb.jpg",
  "/images/location.jpg",
  "/images/about/backstory_2016.jpg",
  "/images/about/beach_soccer_legal.jpg",
  "/images/about/going_roots.jpg",
  "/images/about/slider_coaching.jpg",
  "/images/about/slider_dolphins.jpg",
  "/images/home/coach_ratio.jpg",
];

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
    <section className="py-24 bg-[#FAF7F2] relative overflow-hidden border-b border-black/5">
      {/* Grid background accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,31,58,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,31,58,0.01)_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none" />

      {/* Header */}
      <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 md:px-12 relative z-10 mb-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
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

          <div className="flex items-center gap-4 max-w-xs shrink-0 self-start md:self-end">
            <div className="flex-1 h-px bg-[#0B1F3A]/10 w-16" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#0077b6]" />
            <div className="flex-1 h-px bg-[#0B1F3A]/10 w-16" />
          </div>
        </div>
      </div>

      {/* The Parallax Gallery Container */}
      <div
        ref={gallery}
        className="relative box-border flex h-[150vh] gap-[2vw] overflow-hidden bg-[#FAF7F2] p-[2vw] rounded-[2.5rem] mx-4 md:mx-12 border border-black/5"
      >
        <Column images={[IMAGES[0], IMAGES[1], IMAGES[2]]} y={y} />
        <Column images={[IMAGES[3], IMAGES[4], IMAGES[5]]} y={y2} />
        <Column images={[IMAGES[6], IMAGES[7], IMAGES[8]]} y={y3} />
        <Column images={[IMAGES[9], IMAGES[10], IMAGES[11]]} y={y4} />
      </div>
    </section>
  );
};

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

export default LifeAtNeidhal;
