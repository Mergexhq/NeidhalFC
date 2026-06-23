"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Clock, User, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

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

/* ─────────────────────────────────────────────
   IMAGE CAROUSEL
 ───────────────────────────────────────────── */
function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((prev) => (prev + dir + images.length) % images.length);
    },
    [images.length]
  );

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 4000);
    return () => clearInterval(timer);
  }, [paginate]);

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.55, ease: "easeOut" as const } },
    exit: (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0, transition: { duration: 0.45, ease: "easeOut" as const } }),
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#0B1F3A]">
      <AnimatePresence custom={direction} mode="popLayout" initial={false}>
        <motion.div
          key={current}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <Image
            src={images[current]}
            alt={`${title} – view ${current + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority={current === 0}
          />
          {/* subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/60 via-transparent to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-200 cursor-pointer"
        aria-label="Previous"
      >
        <ChevronLeft size={16} />
      </button>
      <button
        onClick={() => paginate(1)}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-10 h-9 w-9 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-200 cursor-pointer"
        aria-label="Next"
      >
        <ChevronRight size={16} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => { setDirection(i > current ? 1 : -1); setCurrent(i); }}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              i === current ? "w-6 bg-white" : "w-1.5 bg-white/40"
            }`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   LOCATION CARD (BENTO GRID)
 ───────────────────────────────────────────── */
interface LocationCardProps {
  loc: LocationData;
  index: number;
}

export const LocationCard: React.FC<LocationCardProps> = ({ loc, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: 0.15 
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const mediaVariants = {
    hidden: { opacity: 0, scale: 0.97, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.65, ease: "easeOut" as const },
    },
  };

  const infoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.65, ease: "easeOut" as const },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-120px" }}
      id={loc.id}
      className="w-full font-sans"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 w-full">
        {/* ── Title / Header Block (Spans full width) ── */}
        <motion.div
          variants={headerVariants}
          className="col-span-1 lg:col-span-4 p-6 sm:p-8 rounded-[2rem] border border-primary/10 shadow-md bg-white flex flex-col md:flex-row md:items-center justify-between gap-4"
        >
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0077b6] mb-1.5">
              {loc.chapter} &middot; {loc.tagline}
            </p>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-[#0B1F3A] tracking-tight leading-none">
              {loc.title}
            </h2>
          </div>
          <p className="text-sm text-[#5A6E85] leading-relaxed italic border-l-2 border-[#0077b6] pl-4 max-w-xl md:py-1">
            &ldquo;{loc.personality}&rdquo;
          </p>
        </motion.div>

        {/* ── Carousel Block (Left side for all cards) ── */}
        <motion.div
          variants={mediaVariants}
          className="lg:col-span-2 h-[320px] sm:h-[380px] lg:h-[450px] rounded-[2rem] overflow-hidden border border-primary/10 shadow-lg bg-white relative lg:col-start-1 lg:row-start-2 lg:row-span-2"
        >
          <ImageCarousel images={loc.images} title={loc.title} />
        </motion.div>

        {/* ── Info & CTA Block (Right side top) ── */}
        <motion.div
          variants={infoVariants}
          className="lg:col-span-2 h-auto lg:h-[218px] p-6 sm:p-8 rounded-[2rem] border border-primary/10 shadow-lg bg-white flex flex-col justify-between gap-4 lg:col-start-3 lg:row-start-2"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <Calendar className="text-[#0077b6] shrink-0 mt-0.5" size={16} />
              <div>
                <span className="block text-[9px] font-bold uppercase tracking-widest text-[#0B1F3A]/50">Days</span>
                <span className="block text-xs text-[#0B1F3A] font-semibold mt-0.5">{loc.days}</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="text-[#0077b6] shrink-0 mt-0.5" size={16} />
              <div>
                <span className="block text-[9px] font-bold uppercase tracking-widest text-[#0B1F3A]/50">Timings</span>
                <span className="block text-xs text-[#0B1F3A] font-semibold mt-0.5 whitespace-pre-line leading-normal">{loc.times}</span>
              </div>
            </div>
            <div className="flex items-start gap-3 col-span-1 sm:col-span-2">
              <MapPin className="text-[#0077b6] shrink-0 mt-0.5" size={16} />
              <div>
                <span className="block text-[9px] font-bold uppercase tracking-widest text-[#0B1F3A]/50">Address</span>
                <span className="block text-xs text-[#0B1F3A] font-semibold mt-0.5 line-clamp-1">{loc.address}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 pt-3 border-t border-[#0B1F3A]/5">
            <div className="flex items-center gap-2">
              <User className="text-[#0077b6] shrink-0" size={15} />
              <span className="text-xs text-[#5A6E85]">Coach: <strong className="text-[#0B1F3A] font-bold">{loc.coach}</strong></span>
            </div>
            <Link
              href={`/book-trial?center=${loc.id}`}
              className="group inline-flex items-center gap-2.5 justify-center px-5 py-3 rounded-xl bg-[#0B1F3A] hover:bg-[#0077b6] text-white font-bold text-[10px] uppercase tracking-widest transition-all duration-300 shadow-md hover:shadow-xl shrink-0"
            >
              Book a Trial Here
              <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          </div>
        </motion.div>

        {/* ── Map Block (Right side bottom) ── */}
        <motion.div
          variants={infoVariants}
          className="lg:col-span-2 h-[216px] rounded-[2rem] overflow-hidden border border-primary/10 shadow-lg bg-white lg:col-start-3 lg:row-start-3"
        >
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
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LocationCard;
