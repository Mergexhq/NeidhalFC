"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Locations", href: "/locations" },
  { label: "Coaches", href: "/coaches" },
  { label: "Gallery", href: "/gallery" },
  { label: "Events", href: "/events" },
  { label: "News", href: "/news" },
];

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 w-full",
        isScrolled 
          ? "bg-[#FAF7F2]/80 backdrop-blur-md border-b border-black/5 py-3 shadow-sm" 
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative h-12 w-12 overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo/neidhal_logo.png"
                alt="Neidhal FC Logo"
                fill
                sizes="48px"
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className={cn(
                "font-display font-extrabold text-xl tracking-wider leading-none transition-colors duration-300",
                isScrolled ? "text-black" : "text-white"
              )}>
                NEIDHAL
              </span>
              <span className={cn(
                "font-sans text-[10px] uppercase font-bold tracking-widest leading-none mt-1 transition-colors duration-300",
                isScrolled ? "text-[#6F6F6F]" : "text-sand"
              )}>
                FOOTBALL CLUB
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "font-sans font-medium text-sm tracking-wide transition-colors duration-200 relative py-1 cursor-pointer",
                    isActive 
                      ? (isScrolled ? "text-[#000000] font-semibold" : "text-white font-semibold") 
                      : (isScrolled ? "text-[#6F6F6F] hover:text-[#000000]" : "text-slate-300 hover:text-white")
                  )}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className={cn(
                        "absolute bottom-0 left-0 right-0 h-[2px] rounded-full",
                        isScrolled ? "bg-[#000000]" : "bg-white"
                      )}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA Button */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/join"
              className={cn(
                "inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sans font-bold text-xs tracking-wider uppercase transition-all duration-300 transform hover:scale-[1.03] cursor-pointer",
                isScrolled 
                  ? "bg-[#000000] hover:bg-[#000000]/90 text-[#FFFFFF]" 
                  : "bg-sand hover:bg-[#FAF7F2] text-primary hover:text-primary"
              )}
            >
              Join Neidhal
              <ArrowRight size={14} />
            </Link>
          </div>

          {/* Mobile Menu Toggle button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "lg:hidden p-1 focus:outline-none cursor-pointer transition-colors duration-200",
              isScrolled ? "text-[#6F6F6F] hover:text-[#000000]" : "text-slate-300 hover:text-white"
            )}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-[#FAF7F2]/95 backdrop-blur-md border-b border-black/5 overflow-hidden w-full"
          >
            <div className="px-4 pt-3 pb-6 space-y-3">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "block px-3 py-2.5 rounded-xl font-sans font-semibold text-base transition-colors duration-200 cursor-pointer",
                      isActive 
                        ? "bg-black/5 text-black font-bold" 
                        : "text-[#6F6F6F] hover:bg-black/5 hover:text-black"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div className="pt-4 px-3">
                <Link
                  href="/join"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl font-sans font-bold text-sm tracking-wider uppercase bg-[#000000] hover:bg-[#000000]/90 text-[#FFFFFF] shadow-md transition-all cursor-pointer"
                >
                  Join Neidhal
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
