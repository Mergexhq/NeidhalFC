"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Locations", href: "/locations" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show header at the very top or when scrolling up
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold -> hide and close mobile menu
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up -> show
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Left Pill: Logo & Brand */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed top-4 left-4 md:left-8 z-50 flex items-center p-1.5 md:p-2 pl-3 md:pl-4 pr-4 md:pr-6 bg-[#0B1528]/60 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] pointer-events-auto"
          >
            <Link href="/" className="flex items-center gap-2.5 pl-1 group select-none cursor-pointer">
              <div className="relative h-10 w-10 overflow-hidden transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/logo/neidhal_logo.png"
                  alt="Neidhal FC Logo"
                  fill
                  sizes="40px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col text-left whitespace-nowrap">
                <span className="font-display font-extrabold text-sm sm:text-base tracking-wider leading-none text-white">
                  NEIDHAL
                </span>
                <span className="font-sans text-[7px] sm:text-[8px] uppercase font-bold tracking-widest leading-none mt-1 text-sand">
                  FOOTBALL CLUB
                </span>
              </div>
            </Link>
          </motion.div>

          {/* Right Pill: Nav Menu & CTA */}
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed top-4 right-4 md:right-8 z-50 flex flex-col items-end gap-2 pointer-events-none"
          >
            {/* Main Nav Pill */}
            <div className="flex items-center gap-4 p-1.5 md:p-2 pl-4 md:pl-6 bg-[#0B1528]/60 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.25)] pointer-events-auto">
              {/* Desktop Nav Links */}
              <div className="hidden md:flex items-center gap-6">
                <nav className="flex items-center gap-1">
                  {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "font-sans font-semibold text-[11px] uppercase tracking-wider transition-colors duration-200 relative px-3.5 py-2 rounded-full cursor-pointer select-none",
                          isActive ? "text-white font-bold" : "text-slate-300 hover:text-white"
                        )}
                      >
                        <span className="relative z-10">{link.label}</span>
                        {isActive && (
                          <motion.span
                            layoutId="activeTab"
                            className="absolute inset-0 bg-white/10 rounded-full z-0 border border-white/5"
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </Link>
                    );
                  })}
                </nav>

                <Link
                  href="/book-trial"
                  className="inline-flex items-center gap-1.5 bg-sand text-primary hover:bg-[#FAF7F2] text-xs font-sans font-bold uppercase tracking-wider px-4.5 py-2.5 rounded-full transition-transform active:scale-95 hover:scale-[1.03] cursor-pointer"
                >
                  Join Neidhal
                  <ArrowRight size={12} className="shrink-0" />
                </Link>
              </div>

              {/* Mobile Controls */}
              <div className="md:hidden flex items-center gap-1.5 pointer-events-auto">
                <Link
                  href="/book-trial"
                  className="inline-flex items-center gap-1 bg-sand text-primary hover:bg-[#FAF7F2] text-[10px] font-sans font-bold uppercase tracking-wider px-3.5 py-2 rounded-full transition-transform active:scale-95 hover:scale-[1.03] cursor-pointer"
                >
                  Join
                  <ArrowRight size={10} className="shrink-0" />
                </Link>
                
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="h-9 w-9 rounded-full bg-white/10 hover:bg-white/15 flex items-center justify-center text-white border border-white/10 transition-colors cursor-pointer"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? <X size={16} /> : <Menu size={16} />}
                </button>
              </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="md:hidden w-[180px] p-2.5 bg-[#0B1528]/85 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_16px_48px_rgba(0,0,0,0.3)] flex flex-col gap-1.5 pointer-events-auto origin-top-right"
                >
                  <nav className="flex flex-col gap-1">
                    {NAV_LINKS.map((link) => {
                      const isActive = pathname === link.href;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          className={cn(
                            "font-sans font-semibold text-[11px] tracking-wider uppercase transition-colors duration-200 block px-4 py-2.5 rounded-2xl cursor-pointer select-none text-right",
                            isActive ? "text-white bg-white/10 font-bold" : "text-slate-300 hover:text-white"
                          )}
                        >
                          {link.label}
                        </Link>
                      );
                    })}
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
