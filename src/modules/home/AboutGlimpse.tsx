"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Compass } from "lucide-react";

export const AboutGlimpse: React.FC = () => {
  return (
    <section className="py-24 bg-[#FAF7F2] relative overflow-hidden border-b border-black/5">
      {/* Decorative background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,31,58,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,31,58,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />
      <div className="absolute top-1/2 right-[-10%] w-80 h-80 rounded-full bg-sand/5 blur-[100px] pointer-events-none z-0" />

      <div className="max-w-[1500px] mx-auto px-4 sm:px-8 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* --- LEFT SIDE: Overlapping Image Collage --- */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[380px] sm:min-h-[480px]">
            {/* Background Decorative Frame */}
            <div className="absolute top-8 left-8 right-8 bottom-8 border border-[#0B1F3A]/5 rounded-[2.5rem] pointer-events-none hidden sm:block" />

            {/* Main Image Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="absolute left-0 w-[75%] aspect-[4/3] rounded-[2rem] overflow-hidden border border-black/5 shadow-xl bg-white z-10"
            >
              <Image
                src="/beach_soccer.png"
                alt="Beach football training roots"
                fill
                sizes="(max-width: 768px) 100vw, 35vw"
                className="object-cover"
              />
            </motion.div>

            {/* Overlapping Offset Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="absolute right-0 bottom-4 w-[50%] aspect-[3/4] rounded-[2rem] overflow-hidden border border-white/40 shadow-2xl bg-white z-20"
            >
              <Image
                src="/soccer_thumb.png"
                alt="Neidhal FC junior ball touches"
                fill
                sizes="(max-width: 768px) 100vw, 20vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="text-[8px] uppercase tracking-widest font-bold text-sand block">ECR Shoreline</span>
                <span className="text-xs font-bold text-white block mt-0.5 leading-tight">First pod session in 2016</span>
              </div>
            </motion.div>

          </div>

          {/* --- RIGHT SIDE: Editorial Text Layout --- */}
          <div className="lg:col-span-6 flex flex-col items-start text-left gap-6 lg:pl-8">
            {/* Soft Icon Details */}
            <div className="h-10 w-10 rounded-full bg-sand/15 border border-sand/40 flex items-center justify-center text-accent">
              <Compass size={16} />
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-accent">
                Our Backstory
              </span>
              <h2 className="text-3xl sm:text-5xl font-semibold font-display tracking-wide text-primary leading-tight font-sans">
                The meaning of Neidhal
              </h2>
            </div>

            <div className="text-[#5A6E85] text-sm sm:text-base leading-relaxed font-sans font-light space-y-6">
              <p>
                Neidhal is the ancient Tamil word for the coastal land where the sea meets the shore. It is the landscape of salt in the air and sand under every step. We did not choose this name for decoration—we chose it because the shore is exactly where our game began.
              </p>
              <p>
                In 2016, we started training youth along the ECR shoreline with just a football and the open sea breeze. We believe football should be played with street-style touch, barefoot agility, and individual decision-making. We started in the sand, and we never forgot where we came from.
              </p>
            </div>

            {/* Read Story Link CTA */}
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#0077b6] hover:text-[#005f73] transition-colors group cursor-pointer mt-2"
            >
              <span>Read Our Story</span>
              <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutGlimpse;
