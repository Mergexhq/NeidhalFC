"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import CircularGallery from "@/components/common/CircularGallery";

const FIELD_SNAPSHOTS = [
  {
    id: 1,
    image: "/images/beach_soccer.jpg",
    caption: "POV: A Structured Technical session. 2:1 coaching ratio in action. Building individual decision-making.",
  },
  {
    id: 2,
    image: "/images/advanced_match.jpg",
    caption: "Fearless play leads to creative solutions. Weekly turf match snapshots. Chennai Coastline league matches.",
  },
  {
    id: 3,
    image: "/images/coaching_ratio.jpg",
    caption: "Barefoot beach conditioning. Instilling grit and street-style touch on the Kottivakkam shoreline.",
  },
  {
    id: 4,
    image: "/images/foundation_drill.jpg",
    caption: "Fostering local football talent and creating paths for national-level exposure.",
  },
  {
    id: 5,
    image: "/images/soccer_thumb.jpg",
    caption: "Lush green training pitch. Providing international-standard playing turf for advanced development.",
  },
  {
    id: 6,
    image: "/images/location.jpg",
    caption: "Speed, agility, and quick decision-making under high-pressure coaching scenarios.",
  },
  {
    id: 7,
    image: "/images/about/backstory_2016.jpg",
    caption: "Youth soccer development programs, driving beach-football foundations since 2016.",
  },
  {
    id: 8,
    image: "/images/about/beach_soccer_legal.jpg",
    caption: "Precision shooting drills. Training local players to finish with confidence and clinical flair.",
  },
  {
    id: 9,
    image: "/images/about/going_roots.jpg",
    caption: "Tactical training layouts. Setting up visual game intelligence exercises for maximum cognitive growth.",
  },
  {
    id: 10,
    image: "/images/about/slider_coaching.jpg",
    caption: "Pre-match warmups. Warming up the squad with focus on dynamic movements and joint stability.",
  },
  {
    id: 11,
    image: "/images/about/slider_dolphins.jpg",
    caption: "Under the floodlights. Elite night sessions pushing player boundaries and competitive mindset.",
  },
  {
    id: 12,
    image: "/images/home/coach_ratio.jpg",
    caption: "Dedicated focus. Mentorship program linking experienced senior players with academy youth.",
  }
];

export const PhotoStrip: React.FC = () => {
  const router = useRouter();

  const galleryItems = FIELD_SNAPSHOTS.map((post, index) => ({
    src: post.image,
    alt: post.caption,
    key: `photo-${post.id}-${index}`,
    onClick: () => window.open("https://www.instagram.com/neidhalfc", "_blank"),
  }));

  return (
    <section className="bg-[#FAF7F2] relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 rounded-full bg-sand/5 blur-[100px] pointer-events-none" />

      {/* 3D Scroll-Driven Circular Gallery */}
      <CircularGallery
        items={galleryItems}
        scrollDistance={1600}
        rotationTotal={-360}
        className="py-12 md:py-24"
      >
        {/* Pinned Header (overlaid on top of the gallery) */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center max-w-3xl px-6 w-full z-20 pointer-events-none">
          <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-accent mb-3 block">
            Chapter 3: The Pulse
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-primary font-sans tracking-wide leading-tight">
            Latest from the Field
          </h2>
          <p className="text-[#6F6F6F] text-xs md:text-sm leading-relaxed mt-4 max-w-lg mx-auto font-normal">
            A real-time snapshot of training pods, barefoot conditioning, and turf league play.
          </p>
        </div>

        {/* Pinned Bottom CTA (overlaid at the bottom of the gallery, clear of cards and bottom navigation) */}
        <div className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none w-full flex justify-center">
          <div className="pointer-events-auto">
            <a
              href="https://www.instagram.com/neidhalfc"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-[11px] font-sans font-bold uppercase tracking-widest text-primary hover:text-accent transition-colors group cursor-pointer"
            >
              <span>See us in action on Instagram</span>
              <span className="h-8 w-8 rounded-full bg-primary text-sand group-hover:bg-accent group-hover:text-white flex items-center justify-center transition-colors shadow-sm">
                <ArrowRight size={13} className="group-hover:translate-x-0.5 transition-transform" />
              </span>
            </a>
          </div>
        </div>
      </CircularGallery>
    </section>
  );
};

export default PhotoStrip;
