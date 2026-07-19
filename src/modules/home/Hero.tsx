"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/layout/Navbar";
import { DiaText } from "@/components/ui/dia-text";
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
  const story1Ref = useRef<HTMLDivElement>(null);
  const story2Ref = useRef<HTMLDivElement>(null);
  const story3Ref = useRef<HTMLDivElement>(null);
  const story4Ref = useRef<HTMLDivElement>(null);

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

      // 2. Stage 1 Elements (Title, Sub, CTA) fade out in sync quickly (3% -> 11%)
      tl.to(
        [headingRef.current, subRef.current, actionsRef.current],
        {
          y: -30,
          opacity: 0,
          duration: 0.08,
          ease: "power1.inOut",
        },
        0.03
      );

      // Fade out and disable the entire content block (11% -> 13%)
      tl.to(
        contentRef.current,
        {
          opacity: 0,
          pointerEvents: "none",
          duration: 0.02,
          ease: "power1.inOut",
        },
        0.11
      );

      // Story Beat 1 (Left Side) — visible 0.15→0.28, gap until 0.44
      tl.fromTo(
        story1Ref.current,
        { opacity: 0, x: -30 },
        { opacity: 1, x: 0, duration: 0.07, ease: "power1.out" },
        0.15
      );
      tl.to(
        story1Ref.current,
        { opacity: 0, x: 30, duration: 0.07, ease: "power1.in" },
        0.28
      );

      // Story Beat 2 (Right Side) — visible 0.44→0.55, gap until 0.70
      tl.fromTo(
        story2Ref.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.07, ease: "power1.out" },
        0.44
      );
      tl.to(
        story2Ref.current,
        { opacity: 0, x: -30, duration: 0.07, ease: "power1.in" },
        0.55
      );

      // Story Beat 3 (Center Bottom) — visible 0.76→0.85, gap until 0.92
      tl.fromTo(
        story3Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.07, ease: "power1.out" },
        0.76
      );
      tl.to(
        story3Ref.current,
        { opacity: 0, y: -30, duration: 0.07, ease: "power1.in" },
        0.85
      );

      // Story Beat 4 (Conclusion) — visible 0.92→1.00
      tl.fromTo(
        story4Ref.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.07, ease: "power1.out" },
        0.92
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
            <div ref={eyebrowRef} className="hidden" />
            <h1 ref={headingRef} className="hh-heading">
              <span className="hh-heading-line hh-animate">
                <DiaText
                  text="Bring the Soul"
                  colors={["#0B1F3A", "#C5A880", "#005f73", "#e9d8a6", "#0B1F3A"]}
                  textColor="#0B1F3A"
                  duration={1.2}
                  delay={0.1}
                />
              </span>
              <span className="hh-heading-accent hh-animate">
                <DiaText
                  text="Back to Football."
                  colors={["#0B1F3A", "#C5A880", "#005f73", "#e9d8a6", "#0B1F3A"]}
                  textColor="#0B1F3A"
                  duration={1.2}
                  delay={0.4}
                />
              </span>
            </h1>
          </div>

          <div>
            <div ref={subRef}>
              <p className="hh-sub hh-animate">
                <DiaText
                  text="We develop fearless, creative players who play with freedom and flair. Combining Chennai's street-style beach spirit with structured coaching."
                  colors={["#0B1F3A", "#C5A880", "#005f73", "#e9d8a6", "#0B1F3A"]}
                  textColor="#0B1F3A"
                  duration={1.8}
                  delay={0.8}
                />
              </p>
            </div>

            <div ref={actionsRef} className="hh-actions hh-animate flex items-center gap-3 mt-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-white text-[#0B1F3A] hover:bg-[#FAF7F2] font-sans font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                Join Our Club Today
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center w-11 h-11 rounded-full bg-white text-[#0B1F3A] hover:bg-[#FAF7F2] transition-all duration-300 shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Storytelling Captions */}
        <div ref={story1Ref} className="story-caption story-left">
          <h3>Preserving the Art of the Game</h3>
          <p>We reject robotic repetition. On the shoreline, players learn to improvise, express themselves, and make their own decisions.</p>
        </div>

        <div ref={story2Ref} className="story-caption story-right">
          <h3>Confidence in 1v1 Situations</h3>
          <p>Training on the sand builds explosive power and street-style touch. We teach players to dare, to fail, and to stand out.</p>
        </div>

        <div ref={story3Ref} className="story-caption story-center-bottom">
          <h3>Playing with Flair and Freedom</h3>
          <p>Every shot is an expression of individuality, not just a system-driven instruction.</p>
        </div>

        <div ref={story4Ref} className="story-caption story-conclusion">
          <h3>Making People Fall in Love with Football</h3>
          <p>We train the players Chennai has been waiting for. Welcome to Neidhal FC.</p>
        </div>
      </div>

    </section>
  );
};

export default Hero;
