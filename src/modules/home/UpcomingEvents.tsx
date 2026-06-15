"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, MapPin, Clock } from "lucide-react";

const EVENTS = [
  {
    title: "Neidhal Summer Football Camp",
    category: "Summer Camp",
    date: "May 10 - June 5, 2026",
    time: "6:00 AM - 8:00 AM",
    location: "Kottivakkam Turf",
    description: "Our signature annual camp covering street football styles, beach conditioning, and 1v1 skill mastery.",
    tagColor: "bg-sand/10 text-sand-dark border-sand/30",
  },
  {
    title: "1v1 Attacking Masterclass",
    category: "Football Clinic",
    date: "June 20 - June 21, 2026",
    time: "4:00 PM - 6:00 PM",
    location: "Nandanam Turf",
    description: "Special clinic focused entirely on dribbling tricks, body swerves, and scoring techniques in tight spaces.",
    tagColor: "bg-accent/10 text-accent border-accent/20",
  },
];

export const UpcomingEvents: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-[#FAF7F2] border-t border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-accent font-display text-xs uppercase tracking-widest font-semibold mb-4">
              <span className="h-px w-6 bg-accent" />
              Special Programs
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-primary font-display tracking-tight leading-tight">
              Upcoming Events & Clinics
            </h2>
            <p className="text-[#6F6F6F] font-normal text-base md:text-lg mt-3">
              Explore our special programs, camps, and tactical masterclasses designed for players looking to accelerate their growth.
            </p>
          </div>
          
          <Link
            href="/events"
            className="mt-6 md:mt-0 inline-flex items-center gap-2 font-sans font-bold text-xs uppercase tracking-wider text-accent hover:text-primary transition-colors duration-200 cursor-pointer group"
          >
            View All Events
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {EVENTS.map((event, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-sand/25 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group shadow-xs hover:shadow-sm transition-all duration-300"
            >
              {/* Event Badge */}
              <div className="mb-6">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border ${event.tagColor}`}>
                  {event.category}
                </span>
              </div>
              
              <div>
                <h3 className="font-display font-black text-xl md:text-2xl text-primary mb-4 leading-tight group-hover:text-accent transition-colors">
                  {event.title}
                </h3>
                <p className="text-[#6F6F6F] text-sm font-normal leading-relaxed mb-6">
                  {event.description}
                </p>
              </div>

              {/* Details strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-black/5 pt-6 text-xs text-[#6F6F6F] font-normal mb-6">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-sand-dark shrink-0" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-accent shrink-0" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={14} className="text-sand-dark shrink-0" />
                  <span>{event.location}</span>
                </div>
              </div>

              <Link
                href="/join"
                className="w-full py-3 rounded-2xl bg-primary hover:bg-accent text-white font-sans font-bold text-xs uppercase tracking-wider text-center transition-all duration-300 cursor-pointer"
              >
                Register For This Event
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default UpcomingEvents;
