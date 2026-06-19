import React from "react";
import type { Metadata } from "next";
import InstagramFeed from "@/modules/media/InstagramFeed";
import TestimonialBoard from "@/modules/media/TestimonialBoard";

export const metadata: Metadata = {
  title: "Media & Social Proof",
  description: "View our coastal training videos, summer camp action reels, and parent testimonials from Kottivakkam, Injambakkam, and Nandanam centers.",
};

export default function MediaPage() {
  return (
    <>
      <InstagramFeed />
      <TestimonialBoard />
    </>
  );
}
