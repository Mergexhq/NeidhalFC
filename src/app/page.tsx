import React from "react";
import Hero from "@/modules/home/Hero";
import NeidhalStandard from "@/modules/home/NeidhalStandard";
import PhotoStrip from "@/modules/home/InstagramStrip";
import TestimonialBoard from "@/modules/media/TestimonialBoard";
import SeasonalEvents from "@/modules/events/SeasonalEvents";
import HomeCTA from "@/modules/home/HomeCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <NeidhalStandard />
      <PhotoStrip />
      <TestimonialBoard />
      <SeasonalEvents />
      <HomeCTA />
    </>
  );
}
