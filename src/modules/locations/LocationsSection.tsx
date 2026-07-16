"use client";

import React from "react";
import LocationsHero from "./LocationsHero";
import LocationCard from "./LocationCard";

/* ─────────────────────────────────────────────
   DATA
 ───────────────────────────────────────────── */
const LOCATIONS = [
  {
    chapter: "Hub 01",
    id: "kottivakkam",
    title: "Kottivakkam",
    tagline: "Where sand meets skill",
    personality:
      "Our home base. Just steps from the sea breeze where sand conditioning meets turf execution.",
    address: "1, 1, SH 49, Valmiki Nagar, Raja Garden, Kottivakkam, Chennai, Tamil Nadu 600041",
    days: "Monday, Wednesday & Friday",
    times: "Evening: 4:30 PM – 6:30 PM",
    coach: "Pradeep Ramesh",
    images: [
      "/images/locations/kottivakkam-1.webp",
      "/images/locations/kottivakkam-2.webp",
      "/images/locations/kottivakkam-3.webp",
      "/images/locations/kottivakkam-4.webp",
      "/images/locations/kottivakkam-5.webp",
      "/images/locations/kottivakkam-6.webp",
      "/images/locations/kottivakkam-7.webp",
      "/images/locations/kottivakkam-8.webp",
      "/images/locations/kottivakkam-9.webp",
      "/images/locations/kottivakkam-10.webp",
      "/images/locations/kottivakkam-11.webp",
      "/images/locations/kottivakkam-12.webp",
      "/images/locations/kottivakkam-13.webp",
    ],
    embedUrl:
      "https://maps.google.com/maps?q=Neidhal%20Football%20Club%20Kottivakkam&z=16&output=embed",
  },
  {
    chapter: "Hub 02",
    id: "injambakkam",
    title: "Injambakkam",
    tagline: "Fast, fluid, fearless",
    personality:
      "Where the play is fast and fluid. Highly technical ECR coastal turf training for our junior squads.",
    address: "Sai Baba Garden, S.No. 215/4A, First Main Rd, Akkarai, Injambakkam, Chennai, Greater Chennai, Tamil Nadu 600119",
    days: "Monday to Saturday",
    times: "Evening: 4:00 PM – 7:00 PM",
    coach: "Vijay Balan",
    images: [
      "/images/locations/injambakkam-1.webp",
      "/images/locations/injambakkam-2.webp",
      "/images/locations/injambakkam-3.webp",
      "/images/locations/injambakkam-4.webp",
      "/images/locations/injambakkam-5.webp",
      "/images/locations/injambakkam-6.webp",
      "/images/locations/injambakkam-7.webp",
      "/images/locations/injambakkam-8.webp",
      "/images/locations/injambakkam-9.webp",
      "/images/locations/injambakkam-10.webp",
      "/images/locations/injambakkam-11.webp",
      "/images/locations/injambakkam-12.webp",
      "/images/locations/injambakkam-13.webp",
      "/images/locations/injambakkam-14.webp",
    ],
    embedUrl:
      "https://maps.google.com/maps?q=Neidhal%20Football%20Club%20Injambakkam&z=16&output=embed",
  },
  {
    chapter: "Hub 03",
    id: "nandanam",
    title: "Nandanam",
    tagline: "The city's tactical arena",
    personality:
      "Professional turf facility in the heart of Chennai, designed for spatial tactics and high-intensity match dynamics.",
    address: "13, Lotus Colony 1st St, Nandanam Extension, Nandanam, Chennai, Greater Chennai, Tamil Nadu 600035",
    days: "Monday to Saturday",
    times: "Evening: 4:00 PM – 7:00 PM",
    coach: "Vijay Balan",
    images: [
      "/images/locations/nandanam-1.webp",
      "/images/locations/nandanam-2.webp",
      "/images/locations/nandanam-3.webp",
      "/images/locations/nandanam-4.webp",
      "/images/locations/nandanam-5.webp",
      "/images/locations/nandanam-6.webp",
      "/images/locations/nandanam-7.webp",
    ],
    embedUrl:
      "https://maps.google.com/maps?q=Neidhal%20Football%20Club%20Nandanam&z=16&output=embed",
  },
];

/* ─────────────────────────────────────────────
   MAIN EXPORT
 ───────────────────────────────────────────── */
export const LocationsSection: React.FC = () => {
  return (
    <div className="relative bg-[#FAF7F2]">
      {/* Hero Section in normal flow */}
      <LocationsHero />

      {/* Cards container following the hero banner */}
      <div className="relative z-10 bg-[#FAF7F2]">
        <div className="w-full space-y-0">
          {/* Cards */}
          {LOCATIONS.map((loc) => (
            <LocationCard key={loc.id} loc={loc} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationsSection;
