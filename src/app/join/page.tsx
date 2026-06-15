import React from "react";
import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import HowItWorks from "@/modules/join/HowItWorks";
import TrialSession from "@/modules/join/TrialSession";
import RegistrationForm from "@/modules/join/RegistrationForm";

export const metadata: Metadata = {
  title: "Join Neidhal | Free Trial Session",
  description: "Book a free coached trial class for your child. Follow our simple process: Submit inquiry, attend trial, choose program, start training.",
};

export default function JoinPage() {
  return (
    <>
      <PageHero 
        title="Join Neidhal FC" 
        subtitle="Book a free coached trial session at our Kottivakkam, Injambakkam, or Nandanam centers." 
      />
      <HowItWorks />
      <TrialSession />
      <RegistrationForm />
    </>
  );
}
