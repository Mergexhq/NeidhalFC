import React from "react";
import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Official Privacy Policy of Neidhal Football Club.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <PageHero 
        title="Privacy Policy" 
        subtitle="Last updated: June 15, 2026. How we protect your data." 
      />
      
      <section className="py-20 bg-[#FAF7F2] text-left text-black">
        <div className="max-w-4xl mx-auto px-6 font-normal leading-relaxed text-sm md:text-base space-y-6">
          <p className="text-lg text-[#6F6F6F]">
            At Neidhal Football Club, accessible from https://neidhalfc.com, one of our main priorities is the privacy of our visitors and training academy members. This Privacy Policy document contains types of information that is collected and recorded by Neidhal FC and how we use it.
          </p>

          <h3 className="font-sans font-extrabold text-xl text-primary pt-4 uppercase">1. Information We Collect</h3>
          <p>
            When you register for a trial session or seasonal camps, we collect essential contact details including Parent Name, Player Name, Player Age, Contact Phone number, and Email address. This is gathered purely to schedule sessions and coordinate academy logistics.
          </p>

          <h3 className="font-sans font-extrabold text-xl text-primary pt-4 uppercase">2. How We Use Your Information</h3>
          <p>
            We use the information we collect to coordinate coaching sessions, send scheduled notifications, manage seasonal rosters, and improve academy logistics. We do not sell, rent, or share user data with third-party advertisers.
          </p>

          <h3 className="font-sans font-extrabold text-xl text-primary pt-4 uppercase">3. Consent</h3>
          <p>
            By using our website or submitting trial booking forms, you hereby consent to our Privacy Policy and agree to its terms.
          </p>
        </div>
      </section>
    </>
  );
}
