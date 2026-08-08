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
          className="font-raleway font-bold text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-[46px] text-[#0B1F3A] uppercase tracking-tight leading-none whitespace-nowrap max-w-none"
          whileInView
          once
        />

        {/* Story copy structured as 5 lines forming an inverted triangle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center text-center font-raleway font-normal text-lg sm:text-xl md:text-[23px] text-[#0B1F3A]/90 leading-[1.65] max-w-5xl mx-auto space-y-1.5"
        >
          {/* Line 1 (Widest) */}
          <span className="block md:inline-block">
            To bring the <strong className="font-semibold text-[#0B1F3A]">soul</strong> back into football by creating <strong className="font-semibold text-[#0B1F3A]">fearless, skillful players</strong>
          </span>

          {/* Line 2 */}
          <span className="block md:inline-block">
            who play with <strong className="font-semibold text-[#0B1F3A]">flair</strong>, <strong className="font-semibold text-[#0B1F3A]">freedom</strong>, and <strong className="font-semibold text-[#0B1F3A]">creativity</strong> - not just tactics.
          </span>

          {/* Line 3 */}
          <span className="block md:inline-block text-[#0B1F3A]/80 pt-2 md:pt-3">
            At Neidhal FC, we believe football should <strong className="font-semibold text-[#0B1F3A]">inspire</strong>
          </span>

          {/* Line 4 */}
          <span className="block md:inline-block text-[#0B1F3A]/80">
            <strong className="font-semibold text-[#0B1F3A]">expression</strong>, <strong className="font-semibold text-[#0B1F3A]">joy</strong>, and <strong className="font-semibold text-[#0B1F3A]">individuality</strong>,
          </span>

          {/* Line 5 (Narrowest) */}
          <span className="block md:inline-block text-[#0B1F3A]/80 font-normal">
            not robotic repetition.
          </span>
        </motion.div>

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
