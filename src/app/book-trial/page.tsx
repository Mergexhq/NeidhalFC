import React, { Suspense } from "react";
import type { Metadata } from "next";
import TrialIntro from "@/modules/book-trial/TrialIntro";
import MembershipOptions from "@/modules/book-trial/MembershipOptions";
import TrialForm from "@/modules/book-trial/TrialForm";

export const metadata: Metadata = {
  title: "Book a Free Trial Session",
  description: "Schedule a free coached trial class for your child. Follow our simple, structured process in Kottivakkam, Injambakkam, or Nandanam.",
};

export default function BookTrialPage() {
  return (
    <>
      <TrialIntro />
      <MembershipOptions />
      <Suspense fallback={
        <div className="py-24 text-center text-slate-500 font-sans font-medium text-sm bg-[#FAF7F2]">
          Loading booking form...
        </div>
      }>
        <TrialForm />
      </Suspense>
    </>
  );
}

