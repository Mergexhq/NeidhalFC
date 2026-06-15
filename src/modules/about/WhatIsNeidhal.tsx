"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass, Waves } from "lucide-react";

export const WhatIsNeidhal: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-primary border-t border-b border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,_var(--tw-gradient-stops))] from-sand/5 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center justify-center gap-2 text-sand font-display text-xs uppercase tracking-widest font-semibold mb-4">
            <span className="h-px w-4 bg-sand" />
            Cultural Identity
            <span className="h-px w-4 bg-sand" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white font-display tracking-tight leading-tight">
            {"Understanding \"Neidhal\""}
          </h2>
          <p className="text-slate-400 font-light text-base md:text-lg leading-relaxed mt-4">
            Our identity is deeply tied to the land, the ocean, and classical Tamil heritage.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-3xl p-8 border border-white/5"
          >
            <div className="h-12 w-12 rounded-2xl bg-sand/10 border border-sand/20 flex items-center justify-center text-sand mb-6">
              <Compass size={24} />
            </div>
            <h3 className="font-display font-black text-lg text-white mb-3">The Tamil Landscape</h3>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              In classical Sangam Tamil literature, landscapes are divided into five eco-regions (Thinai). <strong>Neidhal</strong> refers specifically to the coastal landscape, representing the beach, the shorelines, and the vast ocean.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card rounded-3xl p-8 border border-white/5"
          >
            <div className="h-12 w-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6">
              <Waves size={24} />
            </div>
            <h3 className="font-display font-black text-lg text-white mb-3">Sand & Blue</h3>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              Our official colors directly depict the coastal atmosphere. The warm sand represents our beach origins and the grounding fundamentals, while the deep blue represents the endless potential of the ocean.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-3xl p-8 border border-white/5"
          >
            <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-6">
              <Waves size={24} />
            </div>
            <h3 className="font-display font-black text-lg text-white mb-3">Dolphin Mascot</h3>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              Rooted in our early days playing near the Bay of Bengal, where dolphin pods frequently swam just yards from our sessions, representing playfulness, intelligence, and unified teamwork.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default WhatIsNeidhal;
