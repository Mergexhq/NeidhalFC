"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, SliderContainer, Slider } from "@/components/carousel";
import { Letter3DSwap } from "@/components/ui/letter-3d-swap";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Locations", href: "/locations" },
  { label: "Contact", href: "/contact" },
];

const CAROUSEL_IMAGES = [
  {
    src: "/images/locations/injambakkam-14.webp",
    label: "ECR Injambakkam Turf",
    tag: "Injambakkam Hub",
  },
  {
    src: "/images/locations/kottivakkam-6.webp",
    label: "Valmiki Nagar Turf",
    tag: "Kottivakkam Hub",
  },
  {
    src: "/images/locations/nandanam-7.webp",
    label: "Lotus Colony Turf",
    tag: "Nandanam Hub",
  },
];

interface NavbarProps {
  disableDock?: boolean;
  forceWhiteText?: boolean;
}

// Custom animated asymmetric 2-line Hamburger Button
const HamburgerButton = ({
  isOpen,
  onClick,
  isDark,
  isScrolled,
}: {
  isOpen: boolean;
  onClick: () => void;
  isDark: boolean;
  isScrolled: boolean;
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col justify-center items-center w-12 h-12 rounded-full border transition-all pointer-events-auto relative z-50 cursor-pointer group shadow-lg",
        isOpen
          ? "bg-[#FAF7F2] border-[#0B1F3A]/15 text-[#0B1F3A]"
          : isScrolled
            ? "bg-[#FAF7F2]/90 backdrop-blur-md border-[#0B1F3A]/15 hover:border-[#0B1F3A]/30 text-[#0B1F3A] hover:scale-105"
            : isDark
              ? "bg-white/10 backdrop-blur-md border-white/20 hover:border-white/40 text-white hover:scale-105"
              : "bg-[#FAF7F2]/90 backdrop-blur-md border-[#0B1F3A]/15 hover:border-[#0B1F3A]/30 text-[#0B1F3A] hover:scale-105"
      )}
      aria-label="Toggle menu"
    >
      <div className="flex flex-col gap-1.5 justify-center items-center w-6 h-3 relative">
        <motion.span
          animate={isOpen ? { rotate: 45, y: 4, width: "24px" } : { rotate: 0, y: 0, width: "24px" }}
          transition={{ duration: 0.2 }}
          className="block h-[2px] bg-current rounded-full"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -4, width: "24px" } : { rotate: 0, y: 0, width: "24px" }}
          transition={{ duration: 0.2 }}
          className="block h-[2px] bg-current rounded-full"
        />
      </div>
    </button>
  );
};

