"use client";

import React from "react";
import { motion } from "framer-motion";

const STATS = [
  { value: "2016", label: "Est. Beach Born" },
  { value: "3", label: "Active ECR Hubs" },
  { value: "2:1", label: "Coach Ratio Cap" },
  { value: "500+", label: "Fearless Players" },
];

export const StatsBar: React.FC = () => {
  return (
    <section className="bg-primary py-12 border-b border-white/5 relative overflow-hidden">
      {/* Background soft layout line grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-size-[6rem_100%] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 items-center justify-center text-center">
          {STATS.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col gap-1.5 md:border-r border-white/10 last:border-0"
            >
              <span className="font-condensed font-black text-5xl md:text-6xl text-sand tracking-tight leading-none">
                {stat.value}
              </span>
              <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest text-[#FAF7F2]/60 font-bold">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
