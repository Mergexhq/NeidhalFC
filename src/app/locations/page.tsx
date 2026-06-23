import React from "react";
import type { Metadata } from "next";
import LocationsSection from "@/modules/locations/LocationsSection";

export const metadata: Metadata = {
  title: "Our Locations",
  description: "Find Neidhal FC coaching centers in Kottivakkam, Injambakkam, and Nandanam in Chennai.",
};

export default function LocationsPage() {
  return (
    <LocationsSection />
  );
}
