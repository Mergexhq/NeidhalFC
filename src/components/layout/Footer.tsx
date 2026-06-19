import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#FAF7F2] px-4 pb-4 md:px-6 md:pb-6 pt-0 relative overflow-hidden">
      <div 
        className="relative w-full overflow-hidden rounded-[2.5rem] bg-[#122415] text-white p-8 sm:p-12 md:p-16 lg:p-20 shadow-2xl"
        style={{ backgroundImage: "url('/grass_bg.png')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {/* Double dark overlays for maximum readability and contrast */}
        <div className="absolute inset-0 bg-[#0d1c10]/65 mix-blend-multiply z-0" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#122415]/80 via-[#0d1c10]/60 to-[#122415]/80 z-0" />

        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Top Section: Brand Logo/Info & Social Links */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10 mb-16">
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
              <p className="text-white/75 text-sm leading-relaxed font-normal text-center sm:text-left">
                A coastal football club inspired by the spirit of Neidhal.
              </p>
            </div>

            {/* Social Links Section */}
            <div className="flex flex-col items-center md:items-start gap-2.5 mt-4 md:mt-0">
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-white/50">
                Follow Us
              </span>
              <div className="flex items-center gap-4 text-white/80">
                <a 
                  href="https://www.instagram.com/neidhalfc" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors duration-200"
                  aria-label="Instagram Link"
                >
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                </a>
                <a 
                  href="https://www.youtube.com/@Neidhalfc" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors duration-200"
                  aria-label="YouTube Link"
                >
                  <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="shrink-0"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Middle Section: Links, Locations, Contact Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12 border-t border-b border-white/10 mb-4">
            {/* Quick Links Column */}
            <div className="flex flex-col gap-6">
              <h4 className="font-display font-bold text-sm tracking-widest uppercase text-white border-l-2 border-white/40 pl-3">
                Explore
              </h4>
              <ul className="space-y-3.5 text-sm text-white/70">
                {[
                  { label: "Home", href: "/" },
                  { label: "About Club", href: "/about" },
                  { label: "Locations", href: "/locations" },
                  { label: "Media Hub", href: "/media" },
                  { label: "Book a Trial", href: "/book-trial" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link 
                      href={link.href}
                      className="hover:text-white transition-colors duration-200 flex items-center gap-1.5 group cursor-pointer"
                    >
                      <ArrowRight size={10} className="opacity-0 -ml-3 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-white" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Locations Column */}
            <div className="flex flex-col gap-6">
              <h4 className="font-display font-bold text-sm tracking-widest uppercase text-white border-l-2 border-white/40 pl-3">
                Our Locations
              </h4>
              <ul className="space-y-4 text-sm text-white/70 font-normal">
                <li className="flex gap-2">
                  <MapPin size={18} className="text-white/50 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Kottivakkam</span>
                    Near RTO Office, ECR, Chennai
                  </div>
                </li>
                <li className="flex gap-2">
                  <MapPin size={18} className="text-white/50 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Injambakkam</span>
                    ECR Coastal Road, Chennai
                  </div>
                </li>
                <li className="flex gap-2">
                  <MapPin size={18} className="text-white/50 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-white block">Nandanam</span>
                    Central Coaching Facility, Chennai
                  </div>
                </li>
              </ul>
            </div>

            {/* Contact Column */}
            <div className="flex flex-col gap-6">
              <h4 className="font-display font-bold text-sm tracking-widest uppercase text-white border-l-2 border-white/40 pl-3">
                Get in Touch
              </h4>
              <ul className="space-y-4 text-sm text-white/70">
                <li className="flex gap-3">
                  <Mail size={16} className="text-white/50 shrink-0 mt-1" />
                  <div className="flex flex-col">
                    <a href="mailto:contact@neidhalfc.com" className="hover:text-white transition-colors duration-200 text-white font-semibold">
                      contact@neidhalfc.com
                    </a>
                    <span className="text-[11px] text-white/40">Official Enquiries</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Phone size={16} className="text-white/50 shrink-0 mt-1" />
                  <div className="flex flex-col">
                    <a href="tel:+919962916597" className="hover:text-white transition-colors duration-200 text-white font-semibold">
                      99629 16597
                    </a>
                    <span className="text-[10px] text-white/40">Pradeep Ramesh (Co-Founder)</span>
                  </div>
                </li>
                <li className="flex gap-3">
                  <Phone size={16} className="text-white/50 shrink-0 mt-1" />
                  <div className="flex flex-col">
                    <a href="tel:+919962103566" className="hover:text-white transition-colors duration-200 text-white font-semibold">
                      99621 03566
                    </a>
                    <span className="text-[10px] text-white/40">Vijay Balan (Co-Founder)</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col gap-4 pt-0">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              {/* Massive Typography matching navbar hierarchy */}
              <div className="font-sans select-none flex flex-col gap-1 sm:gap-2">
                <div className="font-semibold text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] leading-[0.85] text-white tracking-tight opacity-90">
                  NEIDHAL
                </div>
                <div className="font-sans font-bold text-[1.1rem] sm:text-[1.65rem] md:text-[2.2rem] lg:text-[2.75rem] tracking-[0.25em] text-white/60 uppercase whitespace-nowrap leading-none mt-1 pl-[0.08em]">
                  FOOTBALL CLUB
                </div>
              </div>

              {/* Silhouette Image on the right side */}
              <div className="relative w-56 h-36 md:w-80 md:h-52 shrink-0 self-center md:self-end -translate-x-4 md:-translate-x-12">
                <Image
                  src="/silhouette.png"
                  alt="Neidhal Player Silhouette"
                  fill
                  sizes="(max-w-768px) 224px, 320px"
                  className="object-contain object-right-bottom opacity-40 md:opacity-50 pointer-events-none select-none"
                />
              </div>
            </div>

            {/* Copyright & Links */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/40 font-normal w-full border-t border-white/10 pt-8 mt-4">
              <p>© {currentYear} Neidhal Football Club. All rights reserved.</p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <Link href="/book-trial" className="hover:text-white transition-colors duration-200">Register</Link>
                <Link href="/utility/privacy-policy" className="hover:text-white transition-colors duration-200">Privacy Policy</Link>
                <Link href="/utility/terms-and-conditions" className="hover:text-white transition-colors duration-200">Terms & Conditions</Link>
                <a href="https://wa.me/919962916597" className="hover:text-white transition-colors duration-200">WhatsApp support</a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
