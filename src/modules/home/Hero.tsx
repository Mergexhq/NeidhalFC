"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Preloader } from "@/components/common/Preloader";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const TOTAL_FRAMES = 105;

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showLoader, setShowLoader] = useState(true);

  // Preload frames on mount
  useEffect(() => {
    setMounted(true);
    let loaded = 0;
    const loadedImages: HTMLImageElement[] = [];

    const handleImageLoad = () => {
      loaded++;
      setLoadedCount(loaded);
      if (loaded === TOTAL_FRAMES) {
        setIsLoaded(true);
      }
    };

    const handleImageError = (e: Event | string) => {
      console.error("Failed to load frame:", e);
      // Still count it as loaded so we don't get stuck in the loading screen
      loaded++;
      setLoadedCount(loaded);
      if (loaded === TOTAL_FRAMES) {
        setIsLoaded(true);
      }
    };

    // Preload all 119 frames
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/hero/frame_${String(i).padStart(4, "0")}.webp`;
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
      loadedImages.push(img);
    }

    setImages(loadedImages);
  }, []);

  // Preloader complete callback
  const handlePreloaderComplete = () => {
    setShowLoader(false);
  };

  // Helper to draw a specific frame
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0 || !images[index]) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(images[index], 0, 0, 1920, 1080);
  };

  // Run scroll animation when images are loaded
  // Run scroll animation when images are loaded
  useGSAP(() => {
    if (!isLoaded || images.length === 0) return;

    // Draw first frame immediately
    drawFrame(0);

    const frameObj = { val: 0 };

    // Create a GSAP timeline synced with scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1, // Buttery smooth interpolation
      }
    });

    // 1. Video frame animation runs over the entire scroll trigger (duration 1.0)
    tl.to(frameObj, {
      val: TOTAL_FRAMES - 1,
      roundProps: "val",
      ease: "none",
      onUpdate: () => {
        drawFrame(frameObj.val);
      }
    }, 0);

    // 2. Section 1 fades out in the first 20% of the scroll timeline
    tl.to(".hero-text-content-1", {
      opacity: 0,
      y: -100, // Slides upwards and fades out
      duration: 0.2,
      ease: "power1.inOut"
    }, 0);

    // Disable mouse events for Section 1 after it fades out
    tl.set(".hero-text-content-1", { pointerEvents: "none" }, 0.2);

    // 3. Section 2 fades in and slides up from 25% to 55% of the scroll timeline
    tl.fromTo(".hero-text-content-2", 
      {
        opacity: 0,
        y: 100, // Starts from below (slides upwards into view)
        pointerEvents: "none"
      },
      {
        opacity: 1,
        y: 0,
        pointerEvents: "auto",
        duration: 0.3,
        ease: "power1.inOut"
      },
      0.25
    );

  }, { scope: containerRef, dependencies: [isLoaded, images] });
  const progressPercent = Math.min(100, Math.round((loadedCount / TOTAL_FRAMES) * 100));

  return (
    <section ref={containerRef} className="relative h-[400vh] w-full bg-primary z-10">
      
      {/* Sticky container for the hero elements */}
      <div className="hero-sticky-content sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center text-center px-6">
        
        {/* Background Canvas Layer */}
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            backgroundImage: "url('/hero/frame_0001.webp')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="z-0"
        />

        {/* Subtle deep navy overlay to ensure text contrast and legibility over bright video spotlights */}
        <div className="absolute inset-0 bg-primary/45 pointer-events-none z-0" />

        {/* Section 1 Hero Content Layer */}
        <div className="hero-text-content-1 absolute z-10 max-w-7xl mx-auto flex flex-col items-center px-6">
          {/* Headline */}
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-normal font-display leading-[0.95] tracking-[-2.46px] text-white animate-fade-rise max-w-none lg:whitespace-nowrap">
            Play with <em className="italic text-sand">flair</em> & <em className="italic text-sand">freedom.</em>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg max-w-2xl mt-8 leading-relaxed text-[#FAF7F2]/80 animate-fade-rise-delay">
            {"Developing fearless, creative players who play with street-style flair and individual decision-making. Rooted in Chennai's beach football beginnings since 2016."}
          </p>
        </div>

        {/* Section 2 Backstory Content Layer (Two-column layout matching MergeX style) */}
        <div className="hero-text-content-2 absolute z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 text-left opacity-0 pointer-events-none">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">
            {/* Left Column */}
            <div className="md:col-span-6 flex flex-col items-start gap-4">
              <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-sand block">
                Our Backstory
              </span>
              <h2 className="text-3xl md:text-5xl font-semibold font-display tracking-wide text-white leading-[1.12]">
                The meaning of Neidhal
              </h2>
            </div>
            {/* Right Column */}
            <div className="md:col-span-6 flex flex-col items-start gap-6 md:pt-10">
              <div className="text-[#FAF7F2]/80 text-sm md:text-base leading-relaxed font-normal space-y-6">
                <p>
                  {"Neidhal is the ancient Tamil word for the coastal land where the sea meets the shore. It is the landscape of salt in the air and sand under every step. We did not choose this name for decoration—we chose it because the shore is exactly where our game began."}
                </p>
                <p>
                  {"In 2016, we started training youth along the ECR shoreline with just a football and the open sea breeze. We believe football should be played with street-style touch, barefoot agility, and individual decision-making."}
                </p>
              </div>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-sand hover:text-white transition-colors group cursor-pointer self-start"
              >
                <span>Read Our Story</span>
                <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Cinematic Preloader */}
      {mounted && showLoader && (
        <Preloader isLoaded={isLoaded} progressPercent={progressPercent} onComplete={handlePreloaderComplete} />
      )}
    </section>
  );
};

export default Hero;
