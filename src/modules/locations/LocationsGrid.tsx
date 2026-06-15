"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Clock, Users, Sun, Waves, Trophy, X } from "lucide-react";
import Link from "next/link";

const CENTERS = [
  {
    id: "kottivakkam",
    name: "Kottivakkam Hub",
    address: "Near RTO Office, ECR Coastal Road, Kottivakkam, Chennai",
    days: "Tuesday, Thursday & Saturday",
    times: "Morning: 6:00 AM - 7:30 AM (Sat)\nEvening: 4:30 PM - 6:00 PM (Weekdays)",
    ages: "U6 - U8, U9 - U12, U13 - U16",
    icon: <Sun className="h-6 w-6 text-sand" />,
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.665977934442!2d80.2543!3d12.9612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d625d9962a7%3A0xe9f70cd56b009e4f!2sKottivakkam%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin",
  },
  {
    id: "injambakkam",
    name: "Injambakkam Hub",
    address: "ECR coastal Play-turf, Injambakkam, Chennai",
    days: "Monday, Wednesday & Friday",
    times: "Evening: 4:30 PM - 5:45 PM (U6-U8) / 4:30 PM - 6:00 PM (U9-U12)",
    ages: "U6 - U8, U9 - U12",
    icon: <Waves className="h-6 w-6 text-accent-light" />,
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.378901234567!2d80.2505!3d12.9152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525c38ffffffef%3A0xabcdefabcdef!2sInjambakkam%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1680000000001!5m2!1sen!2sin",
  },
  {
    id: "nandanam",
    name: "Nandanam Hub",
    address: "Central Coaching Turf Facility, YMCA Ground (Near Metro), Nandanam, Chennai",
    days: "Wednesday, Friday & Sunday",
    times: "Morning: 6:30 AM - 8:00 AM (Sun)\nEvening: 5:00 PM - 6:30 PM (Weekdays)",
    ages: "U9 - U12, U13 - U16",
    icon: <Trophy className="h-6 w-6 text-sand-dark" />,
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.234567890123!2d80.2378!3d13.0298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267d32512d7bf%3A0x63c3d52d9a3b68!2sYMCA%20Grounds%2C%20Nandanam%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1680000000002!5m2!1sen!2sin",
  },
];

export const LocationsGrid: React.FC = () => {
  const [activeMapEmbed, setActiveMapEmbed] = useState<string | null>(null);
  const [activeMapTitle, setActiveMapTitle] = useState<string>("");

  const openMapModal = (embedUrl: string, title: string) => {
    setActiveMapEmbed(embedUrl);
    setActiveMapTitle(title);
  };

  const closeMapModal = () => {
    setActiveMapEmbed(null);
    setActiveMapTitle("");
  };

  return (
    <section className="py-24 relative overflow-hidden bg-primary-dark">
      {/* Wave decorative pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-sand mb-4 block font-sans">
            Our Centers
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white font-display tracking-tight leading-tight uppercase">
            Active Coaching Hubs
          </h2>
          <p className="text-slate-400 font-normal text-sm md:text-base mt-4 max-w-xl mx-auto">
            We operate across three prime training turf environments in Chennai, designed for safety, focus, and skill progression.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          {CENTERS.map((center, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card rounded-[2rem] p-8 border border-white/5 flex flex-col justify-between"
            >
              <div>
                {/* Header info */}
                <div className="flex items-center justify-between mb-8">
                  <h3 className="font-sans font-extrabold text-xl text-white leading-tight">
                    {center.name}
                  </h3>
                  <span className="shrink-0 h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                    {center.icon}
                  </span>
                </div>

                <div className="space-y-5 text-sm text-slate-300 font-normal">
                  <div className="flex gap-3">
                    <MapPin size={16} className="text-sand shrink-0 mt-0.5" />
                    <p className="leading-relaxed text-left">{center.address}</p>
                  </div>
                  
                  <div className="flex gap-3">
                    <Calendar size={16} className="text-sand-dark shrink-0 mt-0.5" />
                    <p className="leading-relaxed text-left font-semibold text-slate-200">{center.days}</p>
                  </div>

                  <div className="flex gap-3">
                    <Clock size={16} className="text-sand shrink-0 mt-0.5" />
                    <p className="leading-relaxed text-left whitespace-pre-line text-xs text-slate-400">{center.times}</p>
                  </div>

                  <div className="flex gap-3">
                    <Users size={16} className="text-sand-dark shrink-0 mt-0.5" />
                    <p className="leading-relaxed text-left uppercase tracking-wider text-xs font-semibold text-slate-200">{center.ages}</p>
                  </div>
                </div>
              </div>

              {/* Dual Action Buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => openMapModal(center.embedUrl, center.name)}
                  className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-sans font-semibold text-xs uppercase tracking-wider text-center border border-white/15 transition-all duration-300 cursor-pointer"
                >
                  View Map
                </button>
                <Link
                  href={`/book-trial?center=${center.id}`}
                  className="flex-1 py-3 px-4 rounded-xl bg-sand hover:bg-[#FAF7F2] text-primary-dark font-sans font-extrabold text-xs uppercase tracking-wider text-center transition-all duration-300 cursor-pointer"
                >
                  Book Trial
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Google Maps Embed Modal */}
      <AnimatePresence>
        {activeMapEmbed && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark background overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMapModal}
              className="absolute inset-0 bg-[#000000]/80 backdrop-blur-sm"
            />
            
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.4 }}
              className="relative w-full max-w-3xl bg-primary border border-white/10 rounded-[2rem] overflow-hidden shadow-2xl z-10 flex flex-col text-white"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <h4 className="font-sans font-extrabold text-lg text-white">{activeMapTitle} Map View</h4>
                <button 
                  onClick={closeMapModal}
                  className="p-1 rounded-full bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white cursor-pointer transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Iframe embed */}
              <div className="relative aspect-video w-full bg-primary-dark">
                <iframe
                  src={activeMapEmbed}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={activeMapTitle}
                  className="w-full h-full"
                />
              </div>

              {/* Footer CTA */}
              <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3 bg-primary-dark/50">
                <button
                  onClick={closeMapModal}
                  className="px-5 py-2.5 rounded-xl text-slate-300 hover:text-white font-sans font-semibold text-xs uppercase cursor-pointer"
                >
                  Close
                </button>
                <Link
                  href="/book-trial"
                  onClick={closeMapModal}
                  className="px-6 py-2.5 rounded-xl bg-sand text-primary-dark font-sans font-bold text-xs uppercase tracking-wider cursor-pointer hover:bg-white"
                >
                  Book Trial Session
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default LocationsGrid;
