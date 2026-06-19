"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Does the trial session cost anything?",
    answer: "No. The first coached session is 100% free with no commitment or registration fee. It's simply an opportunity for your child to experience our training environment.",
  },
  {
    question: "What should my child wear and bring?",
    answer: "Please have your child wear comfortable athletic clothes (T-shirt and shorts) and sneakers or turf shoes. Bring a water bottle. Cleats are optional, and we often start warmups barefoot on sand or turf to build foot strength.",
  },
  {
    question: "Who will be coaching my child?",
    answer: "Every session is led directly by our licensed head coaches (Pradeep Ramesh or Vijay Balan) along with assistant coaches, ensuring a strict 2:1 coaching ratio cap in every age pod.",
  },
  {
    question: "What happens after I submit this form?",
    answer: "Co-founders Pradeep or Vijay will call you within 1 hour to coordinate the specific age group, hub location, and timing slot that works best for your child.",
  },
  {
    question: "How long is a session, and what are the timings?",
    answer: "Sessions run for 75 to 90 minutes. Schedules depend on the hub (Kottivakkam, Injambakkam, or Nandanam) and age group (U6 to U16). We'll confirm the active slots during our call.",
  },
];

export const TrialFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="py-20 bg-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-widest font-extrabold text-accent flex items-center justify-center gap-1.5 mb-3">
            <HelpCircle size={12} />
            Common Doubts
          </span>
          <h2 className="font-sans font-semibold text-3xl md:text-4xl text-primary tracking-wide">
            Frequently Asked Questions
          </h2>
          <p className="text-[#6F6F6F] text-xs md:text-sm mt-2 font-normal">
            Quick answers to help clear the path before you book your session.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4 text-left">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx}
                className="bg-white border border-black/10 rounded-2xl overflow-hidden transition-all duration-300 shadow-xs hover:border-black/15"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-sans font-bold text-sm md:text-base text-primary uppercase tracking-wide cursor-pointer focus:outline-none"
                >
                  <span>{item.question}</span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-accent shrink-0 ml-4"
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 text-xs md:text-sm leading-relaxed text-[#6F6F6F] font-normal border-t border-black/5">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TrialFAQ;
