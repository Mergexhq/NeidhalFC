import React from "react";
import type { Metadata } from "next";
import AboutHero from "@/modules/about/AboutHero";
import BrandMeaning from "@/modules/about/BrandMeaning";
import WhatWeBelieve from "@/modules/about/WhatWeBelieve";
import HowWeCoach from "@/modules/about/HowWeCoach";
import JoinNeidhal from "@/modules/about/JoinNeidhal";

export const metadata: Metadata = {
  title: "About Our Story",
  description: "Learn about Neidhal FC's backstory, from playing football together on Chennai beaches in 2016 to a structured coastal coaching academy.",
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <BrandMeaning />
      <WhatWeBelieve />
      <HowWeCoach />
      <JoinNeidhal />
    </>
  );
}
