"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

export const JoinNeidhal: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-[#FAF7F2] text-white relative overflow-hidden">
      <div className="max-w-[88rem] mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative w-full rounded-[2.5rem] overflow-hidden min-h-[480px] md:min-h-[580px] p-8 sm:p-12 md:p-16 flex flex-col justify-between text-left shadow-2xl group"
        >
          {/* Background Image */}
          <Image
            src="/images/about/booking_cta_bg.webp"
            alt="Join Neidhal FC background"
            fill
            sizes="100vw"
            className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-[800ms]"
            priority
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/55 mix-blend-multiply z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 z-[1]" />

          {/* Logo container inside the CTA card (Top-Left) */}
          <div className="relative z-10 mb-8 sm:mb-12">
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
            <span className="text-[10px] uppercase font-extrabold tracking-[0.25em] text-[#BCA688] mb-3 block">
              GET STARTED
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-semibold font-raleway tracking-tight leading-[1.1] text-white mb-4 md:mb-6 uppercase">
              Let Your Child Fall in Love With Football.
            </h2>
            <p className="text-white/85 text-xs sm:text-sm md:text-base leading-relaxed font-light mb-8 max-w-lg">
              Book a free trial and experience a Neidhal training session.
            </p>

            {/* Actions Row */}
            <div className="flex flex-wrap items-center gap-4">
              {/* Primary: Book Trial */}
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FAF7F2] text-primary font-sans font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-95 shadow-md cursor-pointer select-none"
              >
                <span>Book a Free Trial</span>
                <ArrowRight size={14} />
              </Link>

              {/* Secondary: View Locations */}
              <Link
                href="/locations"
                className="inline-flex items-center justify-center gap-2 border border-white/40 hover:border-white text-white hover:bg-white hover:text-primary font-sans font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer select-none"
              >
                <MapPin size={14} />
                <span>View Locations</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default JoinNeidhal;
