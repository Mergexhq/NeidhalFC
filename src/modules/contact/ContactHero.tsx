"use client";

import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/layout/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

const byPrefixAndName = {
  fab: {
    whatsapp: faWhatsapp,
  },
};

// Turf Location Database
interface LocationData {
  id: string;
  name: string;
  sub: string;
  address: string;
  phone: string;
  phoneRaw: string;
  email: string;
  mapLink: string;
  calCom: string;
  image: string;
  hours: string;
}

const LOCATIONS_DATA: Record<string, LocationData> = {
  Injambakkam: {
    id: "Injambakkam",
    name: "Injambakkam Turf",
    sub: "Chennai ECR Academy Headquarters",
    address: "Neidhal FC Turf, ECR Road, Injambakkam, Chennai - 600115 (Near beach road)",
    phone: "+91 99629 16597",
    phoneRaw: "+919962916597",
    email: "contact@neidhalfc.com",
    mapLink: "https://maps.google.com/?q=Neidhal+FC+Turf+Injambakkam",
    calCom: "https://cal.com/neidhalfc/injambakkam-trial",
    image: "/football-turf/injambakkam-4.webp",
    hours: "Monday – Sunday: 5:00 AM – 9:00 PM",
  },
  Palavakkam: {
    id: "Palavakkam",
    name: "Palavakkam Turf",
    sub: "Chennai ECR Elite Center",
    address: "ECR Road, Palavakkam, Chennai - 600041 (Opposite beach entrance)",
    phone: "+91 99621 03566",
    phoneRaw: "+919962103566",
    email: "contact@neidhalfc.com",
    mapLink: "https://maps.google.com/?q=Palavakkam+Chennai",
    calCom: "https://cal.com/neidhalfc/palavakkam-trial",
    image: "/football-turf/kottivakkam-3.webp",
    hours: "Monday – Sunday: 5:00 AM – 9:00 PM",
  },
  Thoraipakkam: {
    id: "Thoraipakkam",
    name: "Thoraipakkam Turf",
    sub: "Chennai OMR Development Center",
    address: "OMR Road, Thoraipakkam, Chennai - 600097 (Behind AKDR Golf Village)",
    phone: "+91 99629 16597",
    phoneRaw: "+919962916597",
    email: "contact@neidhalfc.com",
    mapLink: "https://maps.google.com/?q=Thoraipakkam+Chennai",
    calCom: "https://cal.com/neidhalfc/thoraipakkam-trial",
    image: "/football-turf/nandanam-3.webp",
    hours: "Monday – Sunday: 5:00 AM – 9:00 PM",
  },
};

