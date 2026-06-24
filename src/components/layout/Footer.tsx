"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";

const fadeInUpVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.215, 0.61, 0.355, 1] as const } 
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05
    }
  }
};

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const borderRadius = useTransform(scrollYProgress, [0.6, 1], ["40px", "0px"]);
  const paddingX = useTransform(scrollYProgress, [0.6, 1], ["1.5rem", "0rem"]);
  const paddingBottom = useTransform(scrollYProgress, [0.6, 1], ["1.5rem", "0rem"]);

  return (
    <motion.footer 
      ref={containerRef}
      style={{
        paddingLeft: paddingX,
        paddingRight: paddingX,
        paddingBottom: paddingBottom,
      }}
      className="bg-[#FAF7F2] pt-0 relative overflow-hidden w-full"
    >
      <motion.div 
        style={{
          scale,
          borderRadius,
        }}
        className="relative w-full overflow-hidden text-white px-6 pt-10 pb-8 sm:px-10 sm:pt-12 sm:pb-10 md:px-12 md:pt-16 md:pb-12 lg:px-16 lg:pt-20 lg:pb-14 bg-transparent origin-bottom"
      >
        {/* Background Image with top smudge/fade */}
        <div 
          className="absolute inset-0 z-0 bg-[#0B1F3A]"
          style={{
            backgroundImage: "url('/images/footer.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            maskImage: "linear-gradient(to bottom, transparent 0%, black 20%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 20%)",
          }}
        />

        {/* Dark overlay at the bottom for text readability */}
        <div className="absolute bottom-0 left-0 right-0 h-[50%] bg-gradient-to-t from-black/85 via-black/40 to-transparent z-0 pointer-events-none" />

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="relative z-10 max-w-7xl mx-auto"
        >
          {/* Top Section: Brand Logo/Info & Social Links */}
          <motion.div 
            variants={fadeInUpVariants}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 mb-16"
          >
            {/* Brand Logo & Description */}
            <div className="flex flex-col sm:flex-row items-center gap-6 max-w-2xl">
              <Link href="/" className="shrink-0">
                <div className="relative h-16 w-16 overflow-hidden">
                  <Image
                    src="/logo/neidhal_logo.png"
                    alt="Neidhal FC Logo"
                    fill
                    sizes="64px"
                    className="object-contain"
                  />
                </div>
              </Link>
              <p className="text-[#0B1F3A]/80 text-sm leading-relaxed font-semibold text-center sm:text-left">
                A coastal football club inspired by the spirit of Neidhal.
              </p>
            </div>

            {/* Social Links Section */}
            <div className="flex flex-col items-center md:items-start gap-2.5 mt-4 md:mt-0">
              <span className="text-[10px] uppercase font-extrabold tracking-[0.2em] text-[#0B1F3A]/60">
                Follow Us
              </span>
              <div className="flex items-center gap-4 text-[#0B1F3A]/80">
                <a 
                  href="https://www.instagram.com/neidhalfc" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#0b1f3a] transition-colors duration-200"
                  aria-label="Instagram Link"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a 
                  href="https://www.youtube.com/@Neidhalfc" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-[#0b1f3a] transition-colors duration-200"
                  aria-label="YouTube Link"
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Middle Section: Links, Locations, Contact Details */}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12 border-t border-b border-[#0B1F3A]/10 mb-4 md:pl-16 lg:pl-24"
          >
            {/* Quick Links Column */}
            <motion.div variants={fadeInUpVariants} className="flex flex-col gap-6">
              <h4 className="font-display font-bold text-sm tracking-widest uppercase text-[#0B1F3A] border-l-2 border-[#0B1F3A]/40 pl-3">
                Explore
              </h4>
              <ul className="space-y-3.5 text-sm text-[#0B1F3A]/80">
                {[
                  { label: "Home", href: "/" },
                  { label: "About Club", href: "/about" },
                  { label: "Locations", href: "/locations" },
                  { label: "Book a Trial", href: "/book-trial" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="hover:text-[#0077b6] transition-colors duration-200 flex items-center gap-1.5 group cursor-pointer"
                    >
                      <ArrowRight size={10} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-[#0077b6]" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Locations Column */}
            <motion.div variants={fadeInUpVariants} className="flex flex-col gap-6">
              <h4 className="font-display font-bold text-sm tracking-widest uppercase text-[#0B1F3A] border-l-2 border-[#0B1F3A]/40 pl-3">
                Our Locations
              </h4>
              <ul className="space-y-4 text-sm text-[#0B1F3A]/80 font-normal">
                <li className="flex gap-2">
                  <MapPin size={18} className="text-[#0B1F3A]/50 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#0B1F3A] block">Kottivakkam</span>
                    Near RTO Office, ECR, Chennai
                  </div>
                </li>
                <li className="flex gap-2">
                  <MapPin size={18} className="text-[#0B1F3A]/50 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#0B1F3A] block">Injambakkam</span>
                    ECR Coastal Road, Chennai
                  </div>
                </li>
                <li className="flex gap-2">
                  <MapPin size={18} className="text-[#0B1F3A]/50 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#0B1F3A] block">Nandanam</span>
                    Central Coaching Facility, Chennai
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* Contact Column */}
            <motion.div variants={fadeInUpVariants} className="flex flex-col gap-6">
              <h4 className="font-display font-bold text-sm tracking-widest uppercase text-[#0B1F3A] border-l-2 border-[#0B1F3A]/40 pl-3">
                Get in Touch
              </h4>
              <ul className="space-y-4 text-sm text-[#0B1F3A]/80">
                <li className="flex gap-3">
                  <Mail size={16} className="text-[#0B1F3A]/50 shrink-0 mt-1" />
                  <div className="flex flex-col">
                    <a href="mailto:contact@neidhalfc.com" className="hover:text-[#0077b6] transition-colors duration-200 text-[#0B1F3A] font-semibold">
                      contact@neidhalfc.com
                    </a>
                    <span className="text-[11px] text-[#0B1F3A]/65">Official Enquiries</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Phone size={16} className="text-[#0B1F3A]/50 shrink-0 mt-1" />
                  <div className="flex flex-col">
                    <a href="tel:+919962916597" className="hover:text-[#0077b6] transition-colors duration-200 text-[#0B1F3A] font-semibold">
                      99629 16597
                    </a>
                    <span className="text-[10px] text-[#0B1F3A]/65">Pradeep Ramesh (Co-Founder)</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Phone size={16} className="text-[#0B1F3A]/50 shrink-0 mt-1" />
                  <div className="flex flex-col">
                    <a href="tel:+919962103566" className="hover:text-[#0077b6] transition-colors duration-200 text-[#0B1F3A] font-semibold">
                      99621 03566
                    </a>
                    <span className="text-[10px] text-[#0B1F3A]/65">Vijay Balan (Co-Founder)</span>
                  </div>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="flex flex-col gap-4 pt-0"
          >
            {/* Massive Typography matching navbar hierarchy - Single Line Centered */}
            <motion.div 
              variants={fadeInUpVariants}
              className="font-sans select-none w-full text-center mt-2 mb-6 pl-[0.05em]"
            >
              <div className="font-bold text-[11vw] sm:text-[12vw] md:text-[12.5vw] lg:text-[13vw] xl:text-[11rem] leading-none text-white tracking-[0.05em] uppercase whitespace-nowrap opacity-90">
                NEIDHAL FC
              </div>
            </motion.div>

            {/* Copyright & Links */}
            <motion.div 
              variants={fadeInUpVariants}
              className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/40 font-normal w-full border-t border-white/10 pt-8 mt-4"
            >
              <p>© {currentYear} Neidhal Football Club. All rights reserved.</p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <Link href="/book-trial" className="hover:text-white transition-colors duration-200">Register</Link>
                <Link href="/utility/privacy-policy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
                <Link href="/utility/terms-and-conditions" className="hover:text-white transition-colors duration-200">Terms & Conditions</Link>
                <a href="https://wa.me/919962916597" className="hover:text-white transition-colors duration-200">WhatsApp support</a>
              </div>
            </motion.div>
          </motion.div>

        </motion.div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
