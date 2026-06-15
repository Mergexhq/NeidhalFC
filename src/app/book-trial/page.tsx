import React, { Suspense } from "react";
import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import TrialForm from "@/modules/book-trial/TrialForm";

export const metadata: Metadata = {
  title: "Book a Free Trial Session",
  description: "Schedule a free coached trial class for your child. Follow our simple, structured process in Kottivakkam, Injambakkam, or Nandanam.",
};

export default function BookTrialPage() {
  return (
    <>
      <PageHero 
        title="Book a Free Trial" 
        subtitle="Experience our professional double-coach system. Choose your closest Chennai center and book a slot today." 
      />
      <Suspense fallback={
        <div className="py-24 text-center text-slate-500 font-sans font-medium text-sm">
          Loading booking form...
        </div>
      }>
        <TrialForm />
      </Suspense>
    </>
  );
}
