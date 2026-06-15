import React from "react";
import Hero from "@/modules/home/Hero";
import StatsBar from "@/modules/home/StatsBar";
import Highlights from "@/modules/home/Highlights";
import FeaturedPrograms from "@/modules/home/FeaturedPrograms";
import PhotoStrip from "@/modules/home/PhotoStrip";
import SeasonalEvents from "@/modules/events/SeasonalEvents";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Highlights />
      <FeaturedPrograms />
      <PhotoStrip />
      <SeasonalEvents />
    </>
  );
}
