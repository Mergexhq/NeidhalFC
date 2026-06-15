import React from "react";
import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import InstagramFeed from "@/modules/media/InstagramFeed";
import TestimonialBoard from "@/modules/media/TestimonialBoard";
import PressKit from "@/modules/media/PressKit";

export const metadata: Metadata = {
  title: "Media & Social Proof",
  description: "View our coastal training videos, summer camp action reels, and parent testimonials from Kottivakkam, Injambakkam, and Nandanam centers.",
};

export default function MediaPage() {
  return (
    <>
      <PageHero 
        title="Media & Social Hub" 
        subtitle="Explore raw footages of beach sessions, turf games, and stories of player transformation from parents." 
      />
      <InstagramFeed />
      <TestimonialBoard />
      <PressKit />
    </>
  );
}
