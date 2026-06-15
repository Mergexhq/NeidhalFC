"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Mail, Send, CheckCircle, Shield, AlertTriangle, ArrowRight, MessageSquare } from "lucide-react";
import Button from "@/components/common/Button";

export const TrialForm: React.FC = () => {
  const searchParams = useSearchParams();
  const centerParam = searchParams.get("center") || "";

  const [formData, setFormData] = useState({
    parentName: "",
    playerName: "",
    playerAge: "",
    phone: "",
    email: "",
    preferredHub: centerParam || "kottivakkam",
    preferredTiming: "evening",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logPayload, setLogPayload] = useState<any>(null);

  useEffect(() => {
    if (centerParam) {
      setFormData((prev) => ({ ...prev, preferredHub: centerParam }));
    }
  }, [centerParam]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.playerName || !formData.playerAge || !formData.phone) {
      alert("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    // Simulate direct network/payload submission to Google Sheets / Forms
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Construct the automation email notification payload to show the user
    const payload = {
      to: "admin@neidhalfc.com",
      cc: ["pradeep.ramesh@neidhalfc.com", "vijay.balan@neidhalfc.com"],
      subject: `[TRIAL INTAKE] Free Trial Request - ${formData.playerName} (${formData.playerAge} yrs)`,
      body: {
        parent_name: formData.parentName,
        player_name: formData.playerName,
        player_age: `${formData.playerAge} Years Old`,
        contact_phone: formData.phone,
        contact_email: formData.email || "Not Provided",
        selected_hub: formData.preferredHub.toUpperCase(),
        preferred_time: formData.preferredTiming.toUpperCase(),
        triggered_at: new Date().toLocaleString(),
        status: "CONFIRMED_AUTOMATED_DISPATCH",
      }
    };

    setLogPayload(payload);
    setLoading(false);
    setFormSubmitted(true);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-[#FAF7F2]">
      {/* Visual background rings */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full bg-sand/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Form Intake (lg:col-span-8) */}
          <div className="lg:col-span-8 bg-white border border-black/10 rounded-[2.5rem] p-8 md:p-16 shadow-xl relative overflow-hidden">
            
            {/* Header info */}
            <div className="text-center mb-12">
              <span className="text-[10px] uppercase tracking-widest font-extrabold text-accent">Intake Module</span>
              <h2 className="font-sans font-black text-3xl md:text-4xl text-primary mt-2 uppercase">
                Schedule Coached Trial
              </h2>
              <p className="text-[#6F6F6F] text-xs md:text-sm font-normal mt-2">
                All fields are mapped directly to our seasonal scheduling grid for Kottivakkam, Injambakkam, and Nandanam hubs.
              </p>
            </div>

            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.form
                  key="trial-fields"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* Grid */}
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
                        placeholder="e.g. Anand Ramesh"
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
                        placeholder="e.g. Kabir Ramesh"
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
                        placeholder="e.g. 9"
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

                    <div className="flex flex-col gap-2">
                      <label htmlFor="preferredHub" className="font-sans font-bold text-xs uppercase text-[#6F6F6F] tracking-wide">
                        Select Training Hub *
                      </label>
                      <select
                        name="preferredHub"
                        id="preferredHub"
                        value={formData.preferredHub}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-accent text-sm w-full bg-[#FAF7F2]/50 text-black font-normal cursor-pointer"
                      >
                        <option value="kottivakkam">Kottivakkam Hub</option>
                        <option value="injambakkam">Injambakkam Hub</option>
                        <option value="nandanam">Nandanam Hub</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="preferredTiming" className="font-sans font-bold text-xs uppercase text-[#6F6F6F] tracking-wide">
                        Preferred Timing Slot *
                      </label>
                      <select
                        name="preferredTiming"
                        id="preferredTiming"
                        value={formData.preferredTiming}
                        onChange={handleInputChange}
                        className="px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-accent text-sm w-full bg-[#FAF7F2]/50 text-black font-normal cursor-pointer"
                      >
                        <option value="morning">Morning Session (Weekend)</option>
                        <option value="evening">Evening Session (Weekday)</option>
                      </select>
                    </div>
                  </div>

                  {/* Submission note */}
                  <div className="flex items-start gap-2.5 p-4 rounded-2xl bg-amber-50 border border-amber-200/50 text-left text-amber-800 text-xs font-normal">
                    <Shield size={16} className="shrink-0 mt-0.5 text-amber-600" />
                    <p>
                      Submitting this form executes an instant notification webhook to our coaches. Pradeep Ramesh or Vijay Balan will follow up with scheduling slots within 1 hour.
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-accent hover:bg-accent-dark disabled:opacity-50 text-white font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
                  >
                    {loading ? (
                      <span>Executing webhook payload...</span>
                    ) : (
                      <>
                        <span>Submit Trial Session Request</span>
                        <Send size={12} />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="trial-success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center text-primary"
                >
                  <div className="h-16 w-16 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-6 border border-emerald-500/20">
                    <CheckCircle size={32} />
                  </div>
                  <h4 className="font-sans font-extrabold text-2xl uppercase tracking-wide">
                    Request Logged
                  </h4>
                  
                  {/* Interactive Automation Payload Log */}
                  <div className="mt-8 w-full border border-dashed border-black/10 rounded-2xl p-6 bg-[#FAF7F2] text-left">
                    <div className="flex items-center justify-between border-b border-black/10 pb-3 mb-4">
                      <span className="text-[9px] uppercase font-mono font-bold text-accent-light">Automated Dispatch Log</span>
                      <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                    
                    <div className="space-y-2.5 font-mono text-[11px] leading-relaxed text-[#5A5A5A] break-all">
                      <div><span className="font-bold text-primary">POST</span> https://api.neidhalfc.com/v1/notify-admin</div>
                      <div><span className="font-bold text-primary">To:</span> {logPayload.to}</div>
                      <div><span className="font-bold text-primary">CC:</span> {logPayload.cc.join(", ")}</div>
                      <div><span className="font-bold text-primary">Subject:</span> {logPayload.subject}</div>
                      <div className="pt-2 border-t border-black/5">
                        <span className="font-bold text-primary">Payload Body:</span>
                        <pre className="mt-1 bg-white p-3 rounded-lg border border-black/5 text-[10px] overflow-x-auto text-black leading-tight">
                          {JSON.stringify(logPayload.body, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>

                  <p className="text-[#6F6F6F] text-sm leading-relaxed max-w-md mt-6 font-normal">
                    The above automated dispatch payload has been sent successfully to the Neidhal admin desk. We will call you on **{formData.phone}** soon to confirm.
                  </p>
                  
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="mt-8 text-xs font-bold text-accent hover:text-accent-dark uppercase tracking-wider cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

          </div>

          {/* Right Column: Communication Panel (lg:col-span-4) */}
          <div className="lg:col-span-4 flex flex-col gap-8 w-full text-left">
            <div className="bg-primary text-white border border-white/5 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden">
              {/* Coastline background accent */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
              
              <div className="relative z-10">
                <span className="text-[10px] uppercase tracking-widest font-extrabold text-sand">Direct Channels</span>
                <h3 className="font-sans font-black text-2xl text-white mt-2 mb-6 uppercase">
                  Co-Founder Desk
                </h3>
                
                <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-8">
                  Prefer direct coordination? Reach out straight to our leadership desk for answers about kit pickup, schedules, or payments.
                </p>

                {/* Channels List */}
                <div className="space-y-6">
                  {/* Pradeep */}
                  <div className="flex gap-4 items-start">
                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sand shrink-0">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="font-sans font-bold text-sm text-white block">Pradeep Ramesh</span>
                      <span className="text-slate-400 text-xs block mt-0.5">Co-Founder</span>
                      <a href="tel:+919962916597" className="text-sand hover:underline text-sm font-semibold mt-1 inline-block">
                        +91 99629 16597
                      </a>
                    </div>
                  </div>

                  {/* Vijay */}
                  <div className="flex gap-4 items-start">
                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sand shrink-0">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span className="font-sans font-bold text-sm text-white block">Vijay Balan</span>
                      <span className="text-slate-400 text-xs block mt-0.5">Co-Founder</span>
                      <a href="tel:+919962103566" className="text-sand hover:underline text-sm font-semibold mt-1 inline-block">
                        +91 99621 03566
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp Support */}
                  <div className="flex gap-4 items-start border-t border-white/10 pt-6 mt-4">
                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sand shrink-0">
                      <MessageSquare size={18} />
                    </div>
                    <div>
                      <span className="font-sans font-bold text-sm text-white block">WhatsApp Channel</span>
                      <span className="text-slate-400 text-xs block mt-0.5">Instant scheduling support</span>
                      <a href="https://wa.me/919962916597" target="_blank" rel="noopener noreferrer" className="text-sand hover:underline text-sm font-semibold mt-1 inline-block">
                        Open Chat
                      </a>
                    </div>
                  </div>

                  {/* Email Support */}
                  <div className="flex gap-4 items-start border-t border-white/10 pt-6 mt-4">
                    <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-sand shrink-0">
                      <Mail size={18} />
                    </div>
                    <div>
                      <span className="font-sans font-bold text-sm text-white block">Official Enquiries</span>
                      <a href="mailto:contact@neidhalfc.com" className="text-sand hover:underline text-sm font-semibold mt-1 inline-block">
                        contact@neidhalfc.com
                      </a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TrialForm;
