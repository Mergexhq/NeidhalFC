"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";

export const Hero: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOpacity, setVideoOpacity] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number;

    const checkVideoProgress = () => {
      const currentTime = video.currentTime;
      const duration = video.duration;

      if (duration) {
        // Fade in over 0.5s at the start (opacity 0 to 1)
        if (currentTime < 0.5) {
          setVideoOpacity(currentTime / 0.5);
        }
        // Fade out over 0.5s before the end (opacity 1 to 0)
        else if (currentTime > duration - 0.5) {
          setVideoOpacity(Math.max(0, (duration - currentTime) / 0.5));
        }
        // Solid opacity in between
        else {
          setVideoOpacity(1);
        }
      }

      animationFrameId = requestAnimationFrame(checkVideoProgress);
    };

    // Custom loop: set opacity to 0, wait 100ms, reset currentTime, play again
    const handleEnded = () => {
      setVideoOpacity(0);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().catch((err) => console.log("Video playback error:", err));
        }
      }, 100);
    };

    video.addEventListener("ended", handleEnded);
    
    // Play video initially
    video.play().catch((err) => console.log("Video playback error:", err));
    animationFrameId = requestAnimationFrame(checkVideoProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (video) {
        video.removeEventListener("ended", handleEnded);
      }
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-primary flex flex-col items-center justify-center text-center px-6 pt-[calc(8rem-75px)] pb-40">
      
      {/* Background Video Layer */}
      <video
        ref={videoRef}
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
        muted
        playsInline
        style={{
          position: "absolute",
          top: 0,
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: videoOpacity,
          transition: "opacity 0.1s linear",
        }}
        className="z-0"
      />

      {/* Dark Navy Overlay to support text legibility */}
      <div className="absolute inset-0 bg-primary/70 pointer-events-none z-0" />

      {/* Gradient Overlays on Video to blend with layout */}
      <div className="absolute inset-0 bg-linear-to-b from-primary/30 via-transparent to-[#FAF7F2] pointer-events-none z-0" />

      {/* Subtle Jumping Dolphin Mascot Background Outline */}
      <svg viewBox="0 0 100 100" className="w-[260px] h-[260px] md:w-[480px] md:h-[480px] text-sand fill-none stroke-current stroke-[0.35] opacity-[0.06] select-none pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 animate-pulse">
        <path d="M10,65 C30,35 60,30 85,55 C88,58 92,60 95,58 C90,52 82,45 75,42 C60,35 45,38 30,50 C20,58 15,62 10,65 Z" />
        <path d="M85,55 C70,68 50,75 35,70 C22,65 15,55 10,48 C12,52 18,58 25,60 C38,65 55,60 70,50 L85,55 Z" />
        <path d="M55,38 C58,30 63,22 70,25 C66,28 62,34 60,40" />
        <path d="M35,62 C32,68 28,75 22,72 C25,70 28,66 30,62" />
      </svg>

      {/* Hero Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center">
        {/* Headline */}
        <h1 className="text-5xl sm:text-7xl md:text-8xl font-normal font-display leading-[0.95] tracking-[-2.46px] text-white animate-fade-rise max-w-5xl">
          Play with <em className="italic text-sand">flair</em> & <em className="italic text-sand">freedom.</em>
        </h1>

        {/* Description */}
        <p className="text-base sm:text-lg max-w-2xl mt-8 leading-relaxed text-[#FAF7F2]/80 animate-fade-rise-delay">
          {"Developing fearless, creative players who play with street-style flair and individual decision-making. Rooted in Chennai's beach football beginnings since 2016."}
        </p>

        {/* Hero CTA Button */}
        <Link
          href="/book-trial"
          className="inline-block rounded-full px-14 py-5 text-base mt-12 bg-sand text-primary hover:bg-[#FAF7F2] hover:scale-[1.03] transition-all duration-300 ease-out animate-fade-rise-delay-2 font-sans font-bold cursor-pointer"
        >
          Book a Free Trial Session
        </Link>
      </div>

      {/* Wave Shoreline SVG Transition */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-[200%] h-20 text-[#FAF7F2] fill-current animate-wave">
          <path d="M0,0 C150,90 350,10 500,60 C650,110 850,20 1000,70 C1150,120 1350,30 1500,80 L2000,120 L0,120 Z" opacity="0.3"></path>
          <path d="M0,20 C150,110 350,30 500,80 C650,130 850,40 1000,90 C1150,140 1350,50 1500,100 L2000,120 L0,120 Z" opacity="0.5"></path>
          <path d="M0,45 C150,120 350,60 500,105 C650,150 850,80 1000,125 L2000,120 L0,120 Z"></path>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
