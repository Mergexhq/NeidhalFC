"use client";

import React from "react";
import { motion } from "framer-motion";
import { Anchor, Waves } from "lucide-react";
import Image from "next/image";

export const SymbolismBoard: React.FC = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-primary text-white border-t border-white/5">
      {/* Background visual cues */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-size-[6rem_6rem] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] rounded-full bg-sand/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-sand mb-4 block">
            Brand Identity
          </span>
          <h2 className="text-4xl md:text-6xl font-black font-display tracking-tight text-white uppercase leading-tight">
            Our Symbolism
          </h2>
          <div className="w-16 h-1 bg-sand mx-auto rounded-full mt-6" />
        </div>

        {/* Brand Symbolism Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          
          {/* Card 1: Bay of Bengal Footprint */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="h-12 w-12 rounded-2xl bg-sand/10 border border-sand/30 flex items-center justify-center text-sand mb-8">
                <Anchor className="h-6 w-6" />
              </div>
              <h3 className="font-sans font-extrabold text-2xl text-sand mb-4 leading-tight">
                Bay of Bengal Footprint
              </h3>
              <p className="text-white/80 text-sm md:text-base leading-relaxed font-normal mb-8">
                The sea breeze, coastal sand, and shoreline are not just decorative backgrounds—they are our home. Our footprint spans Chennai's coastal stretch. Training on ECR coastlines instills a natural, grit-driven athletic resilience that cannot be simulated on modern synthetic grass fields.
              </p>
            </div>
            <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark">
              <Image 
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80" 
                alt="Bay of Bengal coast" 
                fill
                className="object-cover opacity-80"
              />
            </div>
          </motion.div>

          {/* Card 2: Dolphin Symbolism */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="h-12 w-12 rounded-2xl bg-sand/10 border border-sand/30 flex items-center justify-center text-sand mb-8">
                <Waves className="h-6 w-6" />
              </div>
              <h3 className="font-sans font-extrabold text-2xl text-sand mb-4 leading-tight">
                Dolphin Crest
              </h3>
              <p className="text-white/80 text-sm md:text-base leading-relaxed font-normal mb-8">
                Native marine life is abundant along the Chennai coast. The crest of Neidhal features dolphins because they represent the soul of our club: highly social, deeply communicative, incredibly smart, and playing with absolute joy. Dolphins play as a team, adapting instantly to the waves.
              </p>
            </div>
            <div className="relative w-full h-48 rounded-2xl overflow-hidden border border-white/10 bg-primary-dark">
              <Image 
                src="https://images.unsplash.com/photo-1570473541596-2cf814780191?auto=format&fit=crop&w=600&q=80" 
                alt="Dolphin in marine life" 
                fill
                className="object-cover opacity-80"
              />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default SymbolismBoard;
