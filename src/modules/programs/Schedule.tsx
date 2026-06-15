"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const SCHEDULE_DATA = [
  {
    location: "Kottivakkam",
    days: "Tuesday, Thursday & Saturday",
    sessions: [
      { age: "U6 - U8", time: "4:30 PM - 5:45 PM", focus: "Foundation Skills" },
      { age: "U9 - U12", time: "4:30 PM - 6:00 PM", focus: "Creative Dribbling" },
      { age: "U13 - U16", time: "6:00 AM - 7:30 AM (Sat) / 5:30 PM - 7:00 PM (Weekdays)", focus: "Tactics & Scrimmage" },
    ],
  },
  {
    location: "Injambakkam",
    days: "Monday, Wednesday & Friday",
    sessions: [
      { age: "U6 - U8", time: "4:30 PM - 5:45 PM", focus: "Foundation Skills" },
      { age: "U9 - U12", time: "4:30 PM - 6:00 PM", focus: "Creative Dribbling" },
    ],
  },
  {
    location: "Nandanam",
    days: "Wednesday, Friday & Sunday",
    sessions: [
      { age: "U9 - U12", time: "5:00 PM - 6:30 PM (Weekdays)", focus: "Creative Dribbling" },
      { age: "U13 - U16", time: "6:30 AM - 8:00 AM (Sun) / 5:00 PM - 6:30 PM (Weekdays)", focus: "Tactics & Scrimmage" },
    ],
  },
];

export const Schedule: React.FC = () => {
  const [activeLocation, setActiveLocation] = useState(SCHEDULE_DATA[0].location);

  const activeData = SCHEDULE_DATA.find((item) => item.location === activeLocation) || SCHEDULE_DATA[0];

  return (
    <section className="py-24 relative overflow-hidden bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 text-sand font-display text-xs uppercase tracking-widest font-semibold mb-4">
            <span className="h-px w-4 bg-sand" />
            Timings & Slots
            <span className="h-px w-4 bg-sand" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white font-display tracking-tight leading-tight">
            Training Schedule
          </h2>
          <p className="text-slate-400 font-light text-base md:text-lg mt-4">
            Find the active training slots and days for each of our coaching centers in Chennai.
          </p>
        </div>

        {/* Location selector tabs */}
        <div className="flex justify-center items-center gap-4 mb-12">
          {SCHEDULE_DATA.map((item) => (
            <button
              key={item.location}
              onClick={() => setActiveLocation(item.location)}
              className={cn(
                "px-6 py-2.5 rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all duration-300 border cursor-pointer",
                activeLocation === item.location
                  ? "bg-sand border-sand text-primary-dark shadow-lg shadow-sand/15"
                  : "bg-transparent border-white/10 text-slate-400 hover:text-white hover:border-white/30"
              )}
            >
              {item.location}
            </button>
          ))}
        </div>

        {/* Schedule display card */}
        <motion.div
          key={activeLocation}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="glass-card rounded-3xl p-8 border border-white/5 max-w-4xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/5 pb-6 mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-sand/10 border border-sand/20 flex items-center justify-center text-sand shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-display font-black text-xl text-white">
                  {activeData.location} Center
                </h3>
                <span className="text-xs text-slate-400 font-light">Coaching Location</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-slate-300 text-sm">
              <Calendar size={16} className="text-accent shrink-0" />
              <span className="font-semibold">{activeData.days}</span>
            </div>
          </div>

          <div className="space-y-6">
            {activeData.sessions.map((session, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                  <div className="h-12 w-12 rounded-xl bg-primary-light border border-white/10 flex items-center justify-center font-display font-black text-xs text-accent shrink-0">
                    {session.age}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-white">
                      {session.focus}
                    </h4>
                    <span className="text-xs text-slate-400 font-light flex items-center gap-1.5 mt-1">
                      <Users size={12} className="text-sand" /> Age Group Slot
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-slate-300 text-sm bg-primary-dark/50 px-4 py-2 rounded-xl border border-white/5">
                  <Clock size={14} className="text-accent shrink-0" />
                  <span className="font-semibold font-display">{session.time}</span>
                </div>
              </div>
            ))}
          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default Schedule;
