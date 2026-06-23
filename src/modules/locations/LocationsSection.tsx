"use client";

import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import LocationsHero from "./LocationsHero";
import LocationCard from "./LocationCard";

/* ─────────────────────────────────────────────
   DATA
 ───────────────────────────────────────────── */
const LOCATIONS = [
  {
    chapter: "Hub 01",
    id: "kottivakkam",
    title: "Kottivakkam",
    tagline: "Where sand meets skill",
    personality:
      "Our home base. Just steps from the sea breeze where sand conditioning meets turf execution.",
    address: "Near RTO Office, ECR Coastal Road, Kottivakkam, Chennai",
    days: "Tuesday, Thursday & Saturday",
    times: "Morning: 6:00 AM – 7:30 AM (Sat)\nEvening: 4:30 PM – 6:00 PM (Weekdays)",
    coach: "Pradeep Ramesh",
    images: [
      "/beach_soccer.png",
      "/soccer_thumb.png",
      "/location.png",
    ],
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.665977934442!2d80.2543!3d12.9612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525d625d9962a7%3A0xe9f70cd56b009e4f!2sKottivakkam%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin",
  },
  {
    chapter: "Hub 02",
    id: "injambakkam",
    title: "Injambakkam",
    tagline: "Fast, fluid, fearless",
    personality:
      "Where the play is fast and fluid. Highly technical ECR coastal turf training for our junior squads.",
    address: "ECR Coastal Play-turf, Injambakkam, Chennai",
    days: "Monday, Wednesday & Friday",
    times: "Evening: 4:30 PM – 5:45 PM (U6–U8) / 4:30 PM – 6:00 PM (U9–U12)",
    coach: "Vijay Balan",
    images: [
      "/coaching_ratio.png",
      "/beach_soccer.png",
      "/location.png",
    ],
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.378901234567!2d80.2505!3d12.9152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525c38ffffffef%3A0xabcdefabcdef!2sInjambakkam%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1680000000001!5m2!1sen!2sin",
  },
  {
    chapter: "Hub 03",
    id: "nandanam",
    title: "Nandanam",
    tagline: "The city's tactical arena",
    personality:
      "Professional turf facility in the heart of Chennai, designed for spatial tactics and high-intensity match dynamics.",
    address: "Central Coaching Turf Facility, YMCA Ground, Nandanam, Chennai",
    days: "Wednesday, Friday & Sunday",
    times: "Morning: 6:30 AM – 8:00 AM (Sun)\nEvening: 5:00 PM – 6:30 PM (Weekdays)",
    coach: "Vijay Balan",
    images: [
      "/soccer_thumb.png",
      "/coaching_ratio.png",
      "/beach_soccer.png",
    ],
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.234567890123!2d80.2378!3d13.0298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5267d32512d7bf%3A0x63c3d52d9a3b68!2sYMCA%20Grounds%2C%20Nandanam%2C%20Chennai%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1680000000002!5m2!1sen!2sin",
  },
];

/* ─────────────────────────────────────────────
   MAIN EXPORT
 ───────────────────────────────────────────── */
export const LocationsSection: React.FC = () => {
  const { scrollY } = useScroll();
  const cardScale = useTransform(scrollY, [0, 500], [0.95, 1]);
  const cardBorderRadius = useTransform(scrollY, [0, 500], ["2.5rem", "0rem"]);
  const cardMarginX = useTransform(scrollY, [0, 500], ["1.5rem", "0rem"]);

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] overflow-x-hidden">
      {/* Pinned/Sticky Hero Section in Background */}
      <div className="fixed top-0 left-0 h-screen w-full overflow-hidden z-0">
        <LocationsHero />
      </div>

      {/* The scrolling "Curtain" Card on top of Hero */}
      <motion.div
        style={{
          scale: cardScale,
          borderTopLeftRadius: cardBorderRadius,
          borderTopRightRadius: cardBorderRadius,
          marginLeft: cardMarginX,
          marginRight: cardMarginX,
        }}
        className="relative z-10 bg-[#FAF7F2] shadow-[0_-20px_50px_rgba(11,31,58,0.15)] border-t border-white/40 pt-20 pb-28 sm:py-32 origin-top mt-[100vh]"
      >
        <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-8 md:px-12 space-y-20 sm:space-y-28">

          {/* Section heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
            className="text-center"
          >
            <h2 className="font-display font-light text-3xl sm:text-4xl md:text-5xl text-[#0B1F3A] tracking-tight leading-tight">
              Three Hubs.{" "}
              <span className="font-extrabold text-[#0077b6]">One Academy.</span>
            </h2>
            <p className="text-[#5A6E85] text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              All located along the South Chennai ECR coastline. Choose the hub nearest to you and book a free trial session.
            </p>

            {/* Divider */}
            <div className="flex items-center gap-4 max-w-xs mx-auto mt-8">
              <div className="flex-1 h-px bg-[#0B1F3A]/10" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#0077b6]" />
              <div className="flex-1 h-px bg-[#0B1F3A]/10" />
            </div>
          </motion.div>

          {/* Cards */}
          {LOCATIONS.map((loc, idx) => (
            <LocationCard key={loc.id} loc={loc} index={idx} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default LocationsSection;
