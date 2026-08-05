"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Users, Layers, Activity } from "lucide-react";

const FEATURES = [
  {
    icon: Users,
    title: "Dual-Coach Model",
    body: "Every session runs with two coaches. One focuses on technical mechanics - footwork, ball control, shooting form. The other manages gameplay scenarios and tactical awareness. This means every player gets specific, personal feedback.",
    image: "/images/gallery/gallery-08.webp",
  },
  {
    icon: Layers,
    title: "Age-Appropriate Groups",
    body: "U5–U8 learn through play and coordination. U9–U12 build technique and game intelligence. U13–U16+ focus on advanced tactics, fitness, and competitive preparation. Each group trains with methods designed for their developmental stage.",
    image: "/images/gallery/gallery-04.webp",
  },
  {
    icon: Activity,
    title: "Sand + Turf Cycle",
    body: "Players rotate between beach sessions on the ECR coastline and turf sessions at our three hubs. Beach builds strength and balance. Turf builds precision and speed. Together, they develop complete footballers.",
    image: "/images/locations/kottivakkam-3.webp",
  },
];

export const HowWeCoach: React.FC = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="py-24 md:py-32 bg-[#FAF7F2] text-primary border-b border-black/5 relative overflow-hidden">
      {/* Subtle dot-grid texture */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          backgroundImage:
            "radial-gradient(rgba(11,31,58,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-left mb-16 md:mb-20 max-w-2xl">
          <span className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.25em] font-extrabold text-[#BCA688] mb-4">
            How Training Works
          </span>
          <h2 className="font-raleway font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[46px] uppercase tracking-tight leading-none text-primary">
            Structured Sessions.{" "}
            <span className="text-[#BCA688]">Individual Focus.</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-light mt-5 leading-relaxed">
            Every detail of our training model exists for a reason. Here&apos;s how a Neidhal session is built.
          </p>
        </div>

        {/* Three Columns */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {FEATURES.map((feature) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                variants={cardVariants}
                className="relative min-h-[460px] md:min-h-[480px] p-8 sm:p-10 rounded-none overflow-hidden flex flex-col items-start justify-between group shadow-md hover:shadow-xl transition-all duration-500 border border-black/5"
              >
                {/* Full-bleed background Image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Gradient Overlay for high-contrast text readability */}
                <div
                  className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(to top, rgba(11, 31, 58, 0.95) 0%, rgba(11, 31, 58, 0.8) 45%, rgba(11, 31, 58, 0.2) 100%)"
                  }}
                />

                {/* Icon (Sharp Corner, gold theme) */}
                <div className="h-12 w-12 rounded-none bg-[#BCA688] text-[#0B1F3A] flex items-center justify-center group-hover:scale-105 transition-transform duration-300 relative z-20">
                  <IconComponent size={22} strokeWidth={2} />
                </div>

                {/* Title & Body */}
                <div className="relative z-20 w-full mt-auto">
                  <h3 className="font-raleway font-bold text-lg sm:text-xl text-white uppercase tracking-tight mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-200 text-xs sm:text-[14px] leading-relaxed font-light">
                    {feature.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default HowWeCoach;
