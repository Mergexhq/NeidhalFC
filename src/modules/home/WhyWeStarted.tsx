"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RevealText } from "@/components/ui/reveal-text";

export const WhyWeStarted: React.FC = () => {
  return (
    <section className="w-full bg-[#FAF7F2] py-24 sm:py-32 md:py-40 px-6 md:px-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
      {/* Subtle decorative grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0B1F3A/3_1px,transparent_1px),linear-gradient(to_bottom,#0B1F3A/3_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-30" />

      {/* Main Copy Wrapper */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-10 md:gap-14">
        
        {/* Editorial Heading */}
        <RevealText
          as="h2"
          split="word"
          text="Why We Started Neidhal FC"
          className="font-raleway font-semibold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[46px] text-[#0B1F3A] uppercase tracking-tight leading-none whitespace-nowrap max-w-none"
          whileInView
          once
        />

        {/* Story copy structured like Image 2 */}
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-5 text-center text-base sm:text-lg md:text-[21px] text-[#0B1F3A]/85 font-light leading-[1.55] max-w-3xl font-sans">
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-raleway font-semibold text-xl sm:text-2xl md:text-[26px] text-[#0B1F3A] leading-tight"
          >
            Football has changed.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            Children are often taught where to stand before they&apos;re encouraged to think.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We started Neidhal FC because we believe the game deserves more than that.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            We want young players to dribble with confidence, make fearless decisions, express their own style, and enjoy every moment on the pitch.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Because football isn&apos;t just about fitting into a system.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-raleway font-semibold text-lg sm:text-xl md:text-[22px] text-[#0B1F3A]"
          >
            It&apos;s about finding your own game.
          </motion.p>
        </div>

        {/* Rounded Pill CTA Button (Image 2 style) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-4"
        >
          <Link
            href="/about"
            className="inline-block bg-[#E8E3D7] hover:bg-[#0B1F3A] text-[#0B1F3A] hover:text-white font-sans font-medium text-sm sm:text-base px-10 py-4 rounded-full transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer select-none"
          >
            More About Us
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default WhyWeStarted;
