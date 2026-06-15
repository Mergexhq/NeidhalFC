"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Trophy, Shield, HelpCircle } from "lucide-react";

interface FacilityCardProps {
  hub: string;
  name: string;
  desc: string;
  highlights: string[];
  index: number;
}

const FacilityCard: React.FC<FacilityCardProps> = ({ hub, name, desc, highlights, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="bg-white border border-sand/20 rounded-[2rem] p-8 md:p-10 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group"
    >
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] uppercase font-bold tracking-widest text-accent-dark">
            {hub}
          </span>
        </div>
        <h4 className="font-sans font-extrabold text-xl text-primary mb-3 leading-tight group-hover:text-accent transition-colors">
          {name}
        </h4>
        <p className="text-[#6F6F6F] text-xs md:text-sm font-normal leading-relaxed mb-6">
          {desc}
        </p>
      </div>

      <div className="border-t border-black/5 pt-6 mt-auto">
        <ul className="space-y-2.5">
          {highlights.map((h, i) => (
            <li key={i} className="flex items-center gap-2.5 text-[#5A5A5A] text-xs font-normal">
              <span className="h-1 w-1 rounded-full bg-sand-dark" />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export const Facilities: React.FC = () => {
  const SITES = [
    {
      hub: "Kottivakkam Shore Turf",
      name: "The Coastline Ground",
      desc: "Our primary shoreline turf located right off the East Coast Road, catching the evening ocean breeze. Designed specifically for training that demands quick spatial recovery.",
      highlights: [
        "FIFA-approved shock-absorbent turf",
        "High-density containment netting (12m)",
        "Premium low-glare LED floodlights",
        "Dedicated parent viewing area & parking"
      ],
    },
    {
      hub: "Injambakkam Arena",
      name: "The Training Sanctuary",
      desc: "A spacious multi-sport facility situated in a quiet coastal enclave. This hub is optimized for competitive match simulations and tactical pod sessions.",
      highlights: [
        "Wide-format turf for 7v7 play",
        "Integrated player changing rooms",
        "Advanced agility grids & tracking areas",
        "Hydration station & player shelter"
      ],
    },
    {
      hub: "Nandanam Hub",
      name: "The Core City Center",
      desc: "Our city-center training location, easily accessible for players in central Chennai. Equipped with specialized technical training rigs and speed-mastery setups.",
      highlights: [
        "High-density turf optimized for speed",
        "Professional rebounders & agility gates",
        "Target nets & ball launcher rigs",
        "Parent lounge & reception desk"
      ],
    },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#FAF7F2] relative overflow-hidden border-t border-black/5">
      {/* Background accents */}
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-sand/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-accent mb-4 block font-sans">
            Chapter 5: The Turf & Gear
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-primary font-display tracking-tight leading-tight uppercase max-w-xl mx-auto">
            Engineered for Coastal Play
          </h2>
          <div className="w-16 h-1 bg-sand mx-auto rounded-full mt-6" />
          <p className="text-[#6F6F6F] text-sm md:text-base leading-relaxed font-normal mt-6 max-w-xl mx-auto">
            From professional-grade artificial shock-pads to specialized beach training gear, our infrastructure is built to let kids play with absolute safety, speed, and freedom.
          </p>
        </div>

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SITES.map((site, idx) => (
            <FacilityCard
              key={idx}
              hub={site.hub}
              name={site.name}
              desc={site.desc}
              highlights={site.highlights}
              index={idx}
            />
          ))}
        </div>

        {/* Agility/Gear callout */}
        <div className="mt-16 bg-white border border-sand/15 rounded-[2.5rem] p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-left max-w-2xl">
            <span className="text-[10px] uppercase font-bold tracking-widest text-accent mb-2 block">Coaching Gear standard</span>
            <h4 className="font-sans font-black text-xl text-primary uppercase mb-3">
              Professional Development Kits
            </h4>
            <p className="text-[#6F6F6F] text-xs md:text-sm font-normal leading-relaxed">
              {"We utilize professional coaching equipment at all times—including precision agility ladders, speed parachutes, target rebounders, sensor-based gate timers, and custom tactical visual boards. Every child trains with high-quality footballs sized precisely to their developmental age pod."}
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-[#0077b6]/10 text-accent flex items-center justify-center font-bold text-lg">
              500+
            </div>
            <div className="text-left font-sans text-xs uppercase tracking-wide text-primary font-bold">
              Items of Specialized<br />Training Gear
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Facilities;
