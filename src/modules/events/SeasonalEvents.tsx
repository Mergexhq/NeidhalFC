"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, MapPin, Sparkles, CheckCircle, AlertCircle, Send, ArrowRight } from "lucide-react";
import Button from "@/components/common/Button";

const SEASONAL_PROGRAMS = [
  {
    id: "summer-camp",
    badge: "Seasonal Intake",
    title: "Annual Summer Training Camp 2026",
    dates: "May 10 - June 5, 2026",
    timings: "6:00 AM - 8:00 AM Daily",
    location: "Kottivakkam Beach Turf",
    price: "₹3,500 / Full Camp",
    description: "Our signature annual camp covering street football styles, beach sand physical conditioning, and 1v1 skill mastery. Open for ages U6 to U16.",
    accent: "border-sand text-primary bg-sand hover:bg-white",
  },
  {
    id: "annual-reg",
    badge: "Rolling Admissions",
    title: "Annual Membership Registration 2026/27",
    dates: "June 15 onwards",
    timings: "Scheduled Weekday/Weekend Slots",
    location: "Kottivakkam, Injambakkam & Nandanam",
    price: "₹2,500 / Monthly Fee",
    description: "Join our main academy training structure. Includes official Neidhal kit bag, customized coaching diagnostics, and participation in coastal leagues.",
    accent: "bg-primary text-white hover:bg-accent border-white/10",
  },
];