export const Navbar: React.FC<NavbarProps> = ({
  disableDock = false,
  forceWhiteText = false,
}) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false, stopOnMouseEnter: false })
  );

  // Monitor scroll for fixed bar transitions
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when overlay is active
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);



  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isDarkHero =
    forceWhiteText ||
    pathname === "/contact" ||
    pathname.startsWith("/utility") ||
    pathname === "/not-found" ||
    pathname === "/404";

  return (
    <>
      {/* Top-Left Logo (visible in hero, fades out on scroll) */}
      <motion.div
        animate={{ opacity: isScrolled ? 0 : 1, y: isScrolled ? -20 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed top-6 left-6 md:top-8 md:left-12 z-40 flex pointer-events-none"
      >
        <Link href="/" className="group flex items-center gap-3.5 select-none cursor-pointer pointer-events-auto">
          <div className="relative h-12 w-12 sm:h-14 sm:w-14 overflow-hidden transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo/neidhal_logo.png"
              alt="Neidhal FC Logo"
              fill
              sizes="(max-width: 640px) 48px, 56px"
              className="object-contain"
              priority
            />
          </div>
          <div className={cn(
            "flex items-center font-raleway text-xl sm:text-2xl tracking-wider leading-none transition-colors duration-300 font-medium",
            isDarkHero ? "text-white" : "text-primary"
          )}>
            <span>NEIDHAL</span>
            <span className={cn(
              "ml-2 font-light inline-flex overflow-hidden transition-all duration-500 ease-in-out w-[22px] group-hover:w-[180px] sm:w-[26px] sm:group-hover:w-[220px] relative whitespace-nowrap",
              isDarkHero ? "text-sand" : "text-[#BCA688]"
            )}>
              <span className="transition-opacity duration-300 group-hover:opacity-0">FC</span>
              <span className="absolute left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">FOOTBALL CLUB</span>
            </span>
          </div>
        </Link>
      </motion.div>

      {/* Floating Hamburger button (always visible in top-right, changes style on scroll) */}
      <div className="fixed top-6 right-6 md:top-8 md:right-12 z-50 pointer-events-auto">
        <HamburgerButton
          isOpen={isMenuOpen}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          isDark={isDarkHero && !isScrolled}
          isScrolled={isScrolled}
        />
      </div>

      {/* Full screen overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 z-50 flex flex-col md:flex-row h-screen w-screen overflow-hidden text-[#0B1F3A]"
            style={{ backgroundColor: "#FAF7F2" }}
          >
            {/* Left Side: Large vertical image carousel card */}
            <div className="hidden md:block w-1/2 h-full p-3">
              <div className="relative w-full h-full rounded-2xl overflow-hidden border border-black/5 shadow-2xl">
                <Carousel
                  options={{ loop: true }}
                  plugins={[autoplayPlugin.current]}
                  className="w-full h-full relative"
                >
                  <SliderContainer className="w-full h-full">
                    {CAROUSEL_IMAGES.map((img, idx) => (
                      <Slider key={idx} className="relative w-full h-full flex-[0_0_100%] min-w-0 overflow-hidden">
                        <Image
                          src={img.src}
                          alt={img.label}
                          fill
                          priority={idx === 0}
                          sizes="50vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none z-10" />

                        {/* Bottom Overlay containing Label and Title */}
                        <div className="absolute bottom-8 inset-x-8 z-20 flex flex-col gap-2 text-white text-left">
                          <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-[#D9C3A5] block">
                            {img.tag}
                          </span>
                          <h4 className="text-2xl font-bold font-sans tracking-wide">
                            {img.label}
                          </h4>
                        </div>
                      </Slider>
                    ))}
                  </SliderContainer>
                </Carousel>
              </div>
            </div>

            {/* Right Side: Navigation & Info */}
            <div
              className="w-full md:w-1/2 h-full flex flex-col justify-between p-8 md:p-16 relative overflow-y-auto"
            >
              {/* Huge half-hidden background text in bottom right */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[4.2rem] xs:text-[5rem] sm:text-[6.5rem] md:text-[7rem] lg:text-[8rem] font-raleway font-black uppercase tracking-tighter leading-none select-none bg-gradient-to-b from-[#0B1F3A]/8 to-transparent bg-clip-text text-transparent text-center w-full whitespace-nowrap">
                  NEIDHAL FC
                </span>
              </div>

              {/* Top Row: Logo & Close */}
              <div className="flex items-center justify-between w-full relative z-10">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-3 group select-none cursor-pointer"
                >
                  <div className="relative h-10 w-10 sm:h-12 sm:w-12 overflow-hidden transition-transform duration-300 group-hover:scale-105">
                    <Image
                      src="/logo/neidhal_logo.png"
                      alt="Neidhal FC Logo"
                      fill
                      sizes="48px"
                      className="object-contain"
                      priority
                    />
                  </div>
                </Link>

                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="font-sans font-bold text-xs uppercase tracking-[0.2em] text-[#0B1F3A] hover:text-[#0077b6] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>

              {/* Middle Row: Links list */}
              <div className="my-auto py-12 md:py-0 text-left relative z-10">
                <nav className="flex flex-col gap-6 md:gap-8">
                  {NAV_LINKS.map((link, idx) => {
                    const isActive = pathname === link.href;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + idx * 0.08, duration: 0.4 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setIsMenuOpen(false)}
                          className="flex items-center gap-3 hover:pl-4 transition-all duration-300 cursor-pointer group"
                        >
                          <Letter3DSwap
                            as="span"
                            staggerDuration={0.03}
                            rotateDirection="top"
                            mainClassName={cn(
                              "font-sans font-bold text-[2.8rem] xs:text-[3.4rem] sm:text-[4rem] md:text-5xl uppercase tracking-[0.1em]",
                              isActive ? "text-[#0B1F3A]" : "text-[#0B1F3A]/70 group-hover:text-[#0B1F3A]"
                            )}
                            frontFaceClassName="text-current"
                            secondFaceClassName="text-current"
                          >
                            {link.label}
                          </Letter3DSwap>

                          <span className={cn(
                            "transition-all duration-300 text-[#0B1F3A]",
                            isActive
                              ? "opacity-100 translate-y-0 translate-x-0"
                              : "opacity-0 translate-y-2 -translate-x-2 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0"
                          )}>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-[0.7em] h-[0.7em]"
                            >
                              <line x1="7" y1="17" x2="17" y2="7"></line>
                              <polyline points="7 7 17 7 17 17"></polyline>
                            </svg>
                          </span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom Spacer to balance the layout */}
              <div className="hidden md:block h-12 w-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
