"use client";

import React from "react";
import { motion } from "framer-motion";
import { MessageSquareCode, Users, Calendar, Footprints } from "lucide-react";

const STEPS = [
  {
    icon: <MessageSquareCode className="h-6 w-6 text-sand" />,
    stepNum: "01",
    title: "Submit Enquiry",
    description: "Fill out the online inquiry form below or text Co-Founder Pradeep on WhatsApp.",
  },
  {
    icon: <Calendar className="h-6 w-6 text-accent" />,
    stepNum: "02",
    title: "Attend Trial Session",
    description: "Bring your child to one of our Chennai centers for a free, fully-coached trial session.",
  },
  {
    icon: <Users className="h-6 w-6 text-sand" />,
    stepNum: "03",
    title: "Choose Program",
    description: "Select the appropriate schedule slot based on age group (U6-U8, U9-U12, U13-U16).",
  },
  {
    icon: <Footprints className="h-6 w-6 text-accent" />,
    stepNum: "04",
    title: "Start Training",
    description: "Receive your official training kit, meet your coaches, and start developing flair on the pitch.",
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center justify-center gap-2 text-sand font-display text-xs uppercase tracking-widest font-semibold mb-4">
            <span className="h-px w-4 bg-sand" />
            Process Loop
            <span className="h-px w-4 bg-sand" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white font-display tracking-tight leading-tight">
            How It Works
          </h2>
          <p className="text-slate-400 font-light text-base md:text-lg leading-relaxed mt-4">
            A simple, transparent pathway for parents and players to join the Neidhal FC family.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          
          {/* Horizontal connecting line for desktop */}
          <div className="hidden lg:block absolute top-[44px] left-[10%] right-[10%] h-px bg-white/5 z-0" />

          {STEPS.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center relative z-10 group"
            >
              {/* Icon Circle */}
              <div className="h-14 w-14 rounded-2xl bg-primary-light border border-white/10 flex items-center justify-center mb-6 group-hover:border-sand/40 group-hover:scale-105 transition-all duration-300 shadow-md">
                {step.icon}
              </div>

              <span className="font-display font-black text-3xl text-sand/20 group-hover:text-sand/40 transition-colors mb-2">
                {step.stepNum}
              </span>
              
              <h3 className="font-display font-bold text-base text-white mb-2 leading-tight">
                {step.title}
              </h3>
              
              <p className="text-slate-400 text-xs leading-relaxed max-w-xs font-light">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
