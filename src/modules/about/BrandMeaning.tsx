"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";

export const BrandMeaning: React.FC = () => {
  return (
    <section id="chapter-one" className="py-24 md:py-32 relative overflow-hidden bg-primary text-white border-b border-white/5">
      {/* Background visual details */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-size-[5rem_5rem] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[450px] h-[450px] rounded-full bg-sand/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        
        {/* Navigation icon */}
        <div className="h-10 w-10 rounded-full border border-sand/20 flex items-center justify-center text-sand mb-8 animate-spin-slow">
          <Compass size={16} />
        </div>

        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-sand mb-8 block font-sans"
        >
          Chapter 01 — The Land
        </motion.span>
        
        {/* Big Bold Emotional Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal font-display tracking-wide text-white leading-tight max-w-3xl mb-4">
          There is a word in ancient Tamil for the land that lives between the ocean and everything else.
        </h2>
        
        <h3 className="text-4xl sm:text-6xl md:text-7xl font-semibold font-display tracking-wide text-sand leading-none mb-10">
          That word is Neidhal.
        </h3>

        {/* Brand Copy */}
        <div className="text-slate-300 text-sm md:text-base leading-relaxed font-light font-sans max-w-2xl mb-16 text-center space-y-6">
          <p>
            Thousands of years ago, Tamil poets classified the world into five landscapes. Kurinji &mdash; the mountains. Mullai &mdash; the forests. Paalai &mdash; the desert. Marutham &mdash; the farmlands. And Neidhal &mdash; the coastal region. The strip of earth where the sea meets the shore. Where salt is in the air and sand is under every step.
          </p>
          <p>
            We did not choose this name to sound poetic. We chose it because it is exactly where we began.
          </p>
        </div>

        {/* Pull Quote */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full border-t border-white/10 pt-12 text-center"
        >
          <p className="font-display italic font-normal text-xl sm:text-2xl md:text-3xl text-sand max-w-xl mx-auto leading-relaxed">
            &ldquo;The sea does not ask permission to move. Neither does the kind of football we believe in.&rdquo;
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default BrandMeaning;
