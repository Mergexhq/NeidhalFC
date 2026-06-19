"use client";

import React from "react";
import { motion } from "framer-motion";
import { Compass } from "lucide-react";

export const Philosophy: React.FC = () => {
  return (
    <section id="chapter-three" className="py-24 md:py-32 bg-[#FAF7F2] relative overflow-hidden border-b border-black/5">
      {/* Decorative layout visual lights */}
      <div className="absolute top-1/4 right-0 w-80 h-80 rounded-full bg-sand/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        
        {/* Chapter Header */}
        <div className="text-center mb-12">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-accent mb-8 block font-sans"
          >
            Chapter 03 — The Belief
          </motion.span>
        </div>

        {/* Big Manifesto Headline */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-semibold text-primary font-display tracking-wide leading-[1.1]">
            Everyone can coach football.<br />
            <span className="text-accent">Very few can make someone fall in love with it.</span>
          </h2>
        </div>

        {/* Manifesto Body Copy */}
        <div className="text-left text-[#5A5A5A] text-sm md:text-base leading-relaxed font-normal max-w-3xl mx-auto space-y-8 border-l border-sand/30 pl-6 md:pl-10">
          <p>
            Modern football is becoming a science. Systems, structures, data, shape. There is nothing wrong with that. But somewhere in the pursuit of the perfect tactical setup, something got lost &mdash; the player who dribbles because it delights them. The kid who tries the impossible flick because they saw it in their mind first. The one who makes the crowd hold their breath.
          </p>
          <p className="font-semibold text-primary">
            At Neidhal FC, we coach football differently.
          </p>
          <p>
            We believe in creative decision-making over mechanical repetition. We believe in flair and street-style expression &mdash; the kind that cannot be downloaded from a coaching manual. We believe in confidence in a 1v1 situation, in the freedom to improvise, in the joy of trying something that might not work.
          </p>
          <p>
            We are not building robots who fit perfectly into systems. We are building players who stand out within them.
          </p>
        </div>

        {/* Manifesto Pull Quote Container */}
        <div className="max-w-3xl mx-auto text-center my-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 md:p-12 rounded-[2.5rem] bg-white border border-sand/15 shadow-xs"
          >
            <p className="font-display italic font-normal text-xl sm:text-2xl md:text-3xl text-primary leading-relaxed">
              &ldquo;We train players not only to fit into systems &mdash; but to stand out within them.&rdquo;
            </p>
          </motion.div>
        </div>

        {/* Closing Line Box */}
        <div className="max-w-3xl mx-auto bg-white border border-black/5 rounded-[2rem] p-8 md:p-10 text-center shadow-xs">
          <p className="text-[#6F6F6F] text-xs md:text-sm font-normal leading-relaxed">
            We cannot promise trophies. No honest coach can. What we can promise is this &mdash; a child who trains with us will learn to think on the pitch, express themselves in the game, and love football for the rest of their life. That is a bigger gift than any medal.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Philosophy;
