"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Bebas_Neue } from "next/font/google";
import Navbar from "@/components/layout/Navbar";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export default function NotFound() {
  return (
    <>
      <title>404 - Lost The Ball? | Neidhal FC</title>
      
      {/* Fullscreen 404 Hero Container */}
      <div className="fixed inset-0 z-[9999] bg-[#03070E] flex flex-col justify-between text-center select-none overflow-hidden">
        
        {/* Responsive Background Images */}
        <div className="absolute inset-0 z-0">
          {/* Desktop Background */}
          <div className="hidden md:block relative w-full h-full">
            <Image
              src="/images/404/404-bg-desktop.webp"
              alt="Neidhal FC 404 Page Off The Pitch"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>
          {/* Mobile Background */}
          <div className="block md:hidden relative w-full h-full">
            <Image
              src="/images/404/404-bg-mobile.webp"
              alt="Neidhal FC 404 Page Off The Pitch"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          </div>

          {/* Natural subtle dark overlay for legibility */}
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>

        {/* Top Navbar */}
        <Navbar />

        {/* Centered Content directly over the background image */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-12 my-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-5xl mx-auto flex flex-col items-center text-center w-full"
          >
            {/* Long Condensed Bebas Neue 404 Typography with Top Solid -> Bottom Transparent Gradient */}
            <div className="relative select-none pointer-events-none">
              <span 
                className={`${bebasNeue.className} text-[36vw] sm:text-[30vw] md:text-[24vw] lg:text-[22rem] leading-none tracking-widest uppercase text-white block select-none`}
                style={{
                  opacity: 0.55,
                  maskImage: "linear-gradient(to bottom, rgba(255,255,255,1) 20%, rgba(255,255,255,0.3) 65%, transparent 95%)",
                  WebkitMaskImage: "linear-gradient(to bottom, rgba(255,255,255,1) 20%, rgba(255,255,255,0.3) 65%, transparent 95%)",
                }}
              >
                404
              </span>
            </div>

            {/* Text Copy overlapping the bottom of 404 */}
            <div className="-mt-16 sm:-mt-24 md:-mt-32 lg:-mt-36 relative z-10 flex flex-col items-center text-center">
              {/* Headline */}
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white uppercase tracking-tight leading-tight mb-3 drop-shadow-md">
                LOST THE BALL?
              </h1>

              {/* Subheading */}
              <p className="font-sans font-medium text-base sm:text-lg md:text-xl text-sand-light tracking-wide mb-3 drop-shadow-sm">
                Looks like this page went off the pitch.
              </p>

              {/* Body description */}
              <p className="text-xs sm:text-sm md:text-base text-slate-200 font-light leading-relaxed mb-2 max-w-md drop-shadow-sm">
                The page you&apos;re looking for doesn&apos;t exist or may have moved.
              </p>

              <p className="text-xs sm:text-sm md:text-base text-white font-medium mb-8 drop-shadow-sm">
                Let&apos;s get you back to the game.
              </p>

              {/* CTA Button */}
              <Link
                href="/"
                className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-sand hover:bg-white text-[#0B1F3A] font-sans font-bold text-xs sm:text-sm uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>Back to Home</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

          </motion.div>
        </div>

        {/* Bottom spacing balance */}
        <div className="h-6 relative z-10" />
      </div>
    </>
  );
}
