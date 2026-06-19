import React from "react";
import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import LocationsSection from "@/modules/locations/LocationsSection";

export const metadata: Metadata = {
  title: "Our Locations",
  description: "Find Neidhal FC coaching centers in Kottivakkam, Injambakkam, and Nandanam in Chennai.",
};

export default function LocationsPage() {
  return (
    <>
      <PageHero 
        title="Training Locations" 
        subtitle="We operate across three major coaching hubs in Chennai, strategically located for parents and students." 
      />
      <LocationsSection />
    </>
  );
}
