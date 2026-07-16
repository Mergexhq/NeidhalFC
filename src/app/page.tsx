import React from "react";
import Hero from "@/modules/home/Hero";
import WhyWeStarted from "@/modules/home/WhyWeStarted";

import CoachSection from "@/modules/home/CoachSection";
import LifeAtNeidhal from "@/modules/home/LifeAtNeidhal";
import PhotoStrip from "@/modules/home/InstagramStrip";
import TestimonialBoard from "@/modules/home/TestimonialBoard";
import SeasonalEvents from "@/modules/home/SeasonalEvents";
import HomeCTA from "@/modules/home/HomeCTA";
import FootballCTA from "@/modules/home/FootballCTA";

export default function HomePage() {
  return (
    <div className="bg-gradient-to-b from-[#F5EFE6] to-[#FAF7F2]">
      <Hero />
      <WhyWeStarted />

      <CoachSection />
      <LifeAtNeidhal />
      <PhotoStrip />
      <TestimonialBoard />
      <SeasonalEvents />
      <HomeCTA />
      <FootballCTA />
    </div>
  );
}

