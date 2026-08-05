"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

export default function NotFound() {
  return (
    <>
      <title>404 - Page Not Found | Neidhal FC</title>
      
      {/* 
        We use 'fixed inset-0 z-[9999]' to completely overlay 
        the page and cover/hide the layout's global Footer.
      */}
      <div className="fixed inset-0 z-[9999] bg-[#FAF7F2] flex flex-col items-center justify-center px-6 text-center select-none">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center max-w-md gap-8"
        >
          {/* Large 404 */}
          <div className="flex flex-col items-center gap-2">
            <h1 className="font-raleway font-black text-9xl md:text-[140px] text-[#0B1F3A] tracking-tighter leading-none">
              404
            </h1>
            <span className="font-sans font-extrabold uppercase tracking-[0.25em] text-[#D9C3A5] text-xs md:text-sm">
              Out of Play
            </span>
          </div>

          {/* Text message */}
          <div className="flex flex-col gap-3">
            <h2 className="font-raleway font-bold text-2xl text-[#0B1F3A] tracking-tight">
              Lost Your Bearings?
            </h2>
            <p className="text-[#6F6F6F] text-sm md:text-base font-normal leading-relaxed">
              The page you are looking for has crossed the touchline and is out of bounds.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-2">
            <Link
              href="/"
              className="group inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-[#0B1F3A] hover:bg-[#D9C3A5] text-white hover:text-[#0B1F3A] font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-[1.03] active:scale-95"
            >
              Back to Homepage
              <MoveRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
}
