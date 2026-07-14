"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, Mail, Clock } from "lucide-react";

export const ContactDetails: React.FC = () => {
  const details = [
    {
      icon: <Phone size={20} className="text-sand stroke-[2]" />,
      title: "Call",
      links: [
        { label: "+91 99629 16597", href: "tel:+919962916597" },
        { label: "+91 99621 03566", href: "tel:+919962103566" },
      ],
      description: "Direct line to our Academy coordinators.",
      themeColor: "hover:border-sand/40",
    },
    {
      icon: <MessageCircle size={20} className="text-[#25D366] stroke-[2]" />,
      title: "WhatsApp",
      links: [
        {
          label: "+91 99629 16597",
          href: "https://wa.me/919962916597?text=Hi%20Neidhal%20FC!%20I%20would%20like%20to%20enquire%20about%20a%20free%20trial%20session%20for%20my%20child.",
        },
      ],
      description: "Chat with Co-Founder Pradeep Ramesh.",
      themeColor: "hover:border-[#25D366]/40",
    },
    {
      icon: <Mail size={20} className="text-accent stroke-[2]" />,
      title: "Email",
      links: [{ label: "contact@neidhalfc.com", href: "mailto:contact@neidhalfc.com" }],
      description: "For corporate, partnerships & sponsorships.",
      themeColor: "hover:border-accent/40",
    },
    {
      icon: <Clock size={20} className="text-primary-light stroke-[2]" />,
      title: "Hours",
      value: "Mon–Sun",
      subValue: "5 AM–9 PM",
      description: "Available during active turf training slots.",
      themeColor: "hover:border-primary-light/40",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.98, y: 15 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  return (
    <section className="py-24 bg-[#F5EFE6] border-t border-black/[0.04] relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-14 text-left max-w-xl">
          <span className="text-[10px] uppercase tracking-widest font-extrabold text-accent">Direct Contact</span>
          <h2 className="font-sans font-semibold text-3xl sm:text-4xl text-primary mt-2 tracking-wide">
            Neidhal Command Center
          </h2>
          <p className="text-[#6F6F6F] text-xs sm:text-sm font-normal mt-2">
            Reach out via phone, email, or WhatsApp. We respond promptly to all incoming queries.
          </p>
        </div>

        {/* Details Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {details.map((detail, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`bg-white border border-black/5 rounded-3xl p-6 md:p-8 flex flex-col justify-between transition-all duration-300 ${detail.themeColor} hover:shadow-md hover:translate-y-[-2px]`}
            >
              <div>
                {/* Icon wrapper */}
                <div className="h-10 w-10 rounded-xl bg-[#FAF7F2] flex items-center justify-center mb-6">
                  {detail.icon}
                </div>

                <h3 className="font-sans font-semibold text-lg text-primary mb-4">
                  {detail.title}
                </h3>

                {/* Content rendering */}
                {detail.links ? (
                  <div className="space-y-2">
                    {detail.links.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.href}
                        target={link.href.startsWith("http") ? "_blank" : undefined}
                        rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="block text-primary font-bold text-sm sm:text-base hover:text-accent transition-colors w-fit"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-primary font-bold text-sm sm:text-base">{detail.value}</p>
                    {detail.subValue && (
                      <p className="text-black/60 text-xs sm:text-sm font-medium">{detail.subValue}</p>
                    )}
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-[#8F8F8F] text-[11px] font-normal leading-relaxed mt-6 border-t border-black/[0.04] pt-4">
                {detail.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default ContactDetails;
