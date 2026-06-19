"use client";

import React from "react";
import { ClipboardEdit, PhoneCall, Play } from "lucide-react";

export const NextSteps: React.FC = () => {
  const steps = [
    {
      number: "01",
      title: "Submit the Form",
      description: "Provide your child's age and preferred hub. This alerts our coordinators instantly.",
      icon: ClipboardEdit,
    },
    {
      number: "02",
      title: "Get a Call Within 1 Hour",
      description: "Co-founders Pradeep or Vijay will call you to align on goals and lock in a time slot.",
      icon: PhoneCall,
    },
    {
      number: "03",
      title: "Step onto the Pitch",
      description: "Bring your child to the turf to play, train, and experience our coastal coaching pods.",
      icon: Play,
    },
  ];

  return (
    <section className="py-20 bg-[#FAF7F2] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[10px] uppercase tracking-widest font-extrabold text-accent">
            The Process
          </span>
          <h2 className="font-sans font-semibold text-3xl md:text-5xl text-primary mt-2 tracking-wide">
            What Happens Next?
          </h2>
          <p className="text-[#6F6F6F] text-xs md:text-sm max-w-md mx-auto mt-2 leading-relaxed">
            Zero friction, zero pressure. We respect your time and get your child on the pitch quickly.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          
          {/* Connector lines for desktop */}
          <div className="hidden md:block absolute top-[2.25rem] left-[15%] right-[15%] h-0.5 bg-black/5 z-0" />

          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div 
                key={idx} 
                className="relative z-10 flex flex-col items-center text-center px-4 group"
              >
                {/* Step Circle with Icon */}
                <div className="h-16 w-16 rounded-full bg-white border border-black/10 flex items-center justify-center text-accent shadow-md transition-all duration-300 group-hover:scale-105 group-hover:border-accent/40 mb-6">
                  <Icon size={24} className="transition-transform duration-300 group-hover:rotate-6" />
                </div>

                {/* Step Number Tag */}
                <span className="text-[10px] font-extrabold text-accent uppercase tracking-widest block mb-2">
                  Step {step.number}
                </span>

                {/* Step Title */}
                <h3 className="font-sans font-bold text-lg text-primary uppercase mb-3">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-[#6F6F6F] text-xs md:text-sm leading-relaxed max-w-xs font-normal">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default NextSteps;
