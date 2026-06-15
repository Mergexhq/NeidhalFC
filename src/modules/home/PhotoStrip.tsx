"use client";

import React from "react";
import Image from "next/image";

const IMAGES = [
  "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1544698310-74ea9d1c8258?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1518604666860-9ed391f76460?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1526232761682-d26e47ac1740?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?auto=format&fit=crop&w=400&q=80",
];

// Duplicate to support seamless scrolling loop
const MARQUEE_IMAGES = [...IMAGES, ...IMAGES, ...IMAGES];

export const PhotoStrip: React.FC = () => {
  return (
    <section className="py-16 bg-[#FAF7F2] overflow-hidden relative border-b border-black/5">
      {/* Inline Keyframes for Marquee animation */}
      <style jsx global>{`
        @keyframes scrollMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.3333%, 0, 0);
          }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: scrollMarquee 35s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Subtle top/bottom text bars */}
      <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#FAF7F2] to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#FAF7F2] to-transparent z-10 pointer-events-none" />

      {/* Marquee Track */}
      <div className="marquee-track flex gap-6">
        {MARQUEE_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className="w-72 h-48 md:w-96 md:h-64 rounded-[2rem] overflow-hidden relative shrink-0 border border-black/5 shadow-md hover:scale-[1.02] transition-transform duration-300 cursor-grab active:cursor-grabbing"
          >
            <Image
              src={img}
              alt={`Neidhal FC Action Moment ${idx + 1}`}
              fill
              sizes="(max-w-768px) 280px, 384px"
              className="object-cover pointer-events-none"
            />
            {/* Subtle overlay tint */}
            <div className="absolute inset-0 bg-primary/5 hover:bg-transparent transition-colors duration-300" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhotoStrip;
