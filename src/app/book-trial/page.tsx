import React, { Suspense } from "react";
import type { Metadata } from "next";
import TrialIntro from "@/modules/book-trial/TrialIntro";
import TrialFAQ from "@/modules/book-trial/TrialFAQ";
import TrialForm from "@/modules/book-trial/TrialForm";
import NextSteps from "@/modules/book-trial/NextSteps";

export const metadata: Metadata = {
  title: "Book a Free Trial Session",
  description: "Schedule a free coached trial class for your child. Follow our simple, structured process in Kottivakkam, Injambakkam, or Nandanam.",
};

export default function BookTrialPage() {
  return (
    <>
      <TrialIntro />
      <TrialFAQ />
      <Suspense fallback={
        <div className="py-24 text-center text-slate-500 font-sans font-medium text-sm bg-[#FAF7F2]">
          Loading booking form...
        </div>
      }>
        <TrialForm />
      </Suspense>
      <NextSteps />
    </>
  );
}

