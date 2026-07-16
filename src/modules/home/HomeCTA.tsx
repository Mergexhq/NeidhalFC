"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export const HomeCTA: React.FC = () => {
  return (
    <section className="py-6 md:py-8 bg-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-[88rem] mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden min-h-[380px] md:min-h-[460px] p-6 sm:p-8 md:p-12 flex flex-col justify-between text-left shadow-2xl group"
        >
          {/* Background Image */}
          <Image
            src="/images/about/booking_cta_bg.webp"
            alt="Book Your Trial background"
            fill
            sizes="100vw"
            className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-[800ms]"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-[#000000]/60 mix-blend-multiply z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-black/10 z-[1]" />

          {/* Logo (Top-Left) */}
          <div className="relative z-10 mb-4 sm:mb-6">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden">
                <Image
                  src="/logo/neidhal_logo.png"
                  alt="Neidhal FC Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-raleway font-extrabold text-sm sm:text-base tracking-wider leading-none text-white">
                  NEIDHAL
                </span>
                <span className="font-raleway text-[7px] sm:text-[8px] uppercase font-bold tracking-widest leading-none mt-1 text-[#BCA688]">
                  FOOTBALL CLUB
                </span>
              </div>
            </div>
          </div>

          {/* Text and Button (Bottom-Left) */}
          <div className="relative z-10 mt-auto max-w-2xl">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold font-sans tracking-wide leading-[1.15] text-white mb-4 md:mb-6">
              The Next Chapter Could Be Yours
            </h2>
            <p className="text-white/85 text-xs sm:text-sm md:text-base leading-relaxed font-light mb-6 md:mb-8 max-w-xl">
              The shore gave us our beginning. Every child who steps onto our field writes the next chapter. Come experience Neidhal FC through a trial session.
            </p>

            <Link
              href="https://cal.com/neidhal-fc/trial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-[#EAEDF1] hover:bg-white text-[#0B1F3A] text-sm sm:text-base font-bold tracking-wide px-6 sm:px-8 py-2.5 sm:py-3.5 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-md group/btn"
            >
              <span>Book a Free Trial</span>
              <ArrowUpRight size={20} className="text-[#0B1F3A] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeCTA;
