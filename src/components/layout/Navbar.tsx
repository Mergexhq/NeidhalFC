"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Locations", href: "/locations" },
  { label: "Contact", href: "/contact" },
];

interface NavbarProps {
  disableDock?: boolean;
  forceWhiteText?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ disableDock = false, forceWhiteText = false }) => {
  const pathname = usePathname();
  const [isDockActive, setIsDockActive] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (disableDock) return;

    const handleScroll = () => {
      // Transition to bottom dock when scrolled past 180px
      if (window.scrollY > 180) {
        setIsDockActive(true);
      } else {
        setIsDockActive(false);
      }
    };

    // Initialize state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [disableDock]);

  // Close mobile menu on route change
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMobileMenuOpen(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [pathname]);

  // Determine if the current page's hero has a dark background
  const isDarkHero =
    forceWhiteText ||
    pathname === "/about" ||
    pathname === "/contact" ||
    pathname.startsWith("/utility") ||
    pathname === "/not-found" ||
    pathname === "/404";

  return (
    <AnimatePresence>
      {!isDockActive ? (
        <motion.div
          key="hero-nav"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="absolute top-0 left-0 w-full z-40 pointer-events-none"
        >
          {/* Left Logo & Brand (No pill, sits directly on background image) */}
          <div className="absolute top-6 left-6 md:left-12 z-40 flex items-center pointer-events-auto">
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
                <span className={cn(
                  "font-display font-extrabold text-sm sm:text-base tracking-wider leading-none transition-colors",
                  isDarkHero ? "text-white" : "text-primary"
                )}>
                  NEIDHAL
                </span>
                <span className={cn(
                  "font-sans text-[7px] sm:text-[8px] uppercase font-bold tracking-widest leading-none mt-1 transition-colors",
                  isDarkHero ? "text-sand" : "text-[#BCA688]"
                )}>
                  FOOTBALL CLUB
                </span>
              </div>
            </Link>
          </div>

          {/* Right Nav Menu & CTA (No pill, sits directly on background image) */}
          <div className="absolute top-6 right-6 md:right-12 z-40 flex flex-col items-end gap-2 pointer-events-none">
            {/* Main Nav Items Container */}
            <div className="flex items-center gap-4 md:gap-8 pointer-events-auto">
              {/* Desktop Nav Links */}
              <div className="hidden md:flex items-center">
                <nav className="flex items-center gap-1">
                  {NAV_LINKS.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={cn(
                          "font-sans font-semibold text-[11px] uppercase tracking-wider transition-colors duration-200 relative px-3.5 py-2 rounded-full cursor-pointer select-none",
                          isActive 
                            ? (isDarkHero ? "text-white font-bold" : "text-primary font-bold")
                            : (isDarkHero ? "text-slate-300 hover:text-white" : "text-primary/70 hover:text-primary")
                        )}
                      >
                        <span className="relative z-10">{link.label}</span>
                        {isActive && (
                          <motion.span
                            layoutId="activeTab"
                            className={cn(
                              "absolute inset-0 rounded-full z-0 border",
                              isDarkHero 
                                ? "bg-white/10 border-white/5" 
                                : "bg-primary/5 border-primary/10"
                            )}
                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                          />
                        )}
                      </Link>
                    );
                  })}
                </nav>
              </div>

              {/* Mobile Controls */}
              <div className="md:hidden flex items-center gap-2 pointer-events-auto">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={cn(
                    "h-9 w-9 rounded-full flex items-center justify-center border transition-colors cursor-pointer",
                    isDarkHero
                      ? "text-white bg-white/10 hover:bg-white/15 border-white/10"
                      : "text-primary bg-primary/5 hover:bg-primary/10 border-primary/10"
                  )}
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
                  className="md:hidden w-[180px] p-2.5 bg-[#0B1528]/85 backdrop-blur-xl border border-white/10 rounded-3xl shadow-[0_16px_48px_rgba(0,0,0,0.3)] flex flex-col gap-1.5 pointer-events-auto origin-top-right mt-2"
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
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="dock-nav"
          initial={{ y: 80, x: "-50%", opacity: 0 }}
          animate={{ y: 0, x: "-50%", opacity: 1 }}
          exit={{ y: 80, x: "-50%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-1/2 z-50 flex items-center gap-2.5 md:gap-4 p-2.5 px-5 bg-[#0B1528]/85 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_-8px_32px_rgba(0,0,0,0.3)] pointer-events-auto whitespace-nowrap"
        >
          {/* Links */}
          <nav className="flex items-center gap-0.5 md:gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-sans font-semibold text-[9px] md:text-[11px] uppercase tracking-wider transition-colors duration-200 relative px-2.5 md:px-3.5 py-1.5 rounded-full cursor-pointer select-none",
                    isActive ? "text-white font-bold" : "text-slate-300 hover:text-white"
                  )}
                >
                  <span className="relative z-10">{link.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeTabDock"
                      className="absolute inset-0 bg-white/10 rounded-full z-0 border border-white/5"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Navbar;
