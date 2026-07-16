"use client";

import React from "react";
import CircularGallery from "@/components/common/CircularGallery";

const FIELD_SNAPSHOTS = [
  {
    id: 1,
    image: "/images/gallery/gallery-08.webp",
    caption: "POV: A Structured Technical session. 2:1 coaching ratio in action. Building individual decision-making.",
  },
  {
    id: 2,
    image: "/images/gallery/gallery-01.webp",
    caption: "Fearless play leads to creative solutions. Weekly turf match snapshots. Chennai Coastline league matches.",
  },
  {
    id: 3,
    image: "/images/gallery/gallery-06.webp",
    caption: "Barefoot beach conditioning. Instilling grit and street-style touch on the Kottivakkam shoreline.",
  },
  {
    id: 4,
    image: "/images/gallery/gallery-04.webp",
    caption: "Fostering local football talent and creating paths for national-level exposure.",
  },
  {
    id: 5,
    image: "/images/gallery/gallery-09.webp",
    caption: "Lush green training pitch. Providing international-standard playing turf for advanced development.",
  },
  {
    id: 6,
    image: "/images/gallery/gallery-12.webp",
    caption: "Speed, agility, and quick decision-making under high-pressure coaching scenarios.",
  },
  {
    id: 7,
    image: "/images/gallery/gallery-13.webp",
    caption: "Youth soccer development programs, driving beach-football foundations since 2016.",
  },
  {
    id: 8,
    image: "/images/gallery/gallery-02-r.webp",
    caption: "Precision shooting drills. Training local players to finish with confidence and clinical flair.",
  },
  {
    id: 9,
    image: "/images/gallery/gallery-03-r.webp",
    caption: "Tactical training layouts. Setting up visual game intelligence exercises for maximum cognitive growth.",
  },
  {
    id: 10,
    image: "/images/gallery/gallery-05-r.webp",
    caption: "Pre-match warmups. Warming up the squad with focus on dynamic movements and joint stability.",
  },
  {
    id: 11,
    image: "/images/gallery/gallery-10.webp",
    caption: "Under the floodlights. Elite night sessions pushing player boundaries and competitive mindset.",
  },
  {
    id: 12,
    image: "/images/gallery/gallery-11.webp",
    caption: "Dedicated focus. Mentorship program linking experienced senior players with academy youth.",
  },
  {
    id: 13,
    image: "/images/gallery/gallery-07-r.webp",
    caption: "Creative vision meets coastal football culture - the Neidhal story.",
  },
  {
    id: 14,
    image: "/images/gallery/gallery-01.webp",
    caption: "Match intensity - players pushing limits in competitive turf sessions.",
  },
  {
    id: 15,
    image: "/images/gallery/gallery-04.webp",
    caption: "Foundation first - instilling discipline and technique from day one.",
  },
  {
    id: 16,
    image: "/images/gallery/gallery-06.webp",
    caption: "Hands-on coaching - every player gets individual attention and guidance.",
  },
];

export const PhotoStrip: React.FC = () => {
  const galleryItems = FIELD_SNAPSHOTS.map((post, index) => ({
    src: post.image,
    alt: post.caption,
    key: `photo-${post.id}-${index}`,
    onClick: () => window.open("https://www.instagram.com/neidhalfc", "_blank"),
  }));

  return (
    <section className="bg-transparent relative pb-3 md:pb-4">
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-80 h-80 rounded-full bg-sand/5 blur-[100px] pointer-events-none" />

      {/* 3D Scroll-Driven Circular Gallery */}
      <CircularGallery
        items={galleryItems}
        scrollDistance={1600}
        rotationTotal={-360}
        className="py-1 md:py-2"
      >
        {/* Pinned Header */}
        <div className="absolute top-1 md:top-2 left-1/2 -translate-x-1/2 text-center w-full z-20 pointer-events-none px-6">
          <h2 className="font-raleway font-semibold text-[#0B1F3A] uppercase tracking-tight leading-none text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-center">
            Latest from the Field
          </h2>
        </div>
      </CircularGallery>

      {/* Social CTAs */}
      <div className="flex flex-col items-center justify-center -mt-16 md:-mt-24 px-6 relative z-30">
        {/* Follow our journey */}
        <p className="text-sm sm:text-base md:text-lg font-sans font-bold uppercase tracking-[0.25em] text-[#0B1F3A]/70 mb-3 select-none">
          Follow our journey
        </p>

        {/* Instagram • YouTube Outline Buttons */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/neidhalfc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-transparent hover:bg-[#0B1F3A] text-[#0B1F3A] hover:text-white border border-[#0B1F3A]/30 hover:border-[#0B1F3A] font-sans font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-sm group cursor-pointer"
          >
            <svg className="w-[15px] h-[15px] text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
            </svg>
            <span>Instagram</span>
          </a>
          <a
            href="https://www.youtube.com/@Neidhalfc"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-transparent hover:bg-[#0B1F3A] text-[#0B1F3A] hover:text-white border border-[#0B1F3A]/30 hover:border-[#0B1F3A] font-sans font-bold text-xs uppercase tracking-wider px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-sm group cursor-pointer"
          >
            <svg className="w-[15px] h-[15px] text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>
            <span>YouTube</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default PhotoStrip;
