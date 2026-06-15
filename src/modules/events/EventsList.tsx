"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const EVENTS_DATA = [
  {
    id: 1,
    title: "Neidhal Summer Football Camp",
    type: "Upcoming",
    category: "Summer Camp",
    date: "May 10 - June 5, 2026",
    time: "6:00 AM - 8:00 AM",
    location: "Kottivakkam Turf",
    description: "Annual intensive summer conditioning camp specializing in physical stamina on beach sand and ball mastery on artificial turf.",
  },
  {
    id: 2,
    title: "1v1 Attacking Masterclass",
    type: "Upcoming",
    category: "Football Clinic",
    date: "June 20 - June 21, 2026",
    time: "4:00 PM - 6:00 PM",
    location: "Nandanam Turf",
    description: "Weekend masterclass targeting attacking footwork, body swerves, and scoring techniques under high pressure.",
  },
  {
    id: 3,
    title: "Winter Football Clinic",
    type: "Past",
    category: "Football Clinic",
    date: "January 15 - January 18, 2026",
    time: "4:30 PM - 6:00 PM",
    location: "Nandanam Turf",
    description: "A 4-day skill clinic covering fundamental defensive mechanics, physical balance, and basic tactical awareness.",
  },
  {
    id: 4,
    title: "Beach Football Carnival",
    type: "Past",
    category: "Special Program",
    date: "November 23, 2025",
    time: "7:00 AM - 11:00 AM",
    location: "Kottivakkam Beach Front",
    description: "Our annual community sand tournament celebrating our founding beach beginnings with kids, parents, and coaches.",
  },
];

export const EventsList: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Upcoming" | "Past">("Upcoming");

  const filteredEvents = EVENTS_DATA.filter((e) => e.type === activeTab);

  return (
    <section className="py-24 relative overflow-hidden bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Toggle tabs */}
        <div className="flex justify-center items-center gap-4 mb-16">
          {(["Upcoming", "Past"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-6 py-2.5 rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 border cursor-pointer",
                activeTab === tab
                  ? "bg-sand border-sand text-primary-dark shadow-md"
                  : "bg-transparent border-white/5 text-slate-400 hover:text-white hover:border-white/20"
              )}
            >
              {tab} Events
            </button>
          ))}
        </div>

        {/* List Grid */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={event.id}
                className="glass-card rounded-3xl p-8 border border-white/5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent/15 text-accent border border-accent/20">
                      {event.category}
                    </span>
                    {event.type === "Past" && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                        <CheckCircle size={12} /> Completed
                      </span>
                    )}
                  </div>

                  <h3 className="font-display font-black text-xl md:text-2xl text-white mb-4 leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-slate-400 text-sm font-light leading-relaxed mb-6">
                    {event.description}
                  </p>
                </div>

                <div>
                  {/* Details Strip */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/5 pt-6 text-xs text-slate-400 font-light mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-sand shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="text-accent shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-sand shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  {event.type === "Upcoming" ? (
                    <a
                      href="https://wa.me/919962916597"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 rounded-2xl bg-white/5 hover:bg-sand text-white hover:text-primary-dark font-display font-bold text-xs uppercase tracking-wider text-center border border-white/10 hover:border-sand transition-all duration-300 block"
                    >
                      Inquire / Register
                    </a>
                  ) : (
                    <span className="w-full py-3 rounded-2xl bg-white/5 text-slate-500 font-display font-bold text-xs uppercase tracking-wider text-center border border-white/5 block cursor-default">
                      Registrations Closed
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default EventsList;