export const SeasonalEvents: React.FC = () => {
  const [selectedProgram, setSelectedProgram] = useState(SEASONAL_PROGRAMS[0]);
  const [formData, setFormData] = useState({
    parentName: "",
    playerName: "",
    playerAge: "",
    phone: "",
    email: "",
    programId: SEASONAL_PROGRAMS[0].id,
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegisterClick = (program: typeof SEASONAL_PROGRAMS[0]) => {
    setSelectedProgram(program);
    setFormData((prev) => ({ ...prev, programId: program.id }));
    // Scroll cleanly to the form module
    document.getElementById("intake-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.playerName || !formData.playerAge || !formData.phone) {
      alert("Please fill in all critical fields.");
      return;
    }

    setLoading(true);

    // Simulate direct network/payload submission to administration
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setLoading(false);
    setFormSubmitted(true);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#FAF7F2]">
      {/* Dynamic light effects */}
      <div className="absolute top-1/3 left-0 w-96 h-96 rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Banner Section Header */}
        <div className="text-left mb-16 max-w-2xl">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-accent mb-3 block">
            Time-Sensitive Programs
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-primary font-display tracking-tight leading-tight uppercase">
            Seasonal Registrations
          </h2>
          <p className="text-[#6F6F6F] text-sm md:text-base leading-relaxed mt-4 font-normal">
            We operate occasional programs, clinics, and annual intakes. Review our active programs below and register to lock in a slot.
          </p>
        </div>

        {/* Dynamic Banners Stack */}
        <div className="space-y-8 mb-24">
          {SEASONAL_PROGRAMS.map((program) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className="relative w-full rounded-[2.5rem] p-8 md:p-12 border border-black/10 overflow-hidden flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-[#FAF7F2] shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Decorative accent highlight card border */}
              <div className="absolute top-0 bottom-0 left-0 w-2.5 bg-accent" />

              {/* Details column */}
              <div className="flex-1 text-left pl-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-accent/10 text-accent mb-6 border border-accent/15">
                  <Sparkles size={10} />
                  {program.badge}
                </span>

                <h3 className="font-sans font-extrabold text-2xl md:text-3xl text-primary mb-4 leading-tight">
                  {program.title}
                </h3>
                <p className="text-[#6F6F6F] text-sm md:text-base leading-relaxed font-normal mb-8 max-w-2xl">
                  {program.description}
                </p>

                {/* Details list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-semibold text-primary">
                  <div className="flex items-center gap-2">
                    <Calendar size={14} className="text-accent" />
                    <span>{program.dates}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-accent" />
                    <span>{program.timings}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} className="text-accent" />
                    <span>{program.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#6F6F6F]">Fee:</span>
                    <span className="text-accent font-extrabold">{program.price}</span>
                  </div>
                </div>
              </div>

              {/* Action column */}
              <div className="shrink-0 lg:pl-6 text-left lg:text-right">
                <button
                  onClick={() => handleRegisterClick(program)}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary hover:bg-accent text-white font-sans font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                >
                  Register Now
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Form Interface Section */}
        <div id="intake-form" className="max-w-3xl mx-auto border border-black/10 rounded-[2.5rem] p-8 md:p-16 bg-white shadow-xl relative overflow-hidden">
          {/* Header */}
          <div className="text-center mb-10">
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-accent">Registration Gateway</span>
            <h3 className="font-sans font-black text-2xl md:text-3xl text-primary mt-2 uppercase">
              Submit Intake Form
            </h3>
            <p className="text-[#6F6F6F] text-xs md:text-sm font-normal mt-2">
              Selected Program: <span className="font-bold text-accent">{selectedProgram.title}</span>
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!formSubmitted ? (
              <motion.form
                key="intake-form-fields"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {/* Inputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="parentName" className="font-sans font-bold text-xs uppercase text-[#6F6F6F] tracking-wide">
                      Parent / Guardian Name *
                    </label>
                    <input
                      type="text"
                      name="parentName"
                      id="parentName"
                      required
                      placeholder="e.g. Arun Kumar"
                      value={formData.parentName}
                      onChange={handleInputChange}
                      className="px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-accent text-sm w-full bg-[#FAF7F2]/50 text-black font-normal"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="playerName" className="font-sans font-bold text-xs uppercase text-[#6F6F6F] tracking-wide">
                      Player Name *
                    </label>
                    <input
                      type="text"
                      name="playerName"
                      id="playerName"
                      required
                      placeholder="e.g. Rahul Kumar"
                      value={formData.playerName}
                      onChange={handleInputChange}
                      className="px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-accent text-sm w-full bg-[#FAF7F2]/50 text-black font-normal"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="playerAge" className="font-sans font-bold text-xs uppercase text-[#6F6F6F] tracking-wide">
                      Player Age *
                    </label>
                    <input
                      type="number"
                      name="playerAge"
                      id="playerAge"
                      required
                      placeholder="e.g. 10"
                      value={formData.playerAge}
                      onChange={handleInputChange}
                      className="px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-accent text-sm w-full bg-[#FAF7F2]/50 text-black font-normal"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="phone" className="font-sans font-bold text-xs uppercase text-[#6F6F6F] tracking-wide">
                      Contact Phone *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      placeholder="e.g. +91 99629 16597"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-accent text-sm w-full bg-[#FAF7F2]/50 text-black font-normal"
                    />
                  </div>

                  <div className="flex flex-col gap-2 sm:col-span-2">
                    <label htmlFor="email" className="font-sans font-bold text-xs uppercase text-[#6F6F6F] tracking-wide">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="e.g. parent@neidhalfc.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-accent text-sm w-full bg-[#FAF7F2]/50 text-black font-normal"
                    />
                  </div>
                </div>

                {/* Info Note */}
                <div className="flex items-start gap-2.5 p-4 rounded-2xl bg-amber-50 border border-amber-200/50 text-left text-amber-800 text-xs font-normal">
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <p>
                    Submitting this form hooks directly into our rolling intake list. Our administrative team will reach out within 24 hours to schedule the onboarding kit pick-up or summer camp slot validation.
                  </p>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 rounded-xl bg-accent hover:bg-accent-dark disabled:opacity-50 text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
                >
                  {loading ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <span>Submit Seasonal Registration</span>
                      <Send size={12} />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="intake-form-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 flex flex-col items-center justify-center text-center text-primary"
              >
                <div className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-500/20">
                  <CheckCircle size={32} />
                </div>
                <h4 className="font-sans font-extrabold text-2xl uppercase tracking-wide">
                  Registration Received
                </h4>
                <p className="text-[#6F6F6F] text-sm leading-relaxed max-w-md mt-4 font-normal">
                  Your seasonal registration details for **{selectedProgram.title}** have been logged successfully. We have sent a dispatch payload to our admin desk, and a representative will call you shortly on **{formData.phone}**.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="mt-8 text-xs font-bold text-accent hover:text-accent-dark uppercase tracking-wider cursor-pointer"
                >
                  Register Another Player
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default SeasonalEvents;
