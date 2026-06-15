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
          href="/join"
          className="inline-block rounded-full px-14 py-5 text-base mt-12 bg-sand text-primary hover:bg-[#FAF7F2] hover:scale-[1.03] transition-all duration-300 ease-out animate-fade-rise-delay-2 font-sans font-bold cursor-pointer"
        >
          Book a Free Trial Session
        </Link>
      </div>
    </section>
  );
};

export default Hero;
