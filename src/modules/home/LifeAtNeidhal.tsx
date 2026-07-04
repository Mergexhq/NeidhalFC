"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame, useVelocity } from "framer-motion";
import { Camera } from "lucide-react";

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
  const directionFactor = useRef<number>(1);
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

export const LifeAtNeidhal: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [viewH, setViewH] = useState(0);

  useEffect(() => {
    const resize = () => setViewH(window.innerHeight);
    window.addEventListener("resize", resize);
    resize();
    return () => window.removeEventListener("resize", resize);
  }, []);

  const { scrollYProgress: textProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const textY = useTransform(textProgress, [0, 1], [60, -60]);

  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ["start end", "end start"],
  });
  const h = viewH;
  const yC1 = useTransform(scrollYProgress, [0, 1], [0, h * 1.5]);
  const yC2 = useTransform(scrollYProgress, [0, 1], [0, h * 2.2]);

  const col1 = IMAGES.filter((_, i) => i % 2 === 0);
  const col2 = IMAGES.filter((_, i) => i % 2 !== 0);

  return (
    <section
      ref={sectionRef}
      className="py-24 bg-[#FAF7F2] relative overflow-hidden border-b border-black/5"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,31,58,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,31,58,0.01)_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none" />

      {/* DESKTOP */}
      <div className="hidden md:flex items-start gap-0 max-w-[1500px] mx-auto px-4 sm:px-8 md:px-12">
        <div
          ref={galleryRef}
          className="flex-1 flex gap-4 lg:gap-5 min-w-0 pr-10 lg:pr-16 h-[150vh] overflow-hidden relative"
        >
          <motion.div
            className="flex flex-col gap-4 lg:gap-5 flex-1 absolute left-0 w-[calc(50%-8px)] -top-[30%]"
            style={{ y: yC1 }}
          >
            {col1.map((src, i) => (
              <div
                key={"c1-" + i}
                className="w-full overflow-hidden rounded-2xl border border-black/5 shadow-sm bg-slate-100"
                style={{ aspectRatio: ASPECT_RATIOS[i * 2] }}
              >
                <Image
                  src={src}
                  alt="Neidhal FC training session"
                  width={600}
                  height={450}
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
                  priority={i === 0}
                />
              </div>
            ))}
          </motion.div>

          <motion.div
            className="flex flex-col gap-4 lg:gap-5 flex-1 absolute right-0 w-[calc(50%-8px)] -top-[60%]"
            style={{ y: yC2 }}
          >
            {col2.map((src, i) => (
              <div
                key={"c2-" + i}
                className="w-full overflow-hidden rounded-2xl border border-black/5 shadow-sm bg-slate-100"
                style={{ aspectRatio: ASPECT_RATIOS[i * 2 + 1] ?? "4/3" }}
              >
                <Image
                  src={src}
                  alt="Neidhal FC coastal football"
                  width={600}
                  height={450}
                  className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div className="w-[360px] lg:w-[420px] xl:w-[460px] shrink-0 sticky top-1/4 self-start">
          <motion.div style={{ y: textY }} className="flex flex-col gap-6">
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-accent flex items-center gap-1.5">
              <Camera size={12} />
              Media Gallery
            </span>
            <h2 className="text-4xl lg:text-5xl xl:text-6xl font-semibold font-display tracking-tight leading-[1.1] text-primary">
              Life at <br />
              <span className="italic font-light">Neidhal</span>
            </h2>
            <p className="text-[#5A6E85] text-sm lg:text-base max-w-xs leading-relaxed">
              Glance through daily pod routines, intense barefoot conditioning,
              and coastal turf training action.
            </p>
            <div className="flex items-center gap-3 mt-2">
              <div className="h-px w-12 bg-[#0B1F3A]/15" />
              <div className="h-1.5 w-1.5 rounded-full bg-accent" />
              <div className="h-px w-12 bg-[#0B1F3A]/15" />
            </div>
            <p className="text-[11px] uppercase tracking-widest text-[#0B1F3A]/30 mt-1">
              {IMAGES.length} moments captured
            </p>
          </motion.div>
        </div>
      </div>

      {/* MOBILE */}
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
          <VelocityRow images={IMAGES} baseVelocity={-1.8} widthOffset={0} ratioOffset={0} />
        </div>
        <VelocityRow images={[...IMAGES].reverse()} baseVelocity={1.8} widthOffset={3} ratioOffset={2} />
      </div>
    </section>
  );
};

export default LifeAtNeidhal;
