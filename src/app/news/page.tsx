import React from "react";
import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import NewsGrid from "@/modules/news/NewsGrid";

export const metadata: Metadata = {
  title: "Club News & Updates",
  description: "Read the latest match results, tournament updates, camp announcements, and news from Neidhal FC.",
};

export default function NewsPage() {
  return (
    <>
      <PageHero 
        title="Club News & Announcements" 
        subtitle="Read the latest news, tournament results, and updates from our Chennai coaching centers." 
      />
      <NewsGrid />
    </>
  );
}
