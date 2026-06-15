import React from "react";
import type { Metadata } from "next";
import PageHero from "@/components/common/PageHero";
import EventsList from "@/modules/events/EventsList";

export const metadata: Metadata = {
  title: "Events & Summer Camps",
  description: "Keep track of our special events, holiday football clinics, and annual summer training camps in Chennai.",
};

export default function EventsPage() {
  return (
    <>
      <PageHero 
        title="Club Events & Clinics" 
        subtitle="Explore our upcoming skill clinics, summer camps, and past highlights." 
      />
      <EventsList />
    </>
  );
}
