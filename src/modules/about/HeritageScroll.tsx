"use client";

import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Map, Waves } from "lucide-react";

export const HeritageScroll: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-primary text-white border-b border-white/5">
      {/* Background graphic grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-size-[6rem_6rem] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-sand/5 blur-[120px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Literary Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <BookOpen className="h-8 w-8 text-sand mb-6 animate-pulse" />
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-sand mb-3 block">
            Sangam Literature Context
          </span>
          <h2 className="text-4xl md:text-6xl font-black font-display tracking-tight text-white uppercase max-w-3xl leading-tight">
            The Legend of Neidhal
          </h2>
        </div>

        {/* Narrative Scroll Blocks */}
        <div className="space-y-12">
          {[
            {
              title: "நெய்தல் — The Seashore Landscape",
              desc: "In ancient Tamil Sangam literature (dated 300 BCE – 300 CE), the land was divided into five distinct ecological zones or 'Thinai'. Neidhal represents the coastal landscape—where the sea meets the shore. It is the landscape of sand, salty winds, and infinite horizons.",
              icon: <Waves className="h-6 w-6 text-sand" />
            },
            {
              title: "The Spirit of the Coastline",
              desc: "The Neidhal Thinai is characterized by perseverance, resilience, and adaptability. The ancient coastal people lived in harmony with the temperamental waters of the Bay of Bengal, developing sharp instincts and fearless character in response to the power of the sea.",
              icon: <Map className="h-6 w-6 text-sand" />
            },
            {
              title: "From Water to Football",
              desc: "We named our club Neidhal to honor this coastal legacy. Our training philosophy is directly inspired by the seashore environment: fluid movements like the tide, adaptable decision-making in the face of unpredictable winds, and street-style football born right on the Chennai beach sand.",
              icon: <BookOpen className="h-6 w-6 text-sand" />
            }
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7 }}
              className="bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 flex flex-col md:flex-row gap-6 md:gap-10 items-start hover:bg-white/10 transition-colors duration-300"
            >
              <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="text-left">
                <h3 className="font-sans font-extrabold text-xl md:text-2xl text-sand mb-4 leading-tight">
                  {item.title}
                </h3>
                <p className="text-white/80 text-sm md:text-base leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HeritageScroll;
