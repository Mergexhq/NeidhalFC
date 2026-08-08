"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 97;

export const LocationsScrollAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  // Preload frames
  useEffect(() => {
    let loaded = 0;
    const loadedImages: HTMLImageElement[] = [];

    const handleImageLoad = () => {
      loaded++;
      if (loaded === TOTAL_FRAMES) {
        setIsLoaded(true);
      }
    };

    const handleImageError = () => {
      // Prevent hanging on error
      loaded++;
      if (loaded === TOTAL_FRAMES) {
        setIsLoaded(true);
      }
    };

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/images/locations/scroll/frame_${String(i).padStart(4, "0")}.webp`;
      img.onload = handleImageLoad;
      img.onerror = handleImageError;
      loadedImages.push(img);
    }

    setImages(loadedImages);
  }, []);

  // Draw frame on canvas
  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0 || !images[index]) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(images[index], 0, 0, canvas.width, canvas.height);
  };

  // Trigger drawing when loaded
  useEffect(() => {
    if (isLoaded && images.length > 0) {
      drawFrame(0);
    }
  }, [isLoaded, images]);

  // GSAP ScrollTrigger to scrub frames
  useGSAP(
    () => {
      if (!isLoaded || images.length === 0 || !canvasRef.current) return;

      const animObj = { frame: 0 };

      gsap.to(animObj, {
        frame: TOTAL_FRAMES - 1,
        roundProps: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=120%",
          pin: true,
          scrub: 0.5,
          onUpdate: (self) => {
            drawFrame(animObj.frame);
            setProgress(self.progress);
          },
        },
      });
    },
    { scope: triggerRef, dependencies: [isLoaded, images] }
  );

  return (
    <div ref={triggerRef} className="w-full relative bg-[#FAF7F2]">
      {/* Pinned scroll area acting as the Hero */}
      <div ref={containerRef} className="w-full h-screen flex flex-col justify-center items-center pt-20 md:pt-28 pb-16 md:pb-12 px-6 overflow-hidden relative">
        <Navbar />
        
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary-light)/5,_transparent_70%)] pointer-events-none z-0" />

        {/* Subtle background graphics/text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
          <span className="text-[10vw] font-raleway font-black uppercase tracking-tighter leading-none text-[#0B1F3A]/3 opacity-5">
            TRAINING HUB
          </span>
        </div>

        {/* Hero Text Block at the top */}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center gap-3 sm:gap-4 text-center mt-2 md:mt-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-display font-medium text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-[#0B1F3A] uppercase tracking-tight leading-none whitespace-nowrap"
          >
            Find Your Training Hub.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-[#0B1F3A]/70 font-sans text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed max-w-3xl"
          >
            Three coastal training hubs across South Chennai ECR - where football meets the sea. Designed for elite player development.
          </motion.p>
        </div>

        {/* Dynamic canvas in the middle */}
        <div className="relative z-10 w-full max-w-4xl aspect-video bg-transparent flex justify-center items-center mt-4 sm:mt-6 md:mt-[-12vh] mb-2 md:mb-[-12vh]">
          {!isLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-2 border-[#0B1F3A]/20 border-t-[#0B1F3A] rounded-full animate-spin" />
              <span className="text-xs uppercase tracking-widest text-[#0B1F3A]/60 font-sans font-medium">
                Loading Illustration...
              </span>
            </div>
          )}
          
          <canvas
            ref={canvasRef}
            width={640}
            height={360}
            className="w-full h-auto max-h-[55vh] object-contain transition-opacity duration-500"
            style={{ 
              opacity: isLoaded ? 1 : 0,
            }}
          />
        </div>

        {/* Scroll indicator overlay at the bottom */}
        <div className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 pointer-events-none">
          <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-[#0B1F3A]/40">
            Scroll to explore
          </span>
          <div className="w-[1px] h-6 bg-gradient-to-b from-[#0B1F3A]/40 to-transparent relative overflow-hidden">
            <div 
              className="absolute top-0 left-0 w-full bg-[#0B1F3A]" 
              style={{ 
                height: `${progress * 100}%`,
                transition: "height 0.1s ease-out"
              }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationsScrollAnimation;
