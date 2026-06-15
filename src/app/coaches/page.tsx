import React from "react";
import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import CoachGrid from "@/modules/coaches/CoachGrid";

export const metadata: Metadata = {
  title: "Meet the Coaches",
  description: "Meet the Neidhal FC coaching team led by AFC and AIFF licensed coaches Vijay Balan and Pradeep Ramesh.",
};

export default function CoachesPage() {
  return (
    <>
      <PageHero 
        title="Meet Our Coaches" 
        subtitle="Learn about the credentials, licenses, and focus areas of our professional youth coaching staff." 
      />
      <CoachGrid />
    </>
  );
}
