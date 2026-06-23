"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Maximize2, X, Camera } from "lucide-react";

const GALLERY_ITEMS = [
  {
    id: 1,
    image: "/beach_soccer.png",
    title: "Barefoot Shoreline Grit",
    category: "Beach Roots",
    gridClass: "md:col-span-2 md:row-span-2 min-h-[280px] md:min-h-[460px]",
  },
  {
    id: 2,
    image: "/advanced_match.png",
    title: "Tactical Turf Scrimmages",
    category: "Match Play",
    gridClass: "md:col-span-1 md:row-span-2 min-h-[280px] md:min-h-[460px]",
  },
  {
    id: 3,
    image: "/coaching_ratio.png",
    title: "Dual Coach Guidance",
    category: "2:1 Ratio",
    gridClass: "md:col-span-1 md:row-span-1 min-h-[220px]",
  },
  {
    id: 4,
    image: "/foundation_drill.png",
    title: "Youth Technical Pods",
    category: "Development",
    gridClass: "md:col-span-2 md:row-span-1 min-h-[220px]",
  },
  {
    id: 5,
    image: "/soccer_thumb.png",
    title: "Precision Ball Touches",
    category: "Ball Control",
    gridClass: "md:col-span-1 md:row-span-1 min-h-[220px]",
  },
  {
    id: 6,
    image: "/location.png",
    title: "Coastal Hub Environments",
    category: "Training Hubs",
    gridClass: "md:col-span-1 md:row-span-1 min-h-[220px]",
  },
];

export const LifeAtNeidhal: React.FC = () => {
  const [activeImage, setActiveImage] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  return (
    <section className="py-24 bg-[#FAF7F2] relative overflow-hidden border-b border-black/5">
      {/* Grid background accent */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,31,58,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,31,58,0.01)_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none" />
      
      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex flex-col items-start gap-3 text-left">
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-accent flex items-center gap-1.5">
              <Camera size={12} />
              Media Gallery
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold font-display tracking-wide leading-none text-primary font-sans">
              Life at Neidhal
            </h2>
            <p className="text-[#5A6E85] text-xs sm:text-sm max-w-md mt-1 leading-relaxed">
              Glance through daily pod routines, intense barefoot conditioning, and coastal turf training action.
            </p>
          </div>

          <div className="flex items-center gap-4 max-w-xs shrink-0 self-start md:self-end">
            <div className="flex-1 h-px bg-[#0B1F3A]/10 w-16" />
            <div className="h-1.5 w-1.5 rounded-full bg-[#0077b6]" />
            <div className="flex-1 h-px bg-[#0B1F3A]/10 w-16" />
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-fr">
          {GALLERY_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: (index % 4) * 0.1 }}
              onClick={() => setActiveImage(item)}
              className={`${item.gridClass} group relative rounded-[2rem] overflow-hidden border border-black/5 shadow-md bg-white cursor-pointer select-none`}
            >
              {/* Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              
              {/* Soft overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex flex-col justify-end p-6 text-left" />

              {/* Static overlay subtle text at the bottom */}
              <div className="absolute bottom-4 left-6 z-10 text-left transition-transform duration-300 group-hover:translate-y-[-8px] pointer-events-none">
                <span className="inline-block px-2.5 py-0.5 rounded-md bg-black/40 backdrop-blur-sm text-[8px] font-bold uppercase tracking-widest text-sand border border-white/5">
                  {item.category}
                </span>
                <h3 className="text-white font-display font-bold text-sm sm:text-base mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 leading-tight">
                  {item.title}
                </h3>
              </div>

              {/* Expand Icon */}
              <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <Maximize2 size={12} />
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
          >
            {/* Close Button */}
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center border border-white/10 transition-colors cursor-pointer z-50"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>

            {/* Modal Image Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative max-w-5xl w-full aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-900 cursor-default"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeImage.image}
                alt={activeImage.title}
                fill
                sizes="(max-width: 1200px) 100vw, 1024px"
                className="object-cover"
              />

              {/* Bottom Labels */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col items-start text-left gap-2">
                <span className="px-3 py-1 rounded-md bg-sand text-primary font-sans font-bold text-[9px] uppercase tracking-wider">
                  {activeImage.category}
                </span>
                <h3 className="text-white font-display font-extrabold text-xl sm:text-2xl leading-none">
                  {activeImage.title}
                </h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default LifeAtNeidhal;
