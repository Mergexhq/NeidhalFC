"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck, Calendar, ArrowDown } from "lucide-react";

interface ProgramCardProps {
  name: string;
  age: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  onSelect: () => void;
  index: number;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ name, age, price, period, features, isPopular, onSelect, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className={`bg-white border rounded-[2.5rem] p-8 md:p-10 shadow-xs flex flex-col justify-between h-full relative group transition-all duration-300 hover:shadow-xl ${
        isPopular ? "border-accent ring-2 ring-accent/10" : "border-sand/20 hover:border-sand/40"
      }`}
    >
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-white font-sans font-bold text-[9px] uppercase tracking-widest px-4 py-1.5 rounded-full shadow-xs">
          Structured Track
        </span>
      )}

      <div>
        <span className="text-[10px] uppercase font-bold text-accent-dark tracking-widest block mb-2">{age}</span>
        <h4 className="font-sans font-black text-2xl text-primary uppercase leading-tight mb-4">
          {name}
        </h4>
        
        {/* Pricing */}
        <div className="flex items-baseline gap-1 mb-8 border-b border-black/5 pb-6">
          <span className="text-3xl md:text-4xl font-display font-black text-primary">{price}</span>
          <span className="text-xs text-[#6F6F6F] font-normal">{period}</span>
        </div>

        {/* Feature List */}
        <ul className="space-y-4">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 text-left text-[#5A5A5A] text-xs font-normal leading-relaxed">
              <Check size={14} className="text-accent shrink-0 mt-0.5" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <button
          onClick={onSelect}
          className={`w-full py-3.5 rounded-xl font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-2 ${
            isPopular 
              ? "bg-[#0077b6] hover:bg-[#005f73] text-white shadow-md" 
              : "bg-primary hover:bg-accent text-white"
          }`}
        >
          <span>Select & Intake Details</span>
          <ArrowDown size={12} className="animate-bounce" />
        </button>
      </div>
    </motion.div>
  );
};

export const MembershipOptions: React.FC = () => {
  const handlePlanSelect = (planName: string) => {
    // Scroll smoothly to form
    const formElement = document.getElementById("trial-intake-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
    
    // Dispatch custom event to auto-fill program selection in TrialForm if needed
    const event = new CustomEvent("neidhal_program_selected", { detail: planName });
    window.dispatchEvent(event);
  };

  const PROGRAMS = [
    {
      name: "Development Academy",
      age: "Ages U6 - U10",
      price: "₹3,500",
      period: "/ month",
      features: [
        "2 guided training sessions per week",
        "Spatial awareness & basic coordination",
        "Barefoot sand-drills for spatial balance",
        "A focus on street-style creativity and flair",
        "Periodic pod friendly fixtures"
      ],
    },
    {
      name: "Competitive Academy",
      age: "Ages U12 - U16",
      price: "₹4,500",
      period: "/ month",
      isPopular: true,
      features: [
        "3 high-density training sessions per week",
        "AIFF licensed double-coach setup (1 head + 1 assistant)",
        "Advanced tactical positioning & match simulations",
        "Physical strength and ocean beach stamina runs",
        "Official representational tournament entry"
      ],
    },
    {
      name: "Seasonal Bootcamps",
      age: "Ages U8 - U16",
      price: "Enquire",
      period: "for schedule",
      features: [
        "Intensive 1-month school break tracks",
        "Daily technical sand drills and turf play",
        "Specialized target net shooting & timed agility grids",
        "Tactical classroom video analysis reviews",
        "Academy scouting friendly trials"
      ],
    },
  ];

  return (
    <section className="py-24 bg-[#FAF7F2] relative overflow-hidden border-t border-black/5">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 rounded-full bg-sand/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-accent mb-4 block font-sans">
            Chapter 1.5: The Programs
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-primary font-display tracking-tight leading-tight uppercase max-w-xl mx-auto">
            Academy Enrollment & Options
          </h2>
          <div className="w-16 h-1 bg-sand mx-auto rounded-full mt-6" />
          <p className="text-[#6F6F6F] text-sm md:text-base leading-relaxed font-normal mt-6 max-w-xl mx-auto">
            Alongside our free trial sessions, we run structured year-round development academies. Review our training pods, age groups, and pricing programs below.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {PROGRAMS.map((prog, idx) => (
            <ProgramCard
              key={idx}
              name={prog.name}
              age={prog.age}
              price={prog.price}
              period={prog.period}
              features={prog.features}
              isPopular={prog.isPopular}
              onSelect={() => handlePlanSelect(prog.name)}
              index={idx}
            />
          ))}
        </div>

        {/* Membership inclusions Callout */}
        <div className="mt-16 bg-white border border-sand/15 rounded-[2.5rem] p-8 md:p-12 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8 text-left">
          <div className="max-w-2xl">
            <span className="text-[10px] uppercase font-bold tracking-widest text-accent mb-2 block">Enrollment Standard</span>
            <h4 className="font-sans font-black text-lg text-primary uppercase mb-3">
              Standard Kit & Match Fees Included
            </h4>
            <p className="text-[#6F6F6F] text-xs md:text-sm font-normal leading-relaxed">
              Every Academy membership includes our official Neidhal FC Training Kit (2 high-wicking jerseys, matching shorts, and socks) + league match registration entry fees. There are no surprise surcharge payments mid-season.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-[#FAF7F2]/50 p-4 rounded-2xl border border-black/5 shrink-0">
            <ShieldCheck className="h-6 w-6 text-accent shrink-0" />
            <div className="text-xs font-sans text-primary font-bold uppercase tracking-wide">
              Kit & Entry Fees Included<br />In Academy Roster
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MembershipOptions;
