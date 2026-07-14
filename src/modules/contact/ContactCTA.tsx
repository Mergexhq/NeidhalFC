"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export const ContactCTA: React.FC = () => {
  const calComUrl = "https://cal.com/neidhal-fc/trial"; // Mock Cal.com link

  return (
    <section className="relative py-28 md:py-36 overflow-hidden bg-primary-dark text-white text-center border-t border-white/5 z-20">
      {/* Background Decorative Mesh Gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--color-primary-light)/30,_transparent_80%)] pointer-events-none" />
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sand/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          {/* Main Title */}
          <h2 className="font-condensed text-[clamp(2.5rem,7vw,5.5rem)] font-extrabold uppercase leading-[0.95] tracking-tight">
            Ready to play?
          </h2>
          
          {/* Subtitle */}
          <p className="text-white/70 font-sans text-base sm:text-lg md:text-xl font-normal leading-relaxed max-w-lg mx-auto">
            Book your first trial session and step onto the pitch.
          </p>

          {/* Button wrapper */}
          <div className="pt-8">
            <a
              href={calComUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-sand text-primary hover:bg-[#FAF7F2] text-xs sm:text-sm font-sans font-bold uppercase tracking-wider px-8 py-4.5 rounded-full transition-transform active:scale-95 hover:scale-[1.03] cursor-pointer shadow-lg"
            >
              Book a Free Trial
              <ArrowRight size={14} className="text-primary shrink-0" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;
