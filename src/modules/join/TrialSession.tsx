"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Info } from "lucide-react";

export const TrialSession: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-primary border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Visual card warning against robotic coaching */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-primary-dark rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl" />
            
            <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6">
              <Info size={20} />
            </div>

            <h3 className="font-display font-black text-lg text-white mb-3">Our Core Trial Guarantee</h3>
            <p className="text-slate-400 text-xs leading-relaxed font-light mb-6">
              To build trust and prove our quality, we offer a completely free trial session for your child. Observe how we manage, coordinate, and lead the session.
            </p>

            <ul className="space-y-3.5 text-xs text-slate-300 font-light">
              <li className="flex items-center gap-2">
                <CheckCircle size={14} className="text-sand shrink-0" />
                No registration fee required for trials
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={14} className="text-sand shrink-0" />
                Guaranteed double-coach field presence
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle size={14} className="text-sand shrink-0" />
                Full 75-90 minutes of structured play
              </li>
            </ul>
          </motion.div>

          {/* Core copy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <div className="flex items-center gap-2 text-sand font-display text-xs uppercase tracking-widest font-semibold mb-4">
              <span className="h-px w-6 bg-sand" />
              Trial Experience
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white font-display tracking-tight leading-tight mb-6">
              Experience Our Training Firsthand
            </h2>
            
            <div className="space-y-5 text-slate-300 text-sm md:text-base font-light leading-relaxed mb-6">
              <p>
                {"We believe parents shouldn't pay for coaching blindly. The best way to judge our structured setup, the quality of our turfs, and how our coaches engage with the children is to experience it yourself."}
              </p>
              <p>
                During the trial session, your child will join their respective age-group slot (U6-U8, U9-U12, or U13-U16) and participate in a standard session blueprint: technical drills, coordination training, and small-sided games.
              </p>
              <p>
                <strong>What to bring:</strong> Comfortable sports attire, football shoes/sneakers, and a water bottle. We supply all balls, bibs, and specialized coaching gear.
              </p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default TrialSession;
