"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Trophy, Waves, Activity, Target, Shield, Sun, Star, Flame } from "lucide-react";

const CATEGORIES = ["All", "Training", "Matches", "Events", "Summer Camps"];

const GALLERY_ITEMS = [
  { id: 1, category: "Training", icon: <Activity className="h-16 w-16 text-sand" />, caption: "U12 Sand Conditioning Session", date: "June 2026" },
  { id: 2, category: "Matches", icon: <Trophy className="h-16 w-16 text-accent" />, caption: "Chennai Youth League Derby Match", date: "April 2026" },
  { id: 3, category: "Events", icon: <Waves className="h-16 w-16 text-indigo-400" />, caption: "Annual Parent-Player Beach Scrimmage", date: "May 2026" },
  { id: 4, category: "Summer Camps", icon: <Sun className="h-16 w-16 text-amber-500" />, caption: "Inaugural Day - Summer Football Camp", date: "May 2026" },
  { id: 5, category: "Training", icon: <Target className="h-16 w-16 text-sand" />, caption: "Footwork & Dribble Agility Drills", date: "March 2026" },
  { id: 6, category: "Matches", icon: <Shield className="h-16 w-16 text-accent" />, caption: "U9 Turf Final Tournament Match", date: "January 2026" },
  { id: 7, category: "Summer Camps", icon: <Star className="h-16 w-16 text-amber-500" />, caption: "Awards Ceremony - Summer Camp 2026", date: "June 2026" },
  { id: 8, category: "Events", icon: <Flame className="h-16 w-16 text-rose-500" />, caption: "1v1 Attacking Masterclass Clinic", date: "February 2026" },
];

export const GalleryGrid: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section className="py-24 relative overflow-hidden bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Category Filters */}
        <div className="flex flex-wrap justify-center items-center gap-3 mb-16">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-5 py-2 rounded-full font-display font-bold text-xs uppercase tracking-wider transition-all duration-200 border cursor-pointer",
                activeCategory === cat
                  ? "bg-sand border-sand text-primary-dark shadow-md"
                  : "bg-transparent border-white/5 text-slate-400 hover:text-white hover:border-white/20"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                key={item.id}
                className="group aspect-square rounded-3xl overflow-hidden relative border border-white/5 bg-linear-to-br from-primary-light to-primary flex items-center justify-center shadow-lg hover:shadow-black/40"
              >
                <div className="group-hover:scale-110 transition-transform duration-500">
                  {item.icon}
                </div>

                {/* Info Overlay */}
                <div className="absolute inset-0 bg-primary-dark/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 z-20">
                  <span className="text-[9px] uppercase tracking-widest font-semibold text-sand block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-display font-bold text-sm text-white leading-tight">
                    {item.caption}
                  </h4>
                  <span className="text-[10px] text-slate-400 font-light mt-1.5 block">
                    {item.date}
                  </span>
                </div>

                {/* Hover outline border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-sand/40 rounded-3xl pointer-events-none transition-colors duration-300 z-30" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};

export default GalleryGrid;
