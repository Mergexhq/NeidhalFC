"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, MessageCircle, Phone, Mail, MapPin, Calendar, HelpCircle } from "lucide-react";

export const ActionCards: React.FC = () => {
  const whatsappUrl = "https://wa.me/919962916597?text=Hi%20Neidhal%20FC!%20I%20would%20like%20to%20enquire%20about%20a%20free%20trial%20session%20for%20my%20child.";
  const calComUrl = "https://cal.com/neidhal-fc/trial"; // Mock Cal.com link

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="py-20 bg-[#F5EFE6] relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-widest font-extrabold text-accent">Simple Steps</span>
          <h2 className="font-sans font-semibold text-3xl md:text-5xl text-primary mt-2 tracking-wide">
            How would you like to start?
          </h2>
          <p className="text-[#6F6F6F] text-sm font-normal mt-3 max-w-lg mx-auto">
            Choose the action that fits you best. We are always ready to welcome new players to the squad.
          </p>
        </div>

        {/* 3 Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          
          {/* Card 1: Book a Free Trial */}
          <motion.div
            variants={cardVariants}
            className="bg-white border border-black/5 rounded-[2.2rem] p-8 md:p-10 shadow-lg shadow-black/[0.02] flex flex-col justify-between hover:translate-y-[-6px] hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-sand" />
            <div>
              {/* Star Rating Badge */}
              <div className="flex items-center gap-0.5 text-[#F5A623] mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#F5A623" className="stroke-none" />
                ))}
                <span className="text-[10px] text-black/50 font-bold uppercase tracking-wider ml-1.5 font-sans">
                  Highly Rated
                </span>
              </div>

              <div className="h-12 w-12 rounded-2xl bg-sand/15 flex items-center justify-center text-sand-dark mb-6 group-hover:scale-110 transition-transform duration-300">
                <Calendar size={22} className="stroke-[2.2]" />
              </div>

              <h3 className="font-sans font-semibold text-xl sm:text-2xl text-primary mb-3">
                Book a Free Trial
              </h3>
              <p className="text-black/60 text-sm font-normal leading-relaxed mb-8">
                Experience a professionally coached session before making any academy enrollment decisions.
              </p>
            </div>

            <a
              href={calComUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-sand text-primary hover:bg-[#FAF7F2] border border-transparent hover:border-sand-dark/30 text-xs sm:text-sm font-sans font-bold uppercase tracking-wider px-6 py-4 rounded-2xl transition-all duration-300 w-full text-center cursor-pointer shadow-sm group-hover:shadow-md"
            >
              Book Trial
            </a>
          </motion.div>

          {/* Card 2: Ask a Question */}
          <motion.div
            variants={cardVariants}
            className="bg-white border border-black/5 rounded-[2.2rem] p-8 md:p-10 shadow-lg shadow-black/[0.02] flex flex-col justify-between hover:translate-y-[-6px] hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-accent" />
            <div>
              <span className="inline-block px-3 py-1 bg-accent/10 rounded-full text-[9px] font-bold text-accent uppercase tracking-wider mb-6">
                Direct Line
              </span>

              <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6 group-hover:scale-110 transition-transform duration-300">
                <HelpCircle size={22} className="stroke-[2.2]" />
              </div>

              <h3 className="font-sans font-semibold text-xl sm:text-2xl text-primary mb-3">
                Ask a Question
              </h3>
              <p className="text-black/60 text-sm font-normal leading-relaxed mb-6">
                Need help choosing a batch, learning locations, or checking age slots? Drop us a line.
              </p>
            </div>

            {/* Sub-Actions */}
            <div className="flex flex-col gap-3">
              {/* WhatsApp */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-[#25D366]/10 hover:bg-[#25D366]/18 text-[#128C7E] px-4 py-3 rounded-xl transition-all text-xs font-bold uppercase tracking-wider"
              >
                <MessageCircle size={16} fill="currentColor" className="stroke-none shrink-0" />
                WhatsApp Us
              </a>

              {/* Call */}
              <a
                href="tel:+919962916597"
                className="flex items-center gap-3 bg-primary/5 hover:bg-primary/10 text-primary px-4 py-3 rounded-xl transition-all text-xs font-bold uppercase tracking-wider"
              >
                <Phone size={14} className="shrink-0" />
                Call Academy
              </a>

              {/* Email */}
              <a
                href="mailto:contact@neidhalfc.com"
                className="flex items-center gap-3 bg-primary/5 hover:bg-primary/10 text-primary px-4 py-3 rounded-xl transition-all text-xs font-bold uppercase tracking-wider"
              >
                <Mail size={14} className="shrink-0" />
                Email Us
              </a>
            </div>
          </motion.div>

          {/* Card 3: Visit a Location */}
          <motion.div
            variants={cardVariants}
            className="bg-white border border-black/5 rounded-[2.2rem] p-8 md:p-10 shadow-lg shadow-black/[0.02] flex flex-col justify-between hover:translate-y-[-6px] hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-primary-light" />
            <div>
              <span className="inline-block px-3 py-1 bg-primary/5 rounded-full text-[9px] font-bold text-primary/70 uppercase tracking-wider mb-6 font-sans">
                Academies
              </span>

              <div className="h-12 w-12 rounded-2xl bg-primary/5 flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                <MapPin size={22} className="stroke-[2.2]" />
              </div>

              <h3 className="font-sans font-semibold text-xl sm:text-2xl text-primary mb-3">
                Visit a Location
              </h3>
              <p className="text-black/60 text-sm font-normal leading-relaxed mb-8">
                Explore our three training grounds across ECR and Central Chennai to find the nearest turf.
              </p>
            </div>

            <Link
              href="/locations"
              className="inline-flex items-center justify-center bg-primary text-white hover:bg-primary-light text-xs sm:text-sm font-sans font-bold uppercase tracking-wider px-6 py-4 rounded-2xl transition-all duration-300 w-full text-center cursor-pointer shadow-sm group-hover:shadow-md"
            >
              View Locations
            </Link>
          </motion.div>

        </motion.div>

      </div>
    </section>
  );
};

export default ActionCards;
