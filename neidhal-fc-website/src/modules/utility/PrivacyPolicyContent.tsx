"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  UserCheck, 
  FileText, 
  Clock, 
  Search, 
  ChevronRight, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Mail,
  Phone,
  Share2,
  Printer
} from "lucide-react";
import PageHero from "@/components/common/PageHero";
import SmoothScroll from "@/components/common/SmoothScroll";

// Navigation links for table of contents
const TOC_ITEMS = [
  { id: "overview", label: "1. Overview & Purpose" },
  { id: "information-collected", label: "2. Information We Collect" },
  { id: "how-we-use-info", label: "3. How We Use Information" },
  { id: "data-security", label: "4. Data Security & Storage" },
  { id: "media-policy", label: "5. Media & Photography Policy" },
  { id: "third-party", label: "6. Third-Party Services" },
  { id: "user-rights", label: "7. Your Rights & Choices" },
  { id: "contact-policy", label: "8. Policy Updates & Contact" },
];

export const PrivacyPolicyContent: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [searchQuery, setSearchQuery] = useState<string>("");
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
          title="Privacy Policy"
          subtitle="Last updated: June 15, 2026. How Neidhal Football Club protects and respects your personal data."
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
                <ShieldCheck size={16} className="text-[#BCA688]" />
                Official Club Policy
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={15} className="text-[#BCA688]" />
                Effective: June 15, 2026
              </span>
              <span className="hidden md:flex items-center gap-1.5">
                <FileText size={15} className="text-[#BCA688]" />
                Est. Read Time: ~4 mins
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
                title="Print policy"
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
                At A Glance
              </span>
              <h2 className="font-display font-semibold text-xl text-[#0B1F3A]">
                Key Privacy Commitments
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
                  <UserCheck size={20} className="text-[#0B1F3A]" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#0B1F3A] mb-2">
                  Minimal Data Collection
                </h3>
                <p className="text-xs sm:text-sm text-[#0B1F3A]/70 leading-relaxed font-light">
                  We only request information essential for trial scheduling, roster management, and player safety.
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
                  <Lock size={20} className="text-[#0B1F3A]" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#0B1F3A] mb-2">
                  Zero Data Selling
                </h3>
                <p className="text-xs sm:text-sm text-[#0B1F3A]/70 leading-relaxed font-light">
                  We never sell, rent, or commercialize your personal information or contact details to ad brokers.
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
                  <ShieldCheck size={20} className="text-[#0B1F3A]" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#0B1F3A] mb-2">
                  Parental Rights & Consent
                </h3>
                <p className="text-xs sm:text-sm text-[#0B1F3A]/70 leading-relaxed font-light">
                  Parents retain full authority to request data modification, media opt-out, or record deletion at any time.
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
                    <Mail size={16} className="text-[#D9C3A5]" />
                  </div>
                  <h4 className="font-display font-bold text-sm tracking-wide text-white">
                    Privacy Inquiries?
                  </h4>
                </div>
                <p className="text-xs text-slate-300 font-light leading-relaxed mb-4">
                  Have questions about how your child's data is handled or want to update your registration records?
                </p>
                <a
                  href="mailto:contact@neidhalfc.com"
                  className="inline-flex items-center justify-center gap-2 w-full py-2.5 bg-[#D9C3A5] hover:bg-[#BCA688] text-[#0B1F3A] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
                >
                  <span>Contact Data Team</span>
                  <ArrowRight size={13} />
                </a>
              </div>

            </aside>

            {/* Document Content Area */}
            <main className="lg:col-span-8 bg-white border border-[#0B1F3A]/10 rounded-2xl p-6 sm:p-10 md:p-14 shadow-sm space-y-14">
              
              {/* Section 1 */}
              <section id="overview" className="scroll-mt-32 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] font-bold text-xs flex items-center justify-center border border-[#0B1F3A]/10">
                    01
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B1F3A]">
                    Overview & Purpose
                  </h2>
                </div>
                
                <p className="text-sm sm:text-base text-[#0B1F3A]/80 leading-relaxed font-light">
                  Neidhal Football Club ("Neidhal FC", "we", "us", or "our") operates coastal football academies across Kottivakkam, Injambakkam, and Nandanam in Chennai, Tamil Nadu, India. Accessible via <a href="https://neidhalfc.com" className="text-primary font-medium underline">https://neidhalfc.com</a>, our digital platforms and trial booking systems are built to connect young players and parents with structured football coaching.
                </p>
                
                <p className="text-sm sm:text-base text-[#0B1F3A]/80 leading-relaxed font-light">
                  This Privacy Policy outlines the explicit types of information we collect, how that information is utilized for academy operations, and the rights parents and academy members hold regarding their personal information.
                </p>

                <div className="bg-gradient-to-r from-[#0B1F3A] to-[#050F1D] text-white p-6 sm:p-7 rounded-xl border border-white/10 shadow-md space-y-3">
                  <p className="text-xs sm:text-sm font-semibold text-[#D9C3A5] uppercase tracking-wider">
                    Target Scope:
                  </p>
                  <p className="text-xs sm:text-sm text-slate-200 font-light leading-[1.8] tracking-wide">
                    This policy applies to all website visitors, free trial applicants, seasonal training camp participants, and enrolled academy players across all Neidhal FC coaching hubs.
                  </p>
                </div>
              </section>

              <hr className="border-[#0B1F3A]/10" />

              {/* Section 2 */}
              <section id="information-collected" className="scroll-mt-32 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] font-bold text-xs flex items-center justify-center border border-[#0B1F3A]/10">
                    02
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B1F3A]">
                    Information We Collect
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-[#0B1F3A]/80 leading-relaxed font-light">
                  We gather only the essential information needed to schedule trial sessions, evaluate age-appropriate squad placement, and ensure player safety during training on our turfs.
                </p>

                <div className="space-y-4 pt-2">
                  <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#0B1F3A]/5 space-y-2">
                    <h3 className="font-display font-bold text-base text-[#0B1F3A] flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-[#BCA688]" />
                      A. Parent & Guardian Contact Data
                    </h3>
                    <ul className="list-disc list-inside text-xs sm:text-sm text-[#0B1F3A]/75 space-y-1 font-light pl-2">
                      <li>Parent / Guardian Full Name</li>
                      <li>Contact Phone Number & WhatsApp Contact</li>
                      <li>Email Address for scheduling confirmations</li>
                      <li>Preferred Training Hub (Kottivakkam, Injambakkam, or Nandanam)</li>
                    </ul>
                  </div>

                  <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#0B1F3A]/5 space-y-2">
                    <h3 className="font-display font-bold text-base text-[#0B1F3A] flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-[#BCA688]" />
                      B. Player Information
                    </h3>
                    <ul className="list-disc list-inside text-xs sm:text-sm text-[#0B1F3A]/75 space-y-1 font-light pl-2">
                      <li>Player Name and Date of Birth / Age</li>
                      <li>Football experience level and preferred position (if applicable)</li>
                      <li>Relevant medical conditions, allergies, or physical restrictions disclosed prior to sessions</li>
                    </ul>
                  </div>

                  <div className="bg-[#FAF7F2] p-5 rounded-xl border border-[#0B1F3A]/5 space-y-2">
                    <h3 className="font-display font-bold text-base text-[#0B1F3A] flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-[#BCA688]" />
                      C. Automated Technical Telemetry
                    </h3>
                    <p className="text-xs sm:text-sm text-[#0B1F3A]/75 font-light leading-relaxed">
                      Like most modern web platforms, our site automatically collects basic non-identifying telemetry including browser type, general geographic region, device type, and page access timestamps via standard analytics cookies to optimize page load speeds.
                    </p>
                  </div>
                </div>
              </section>

              <hr className="border-[#0B1F3A]/10" />

              {/* Section 3 */}
              <section id="how-we-use-info" className="scroll-mt-32 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] font-bold text-xs flex items-center justify-center border border-[#0B1F3A]/10">
                    03
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B1F3A]">
                    How We Use Your Information
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-[#0B1F3A]/80 leading-relaxed font-light">
                  Your data is used strictly for legitimate academy operations and player communication. Specific uses include:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 border border-[#0B1F3A]/10 rounded-xl bg-white space-y-1">
                    <span className="font-semibold text-xs text-[#0B1F3A] uppercase tracking-wider block">
                      1. Session Logistics
                    </span>
                    <p className="text-xs text-[#0B1F3A]/75 font-light leading-relaxed">
                      Scheduling free trial sessions, batch assignments, and coordinating slot availability with head coaches.
                    </p>
                  </div>

                  <div className="p-4 border border-[#0B1F3A]/10 rounded-xl bg-white space-y-1">
                    <span className="font-semibold text-xs text-[#0B1F3A] uppercase tracking-wider block">
                      2. Weather & Schedule Alerts
                    </span>
                    <p className="text-xs text-[#0B1F3A]/75 font-light leading-relaxed">
                      Sending immediate WhatsApp/SMS updates regarding coastal weather delays, field changes, or holiday schedules.
                    </p>
                  </div>

                  <div className="p-4 border border-[#0B1F3A]/10 rounded-xl bg-white space-y-1">
                    <span className="font-semibold text-xs text-[#0B1F3A] uppercase tracking-wider block">
                      3. Player Development
                    </span>
                    <p className="text-xs text-[#0B1F3A]/75 font-light leading-relaxed">
                      Tracking age-group squad progressions, tournament rosters, and coaching feedback for youth players.
                    </p>
                  </div>

                  <div className="p-4 border border-[#0B1F3A]/10 rounded-xl bg-white space-y-1">
                    <span className="font-semibold text-xs text-[#0B1F3A] uppercase tracking-wider block">
                      4. Safety & Emergency
                    </span>
                    <p className="text-xs text-[#0B1F3A]/75 font-light leading-relaxed">
                      Reaching parents or emergency contacts instantly in the rare event of an on-field injury or medical need.
                    </p>
                  </div>
                </div>
              </section>

              <hr className="border-[#0B1F3A]/10" />

              {/* Section 4 */}
              <section id="data-security" className="scroll-mt-32 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] font-bold text-xs flex items-center justify-center border border-[#0B1F3A]/10">
                    04
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B1F3A]">
                    Data Security & Storage
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-[#0B1F3A]/80 leading-relaxed font-light">
                  We implement robust administrative and technical safeguards to protect player and parent data against unauthorized access, loss, or misuse:
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-[#0B1F3A]/80 font-light">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#BCA688] shrink-0 mt-0.5" />
                    <span><strong>Encryption in Transit:</strong> All data submitted through our web forms is transmitted securely via standard HTTPS / TLS encryption.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#BCA688] shrink-0 mt-0.5" />
                    <span><strong>Restricted Personnel Access:</strong> Only designated Neidhal FC co-founders and senior coaching staff have access to player rosters.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-[#BCA688] shrink-0 mt-0.5" />
                    <span><strong>Data Retention:</strong> We retain inquiry data only as long as necessary to fulfill trial scheduling and active academy membership.</span>
                  </li>
                </ul>
              </section>

              <hr className="border-[#0B1F3A]/10" />

              {/* Section 5 */}
              <section id="media-policy" className="scroll-mt-32 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] font-bold text-xs flex items-center justify-center border border-[#0B1F3A]/10">
                    05
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B1F3A]">
                    Media & Photography Policy
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-[#0B1F3A]/80 leading-relaxed font-light">
                  During academy training sessions, coastal beach sessions, and competitive matches, Neidhal FC photographers may capture high-quality photos and video footage for club highlights, player archives, and social media platforms (@neidhalfc).
                </p>

                <div className="bg-gradient-to-r from-[#0B1F3A] to-[#050F1D] text-white p-6 sm:p-7 rounded-xl border border-white/10 shadow-md space-y-3">
                  <h3 className="font-display font-bold text-sm sm:text-base text-[#D9C3A5] flex items-center gap-2 tracking-wide">
                    <AlertCircle size={18} className="text-[#D9C3A5] shrink-0" />
                    Parental Media Opt-Out Right:
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-200 font-light leading-[1.8] tracking-wide">
                    If you prefer that your child's photograph or video highlights NOT be featured on Neidhal FC official media channels, please inform us in writing at <a href="mailto:contact@neidhalfc.com" className="font-medium underline text-sand hover:text-white transition-colors">contact@neidhalfc.com</a> or notify the head coach prior to training. We fully respect all parent media privacy preferences.
                  </p>
                </div>
              </section>

              <hr className="border-[#0B1F3A]/10" />

              {/* Section 6 */}
              <section id="third-party" className="scroll-mt-32 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] font-bold text-xs flex items-center justify-center border border-[#0B1F3A]/10">
                    06
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B1F3A]">
                    Third-Party Services
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-[#0B1F3A]/80 leading-relaxed font-light">
                  Our website integrates trusted third-party tools to enhance parent user experience. These include:
                </p>

                <div className="space-y-3 text-xs sm:text-sm text-[#0B1F3A]/80 font-light">
                  <div className="p-3.5 bg-[#FAF7F2] rounded-lg border border-[#0B1F3A]/5">
                    <strong>• Cal.com & WhatsApp API:</strong> Used for automated trial session slot reservations and direct parent chat.
                  </div>
                  <div className="p-3.5 bg-[#FAF7F2] rounded-lg border border-[#0B1F3A]/5">
                    <strong>• Google Maps Embeds:</strong> Embedded interactive maps to help families locate our Kottivakkam, Injambakkam, and Nandanam turfs.
                  </div>
                </div>
              </section>

              <hr className="border-[#0B1F3A]/10" />

              {/* Section 7 */}
              <section id="user-rights" className="scroll-mt-32 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] font-bold text-xs flex items-center justify-center border border-[#0B1F3A]/10">
                    07
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B1F3A]">
                    Your Rights & Choices
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-[#0B1F3A]/80 leading-relaxed font-light">
                  You maintain full authority over your data. Under applicable privacy regulations, parents and website visitors have the right to:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#0B1F3A]/80 font-light">
                  <div className="p-4 border border-[#0B1F3A]/10 rounded-xl">
                    <span className="font-bold text-[#0B1F3A] block mb-1">Access & Review</span>
                    Request a summary copy of all records held regarding your trial or membership.
                  </div>
                  <div className="p-4 border border-[#0B1F3A]/10 rounded-xl">
                    <span className="font-bold text-[#0B1F3A] block mb-1">Rectification</span>
                    Update or correct phone numbers, player age details, or contact information.
                  </div>
                  <div className="p-4 border border-[#0B1F3A]/10 rounded-xl">
                    <span className="font-bold text-[#0B1F3A] block mb-1">Erasure</span>
                    Request complete deletion of your records from our active coaching roster databases.
                  </div>
                  <div className="p-4 border border-[#0B1F3A]/10 rounded-xl">
                    <span className="font-bold text-[#0B1F3A] block mb-1">Communication Opt-Out</span>
                    Unsubscribe from academy announcement broadcasts or WhatsApp notifications at any time.
                  </div>
                </div>
              </section>

              <hr className="border-[#0B1F3A]/10" />

              {/* Section 8 */}
              <section id="contact-policy" className="scroll-mt-32 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#0B1F3A]/5 text-[#0B1F3A] font-bold text-xs flex items-center justify-center border border-[#0B1F3A]/10">
                    08
                  </span>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#0B1F3A]">
                    Policy Updates & Contact Details
                  </h2>
                </div>

                <p className="text-sm sm:text-base text-[#0B1F3A]/80 leading-relaxed font-light">
                  Neidhal FC reserves the right to update this Privacy Policy periodically to reflect club expansion or operational modifications. Any updates will be posted on this page with a revised "Last Updated" date.
                </p>

                <div className="bg-[#0B1F3A] text-white p-6 rounded-xl space-y-4 mt-4">
                  <h3 className="font-display font-bold text-lg text-sand">
                    Official Privacy Contact
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                    For privacy inquiries, data deletion requests, or parental consent questions, please reach out to our team:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm border-t border-white/10 pt-4">
                    <div>
                      <span className="text-[#D9C3A5] font-semibold block uppercase tracking-wider text-[11px] mb-1">
                        Email Support
                      </span>
                      <a href="mailto:contact@neidhalfc.com" className="text-white hover:text-sand font-medium transition-colors">
                        contact@neidhalfc.com
                      </a>
                    </div>
                    <div>
                      <span className="text-[#D9C3A5] font-semibold block uppercase tracking-wider text-[11px] mb-1">
                        Academy Directors
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
              Have Questions About Our Coaching & Policies?
            </h2>
            <p className="text-slate-300 font-light text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
              We are always here to assist parents and young athletes in Chennai. Book a free coached trial or connect directly with our team.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-3.5 bg-sand hover:bg-sand-dark text-[#0B1F3A] text-xs font-bold uppercase tracking-wider rounded-full shadow-md transition-all duration-300 hover:scale-105"
              >
                Get In Touch
              </Link>
              <a
                href="https://wa.me/919962916597?text=Hi%20Neidhal%20FC,%20I%20have%20a%20question%20regarding%20the%20academy."
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 border border-white/30 hover:border-white text-white hover:bg-white/10 text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-300"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </div>
    </SmoothScroll>
  );
};

export default PrivacyPolicyContent;