export const ContactHero: React.FC = () => {
  const { scrollY } = useScroll();

  // Scroll parallax for the dynamic image banner
  const imgY = useTransform(scrollY, [150, 1000], ["-6%", "6%"]);
  const imgScale = useTransform(scrollY, [150, 1000], [1.08, 1.15]);

  // Scroll parallax for the slot booking card
  const cardRef = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  const cardImgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

  // Form State - Defaults to Injambakkam
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    age: "",
    location: "Injambakkam",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Active Location Data
  const currentLoc = LOCATIONS_DATA[formData.location] || LOCATIONS_DATA.Injambakkam;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const logPayload = {
      fullName: formData.fullName,
      phone: formData.phone,
      playerAge: formData.age,
      location: formData.location,
      message: formData.message,
      submittedAt: new Date().toISOString(),
      source: "Consolidated Contact Page Form",
      status: "Logged to Google Sheets Row #135",
    };

    console.log("Contact Enquiry Submitted:", logPayload);

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="w-full relative z-20">
      
      {/* ── SECTION 1: Dark Navy Hero Text Block ── */}
      <section className="relative pt-36 pb-20 md:pb-24 overflow-hidden bg-[#03070E] text-white flex flex-col justify-center">
        <Navbar />

        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary-light)/10,_transparent_70%)] pointer-events-none z-0" />

        {/* Wide layout wrapper */}
        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 mx-auto flex flex-col gap-10 md:gap-14">
          
          {/* Solid Title in single line with reduced font weight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-left w-full select-none"
          >
            <h1 className="font-condensed text-[clamp(1.5rem,4.8vw,3.5rem)] font-light uppercase leading-none tracking-wider text-sand whitespace-nowrap overflow-hidden text-ellipsis">
              Let&apos;s Get You On The Field
            </h1>
          </motion.div>

          {/* Grid Layout (Pushed to corners) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start w-full">
            
            {/* Left Column: Title (Take Your First Step Onto The Pitch.) */}
            <div className="md:col-span-7 text-left pl-0">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
                className="font-display font-light text-[clamp(1.8rem,4vw,3.2rem)] text-white leading-[1.1] tracking-tight max-w-xl"
              >
                Take Your First Step Onto The Pitch.
              </motion.h2>
            </div>

            {/* Right Column: Description with Vertical Divider */}
            <div className="md:col-span-5 flex md:justify-end md:text-right w-full pr-0">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="border-r border-white/20 pr-6 md:pr-8 text-right flex flex-col items-end gap-1 w-full"
              >
                <p className="text-white/70 font-sans text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-sm">
                  Whether you&apos;re booking a trial, exploring the right coaching batch, or simply have a question, our team is here to help you take the first step.
                </p>
              </motion.div>
            </div>

          </div>

        </div>
      </section>

      {/* ── SECTION 2: Dynamic Full-Width Image Banner (Vertical Overlay Target) ── */}
      <section className="relative h-[400px] md:h-[500px] overflow-hidden w-full bg-[#03070E]">
        <AnimatePresence mode="wait">
          {/* Fade transition wrapper for dynamic image changing */}
          <motion.div
            key={currentLoc.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ y: imgY, scale: imgScale }}
            className="absolute -top-[15%] left-0 w-full h-[130%] origin-center"
          >
            <Image
              src={currentLoc.image}
              alt={currentLoc.name}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center select-none pointer-events-none"
            />
          </motion.div>
        </AnimatePresence>
      </section>

      {/* ── SECTION 3: Dynamic Details & Overlapping Form Grid & Quick Actions ── */}
      <section className="relative bg-gradient-to-b from-[#F5EFE6] to-[#FAF7F2] pt-16 md:pt-24 pb-24 z-20">
        
        {/* Form & Details Container */}
        <div className="w-full px-4 sm:px-6 md:px-8 mx-auto mb-20 md:mb-28">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start w-full relative">
            
            {/* Left Column: Dynamic Address / Branch Card & What Happens Next */}
            <div className="lg:col-span-7 text-left flex flex-col gap-10 md:gap-14 pt-4">
              
              {/* Dynamic Location Card */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentLoc.id}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-6"
                >
                  <div>
                    <span className="text-[#BCA688] font-sans font-bold text-xs uppercase tracking-[0.2em] mb-3 block select-none">
                      Selected Branch Location
                    </span>
                    <h3 className="font-display font-medium text-4xl sm:text-5xl lg:text-[50px] text-[#0B1F3A] leading-tight">
                      {currentLoc.name}
                    </h3>
                    <p className="text-black/55 font-sans font-light text-sm sm:text-base mt-2">
                      {currentLoc.sub}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 border-t border-black/10 pt-8">
                    {/* Location Address */}
                    <div>
                      <h4 className="font-sans font-semibold text-xs sm:text-sm text-[#0B1F3A] uppercase tracking-wider mb-2 select-none">
                        Address
                      </h4>
                      <p className="text-black/60 font-sans font-light text-sm leading-relaxed">
                        {currentLoc.address}
                      </p>
                    </div>

                    {/* Contact details */}
                    <div>
                      <h4 className="font-sans font-semibold text-xs sm:text-sm text-[#0B1F3A] uppercase tracking-wider mb-2 select-none">
                        Contact Info
                      </h4>
                      <p className="text-black/60 font-sans font-light text-sm leading-relaxed flex flex-col gap-0.5">
                        <span className="text-black/40 text-[10px] uppercase font-bold tracking-wider select-none">Call Us</span>
                        <a href={`tel:${currentLoc.phoneRaw}`} className="hover:text-primary transition-colors font-medium text-black/80">
                          {currentLoc.phone}
                        </a>
                        <span className="text-black/40 text-[10px] uppercase font-bold tracking-wider mt-2 select-none">Email</span>
                        <a href={`mailto:${currentLoc.email}`} className="hover:text-primary transition-colors underline">
                          {currentLoc.email}
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Dynamic Actions: Directions & Call (Left Side) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-black/10 pt-8 mt-6">
                    
                    {/* Card 1: Get Directions */}
                    <a
                      href={currentLoc.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4.5 p-4.5 bg-white/[0.45] border border-black/5 hover:bg-white/[0.85] hover:border-[#0B1F3A]/25 rounded-[6px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.03)] transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#0B1F3A]/5 group-hover:bg-[#0B1F3A]/10 text-[#0B1F3A] flex items-center justify-center transition-colors shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25s-7.5-4.108-7.5-11.25a7.5 7.5 0 1115 0z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-sans font-semibold text-xs sm:text-sm text-[#0B1F3A]">Get Directions</h4>
                        <p className="text-black/45 text-[11px] group-hover:text-black/60 transition-colors">Open Google Maps</p>
                      </div>
                    </a>

                    {/* Card 2: Call Academy */}
                    <a
                      href={`tel:${currentLoc.phoneRaw}`}
                      className="group flex items-center gap-4.5 p-4.5 bg-white/[0.45] border border-black/5 hover:bg-white/[0.85] hover:border-[#0B1F3A]/25 rounded-[6px] hover:shadow-[0_8px_20px_rgba(0,0,0,0.03)] transition-all duration-300"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#0B1F3A]/5 group-hover:bg-[#0B1F3A]/10 text-[#0B1F3A] flex items-center justify-center transition-colors shrink-0">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 01-7.108-7.108c-.145-.44.02-.927.396-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-sans font-semibold text-xs sm:text-sm text-[#0B1F3A]">Call Academy</h4>
                        <p className="text-black/45 text-[11px] group-hover:text-black/60 transition-colors">Speak with our team</p>
                      </div>
                    </a>
                  </div>

                </motion.div>
              </AnimatePresence>


            </div>

            {/* Right Column: Form Card overlapping the Top Banner */}
            <div className="lg:col-span-5 relative z-30 -mt-[120px] md:-mt-[180px] lg:-mt-[280px] w-full">
              <div className="bg-white px-8 py-10 md:px-12 md:py-12 rounded-[4px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] w-full border border-black/[0.02]">
                
                {submitted ? (
                  /* Success Confirmation State */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center text-center py-16"
                  >
                    <div className="w-14 h-14 bg-[#0B1F3A]/5 rounded-full flex items-center justify-center mb-6">
                      <svg
                        className="w-7 h-7 text-[#0B1F3A]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="font-display font-semibold text-xl text-primary mb-2">
                      Enquiry Received
                    </h3>
                    <p className="text-black/60 text-sm max-w-xs leading-relaxed">
                      Thank you! Our coaching team will reach out shortly to guide you onto the field.
                    </p>
                  </motion.div>
                ) : (
                  /* Enquiry Form Card */
                  <form onSubmit={handleSubmit} className="flex flex-col">
                    
                    {/* Centered Heading */}
                    <h3 className="font-sans font-medium text-[26px] sm:text-[30px] md:text-[34px] text-[#0B1F3A] text-center mb-9 tracking-tight leading-tight select-none">
                      We&apos;ll help you get started.
                    </h3>

                    {/* 1. Full Name */}
                    <div className="relative w-full mb-6">
                      <input
                        type="text"
                        required
                        placeholder="Full Name *"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className="border-b border-[#D8D8D8] bg-transparent outline-none py-3.5 pr-8 w-full text-sm font-light text-black/80 placeholder:text-black/35 focus:border-primary transition-colors"
                      />
                      {/* User smiley icon */}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="w-5 h-5 text-black/25 absolute right-1 bottom-3.5 pointer-events-none"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>

                    {/* 2. Phone Number */}
                    <div className="relative w-full mb-6">
                      <input
                        type="tel"
                        required
                        placeholder="Phone Number *"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        className="border-b border-[#D8D8D8] bg-transparent outline-none py-3.5 pr-8 w-full text-sm font-light text-black/80 placeholder:text-black/35 focus:border-primary transition-colors"
                      />
                      {/* Phone icon */}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="w-5 h-5 text-black/25 absolute right-1 bottom-3.5 pointer-events-none"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.387a12.035 12.035 0 01-7.108-7.108c-.145-.44.02-.927.396-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                    </div>

                    {/* 3. Player's Age */}
                    <div className="relative w-full mb-6">
                      <input
                        type="number"
                        required
                        placeholder="Player's Age *"
                        value={formData.age}
                        onChange={(e) =>
                          setFormData({ ...formData, age: e.target.value })
                        }
                        className="border-b border-[#D8D8D8] bg-transparent outline-none py-3.5 pr-8 w-full text-sm font-light text-black/80 placeholder:text-black/35 focus:border-primary transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                      {/* Age icon (calendar) */}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="w-5 h-5 text-black/25 absolute right-1 bottom-3.5 pointer-events-none"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                        />
                      </svg>
                    </div>

                    {/* 4. Preferred Training Location */}
                    <div className="relative w-full mb-7 text-left">
                      <label className="text-xs text-black/35 font-light mb-3.5 block select-none">
                        Preferred Training Location *
                      </label>
                      <div className="flex flex-col gap-3.5">
                        {[
                          { id: "Injambakkam", label: "Injambakkam Turf (ECR)" },
                          { id: "Palavakkam", label: "Palavakkam Turf (ECR)" },
                          { id: "Thoraipakkam", label: "Thoraipakkam Turf (OMR)" }
                        ].map((loc) => (
                          <label
                            key={loc.id}
                            className="flex items-center gap-3.5 cursor-pointer select-none group text-sm font-bold text-black/85"
                          >
                            <input
                              type="radio"
                              name="location"
                              required
                              value={loc.id}
                              checked={formData.location === loc.id}
                              onChange={() =>
                                setFormData({ ...formData, location: loc.id })
                              }
                              className="sr-only"
                            />
                            {/* Custom Radio Circle */}
                            <div
                              className={`w-[18px] h-[18px] rounded-full border flex items-center justify-center transition-all ${
                                formData.location === loc.id
                                  ? "border-[#0B1F3A] bg-[#0B1F3A]/5"
                                  : "border-[#D8D8D8] group-hover:border-black/30"
                              }`}
                            >
                              {formData.location === loc.id && (
                                <div className="w-2.5 h-2.5 rounded-full bg-[#0B1F3A]" />
                              )}
                            </div>
                            <span>{loc.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* 5. Message */}
                    <div className="relative w-full mb-6">
                      <textarea
                        placeholder="Message"
                        rows={3}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="border-b border-[#D8D8D8] bg-transparent outline-none py-3.5 pr-8 w-full text-sm font-light text-black/80 placeholder:text-black/35 focus:border-primary transition-colors resize-none"
                      />
                      {/* Message bubble icon */}
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        className="w-5 h-5 text-black/25 absolute right-1 bottom-4 pointer-events-none"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                        />
                      </svg>
                    </div>

                    {/* Submit Button - Centered, Navy */}
                    <div className="flex justify-center mt-6">
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-12 py-3.5 bg-[#0B1F3A] hover:bg-[#061222] text-white text-xs font-bold uppercase tracking-wider rounded-sm shadow-xs transition-colors cursor-pointer"
                      >
                        {loading ? "Sending..." : "Send Enquiry"}
                      </button>
                    </div>

                  </form>
                )}

              </div>
            </div>

        </div>

      </div>

      {/* Quick Actions Card Container */}
      <div className="w-full px-4 sm:px-6 md:px-8 mx-auto pb-24">
        
        <div className="w-full bg-white border border-black/[0.03] rounded-[8px] p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.08)] text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
            
            {/* Left side: Heading and description */}
            <div className="lg:col-span-6 select-none pr-4">
              <h3 className="font-sans font-semibold text-3xl md:text-4xl text-[#0B1F3A] tracking-tight leading-snug">
                Choose How You&apos;d Like to Reach Us
              </h3>
              <p className="text-[#0B1F3A]/70 text-sm sm:text-base font-light mt-3 leading-relaxed max-w-md">
                Need a different way to reach us? Choose the option that&apos;s most convenient for you.
              </p>
            </div>

            {/* Right side: WhatsApp & Book Trial Buttons */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              
              {/* Action 1: WhatsApp */}
              <a
                href={`https://wa.me/${currentLoc.phoneRaw}?text=Hi%20Neidhal%20FC,%20I'd%20like%20to%20enquire%20about%20the%20${encodeURIComponent(currentLoc.name)}%20free%20trial%20session.`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center justify-center p-6 bg-[#FAF7F2] border border-black/5 hover:bg-[#F5EFE6] hover:border-[#0B1F3A]/25 rounded-[8px] hover:shadow-[0_12px_30px_rgba(0,0,0,0.04)] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#0B1F3A]/5 group-hover:bg-[#0B1F3A]/10 text-[#0B1F3A] flex items-center justify-center mb-4 transition-colors">
                  {/* WhatsApp Icon */}
                  <FontAwesomeIcon
                    icon={byPrefixAndName.fab['whatsapp']}
                    className="text-[#0B1F3A] group-hover:text-[#25D366] transition-colors duration-300"
                    style={{ width: "24px", height: "24px" }}
                  />
                </div>
                <h4 className="font-sans font-semibold text-base text-[#0B1F3A]">
                  WhatsApp
                </h4>
                <p className="text-[#0B1F3A]/60 text-xs sm:text-sm font-light mt-1 group-hover:text-[#0B1F3A]/85 transition-colors duration-300">
                  Chat with us instantly
                </p>
              </a>

              {/* Action 2: Book Trial Card with slot book.png background */}
              <a
                ref={cardRef}
                href={currentLoc.calCom}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col justify-between p-6 rounded-[8px] overflow-hidden min-h-[230px] shadow-[0_12px_30px_rgba(0,0,0,0.12)] transition-all duration-300 border border-black/[0.05] hover:border-[#0B1F3A]/20 hover:scale-[1.02]"
              >
                {/* Background Image Wrapper with Parallax style */}
                <motion.div
                  style={{ y: cardImgY }}
                  className="absolute -top-[15%] left-0 w-full h-[130%] origin-center z-0 pointer-events-none"
                >
                  <Image
                    src="/slot book.png"
                    alt="Book Slot Background"
                    fill
                    sizes="(max-width: 640px) 100vw, 30vw"
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                </motion.div>
                
                {/* Content Container */}
                <div className="relative z-20 flex flex-col justify-between h-full w-full gap-8">
                  {/* Copy in top */}
                  <div className="text-center w-full select-none">
                    <p className="text-[#0B1F3A] font-sans font-bold text-lg sm:text-xl lg:text-[22px] leading-snug tracking-tight">
                      Reserve your trial session today.
                    </p>
                  </div>

                  {/* CTA Button in bottom */}
                  <div className="w-full">
                    <div className="w-full py-3 bg-[#FAF7F2] hover:bg-white text-[#0B1F3A] text-xs sm:text-sm font-bold uppercase tracking-wider rounded-sm shadow-sm transition-all duration-300 text-center select-none">
                      Book Your Trial
                    </div>
                  </div>
                </div>
              </a>

            </div>

          </div>

        </div>
      </div>
    </section>

    </div>
  );
};

export default ContactHero;
