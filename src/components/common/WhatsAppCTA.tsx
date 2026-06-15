"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";

export const WhatsAppCTA: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show tooltip after 3 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = "https://wa.me/919962916597?text=Hi%20Neidhal%20FC!%20I%20would%20like%20to%20enquire%20about%20a%20free%20trial%20session%20for%20my%20child.";

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="mb-3 mr-1 max-w-xs rounded-2xl bg-primary-light p-4 shadow-2xl border border-sand/20 text-slate-200 text-xs relative"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 text-slate-400 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
            <div className="font-semibold text-sand mb-1 font-display">Book a Free Trial Session</div>
            <p className="leading-relaxed">
              Have questions? Chat directly with Co-Founder Pradeep Ramesh on WhatsApp.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-950/30 hover:bg-emerald-600 transition-colors duration-300 relative group"
        aria-label="Chat on WhatsApp"
      >
        <span className="absolute -inset-1 rounded-full bg-emerald-500/35 animate-ping group-hover:hidden"></span>
        <MessageCircle className="h-7 w-7" />
      </motion.a>
    </div>
  );
};

export default WhatsAppCTA;
