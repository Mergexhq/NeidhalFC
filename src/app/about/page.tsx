import React from "react";
import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import HeritageScroll from "@/modules/about/HeritageScroll";
import OriginsSlider from "@/modules/about/OriginsSlider";
import SymbolismBoard from "@/modules/about/SymbolismBoard";
import OperationalUSP from "@/modules/about/OperationalUSP";

export const metadata: Metadata = {
  title: "About Our Story",
  description: "Learn about Neidhal FC's backstory, from playing football together on Chennai beaches in 2016 to a structured coastal coaching academy.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero 
        title="About Neidhal FC" 
        subtitle="The story, the naming concept, and the philosophy behind Chennai's premier coastal academy." 
      />
      <HeritageScroll />
      <OriginsSlider />
      <SymbolismBoard />
      <OperationalUSP />
    </>
  );
}
