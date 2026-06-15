"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sun } from "lucide-react";

export const ClubStory: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6"
          >
            <div className="flex items-center gap-2 text-sand font-display text-xs uppercase tracking-widest font-semibold mb-4">
              <span className="h-px w-6 bg-sand" />
              The Genesis
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white font-display tracking-tight leading-tight mb-6">
              Our Journey Began on the Sand
            </h2>
            <div className="space-y-6 text-slate-300 font-light text-base leading-relaxed">
              <p>
                In 2016, a group of close friends and football enthusiasts gathered on the beaches of Chennai to play football. It was a space where tactics took a backseat to flair, individual intelligence, and street-style improvisation. Playing on the shifting beach sand naturally conditioned their bodies and demanded absolute mastery over the ball.
              </p>
              <p>
                What started as friendly weekend matches soon evolved. The founders realized that modern coaching was becoming robotic, squeezing the joy and natural creativity out of young players. To preserve the art of the game, co-founders <span className="text-white font-semibold">Pradeep Ramesh</span> and <span className="text-white font-semibold">Vijay Balan</span> established <span className="text-sand font-semibold">Neidhal Football Club</span>.
              </p>
              <p>
                Since then, Neidhal FC has expanded from the beach to professional turfs, carrying that same coastal spirit and raw creative mindset. We train players not to fit into systems, but to stand out within them.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-primary-light flex items-center justify-center shadow-2xl"
          >
            <div className="absolute inset-0 bg-linear-to-t from-primary-dark/80 to-transparent z-10" />
            <Sun className="h-24 w-24 text-sand/20 z-0 animate-pulse" />
            <div className="absolute bottom-8 left-8 right-8 z-20">
              <span className="text-xs uppercase tracking-widest font-bold text-sand font-display block mb-1">Established 2016</span>
              <h4 className="text-lg font-bold text-white font-display">Playing on the Chennai coastline.</h4>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ClubStory;
