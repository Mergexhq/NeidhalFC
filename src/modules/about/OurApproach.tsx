"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Sparkles, UserCheck } from "lucide-react";

export const OurApproach: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-primary border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center justify-center gap-2 text-sand font-display text-xs uppercase tracking-widest font-semibold mb-4">
            <span className="h-px w-4 bg-sand" />
            Our Philosophy
            <span className="h-px w-4 bg-sand" />
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white font-display tracking-tight leading-tight">
            Our Coaching Philosophy
          </h2>
          <p className="text-slate-400 font-light text-base md:text-lg leading-relaxed mt-4">
            We prioritize safety, honesty, and quality over corporate fluff and empty promises.
          </p>
        </div>

        {/* Philosophy details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-card rounded-3xl p-8 border border-white/5 flex flex-col justify-between"
          >
            <div>
              <div className="h-12 w-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 mb-6">
                <Sparkles size={24} />
              </div>
              <h3 className="font-display font-black text-lg text-white mb-4">Realistic Expectations</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed mb-6">
                {"We strictly avoid making false promises to parents. We will never guarantee that your child will win trophies or become the next Lionel Messi. Real talent cannot be manufactured—even Messi's youth coaches didn't \"create\" his genius. Instead, we promise to guide, challenge, and nurture each child to reach their individual potential."}
              </p>
            </div>
            <span className="text-xs text-sand font-semibold uppercase tracking-wider font-display">No Empty Promises</span>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-card rounded-3xl p-8 border border-white/5 flex flex-col justify-between"
          >
            <div>
              <div className="h-12 w-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500 mb-6">
                <Shield size={24} />
              </div>
              <h3 className="font-display font-black text-lg text-white mb-4">Basics & Safety First</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed mb-6">
                We focus on getting the fundamental elements right. We compare coaching to buying a family car: before you inspect the paint color or premium sound system, you verify the presence of airbags and ABS brakes. In our sessions, physical safety, proper mechanics, and core ball-handling always come before complex tactics.
              </p>
            </div>
            <span className="text-xs text-rose-400 font-semibold uppercase tracking-wider font-display">Airbags & ABS Metaphor</span>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-card rounded-3xl p-8 border border-white/5 flex flex-col justify-between"
          >
            <div>
              <div className="h-12 w-12 rounded-2xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6">
                <UserCheck size={24} />
              </div>
              <h3 className="font-display font-black text-lg text-white mb-4">Double-Coach Ratio</h3>
              <p className="text-slate-400 text-sm font-light leading-relaxed mb-6">
                We do not just let players run around aimlessly. Every training session is highly organized and structured. To ensure this, we guarantee a strict player-to-coach ratio, with a minimum of <strong>one Main Coach and one Assistant Coach</strong> working together on the field during every single age-group slot.
              </p>
            </div>
            <span className="text-xs text-accent font-semibold uppercase tracking-wider font-display">Structured Guidance</span>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default OurApproach;
