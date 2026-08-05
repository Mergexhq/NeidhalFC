import React from "react";
import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Official Terms and Conditions of Neidhal Football Club.",
};

export default function TermsAndConditionsPage() {
  return (
    <>
      <PageHero 
        title="Terms & Conditions" 
        subtitle="Last updated: June 15, 2026. Rules governing academy memberships." 
      />
      
      <section className="py-20 bg-[#FAF7F2] text-left text-black">
        <div className="max-w-4xl mx-auto px-6 font-normal leading-relaxed text-sm md:text-base space-y-6">
          <p className="text-lg text-[#6F6F6F]">
            Welcome to Neidhal Football Club. These terms and conditions outline the rules and regulations for the use of Neidhal FC's training programs and digital platforms.
          </p>

          <h3 className="font-sans font-extrabold text-xl text-primary pt-4 uppercase">1. Free Trial Sessions</h3>
          <p>
            Each player is eligible for exactly one free coached trial session across our Kottivakkam, Injambakkam, and Nandanam hubs. Scheduling is subject to coach availability and age-group limits.
          </p>

          <h3 className="font-sans font-extrabold text-xl text-primary pt-4 uppercase">2. Academy Rules & Safety</h3>
          <p>
            We prioritize safety, character building, and sportsmanship. Players must follow coach instructions during training. Parents must ensure children are dropped off and picked up on time, and have appropriate footwear for turf training.
          </p>

          <h3 className="font-sans font-extrabold text-xl text-primary pt-4 uppercase">3. Fees & Refund Policy</h3>
          <p>
            Fees for seasonal camps and monthly memberships are paid in advance. Refund requests for seasonal programs must be submitted at least 48 hours prior to camp commencement.
          </p>
        </div>
      </section>
    </>
  );
}
