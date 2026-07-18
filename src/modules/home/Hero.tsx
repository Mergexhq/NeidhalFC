"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/layout/Navbar";
import "@/styles/home-hero.css";

// Register GSAP ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 241;

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  // Preload frames on mount
  useEffect(() => {
    const isMob = window.innerWidth < 768;
    setIsMobileDevice(isMob);

    let loaded = 0;
    const loadedImages: HTMLImageElement[] = [];

    const handleImageLoad = () => {
      loaded++;
      if (loaded === TOTAL_FRAMES) {
        setIsLoaded(true);
      }
    };

    const handleImageError = (e: Event | string) => {
      console.error("Failed to load frame:", e);
      // Count as loaded anyway to prevent getting stuck in loading screen
      loaded++;
      if (loaded === TOTAL_FRAMES) {
        setIsLoaded(true);
      }
    };

    // Preload all frames from the device-specific directory (mobile or desktop)
    const deviceType = isMob ? "mobile" : "desktop";
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/hero/${deviceType}/frame_${String(i).padStart(4, "0")}.webp`;
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
      loadedImages.push(img);
    }

    setImages(loadedImages);
  }, []);

  // Helper to draw a specific frame to the canvas
  const drawSingleImage = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    img: HTMLImageElement
  ) => {
    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth = canvas.width;
    let drawHeight = canvas.height;
    let offsetX = 0;
    let offsetY = 0;

    if (imgRatio > canvasRatio) {
      drawWidth = canvas.height * imgRatio;
      offsetX = (canvas.width - drawWidth) / 2;
    } else {
      drawHeight = canvas.width / imgRatio;
      offsetY = (canvas.height - drawHeight) / 2;
    }

    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
  };

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0 || !images[index]) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSingleImage(ctx, canvas, images[index]);
  };

  // Cross-fades between the custom 1st frame and the video's start frame during initial scroll progress
  const drawFrameMapped = (progress: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const fadeLimit = 0.15; // The first 15% of scroll progress is dedicated to the cross-fade

    if (progress <= fadeLimit) {
      const alpha = progress / fadeLimit;

      // Draw the static custom frame (index 0) at full opacity
      if (images[0]) {
        drawSingleImage(ctx, canvas, images[0]);
      }

      // Cross-fade the video starting frame (index 1) on top
      if (images[1]) {
        ctx.globalAlpha = alpha;
        drawSingleImage(ctx, canvas, images[1]);
        ctx.globalAlpha = 1.0;
      }
    } else {
      // Scale remaining progress to play the video (index 1 to 192)
      const videoProgress = (progress - fadeLimit) / (1 - fadeLimit);
      const frameIndex = Math.min(
        TOTAL_FRAMES - 1,
        Math.max(1, Math.round(1 + videoProgress * (TOTAL_FRAMES - 2)))
      );

      if (images[frameIndex]) {
        drawSingleImage(ctx, canvas, images[frameIndex]);
      }
    }
  };

  // Staggered text delays on initial load
  useEffect(() => {
    const items = containerRef.current?.querySelectorAll(".hh-animate");
    items?.forEach((el, i) => {
      (el as HTMLElement).style.animationDelay = `${0.1 + i * 0.15}s`;
    });
  }, []);

  // Run scroll animation when images are fully preloaded
  useGSAP(
    () => {
      if (!isLoaded || images.length === 0 || !canvasRef.current) return;

      // Draw the first frame immediately
      drawFrameMapped(0);

      const animObj = { progress: 0 };

      // Create main GSAP timeline linked to page scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=600%",
          pin: heroRef.current,
          scrub: 0.8, // Smooth interpolation (increased for slow-mo and buttery feel)
          anticipatePin: 1,
          refreshPriority: 1,       // Processed FIRST - spacer committed before CoachSection refresh
          invalidateOnRefresh: true,
        },
      });

      // 1. Smoothly transition progress across the entire timeline (0% -> 100%)
      tl.to(
        animObj,
        {
          progress: 1.0,
          ease: "none",
          duration: 1.0,
          onUpdate: () => {
            drawFrameMapped(animObj.progress);
          },
        },
        0
      );

      // 2. Stage 1 Elements (Eyebrow, Title, Sub, CTA) fade out sequentially (20% -> 40%)
      tl.to(
        eyebrowRef.current,
        {
          y: -25,
          opacity: 0,
          duration: 0.08,
          ease: "power1.inOut",
        },
        0.18
      );

      tl.to(
        headingRef.current,
        {
          y: -35,
          opacity: 0,
          duration: 0.1,
          ease: "power1.inOut",
        },
        0.22
      );

      tl.to(
        subRef.current,
        {
          y: -25,
          opacity: 0,
          duration: 0.08,
          ease: "power1.inOut",
        },
        0.26
      );

      tl.to(
        actionsRef.current,
        {
          y: -20,
          opacity: 0,
          duration: 0.08,
          ease: "power1.inOut",
        },
        0.28
      );

      // Fade out and disable the entire content block
      tl.to(
        contentRef.current,
        {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.15,
          ease: "power1.inOut",
        },
        0.35
      );
    },
    { scope: containerRef, dependencies: [isLoaded, images] }
  );

  return (
    <section ref={containerRef} className="home-hero-scroll-wrapper">
      {/* Pinned Hero Card Container */}
      <div ref={heroRef} className="home-hero">
        <Navbar disableDock={true} forceWhiteText={true} />

        {/* Dynamic Background Canvas Layer */}
        <canvas
          ref={canvasRef}
          width={isMobileDevice ? 720 : 1920}
          height={isMobileDevice ? 1280 : 1080}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: isMobileDevice ? "center" : "center top",
            backgroundImage: `url('/hero/${isMobileDevice ? "mobile" : "desktop"}/frame_0001.webp')`,
            backgroundSize: "cover",
            backgroundPosition: isMobileDevice ? "center" : "center top",
          }}
          className="z-0"
        />

        {/* Stage 1: Pinned Hero Title/Intro Content */}
        <div ref={contentRef} className="hh-content">
          <div className="hh-top-content">
            {/* Pinned animation ref preserved inside empty div */}
            <div ref={eyebrowRef} />
            <div ref={headingRef} />
          </div>

          <div>
            <div ref={subRef} />

            <div ref={actionsRef} />
          </div>
        </div>
      </div>

    </section>
  );
};

export default Hero;
