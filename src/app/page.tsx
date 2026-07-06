import React from "react";
import Hero from "@/modules/home/Hero";

import CoachSection from "@/modules/home/CoachSection";
import LifeAtNeidhal from "@/modules/home/LifeAtNeidhal";
import PhotoStrip from "@/modules/home/InstagramStrip";
import TestimonialBoard from "@/modules/home/TestimonialBoard";
import SeasonalEvents from "@/modules/home/SeasonalEvents";
import HomeCTA from "@/modules/home/HomeCTA";
import FootballCTA from "@/modules/home/FootballCTA";

export default function HomePage() {
  return (
    <>
      <Hero />

      <CoachSection />
      <LifeAtNeidhal />
      <PhotoStrip />
      <TestimonialBoard />
      <SeasonalEvents />
      <HomeCTA />
      <FootballCTA />
    </>
  );
}

