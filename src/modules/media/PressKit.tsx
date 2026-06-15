"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Download, Award, Shield, Mail, Phone, Users, CheckCircle } from "lucide-react";

export const PressKit: React.FC = () => {
  const [downloading, setDownloading] = useState<string | null>(null);

  const handleDownload = (fileName: string) => {
    setDownloading(fileName);
    setTimeout(() => {
      setDownloading(null);
      // Simulate file download
      alert(`Asset "${fileName}" packaging completed. Simulated download trigger successfully logged.`);
    }, 1200);
  };

  const HONOURS = [
    {
      title: "Chennai Beach Soccer League",
      detail: "2024 Winners (Undefeated)",
      desc: "Highlighting our raw, street-style beach roots in competitive regional tournaments."
    },
    {
      title: "ECR Coastal Academy Cup",
      detail: "2025 Finalists (U14 & U16)",
      desc: "Structured turf competitive pod representation against Chennai's premium academies."
    },
    {
      title: "State Youth Selection",
      detail: "6 Players in Pools",
      desc: "Our kids are regularly selected for Tamil Nadu state youth training pools."
    }
  ];

  const BRAND_ASSETS = [
    { name: "Official Logo Pack", format: "SVG & PNG High-Res", size: "4.2 MB", id: "logo_pack" },
    { name: "Brand Guidelines PDF", format: "Color Sheets & Fonts", size: "2.8 MB", id: "brand_pdf" },
    { name: "Press Release Template", format: "Academy Launch Doc", size: "1.1 MB", id: "press_doc" },
  ];

  return (
    <section className="py-24 md:py-32 bg-[#FAF7F2] relative overflow-hidden border-t border-black/5">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-sand/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-accent mb-4 block font-sans">
            Chapter 3: The Credentials
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-primary font-display tracking-tight leading-tight uppercase">
            Organizer & Press Kit
          </h2>
          <div className="w-16 h-1 bg-sand mx-auto rounded-full mt-6" />
          <p className="text-[#6F6F6F] text-sm md:text-base leading-relaxed font-normal mt-6 max-w-xl mx-auto">
            Credibility signals, tournament records, player progression statistics, and official media resources for tournament organizers and sports editors.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left: Honours & Credibility (lg:col-span-8) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Core Stats Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 bg-white border border-sand/15 rounded-[2rem] p-8 shadow-xs">
              <div className="text-left">
                <span className="text-2xl md:text-3xl font-black text-primary font-display block">2:1 RATIO</span>
                <span className="text-[10px] uppercase font-bold text-accent tracking-wider block mt-1">Coaching Standard</span>
                <span className="text-[11px] text-[#6F6F6F] block mt-1 leading-relaxed">Head + Assistant coach in every single training pod.</span>
              </div>
              <div className="text-left border-t sm:border-t-0 sm:border-l border-black/5 pt-4 sm:pt-0 sm:pl-6">
                <span className="text-2xl md:text-3xl font-black text-primary font-display block">100% TURF</span>
                <span className="text-[10px] uppercase font-bold text-accent tracking-wider block mt-1">High-Tier Facilities</span>
                <span className="text-[11px] text-[#6F6F6F] block mt-1 leading-relaxed">Zero low-quality dirt fields. All grounds are premium turf.</span>
              </div>
              <div className="text-left border-t sm:border-t-0 sm:border-l border-black/5 pt-4 sm:pt-0 sm:pl-6">
                <span className="text-2xl md:text-3xl font-black text-primary font-display block">U6-U16</span>
                <span className="text-[10px] uppercase font-bold text-accent tracking-wider block mt-1">Age Brackets</span>
                <span className="text-[11px] text-[#6F6F6F] block mt-1 leading-relaxed">Six structured age pods mapping a complete development grid.</span>
              </div>
            </div>

            {/* Honours Timeline */}
            <div>
              <h3 className="font-sans font-black text-lg text-primary uppercase tracking-wide mb-6 text-left">
                Tournament Records & Milestones
              </h3>
              <div className="space-y-6">
                {HONOURS.map((honour, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="flex flex-col sm:flex-row items-start gap-4 p-6 rounded-2xl bg-white border border-black/5 text-left hover:border-sand/40 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center shrink-0">
                      <Award size={20} />
                    </div>
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-3">
                        <h4 className="font-sans font-bold text-sm text-primary uppercase tracking-wide">{honour.title}</h4>
                        <span className="text-xs font-bold text-accent bg-[#0077b6]/5 px-2 py-0.5 rounded-md sm:w-auto w-fit">{honour.detail}</span>
                      </div>
                      <p className="text-[#6F6F6F] text-xs mt-1.5 leading-relaxed font-normal">{honour.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* Right: Asset Downloads & Contact (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Download Card */}
            <div className="bg-white border border-sand/20 rounded-[2.5rem] p-8 shadow-sm text-left">
              <span className="text-[10px] uppercase font-bold tracking-widest text-accent mb-2 block">Media Downloads</span>
              <h3 className="font-sans font-black text-xl text-primary uppercase mb-6">
                Brand Resources
              </h3>
              
              <div className="space-y-4">
                {BRAND_ASSETS.map((asset) => (
                  <div key={asset.id} className="p-4 rounded-xl border border-black/5 flex items-center justify-between gap-4 hover:bg-[#FAF7F2]/30 transition-colors">
                    <div>
                      <span className="font-sans font-bold text-xs text-primary block uppercase tracking-wide">{asset.name}</span>
                      <span className="text-[10px] text-[#888888] block mt-0.5">{asset.format} &bull; {asset.size}</span>
                    </div>
                    <button
                      onClick={() => handleDownload(asset.name)}
                      disabled={downloading !== null}
                      className="h-8 w-8 rounded-lg bg-[#0077b6]/10 hover:bg-[#0077b6] text-accent hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                      title={`Download ${asset.name}`}
                    >
                      {downloading === asset.name ? (
                        <span className="h-3 w-3 rounded-full border border-current border-t-transparent animate-spin" />
                      ) : (
                        <Download size={14} />
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Media Contact Box */}
            <div className="bg-primary text-white border border-white/5 rounded-[2.5rem] p-8 shadow-md text-left">
              <span className="text-[9px] uppercase font-mono font-bold text-sand tracking-widest block mb-2">Media Relations</span>
              <h3 className="font-sans font-black text-xl text-white uppercase mb-4">
                Press Desk
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed mb-6 font-normal">
                Organizing a regional cup or writing an editorial about youth development on the ECR? Coordinate directly with our press team.
              </p>
              
              <div className="space-y-4 font-sans text-xs">
                <div className="flex items-center gap-3">
                  <Mail size={14} className="text-sand shrink-0" />
                  <a href="mailto:media@neidhalfc.com" className="text-slate-300 hover:text-white transition-colors">
                    media@neidhalfc.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={14} className="text-sand shrink-0" />
                  <a href="tel:+919962916597" className="text-slate-300 hover:text-white transition-colors">
                    +91 99629 16597 (Co-Founder Office)
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default PressKit;
