import React from "react";
import Hero from "@/modules/home/Hero";
import AboutGlimpse from "@/modules/home/AboutGlimpse";
import CoachSection from "@/modules/home/CoachSection";
import LifeAtNeidhal from "@/modules/home/LifeAtNeidhal";
import PhotoStrip from "@/modules/home/InstagramStrip";
import TestimonialBoard from "@/modules/media/TestimonialBoard";
import SeasonalEvents from "@/modules/home/SeasonalEvents";
import HomeCTA from "@/modules/home/HomeCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutGlimpse />
      <CoachSection />
      <LifeAtNeidhal />
      <PhotoStrip />
      <TestimonialBoard />
      <SeasonalEvents />
      <HomeCTA />
    </>
  );
}

