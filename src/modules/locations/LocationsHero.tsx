"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";

export const LocationsHero: React.FC = () => {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 600], ["0%", "15%"]);
  const heroScale = useTransform(scrollY, [0, 600], [1.15, 1.25]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen min-h-[600px] overflow-hidden flex items-end">
      {/* Parallax background (zoomed and padded to prevent corner visible issues) */}
      <motion.div
        style={{ y: heroY, scale: heroScale }}
        className="absolute -top-[10%] -left-[5%] w-[110%] h-[120%] origin-center"
      >
        <Image
          src="/location.png"
          alt="Neidhal FC Training Ground"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Dark black gradient overlay (bottom 60% of hero, behind text) */}
      <div className="absolute bottom-0 left-0 right-0 h-[60%] bg-gradient-to-t from-black/85 via-black/35 to-transparent pointer-events-none z-10" />

      {/* Hero content */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 pb-14 sm:pb-20"
      >
        {/* Chapter label */}
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="inline-block text-[10px] font-bold uppercase tracking-[0.3em] text-[#0077b6] mb-5"
        >
          ◎ Our Training Grounds
        </motion.span>

        {/* Big headline */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: 0.3 }}
            className="font-condensed text-[clamp(3.5rem,10vw,8rem)] leading-[0.92] text-white tracking-tight"
          >
            Find Your
          </motion.h1>
        </div>
        <div className="overflow-hidden mb-8">
          <motion.h1
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] as const, delay: 0.42 }}
            className="font-condensed text-[clamp(3.5rem,10vw,8rem)] leading-[0.92] tracking-tight"
            style={{
              background: "linear-gradient(to right, #00b4d8, #0077b6)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Training Hub
          </motion.h1>
        </div>

        {/* Sub + scroll hint */}
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white/60 text-sm sm:text-base max-w-md leading-relaxed"
          >
            Three coastal training hubs across South Chennai ECR — where football meets the sea.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex items-center gap-2 text-white/40 text-xs uppercase tracking-widest"
          >
            <ArrowDown size={14} className="animate-bounce" />
            Scroll to explore
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom-edge accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
        className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#0077b6]/60 to-transparent origin-center z-10"
      />
    </section>
  );
};

export default LocationsHero;
