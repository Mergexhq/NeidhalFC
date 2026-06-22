"use client";

import React, { useEffect, useRef, useState } from "react";
import { Award, Users, Sparkles } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// Hero v2 frames: 0165 → 0241 = 77 frames
const START_FRAME = 165;
const END_FRAME = 241;
const TOTAL_FRAMES = END_FRAME - START_FRAME + 1; // 77

const padFrame = (n: number) => String(n).padStart(4, "0");

export const NeidhalStandard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload frames
  useEffect(() => {
    let loaded = 0;
    const loadedImages: HTMLImageElement[] = [];

    const handleLoad = () => {
      loaded++;
      if (loaded === TOTAL_FRAMES) setIsLoaded(true);
    };

    for (let i = START_FRAME; i <= END_FRAME; i++) {
      const img = new Image();
      img.src = `/hero v2/frame_${padFrame(i)}.webp`;
      img.onload = handleLoad;
      img.onerror = handleLoad;
      loadedImages.push(img);
    }

    setImages(loadedImages);
  }, []);

  const drawFrame = (index: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !images[index]) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(images[index], 0, 0, 1920, 1080);
  };

  useGSAP(() => {
    if (!isLoaded || images.length === 0) return;

    drawFrame(0);

    const frameObj = { val: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.1,
      },
    });

    // Frame playback across entire scroll range
    tl.to(
      frameObj,
      {
        val: TOTAL_FRAMES - 1,
        roundProps: "val",
        ease: "none",
        onUpdate: () => drawFrame(frameObj.val),
      },
      0
    );

    // Canvas fades in during first part of scroll (from 0 to 0.05)
    tl.fromTo(
      canvasRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.05, ease: "power1.inOut" },
      0
    );

    // Canvas fades out during last part of scroll (from 0.95 to 1.0)
    tl.to(
      canvasRef.current,
      { opacity: 0, duration: 0.05, ease: "power1.inOut" },
      0.95
    );

    // Text fades in during first part of scroll (from 0.03 to 0.08)
    tl.fromTo(
      ".ns-text",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.05, ease: "power2.out" },
      0.03
    );

    // Text fades out during last part of scroll (from 0.9 to 0.95)
    tl.to(
      ".ns-text",
      { opacity: 0, y: -40, duration: 0.05, ease: "power2.in" },
      0.9
    );

  }, { scope: containerRef, dependencies: [isLoaded, images] });

  return (
    <section
      ref={containerRef}
      className="relative h-[400vh] w-full bg-black"
      style={{ zIndex: 9 }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Canvas — no overlays, pure video feel */}
        <canvas
          ref={canvasRef}
          width={1920}
          height={1080}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            backgroundImage: `url('/hero v2/frame_${padFrame(START_FRAME)}.webp')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0,
          }}
          className="z-0"
        />

        {/* Very subtle black veil — only enough to make right-side text legible */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none z-[1]" />

        {/* Right-side text panel */}
        <div className="ns-text absolute inset-0 z-10 flex items-center justify-end px-4 sm:px-8 md:px-16 lg:px-24">
          <div className="w-full max-w-lg bg-black/65 backdrop-blur-lg border border-white/10 p-6 sm:p-8 md:p-10 rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl">

            {/* Label */}
            <span className="text-[10px] uppercase tracking-widest font-extrabold text-sand flex items-center gap-1.5 mb-4">
              <Sparkles size={12} />
              The Ratio
            </span>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl font-semibold font-display tracking-wide leading-tight text-white mb-4">
              Two Coaches.<br />
              Every Session.
            </h2>

            {/* Stat badge */}
            <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-xl mb-6">
              <span className="font-condensed font-black text-xl leading-none text-sand">2:1 RATIO</span>
              <div className="w-[1px] h-3.5 bg-white/20" />
              <span className="text-[9px] uppercase tracking-widest font-bold text-white/60">
                Lead + Assistant Coach
              </span>
            </div>

            {/* Body text */}
            <div className="text-white/70 text-sm leading-relaxed space-y-4 mb-6">
              <p>
                Every pod session at Neidhal FC is run with two coaches: one licensed lead coach designing technical drills, and one assistant coach tracking touches and delivering real-time corrections. No exceptions.
              </p>
              <p>
                We refuse to pack 30 players under a single coach. This structured setup guarantees that your child is seen, supported, and guided through every individual touch.
              </p>
            </div>

            {/* Feature row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 border-t border-white/10 pt-6">
              <div className="flex gap-3">
                <div className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 text-sand flex items-center justify-center shrink-0">
                  <Users size={16} />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs text-white uppercase tracking-wider">Strict 2:1 Ratio</h4>
                  <p className="text-white/45 text-xs mt-1 leading-relaxed">No child is lost in the crowd.</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="h-9 w-9 rounded-lg bg-white/5 border border-white/10 text-sand flex items-center justify-center shrink-0">
                  <Award size={16} />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs text-white uppercase tracking-wider">Licensed Pedigree</h4>
                  <p className="text-white/45 text-xs mt-1 leading-relaxed">Active AFC & AIFF licensing.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default NeidhalStandard;
