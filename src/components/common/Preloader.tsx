"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NumberTicker from "@/components/fancy/text/basic-number-ticker";

interface PreloaderProps {
  isLoaded: boolean;
  progressPercent: number; // Kept in signature for compatibility
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ isLoaded, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [tickerDone, setTickerDone] = useState(false);
  const [shouldExit, setShouldExit] = useState(false);

  const handleUpdate = (latest: number) => {
    setProgress(Math.round(latest));
  };

  const handleTickerComplete = () => {
    setProgress(100);
    setTickerDone(true);
  };

  // 1. Trigger exit transition once ticker completes AND assets are loaded
  useEffect(() => {
    if (tickerDone && isLoaded) {
      setShouldExit(true);
    }
  }, [tickerDone, isLoaded]);

  // 2. Lock background scrolling when preloader is active
  useEffect(() => {
    if (!shouldExit) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [shouldExit]);

  const handleExitComplete = () => {
    onComplete();
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!shouldExit && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.5, ease: "easeInOut" } 
          }}
          className="preloader-overlay fixed inset-0 z-[100] bg-white select-none overflow-hidden"
        >
          {/* Background Video */}
          <motion.video
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0"
          >
            <source src="/preloader.mp4" type="video/mp4" />
          </motion.video>

          {/* Left Bottom Slot (Loader Counter) */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            className="absolute bottom-10 left-10 md:bottom-16 md:left-16 z-10 flex items-baseline text-black font-sans font-extralight tracking-tight select-none"
          >
            <NumberTicker
              from={0}
              target={100}
              autoStart={true}
              transition={{ duration: 2.4, type: "tween", ease: "easeInOut" }}
              onUpdate={handleUpdate}
              onComplete={handleTickerComplete}
              format={(val) => String(val).padStart(3, "0")}
              className="text-6xl sm:text-7xl md:text-8xl font-display font-light text-black"
            />
            <span className="text-xl sm:text-2xl md:text-3xl text-black/60 ml-2 font-light">%</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
