"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Locations", href: "/locations" },
  { label: "Media", href: "/media" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show dock at the very top or when scrolling up
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold -> hide
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up -> show
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const isBookTrial = pathname === "/book-trial";

  return (
    <>
      {/* Top Header: Centered Logo and Brand Name */}
      <div className="absolute top-0 left-0 right-0 z-40 py-8 w-full flex justify-center pointer-events-none">
        <Link href="/" className="flex items-center gap-3 group pointer-events-auto select-none">
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
          <div className="flex flex-col text-left">
            <span className={cn(
              "font-display font-extrabold text-xl tracking-wider leading-none transition-colors duration-300",
              isBookTrial ? "text-black" : "text-white"
            )}>
              NEIDHAL
            </span>
            <span className={cn(
              "font-sans text-[10px] uppercase font-bold tracking-widest leading-none mt-1 transition-colors duration-300",
              isBookTrial ? "text-[#6F6F6F]" : "text-sand"
            )}>
              FOOTBALL CLUB
            </span>
          </div>
        </Link>
      </div>

      {/* Floating Bottom Nav Dock */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, x: "-50%", opacity: 0 }}
            animate={{ y: 0, x: "-50%", opacity: 1 }}
            exit={{ y: 100, x: "-50%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="fixed bottom-6 sm:bottom-8 left-1/2 z-50 w-[92%] sm:w-auto min-w-[280px] sm:max-w-xl flex items-center justify-between gap-2 sm:gap-4 md:gap-6 p-1.5 md:p-2 bg-[#0B1528]/95 backdrop-blur-md border border-white/10 rounded-full shadow-[0_15px_30px_-5px_rgba(0,0,0,0.3)]"
          >
            {/* Logo Icon on the left */}
            <Link 
              href="/" 
              className="relative h-7 w-7 sm:h-8 sm:w-8 shrink-0 overflow-hidden rounded-full border border-white/10 hover:scale-110 active:scale-95 transition-transform duration-200 cursor-pointer ml-1 bg-white/5 p-1 flex items-center justify-center"
              title="Home"
            >
              <Image
                src="/logo/neidhal_logo.png"
                alt="Neidhal Logo Mark"
                width={20}
                height={20}
                className="object-contain"
              />
            </Link>

            {/* Menu Links */}
            <nav className="flex items-center gap-0.5 sm:gap-1">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "font-sans font-semibold text-[10px] sm:text-[11px] md:text-xs tracking-wider uppercase transition-colors duration-200 relative px-2.5 py-1.5 rounded-full cursor-pointer select-none",
                      isActive ? "text-white font-bold" : "text-slate-400 hover:text-white"
                    )}
                  >
                    <span className="relative z-10">{link.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeDockBubble"
                        className="absolute inset-0 bg-white/10 rounded-full z-0 border border-white/5"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* CTA Button on the right */}
            <Link
              href="/book-trial"
              className="inline-flex items-center gap-1 bg-sand text-primary hover:bg-[#FAF7F2] text-[10px] sm:text-xs font-sans font-bold uppercase tracking-wider px-3.5 py-2 rounded-full transition-transform active:scale-95 hover:scale-[1.03] cursor-pointer mr-1"
            >
              <span className="hidden sm:inline">Join Neidhal</span>
              <span className="sm:hidden">Join</span>
              <ArrowRight size={10} className="shrink-0" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
