"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";

const TESTIMONIALS = [
  {
    quote: "My son's technical growth exploded after we switched to Neidhal FC. The 2:1 ratio is a game changer—the assistant coach corrects his body shape and touch while the main coach handles the play structure. He's playing with a level of confidence I've never seen before.",
    parent: "Arun Krishnan",
    role: "Parent of U12 Player (Kottivakkam Center)",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
  },
  {
    quote: "Unlike other Chennai academies that prioritize winning local matches by playing long balls, Neidhal FC forces the kids to keep the ball on the ground, take players on 1v1, and play with authentic flair. It is a breath of fresh air.",
    parent: "Dr. Deepa Rajan",
    role: "Parent of U9 Player (YMCA Nandanam)",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
  },
  {
    quote: "Their beach roots training on ECR is incredible. Playing on sand developed my daughter's physical strength, balance, and quick feet. She looks forward to every session, and the community of parents here is extremely supportive.",
    parent: "Suresh Mukund",
    role: "Parent of U14 Player (Injambakkam Center)",
    stars: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  },
];

export const TestimonialBoard: React.FC = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden bg-primary text-white border-t border-white/5">
      {/* Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-size-[6rem_6rem] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-sand/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-sand mb-4 block">
            Chapter 2: The Voices
          </span>
          <h2 className="text-4xl md:text-5xl font-semibold text-white font-display tracking-wide leading-tight">
            Trusted by Chennai Parents
          </h2>
          <p className="text-slate-400 font-normal text-sm md:text-base mt-4 max-w-xl mx-auto">
            Read stories of how our dual-coach development system and coastal roots have transformed kids' technical and personal growth.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-10">
          {TESTIMONIALS.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-between hover:bg-white/10 hover:border-white/15 transition-all duration-300 relative group"
            >
              {/* Quote Icon overlay */}
              <Quote className="absolute top-8 right-8 h-10 w-10 text-white/5 pointer-events-none" />

              <div>
                <p className="text-slate-200 text-sm md:text-base leading-relaxed font-normal mb-8 italic text-left pt-4">
                  "{t.quote}"
                </p>
              </div>

              {/* Author profile */}
              <div className="flex items-center gap-4 border-t border-white/10 pt-6 mt-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden border border-white/10 bg-primary-dark">
                  <Image
                    src={t.avatar}
                    alt={t.parent}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <h4 className="font-sans font-bold text-sm text-white">{t.parent}</h4>
                  <p className="text-[10px] text-slate-400 font-normal mt-0.5">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialBoard;
