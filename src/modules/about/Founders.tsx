"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, Shield, Trophy } from "lucide-react";

const FOUNDERS = [
  {
    name: "Pradeep Ramesh",
    role: "Co-Founder & Head of Operations",
    bio: "Pradeep leads the day-to-day operations and session planning at Neidhal FC. Passionate about street-style creativity, he is committed to building a coaching experience where players discover their own style.",
    phone: "9962916597",
    email: "contact@neidhalfc.com",
    icon: <Shield className="h-8 w-8 text-sand" />,
  },
  {
    name: "Vijay Balan",
    role: "Co-Founder & Head Coach",
    bio: "Vijay co-founded the beach project in 2016. With an extensive background in youth player conditioning, he specializes in technical fundamentals, coordination development, and small-sided games.",
    phone: "9962103566",
    email: "neidhalfc@gmail.com",
    icon: <Trophy className="h-8 w-8 text-accent" />,
  },
];

export const Founders: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-primary-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center justify-center gap-2 text-sand font-display text-xs uppercase tracking-widest font-semibold mb-4">
            <span className="h-px w-4 bg-sand" />
            Leadership
            <span className="h-px w-4 bg-sand" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white font-display tracking-tight leading-tight">
            Meet the Founders
          </h2>
          <p className="text-slate-400 font-light text-base md:text-lg leading-relaxed mt-4">
            The minds behind Neidhal Football Club, driving the mission since 2016.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {FOUNDERS.map((founder, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glass-card rounded-3xl p-8 border border-white/5 relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Visual Avatar Placeholder */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-full bg-sand/15 border border-sand/30 flex items-center justify-center">
                    {founder.icon}
                  </div>
                  <div>
                    <h3 className="font-display font-black text-xl text-white leading-tight">
                      {founder.name}
                    </h3>
                    <span className="text-xs text-sand font-semibold uppercase tracking-wider block mt-1">
                      {founder.role}
                    </span>
                  </div>
                </div>

                <p className="text-slate-300 text-sm font-light leading-relaxed mb-8">
                  {founder.bio}
                </p>
              </div>

              {/* Contacts details */}
              <div className="border-t border-white/5 pt-6 space-y-2 text-xs text-slate-400 font-light">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-sand" />
                  <a href={`tel:+91${founder.phone}`} className="hover:text-sand transition-colors font-semibold">
                    {founder.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-accent" />
                  <a href={`mailto:${founder.email}`} className="hover:text-accent transition-colors">
                    {founder.email}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Founders;
