"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Calendar, MapPin, CheckCircle, ArrowRight, MessageSquare } from "lucide-react";

export const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    childName: "",
    childDob: "",
    ageGroup: "U6-U8",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    preferredCenter: "Kottivakkam",
    priorExperience: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate submission delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-primary-dark">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
        
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="glass-panel rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl"
            >
              <h3 className="font-display font-black text-2xl md:text-3xl text-white mb-2 leading-tight text-center">
                Submit Your Trial Request
              </h3>
              <p className="text-slate-400 text-sm font-light mb-8 text-center max-w-md mx-auto">
                Fill out this form and our operations lead, Pradeep Ramesh, will contact you within 24 hours to schedule the trial.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Child Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <User size={12} className="text-sand" /> {"Child's Full Name"}
                    </label>
                    <input
                      type="text"
                      name="childName"
                      required
                      value={formData.childName}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Sharma"
                      className="bg-white/5 border border-white/10 focus:border-sand/50 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none transition-colors placeholder:text-slate-600"
                    />
                  </div>

                  {/* Child DOB */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Calendar size={12} className="text-accent" /> Date of Birth
                    </label>
                    <input
                      type="date"
                      name="childDob"
                      required
                      value={formData.childDob}
                      onChange={handleInputChange}
                      className="bg-white/5 border border-white/10 focus:border-sand/50 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none transition-colors text-slate-400"
                    />
                  </div>

                  {/* Parent Name */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <User size={12} className="text-sand" /> {"Parent's Full Name"}
                    </label>
                    <input
                      type="text"
                      name="parentName"
                      required
                      value={formData.parentName}
                      onChange={handleInputChange}
                      placeholder="e.g. Amit Sharma"
                      className="bg-white/5 border border-white/10 focus:border-sand/50 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none transition-colors placeholder:text-slate-600"
                    />
                  </div>

                  {/* Parent Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <Phone size={12} className="text-accent" /> WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      name="parentPhone"
                      required
                      value={formData.parentPhone}
                      onChange={handleInputChange}
                      placeholder="e.g. 9962916597"
                      className="bg-white/5 border border-white/10 focus:border-sand/50 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none transition-colors placeholder:text-slate-600"
                    />
                  </div>

                  {/* Age Group */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                      Target Age Group
                    </label>
                    <select
                      name="ageGroup"
                      value={formData.ageGroup}
                      onChange={handleInputChange}
                      className="bg-white/5 border border-white/10 focus:border-sand/50 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none transition-colors"
                    >
                      <option className="bg-primary" value="U6-U8">U6 - U8 (Foundation Stage)</option>
                      <option className="bg-primary" value="U9-U12">U9 - U12 (Creative Stage)</option>
                      <option className="bg-primary" value="U13-U16">U13 - U16 (Advanced Stage)</option>
                    </select>
                  </div>

                  {/* Preferred Center */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                      <MapPin size={12} className="text-sand" /> Preferred Center
                    </label>
                    <select
                      name="preferredCenter"
                      value={formData.preferredCenter}
                      onChange={handleInputChange}
                      className="bg-white/5 border border-white/10 focus:border-sand/50 rounded-xl px-4 py-3 text-sm text-slate-300 focus:outline-none transition-colors"
                    >
                      <option className="bg-primary" value="Kottivakkam">Kottivakkam (ECR)</option>
                      <option className="bg-primary" value="Injambakkam">Injambakkam (ECR)</option>
                      <option className="bg-primary" value="Nandanam">Nandanam (YMCA Ground)</option>
                    </select>
                  </div>

                </div>

                {/* Prior Experience */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                    <MessageSquare size={12} className="text-accent" /> Prior Playing Experience / Notes (Optional)
                  </label>
                  <textarea
                    name="priorExperience"
                    rows={3}
                    value={formData.priorExperience}
                    onChange={handleInputChange}
                    placeholder="e.g. Played in school team / absolute beginner..."
                    className="bg-white/5 border border-white/10 focus:border-sand/50 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none transition-colors placeholder:text-slate-600 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-4 py-4 rounded-xl bg-sand hover:bg-sand-dark text-primary-dark font-display font-bold text-xs uppercase tracking-wider text-center shadow-lg transition-all duration-300 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <span className="h-4 w-4 border-2 border-primary-dark border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Submit Request
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-panel rounded-3xl p-8 md:p-12 border border-sand/30 shadow-2xl text-center space-y-6"
            >
              <div className="h-16 w-16 bg-sand/10 border border-sand/30 rounded-full flex items-center justify-center text-sand mx-auto">
                <CheckCircle size={32} />
              </div>
              
              <h3 className="font-display font-black text-2xl md:text-3xl text-white">
                Request Received!
              </h3>
              
              <p className="text-slate-300 text-sm font-light max-w-md mx-auto leading-relaxed">
                Thank you for reaching out, <strong>{formData.parentName}</strong>. Your trial registration request for <strong>{formData.childName}</strong> is registered.
              </p>

              <div className="p-5 rounded-2xl bg-white/5 border border-white/5 max-w-md mx-auto text-xs text-slate-400 font-light space-y-2">
                <div className="font-semibold text-slate-300 mb-2">Registration Details Summary:</div>
                <p><strong>Age Group Slot:</strong> {formData.ageGroup}</p>
                <p><strong>Preferred Center:</strong> {formData.preferredCenter}</p>
                <p><strong>Primary Contact:</strong> {formData.parentPhone}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 max-w-md mx-auto">
                <a
                  href={`https://wa.me/919962916597?text=Hi%20Pradeep!%20I%20just%20submitted%20a%20trial%20session%20request%20online%20for%20my%20child%20${encodeURIComponent(formData.childName)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-display font-bold text-xs uppercase tracking-wider text-center shadow-lg transition-colors flex items-center justify-center gap-2"
                >
                  <Phone size={14} /> Contact via WhatsApp
                </a>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="flex-1 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-display font-bold text-xs uppercase tracking-wider text-center border border-white/10 transition-colors"
                >
                  Back to Form
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default RegistrationForm;
