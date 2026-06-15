"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, Users, Sun, Waves, Trophy } from "lucide-react";

const CENTERS = [
  {
    name: "Kottivakkam Center",
    address: "Near RTO Office, ECR Coastal Road, Kottivakkam, Chennai",
    days: "Tuesday, Thursday & Saturday",
    times: "Morning: 6:00 AM - 7:30 AM (Sat)\nEvening: 4:30 PM - 6:00 PM (Weekdays)",
    ages: "U6 - U8, U9 - U12, U13 - U16",
    icon: <Sun className="h-6 w-6 text-sand" />,
  },
  {
    name: "Injambakkam Center",
    address: "ECR coastal Play-turf, Injambakkam, Chennai",
    days: "Monday, Wednesday & Friday",
    times: "Evening: 4:30 PM - 5:45 PM (U6-U8) / 4:30 PM - 6:00 PM (U9-U12)",
    ages: "U6 - U8, U9 - U12",
    icon: <Waves className="h-6 w-6 text-accent" />,
  },
  {
    name: "Nandanam Center",
    address: "Central Coaching Turf Facility, YMCA Ground (Near Metro), Nandanam, Chennai",
    days: "Wednesday, Friday & Sunday",
    times: "Morning: 6:30 AM - 8:00 AM (Sun)\nEvening: 5:00 PM - 6:30 PM (Weekdays)",
    ages: "U9 - U12, U13 - U16",
    icon: <Trophy className="h-6 w-6 text-indigo-400" />,
  },
];

export const LocationsGrid: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center justify-center gap-2 text-sand font-display text-xs uppercase tracking-widest font-semibold mb-4">
            <span className="h-px w-4 bg-sand" />
            Our Centers
            <span className="h-px w-4 bg-sand" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white font-display tracking-tight leading-tight">
            Active Chennai Centers
          </h2>
          <p className="text-slate-400 font-light text-base md:text-lg mt-4">
            We operate across three prime turf coaching locations in Chennai. Select the center nearest to you.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {CENTERS.map((center, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-3xl p-8 border border-white/5 flex flex-col justify-between"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-display font-black text-xl text-white leading-tight">
                    {center.name}
                  </h3>
                  <span className="shrink-0">{center.icon}</span>
                </div>

                <div className="space-y-5 text-sm font-light text-slate-300">
                  <div className="flex gap-2.5">
                    <MapPin size={16} className="text-sand shrink-0 mt-0.5" />
                    <p className="leading-relaxed">{center.address}</p>
                  </div>
                  
                  <div className="flex gap-2.5">
                    <Calendar size={16} className="text-accent shrink-0 mt-0.5" />
                    <p className="leading-relaxed font-semibold text-slate-200">{center.days}</p>
                  </div>

                  <div className="flex gap-2.5">
                    <Clock size={16} className="text-sand shrink-0 mt-0.5" />
                    <p className="leading-relaxed whitespace-pre-line font-display text-xs text-slate-400">{center.times}</p>
                  </div>

                  <div className="flex gap-2.5">
                    <Users size={16} className="text-accent shrink-0 mt-0.5" />
                    <p className="leading-relaxed uppercase tracking-wider text-xs font-semibold text-slate-200">{center.ages}</p>
                  </div>
                </div>
              </div>

              <a
                href="https://wa.me/919962916597"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-8 py-3 rounded-2xl bg-white/5 hover:bg-sand text-white hover:text-primary-dark font-display font-bold text-xs uppercase tracking-wider text-center border border-white/10 hover:border-sand transition-all duration-300 cursor-pointer block"
              >
                Inquire For This Center
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default LocationsGrid;
