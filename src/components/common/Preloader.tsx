"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  isLoaded: boolean;
  progressPercent: number; // Kept in signature for compatibility, but we use internal premium easing
  onComplete: () => void;
}

const easeOutExpo = (x: number): number => {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
};

export const Preloader: React.FC<PreloaderProps> = ({ isLoaded, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentWord, setCurrentWord] = useState("Sea");
  const [showTagline, setShowTagline] = useState(false);
  const [taglineElapsed, setTaglineElapsed] = useState(false);
  const [shouldExit, setShouldExit] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Set mounted flag for Client-Side rendering portal
  useEffect(() => {
    setMounted(true);
  }, []);

  // 1. Simulated progress counter using easeOutExpo
  useEffect(() => {
    let startTimestamp: number | null = null;
    const duration = 2400; // 2.4 seconds to reach 100%
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const t = Math.min(elapsed / duration, 1);
      const easedT = easeOutExpo(t);
      const currentPercent = Math.floor(easedT * 100);

      setProgress(currentPercent);

      // Determine active word based on progress
      if (currentPercent < 25) {
        setCurrentWord("Sea");
      } else if (currentPercent < 50) {
        setCurrentWord("Sand");
      } else if (currentPercent < 75) {
        setCurrentWord("Football");
      } else {
        setCurrentWord("Neidhal");
      }

      if (t < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setProgress(100);
        setShowTagline(true);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // 2. Manage tagline minimum display time (0.4s)
  useEffect(() => {
    if (showTagline) {
      const timer = setTimeout(() => {
        setTaglineElapsed(true);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [showTagline]);

  // 3. Trigger exit transition once tagline display time has elapsed AND assets are loaded
  useEffect(() => {
    if (taglineElapsed && isLoaded) {
      setShouldExit(true);
    }
  }, [taglineElapsed, isLoaded]);

  const handleExitComplete = () => {
    onComplete();
  };

  const preloaderContent = (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!shouldExit && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" } 
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black select-none overflow-hidden"
        >
          {/* Subtle ambient light glow in background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(200,169,107,0.04)_0%,transparent_60%)] pointer-events-none" />

          <div className="relative flex flex-col items-center justify-center w-full max-w-lg px-4">
            
            {/* Middle slot (brand name matching screenshot styling) */}
            <h2 className="text-3xl md:text-4xl font-display text-[#F5F1E8] tracking-[0.2em] font-normal uppercase text-center leading-none select-none">
              NEIDHAL <span className="italic text-[#C8A96B] tracking-normal lowercase ml-1">fc</span>
            </h2>

            {/* Bottom area (Line + loading text OR tagline) */}
            <div className="h-20 flex flex-col items-center justify-start mt-6 w-full relative">
              <AnimatePresence mode="wait">
                {!showTagline ? (
                  <motion.div
                    key="loading-group"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center w-full"
                  >
                    {/* Thin Progress Bar */}
                    <div className="w-60 h-[1.5px] bg-white/10 relative overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full bg-[#C8A96B] transition-all duration-75 ease-out"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    {/* Small Text underneath */}
                    <span className="text-[10px] md:text-[11px] font-sans font-semibold text-[#F5F1E8]/50 tracking-[0.25em] uppercase mt-4">
                      {currentWord} &nbsp;·&nbsp; {String(progress).padStart(3, "0")}%
                    </span>
                  </motion.div>
                ) : (
                  <motion.p
                    key="tagline"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="text-lg md:text-xl font-display italic text-[#F5F1E8]/90 text-center mt-2"
                  >
                    Born by the Sea.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  if (!mounted) return null;

  return createPortal(preloaderContent, document.body);
};

export default Preloader;

