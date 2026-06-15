"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  crumbs?: { label: string; href?: string }[];
}

export const PageHero: React.FC<PageHeroProps> = ({ title, subtitle, crumbs = [] }) => {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 border-b border-white/5 bg-linear-to-b from-primary to-primary-dark">
      {/* Visual Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-accent/10 via-transparent to-transparent pointer-events-none" />
      
      {/* Decorative Wave lines */}
      <div className="absolute bottom-0 left-0 right-0 h-16 overflow-hidden pointer-events-none opacity-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="absolute bottom-0 w-full h-12 text-sand">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V0C26.9,8.75,57.05,18.3,88.43,26.85,154.06,44.76,227.18,63.86,321.39,56.44Z" fill="currentColor"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center md:text-left"
        >
          {/* Breadcrumbs */}
          <nav className="flex justify-center md:justify-start items-center gap-1.5 text-xs text-slate-400 mb-6 uppercase tracking-widest font-display">
            <Link href="/" className="hover:text-sand transition-colors duration-200">
              Home
            </Link>
            {crumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                <ChevronRight size={12} className="text-slate-600" />
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-sand transition-colors duration-200">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-sand font-semibold">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
            {crumbs.length === 0 && (
              <>
                <ChevronRight size={12} className="text-slate-600" />
                <span className="text-sand font-semibold">{title}</span>
              </>
            )}
          </nav>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4 font-display">
            {title}
          </h1>
          {subtitle && (
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl font-light">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default PageHero;
