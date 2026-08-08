"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  Scale, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  FileText, 
  ChevronRight, 
  ArrowRight, 
  Share2, 
  Printer, 
  ShieldAlert, 
  Award, 
  HelpCircle,
  Mail
} from "lucide-react";
import PageHero from "@/components/common/PageHero";
import SmoothScroll from "@/components/common/SmoothScroll";

// Navigation links for table of contents
const TOC_ITEMS = [
  { id: "acceptance", label: "1. Acceptance of Terms" },
  { id: "free-trials", label: "2. Free Trial Session Rules" },
  { id: "academy-conduct", label: "3. Academy Rules & Safety" },
  { id: "fees-payments", label: "4. Fees & Memberships" },
  { id: "cancellations-refunds", label: "5. Cancellations & Refund Policy" },
  { id: "medical-waiver", label: "6. Health & Liability Waiver" },
  { id: "intellectual-property", label: "7. Media & Brand IP Rights" },
  { id: "governing-law", label: "8. Governing Law & Contact" },
];

export const TermsAndConditionsContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("acceptance");
  const [copied, setCopied] = useState<boolean>(false);

  // ScrollSpy to highlight active table of contents item
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      
      for (let i = TOC_ITEMS.length - 1; i >= 0; i--) {
        const section = document.getElementById(TOC_ITEMS[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(TOC_ITEMS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <SmoothScroll>
      <div className="bg-[#FAF7F2] min-h-screen text-[#0B1F3A]">
        {/* Hero Section */}
        <PageHero
          title="Terms & Conditions"
          subtitle="Last updated: June 15, 2026. Rules and guidelines governing Neidhal Football Club academy memberships and digital platforms."
          variant="white"
          align="center"
          showBreadcrumbs={false}
          showWave={false}
        />

        {/* Quick Document Info Bar */}
        <div className="border-b border-[#0B1F3A]/10 bg-white/70 backdrop-blur-md sticky top-0 z-30 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-6 text-[#0B1F3A]/70">
              <span className="flex items-center gap-1.5 font-semibold text-[#0B1F3A]">
                <Scale size={16} className="text-[#BCA688]" />
                Academy Governance
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={15} className="text-[#BCA688]" />
                Effective: June 15, 2026
              </span>
              <span className="hidden md:flex items-center gap-1.5">
                <FileText size={15} className="text-[#BCA688]" />
                Est. Read Time: ~5 mins
              </span>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B1F3A]/5 hover:bg-[#0B1F3A]/10 text-[#0B1F3A] font-semibold text-xs transition-colors cursor-pointer"
                title="Copy page link"
              >
                <Share2 size={13} />
                <span>{copied ? "Link Copied!" : "Share Link"}</span>
              </button>
              <button
                onClick={handlePrint}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#0B1F3A]/5 hover:bg-[#0B1F3A]/10 text-[#0B1F3A] font-semibold text-xs transition-colors cursor-pointer"
                title="Print terms"
              >
                <Printer size={13} />
                <span>Print</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          
          {/* Executive Summary Grid (At a Glance) */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <span className="px-3.5 py-1 rounded-full bg-[#0B1F3A] text-sand text-xs font-bold uppercase tracking-widest">
                Key Terms
              </span>
              <h2 className="font-display font-semibold text-xl text-[#0B1F3A]">
                Membership & Training Highlights
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-white border border-[#0B1F3A]/10 rounded-xl p-6 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0B1F3A]/5 text-[#0B1F3A] flex items-center justify-center mb-4">
                  <Award size={20} className="text-[#0B1F3A]" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#0B1F3A] mb-2">
                  1 Free Trial Session
                </h3>
                <p className="text-xs sm:text-sm text-[#0B1F3A]/70 leading-relaxed font-light">
                  Every new player is entitled to exactly one coached trial session across Kottivakkam, Injambakkam, or Nandanam.
                </p>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white border border-[#0B1F3A]/10 rounded-xl p-6 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0B1F3A]/5 text-[#0B1F3A] flex items-center justify-center mb-4">
                  <ShieldAlert size={20} className="text-[#0B1F3A]" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#0B1F3A] mb-2">
                  Turf Safety & Footwear
                </h3>
                <p className="text-xs sm:text-sm text-[#0B1F3A]/70 leading-relaxed font-light">
                  Players must wear suitable turf boots or sports shoes and follow all coach safety instructions during sessions.
                </p>
              </motion.div>

              {/* Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white border border-[#0B1F3A]/10 rounded-xl p-6 shadow-xs hover:shadow-md transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[#0B1F3A]/5 text-[#0B1F3A] flex items-center justify-center mb-4">
                  <Clock size={20} className="text-[#0B1F3A]" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#0B1F3A] mb-2">
                  48-Hour Refund Policy
                </h3>
                <p className="text-xs sm:text-sm text-[#0B1F3A]/70 leading-relaxed font-light">
                  Camp cancellations requested at least 48 hours prior to start date receive full refund consideration.
                </p>
              </motion.div>
            </div>
          </div>

          {/* Two Column Layout: Sidebar + Document Body */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Sticky Table of Contents Sidebar */}
            <aside className="lg:col-span-4 sticky top-20 z-20 space-y-6">
              
              {/* Table of Contents Card */}
              <div className="bg-white border border-[#0B1F3A]/10 rounded-2xl p-6 shadow-sm">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-4 border-b border-[#0B1F3A]/10 pb-3">
                  <h3 className="font-display font-bold text-sm text-[#0B1F3A] uppercase tracking-wider">
                    In This Document
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#BCA688]">
                    8 Sections
                  </span>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-1">
                  {TOC_ITEMS.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollTo(item.id)}
                        className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 flex items-center justify-between cursor-pointer ${
                          isActive
                            ? "bg-[#0B1F3A] text-white font-semibold shadow-xs transform translate-x-1"
                            : "text-[#0B1F3A]/70 hover:bg-[#FAF7F2] hover:text-[#0B1F3A]"
                        }`}
                      >
                        <span className="truncate">{item.label}</span>
                        {isActive && <ChevronRight size={14} className="text-[#D9C3A5] shrink-0 ml-1" />}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Assistance Card */}
              <div className="bg-gradient-to-br from-[#0B1F3A] to-[#050F1D] text-white rounded-2xl p-6 shadow-md border border-white/10">
                <div className="flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-full bg-[#BCA688]/20 flex items-center justify-center">
                    <HelpCircle size={16} className="text-[#D9C3A5]" />
                  </div>
                  <h4 className="font-display font-bold text-sm tracking-wide text-white">
                    Questions on Terms?
                  </h4>
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed mb-4">
                  Need clarification regarding membership tiers, trial sessions, or batch schedules?
                </p>
                <a
                  href="https://wa.me/919962916597?text=Hi%20Neidhal%20FC,%20I'd%20like%20to%20clarify%20the%20academy%20terms."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-[#D9C3A5] hover:bg-[#BCA688] text-[#0B1F3A] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
                >
                  <span>Chat With Co-Founder</span>
                  <ArrowRight size={13} />
                </a>
              </div>

            </aside>

            {/* Document Content Area */}
            <main className="lg:col-span-8 bg-white border border-[#0B1F3A]/10 rounded-2xl p-6 sm:p-10 md:p-14 shadow-sm space-y-14">
              
              {/* Section 1 */}
              <section id="acceptance" className="scroll-mt-32 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] font-bold text-xs flex items-center justify-center border border-[#0B1F3A]/10">
                    01
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B1F3A]">
                    Acceptance of Terms
                  </h2>
                </div>
                
                <p className="text-sm sm:text-base text-[#0B1F3A]/80 leading-relaxed font-light">
                  Welcome to Neidhal Football Club ("Neidhal FC", "we", "our"). By visiting our website at <a href="https://neidhalfc.com" className="text-primary font-medium underline">https://neidhalfc.com</a>, booking a free trial, or enrolling a player in our coaching programs across Kottivakkam, Injambakkam, and Nandanam, parents, guardians, and participants agree to be bound by these Terms & Conditions.
                </p>
                
                <p className="text-sm sm:text-base text-[#0B1F3A]/80 leading-relaxed font-light">
                  If you do not agree to all terms stated in this agreement, you must refrain from registering for coaching sessions or utilizing our digital platforms.
                </p>
              </section>

              <hr className="border-[#0B1F3A]/10" />

              {/* Section 2 */}
              <section id="free-trials" className="scroll-mt-32 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] font-bold text-xs flex items-center justify-center border border-[#0B1F3A]/10">
                    02
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B1F3A]">
                    Free Trial Session Rules
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-[#0B1F3A]/80 leading-relaxed font-light">
                  We believe every child should have the opportunity to experience Neidhal FC's coastal football methodology firsthand before enrolling in a paid monthly or seasonal program.
                </p>

                <div className="bg-gradient-to-r from-[#0B1F3A] to-[#050F1D] text-white p-6 sm:p-7 rounded-xl border border-white/10 shadow-md space-y-3.5">
                  <h3 className="font-display font-bold text-sm sm:text-base text-[#D9C3A5] flex items-center gap-2 tracking-wide">
                    <CheckCircle2 size={18} className="text-[#D9C3A5] shrink-0" />
                    Trial Eligibility & Guidelines:
                  </h3>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-slate-200 space-y-2 font-light leading-[1.8] tracking-wide pl-2">
                    <li><strong className="text-white font-semibold">One Trial Limit:</strong> Each child is eligible for exactly one free coached trial session across our Kottivakkam, Injambakkam, and Nandanam centers.</li>
                    <li><strong className="text-white font-semibold">Prior Scheduling Required:</strong> Trial sessions must be reserved in advance via our website form, Cal.com booking link, or WhatsApp confirmation.</li>
                    <li><strong className="text-white font-semibold">Batch Capacity:</strong> Attendance is subject to age-group squad availability and head coach confirmation to ensure safe player-to-coach ratios.</li>
                    <li><strong className="text-white font-semibold">Punctuality:</strong> Parents are requested to arrive 10 minutes prior to scheduled session time for orientation.</li>
                  </ul>
                </div>
              </section>

              <hr className="border-[#0B1F3A]/10" />

              {/* Section 3 */}
              <section id="academy-conduct" className="scroll-mt-32 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] font-bold text-xs flex items-center justify-center border border-[#0B1F3A]/10">
                    03
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B1F3A]">
                    Academy Rules & Safety Code
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-[#0B1F3A]/80 leading-relaxed font-light">
                  Neidhal FC prioritizes character building, discipline, creative decision-making, and absolute safety on and off the field. All players and parents must adhere to our code of conduct:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 border border-[#0B1F3A]/10 rounded-xl bg-white space-y-1">
                    <span className="font-semibold text-xs text-[#0B1F3A] uppercase tracking-wider block">
                      A. Respect & Sportsmanship
                    </span>
                    <p className="text-xs text-[#0B1F3A]/75 font-light leading-relaxed">
                      Zero tolerance for bullying, foul language, or aggressive behavior toward teammates, opponents, or coaching staff.
                    </p>
                  </div>

                  <div className="p-4 border border-[#0B1F3A]/10 rounded-xl bg-white space-y-1">
                    <span className="font-semibold text-xs text-[#0B1F3A] uppercase tracking-wider block">
                      B. Equipment & Attire
                    </span>
                    <p className="text-xs text-[#0B1F3A]/75 font-light leading-relaxed">
                      Players must wear Neidhal academy kits (for enrolled members), shin guards, and proper turf shoes/studs suited for synthetic turf and sand drills.
                    </p>
                  </div>

                  <div className="p-4 border border-[#0B1F3A]/10 rounded-xl bg-white space-y-1">
                    <span className="font-semibold text-xs text-[#0B1F3A] uppercase tracking-wider block">
                      C. Drop-off & Pick-up
                    </span>
                    <p className="text-xs text-[#0B1F3A]/75 font-light leading-relaxed">
                      Parents/guardians are responsible for timely drop-off and prompt pick-up at designated turf gates in Kottivakkam, Injambakkam, and Nandanam.
                    </p>
                  </div>

                  <div className="p-4 border border-[#0B1F3A]/10 rounded-xl bg-white space-y-1">
                    <span className="font-semibold text-xs text-[#0B1F3A] uppercase tracking-wider block">
                      D. Weather Protocol
                    </span>
                    <p className="text-xs text-[#0B1F3A]/75 font-light leading-relaxed">
                      Coaches reserve the right to pause sessions during severe monsoon lightning or coastal heavy rain. Make-up tactical sessions will be scheduled.
                    </p>
                  </div>
                </div>
              </section>

              <hr className="border-[#0B1F3A]/10" />

              {/* Section 4 */}
              <section id="fees-payments" className="scroll-mt-32 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] font-bold text-xs flex items-center justify-center border border-[#0B1F3A]/10">
                    04
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B1F3A]">
                    Fees & Membership Terms
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-[#0B1F3A]/80 leading-relaxed font-light">
                  Neidhal FC offers monthly coaching plans, quarterly memberships, and specialized summer/monsoon training camps.
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-[#0B1F3A]/80 font-light">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#BCA688] shrink-0 mt-0.5" />
                    <span><strong>Advance Payment:</strong> All academy membership fees and seasonal camp registration fees are due in advance of the first training session of each billing cycle.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#BCA688] shrink-0 mt-0.5" />
                    <span><strong>Payment Methods:</strong> We accept online UPI transfers, official bank transfers, or direct academy portal payments. Receipts are issued digitally upon payment clearance.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#BCA688] shrink-0 mt-0.5" />
                    <span><strong>Uniform & Gear Fees:</strong> Academy uniform kits are charged separately upon official player enrollment.</span>
                  </li>
                </ul>
              </section>

              <hr className="border-[#0B1F3A]/10" />

              {/* Section 5 */}
              <section id="cancellations-refunds" className="scroll-mt-32 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] font-bold text-xs flex items-center justify-center border border-[#0B1F3A]/10">
                    05
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B1F3A]">
                    Cancellations & Refund Policy
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-[#0B1F3A]/80 leading-relaxed font-light">
                  We maintain transparent and fair cancellation policies to protect both family commitments and academy coaching logistics:
                </p>

                <div className="bg-gradient-to-r from-[#0B1F3A] to-[#050F1D] text-white p-6 sm:p-7 rounded-xl border border-white/10 shadow-md space-y-3.5">
                  <h3 className="font-display font-bold text-sm sm:text-base text-[#D9C3A5] flex items-center gap-2 tracking-wide">
                    <AlertCircle size={18} className="text-[#D9C3A5] shrink-0" />
                    Refund Guidelines:
                  </h3>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-slate-200 space-y-2 font-light leading-[1.8] tracking-wide pl-2">
                    <li><strong className="text-white font-semibold">Seasonal Camp Cancellations:</strong> Written cancellation requests received at least 48 hours prior to the camp start date will receive a 100% refund (minus standard administrative processing fees).</li>
                    <li><strong className="text-white font-semibold">Late Cancellations:</strong> Cancellations made less than 48 hours before camp commencement are non-refundable, but may be credited toward future training camps upon review.</li>
                    <li><strong className="text-white font-semibold">Medical Absences:</strong> Missed sessions due to verified medical conditions or injuries (with doctor's certificate) will be offset with make-up sessions or pro-rated fee credits.</li>
                    <li><strong className="text-white font-semibold">Weather Cancellations:</strong> Sessions cancelled by Neidhal FC due to extreme weather or turf maintenance will be rescheduled. No monetary refunds are issued for rescheduled weather sessions.</li>
                  </ul>
                </div>
              </section>

              <hr className="border-[#0B1F3A]/10" />

              {/* Section 6 */}
              <section id="medical-waiver" className="scroll-mt-32 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] font-bold text-xs flex items-center justify-center border border-[#0B1F3A]/10">
                    06
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B1F3A]">
                    Health & Liability Waiver
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-[#0B1F3A]/80 leading-relaxed font-light">
                  Football is an active physical sport. While Neidhal FC maintains strict safety standards, certified first-aid protocols, and professional coaching oversight, parents and guardians acknowledge that participation involves inherent physical risks.
                </p>

                <div className="space-y-3 text-xs sm:text-sm text-[#0B1F3A]/80 font-light">
                  <div className="p-4 bg-white border border-[#0B1F3A]/10 rounded-xl space-y-1">
                    <span className="font-bold text-[#0B1F3A] block">A. Disclosure of Pre-existing Conditions</span>
                    Parents must disclose any pre-existing medical conditions, allergies, asthma, or previous injuries on the registration form prior to the child stepping onto the pitch.
                  </div>
                  <div className="p-4 bg-white border border-[#0B1F3A]/10 rounded-xl space-y-1">
                    <span className="font-bold text-[#0B1F3A] block">B. Emergency Medical Consent</span>
                    In the event of an emergency requiring immediate medical attention when parents cannot be immediately reached, coaches are authorized to administer basic first aid or transport the player to the nearest medical facility.
                  </div>
                </div>
              </section>

              <hr className="border-[#0B1F3A]/10" />

              {/* Section 7 */}
              <section id="intellectual-property" className="scroll-mt-32 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] font-bold text-xs flex items-center justify-center border border-[#0B1F3A]/10">
                    07
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B1F3A]">
                    Media & Brand IP Rights
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-[#0B1F3A]/80 leading-relaxed font-light">
                  All trademarks, club crests, coaching materials, text, graphics, logos, and custom photography on <a href="https://neidhalfc.com" className="text-primary font-medium underline">neidhalfc.com</a> are the exclusive intellectual property of Neidhal Football Club. Reproduction or commercial redistribution without prior written consent is strictly prohibited.
                </p>
              </section>

              <hr className="border-[#0B1F3A]/10" />

              {/* Section 8 */}
              <section id="governing-law" className="scroll-mt-32 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] font-bold text-xs flex items-center justify-center border border-[#0B1F3A]/10">
                    08
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B1F3A]">
                    Governing Law & Contact
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-[#0B1F3A]/80 leading-relaxed font-light">
                  These Terms & Conditions are governed by and construed in accordance with the laws of Tamil Nadu, India. Any disputes arising from academy membership or site usage shall be subject to the exclusive jurisdiction of the courts in Chennai.
                </p>

                <div className="bg-[#0B1F3A] text-white p-6 rounded-xl space-y-4 mt-4">
                  <h3 className="font-display font-bold text-lg text-sand">
                    Official Academy Contact
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    For inquiries regarding academy terms, trial bookings, or squad schedules, please contact our founders directly:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm border-t border-white/10 pt-4">
                    <div>
                      <span className="text-[#D9C3A5] font-semibold block uppercase tracking-wider text-[11px] mb-1">
                        General Inquiries
                      </span>
                      <a href="mailto:contact@neidhalfc.com" className="text-white hover:text-sand font-medium transition-colors">
                        contact@neidhalfc.com
                      </a>
                    </div>
                    <div>
                      <span className="text-[#D9C3A5] font-semibold block uppercase tracking-wider text-[11px] mb-1">
                        Co-Founders
                      </span>
                      <p className="text-white font-medium">
                        Pradeep Ramesh: +91 99629 16597<br />
                        Vijay Balan: +91 99621 03566
                      </p>
                    </div>
                  </div>
                </div>
              </section>

            </main>
          </div>
        </div>

        {/* Bottom CTA Block matching website theme */}
        <section className="py-16 md:py-24 bg-[#03070E] text-white relative overflow-hidden border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            
            <div className="relative h-12 w-12 mx-auto mb-6">
              <Image
                src="/logo/neidhal_logo.png"
                alt="Neidhal FC Logo"
                fill
                sizes="48px"
                className="object-contain"
              />
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-semibold text-white uppercase tracking-tight mb-4">
              Ready To Join Neidhal Football Club?
            </h2>
            <p className="text-slate-300 font-light text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              Experience Chennai's premier coastal football coaching. Book your child's free trial session at Kottivakkam, Injambakkam, or Nandanam today.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-sand hover:bg-sand-dark text-[#0B1F3A] text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-all duration-300 hover:scale-105"
              >
                Book A Free Trial
              </Link>
              <Link
                href="/locations"
                className="px-8 py-3.5 border border-white/30 hover:border-white text-white hover:bg-white/10 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300"
              >
                View Locations
              </Link>
            </div>
          </div>
        </section>
      </div>
    </SmoothScroll>
  );
};

export default TermsAndConditionsContent;
