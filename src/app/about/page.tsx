import React from "react";
import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import BrandMeaning from "@/modules/about/BrandMeaning";
import OriginsSlider from "@/modules/about/OriginsSlider";
import Philosophy from "@/modules/about/Philosophy";
import SymbolismBoard from "@/modules/about/SymbolismBoard";
import OperationalUSP from "@/modules/about/OperationalUSP";
import Facilities from "@/modules/about/Facilities";

export const metadata: Metadata = {
  title: "About Our Story",
  description: "Learn about Neidhal FC's backstory, from playing football together on Chennai beaches in 2016 to a structured coastal coaching academy.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero 
        title="About Neythal" 
        subtitle="Our backstory, the naming concept, and the standard behind the coaching." 
      />
      <BrandMeaning />
      <OriginsSlider />
      <Philosophy />
      <SymbolismBoard />
      <OperationalUSP />
      <Facilities />
    </>
  );
}
