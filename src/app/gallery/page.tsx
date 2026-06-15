import React from "react";
import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import GalleryGrid from "@/modules/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Media Gallery",
  description: "Browse photos of beach football conditioning, turf league matches, and summer camps at Neidhal FC.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero 
        title="Club Gallery" 
        subtitle="Visual proof of our training sessions, tournament matches, beach conditioning, and summer camps." 
      />
      <GalleryGrid />
    </>
  );
}
