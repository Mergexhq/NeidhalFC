"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Navbar from "@/components/layout/Navbar";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  crumbs?: { label: string; href?: string }[];
  showBreadcrumbs?: boolean;
  bgImage?: string;
  variant?: "dark" | "white";
  align?: "left" | "center";
  showWave?: boolean;
}

export const PageHero: React.FC<PageHeroProps> = ({ 
  title, 
  subtitle, 
  crumbs = [],
  showBreadcrumbs = true,
  bgImage,
  variant = "dark",
  align,
  showWave
}) => {
  const isWhite = variant === "white";
  const contentAlign = align || (isWhite ? "center" : "left");
  const renderWave = showWave !== undefined ? showWave : !isWhite;

  return (
    <section 
      className={`relative overflow-hidden pt-36 pb-16 md:pb-20 border-b ${
        isWhite 
          ? "bg-white border-[#0B1F3A]/10 text-[#0B1F3A]" 
          : "bg-[#0B1F3A] border-white/5 text-white"
      }`}
    >
      {/* Background Image if specified and not white variant */}
      {bgImage && !isWhite && (
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image
            src={bgImage}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center scale-105"
          />
          {/* Dark Overlay Gradient for contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1F3A]/90 via-[#0B1F3A]/75 to-[#0B1F3A]/95 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      )}

      <Navbar isLightHeader={isWhite} />

      {/* Visual Accents (for dark variant only) */}
      {!isWhite && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent pointer-events-none z-1" />
      )}
      
      {/* Decorative Wave lines */}
      {renderWave && !isWhite && (
        <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden pointer-events-none opacity-20 z-1">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-12 text-sand">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,88.43,26.85,154.06,44.76,227.18,63.86,321.39,56.44Z" fill="currentColor"></path>
          </svg>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`flex flex-col ${contentAlign === "center" ? "items-center text-center mx-auto" : "items-start text-left"}`}
        >
          {/* Breadcrumbs */}
          {showBreadcrumbs && (
            <nav className={`flex items-center gap-1.5 text-xs mb-6 uppercase tracking-widest font-display ${
              isWhite ? "text-[#0B1F3A]/60" : "text-slate-400"
            }`}>
              <Link href="/" className="hover:text-[#BCA688] transition-colors duration-200">
                Home
              </Link>
              {crumbs.map((crumb, idx) => (
                <React.Fragment key={idx}>
                  <ChevronRight size={12} className={isWhite ? "text-[#0B1F3A]/30" : "text-slate-600"} />
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-[#BCA688] transition-colors duration-200">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-[#BCA688] font-semibold">{crumb.label}</span>
                  )}
                </React.Fragment>
              ))}
              {crumbs.length === 0 && (
                <>
                  <ChevronRight size={12} className={isWhite ? "text-[#0B1F3A]/30" : "text-slate-600"} />
                  <span className="text-[#BCA688] font-semibold">{title}</span>
                </>
              )}
            </nav>
          )}

          <h1 className={`text-4xl sm:text-5xl md:text-6xl font-semibold tracking-wide mb-4 font-display ${
            isWhite ? "text-[#0B1F3A]" : "text-white"
          }`}>
            {title}
          </h1>
          {subtitle && (
            <p className={`text-base sm:text-lg md:text-xl max-w-2xl font-light ${
              isWhite ? "text-[#0B1F3A]/70" : "text-slate-300"
            }`}>
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
