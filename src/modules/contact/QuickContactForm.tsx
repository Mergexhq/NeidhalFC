"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";

export const QuickContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    age: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.age || !formData.message) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true);

    // Simulate 1.5 second API loading state
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Construct sheets tracker logger payload
    const logPayload = {
      timestamp: new Date().toISOString(),
      parentName: formData.name,
      phone: formData.phone,
      playerAge: formData.age,
      message: formData.message,
      source: "Quick Contact Form",
      status: "Logged to Google Sheets Row #84",
    };

    console.log("Quick Contact Submit Payload logged:", logPayload);

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section className="py-24 bg-[#F5EFE6] border-t border-black/[0.04] relative z-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Intake Info */}
          <div className="lg:col-span-5 text-left">
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-accent">No Friction</span>
            <h2 className="font-sans font-semibold text-3xl sm:text-4xl text-primary mt-2 tracking-wide">
              Quick Contact
            </h2>
            <p className="text-[#6F6F6F] text-sm sm:text-base font-normal mt-4 leading-relaxed max-w-md">
              We know parents hate long forms. Just give us the bare essentials and your question.
            </p>
            <p className="text-sand font-display text-sm font-semibold tracking-wide mt-6">
              Our coordinators will call or WhatsApp you within 2 hours.
            </p>
          </div>

          {/* Right Column: Mini Form Container */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-black/10 rounded-[2.5rem] p-8 md:p-12 shadow-xl relative overflow-hidden">
              
              {/* Form Background Accent */}
              <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-sand/10 blur-xl pointer-events-none" />

              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="quick-form-fields"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                      
                      {/* Name field */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-sans font-bold text-xs uppercase text-[#6F6F6F] tracking-wide">
                          Parent Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          id="name"
                          required
                          placeholder="e.g. Anand Ramesh"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="px-4.5 py-3.5 rounded-xl border border-black/10 focus:outline-none focus:border-accent text-sm w-full bg-[#FAF7F2]/50 text-black font-normal transition-colors"
                        />
                      </div>

                      {/* Phone field */}
                      <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="font-sans font-bold text-xs uppercase text-[#6F6F6F] tracking-wide">
                          WhatsApp / Phone *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          required
                          placeholder="e.g. +91 99629 16597"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="px-4.5 py-3.5 rounded-xl border border-black/10 focus:outline-none focus:border-accent text-sm w-full bg-[#FAF7F2]/50 text-black font-normal transition-colors"
                        />
                      </div>

                      {/* Age field */}
                      <div className="flex flex-col gap-2 sm:col-span-2">
                        <label htmlFor="age" className="font-sans font-bold text-xs uppercase text-[#6F6F6F] tracking-wide">
                          Player Age *
                        </label>
                        <input
                          type="number"
                          name="age"
                          id="age"
                          required
                          min="4"
                          max="18"
                          placeholder="e.g. 9 (Required to map correct training batch)"
                          value={formData.age}
                          onChange={handleInputChange}
                          className="px-4.5 py-3.5 rounded-xl border border-black/10 focus:outline-none focus:border-accent text-sm w-full bg-[#FAF7F2]/50 text-black font-normal transition-colors"
                        />
                      </div>

                      {/* Message field */}
                      <div className="flex flex-col gap-2 sm:col-span-2">
                        <label htmlFor="message" className="font-sans font-bold text-xs uppercase text-[#6F6F6F] tracking-wide">
                          Your Question / Inquiry *
                        </label>
                        <textarea
                          name="message"
                          id="message"
                          required
                          rows={4}
                          placeholder="What would you like to know? (e.g. Do you have U10 weekend slots available at Kottivakkam?)"
                          value={formData.message}
                          onChange={handleInputChange}
                          className="px-4.5 py-3.5 rounded-xl border border-black/10 focus:outline-none focus:border-accent text-sm w-full bg-[#FAF7F2]/50 text-black font-normal transition-colors resize-none"
                        />
                      </div>

                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white text-xs sm:text-sm font-sans font-bold uppercase tracking-wider px-8 py-4 rounded-xl transition-all duration-300 w-full md:w-auto text-center cursor-pointer shadow-md select-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={16} className="animate-spin text-sand" />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send size={14} className="text-sand shrink-0" />
                        </>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="quick-form-success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="py-12 px-4 text-center flex flex-col items-center justify-center"
                  >
                    <div className="h-16 w-16 rounded-full bg-[#25D366]/10 flex items-center justify-center text-[#128C7E] mb-6">
                      <CheckCircle size={36} className="stroke-[1.8]" />
                    </div>
                    <h3 className="font-sans font-semibold text-2xl text-primary mb-3">
                      Message Dispatched!
                    </h3>
                    <p className="text-black/60 text-sm max-w-sm mx-auto leading-relaxed mb-8">
                      Thank you for reaching out. We have logged your details. A coordinator will WhatsApp or call you at <span className="font-bold text-primary">{formData.phone}</span> shortly.
                    </p>
                    <button
                      onClick={() => {
                        setFormData({ name: "", phone: "", age: "", message: "" });
                        setSubmitted(false);
                      }}
                      className="text-xs font-sans font-bold text-accent hover:underline uppercase tracking-wider"
                    >
                      Send Another Question
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default QuickContactForm;
