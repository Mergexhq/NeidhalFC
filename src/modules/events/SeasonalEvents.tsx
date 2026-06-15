"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

const SEASONAL_PROGRAMS = [
  {
    id: "summer-camp",
    badge: "Seasonal Intake",
    title: "Annual Summer Training Camp 2026",
    dates: "May 10 - June 5, 2026",
    timings: "6:00 AM - 8:00 AM Daily",
    location: "Kottivakkam Beach Turf",
    price: "₹3,500 / Full Camp",
    description: "Our signature annual camp covering street football styles, beach sand physical conditioning, and 1v1 skill mastery. Open for ages U6 to U16.",
  },
  {
    id: "annual-reg",
    badge: "Rolling Admissions",
    title: "Annual Membership Registration 2026/27",
    dates: "June 15 onwards",
    timings: "Scheduled Weekday/Weekend Slots",
    location: "Kottivakkam, Injambakkam & Nandanam",
    price: "₹2,500 / Monthly Fee",
    description: "Join our main academy training structure. Includes official Neidhal kit bag, customized coaching diagnostics, and participation in coastal leagues.",
  },
];

export const SeasonalEvents: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#FAF7F2] border-t border-b border-black/5">
      {/* Dynamic light effects */}
      <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Banner Section Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-accent mb-3 block">
            Chapter 4: What's Happening
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-primary font-display tracking-tight leading-tight uppercase">
            Active Programs & Camps
          </h2>
          <p className="text-[#6F6F6F] text-sm md:text-base leading-relaxed mt-4 font-normal">
            Keep track of our seasonal intakes and clinics. Book a trial session to secure a spot in any active program.
          </p>
        </div>

        {/* Dynamic Banners Stack */}
        <div className="space-y-8 max-w-5xl mx-auto">
          {SEASONAL_PROGRAMS.map((program) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="relative w-full rounded-[2.5rem] p-8 md:p-12 border border-black/10 overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Decorative accent highlight card border */}
              <div className="absolute top-0 bottom-0 left-0 w-2 bg-sand" />

              {/* Details column */}
              <div className="flex-1 text-left pl-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sand/10 text-sand-dark mb-4 border border-sand/30">
                  <Sparkles size={10} />
                  {program.badge}
                </span>

                <h3 className="font-sans font-extrabold text-xl md:text-2xl text-primary mb-3 leading-tight">
                  {program.title}
                </h3>
                <p className="text-[#6F6F6F] text-sm leading-relaxed font-normal mb-6 max-w-2xl">
                  {program.description}
                </p>

                {/* Details list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-primary">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-accent" />
                    <span>{program.dates}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-accent" />
                    <span>{program.timings}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-accent" />
                    <span>{program.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#6F6F6F]">Fee:</span>
                    <span className="text-accent font-extrabold">{program.price}</span>
                  </div>
                </div>
              </div>

              {/* Action column */}
              <div className="shrink-0 lg:pl-6 text-left">
                <Link
                  href={`/book-trial?program=${program.id}`}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-accent text-white font-sans font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Register Now
                  <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default SeasonalEvents;
