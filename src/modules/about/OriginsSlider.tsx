"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Sparkles, MapPin, ArrowRight } from "lucide-react";

const LOCATIONS = [
  {
    id: "kottivakkam",
    title: "Kottivakkam Hub",
    tagline: "Where sand meets skill",
    description: "Our home base. Just steps from the sea breeze where sand conditioning meets turf execution.",
    address: "Valmiki Nagar, Kottivakkam",
    image: "/images/locations/kottivakkam-1.webp",
  },
  {
    id: "injambakkam",
    title: "Injambakkam Hub",
    tagline: "Fast, fluid, fearless",
    description: "Where the play is fast and fluid. Highly technical ECR coastal turf training for our junior squads.",
    address: "Akkarai, Injambakkam",
    image: "/images/locations/injambakkam-1.webp",
  },
  {
    id: "nandanam",
    title: "Nandanam Hub",
    tagline: "The city's tactical arena",
    description: "Professional turf facility in the heart of Chennai, designed for spatial tactics and high-intensity match dynamics.",
    address: "Lotus Colony, Nandanam",
    image: "/images/locations/nandanam-1.webp",
  },
];

export const OriginsSlider: React.FC = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section
      id="chapter-four"
      className="py-24 md:py-32 bg-[#FAF7F2] text-[#0B1F3A] relative overflow-hidden border-b border-black/5"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="max-w-3xl text-left mb-16">
          <span className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.25em] font-extrabold text-[#0077b6] mb-4">
            <Sparkles size={12} />
            Growing Together
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold tracking-tight text-[#0B1F3A] mb-6">
            From One Beach to Three Communities
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light max-w-2xl">
            What began with two friends soon became something bigger. More children joined. More families believed. Today, Neidhal FC proudly trains young footballers across multiple locations in Chennai while staying true to where it all began.
          </p>
        </div>

        {/* Locations Cards Grid */}
        <motion.div
          custom={0}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch"
        >
          {LOCATIONS.map((loc) => (
            <motion.div
              key={loc.id}
              variants={cardVariants}
              className="bg-white border border-black/5 rounded-[2rem] overflow-hidden flex flex-col justify-between shadow-md hover:shadow-xl transition-all duration-300 group"
            >
              {/* Card Image Header */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <Image
                  src={loc.image}
                  alt={loc.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 30vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#0B1F3A]/5 pointer-events-none" />
                
                {/* Floating Address Badge */}
                <div className="absolute bottom-4 left-4 bg-black/45 backdrop-blur-md text-white border border-white/10 px-3 py-1.5 rounded-xl flex items-center gap-1.5 text-[10px] font-bold">
                  <MapPin size={10} className="text-[#BCA688]" />
                  <span>{loc.address}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow text-left">
                <span className="text-[9px] uppercase tracking-widest text-[#0077b6] font-extrabold mb-1.5 block">
                  {loc.tagline}
                </span>
                <h3 className="font-sans font-bold text-xl text-[#0B1F3A] mb-3 group-hover:text-[#0077b6] transition-colors duration-200">
                  {loc.title}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed font-light mb-6 flex-grow">
                  {loc.description}
                </p>

                {/* Footer Link */}
                <div className="border-t border-black/5 pt-4 mt-auto">
                  <Link
                    href={`/locations#${loc.id}`}
                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0B1F3A] hover:text-[#0077b6] transition-colors group/link"
                  >
                    <span>View Hub Details</span>
                    <ArrowRight size={12} className="group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default OriginsSlider;
