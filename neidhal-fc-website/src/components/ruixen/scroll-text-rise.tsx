"use client";

import { FC, ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollTextRiseProps {
  text: string;
  className?: string;
  /** Text size classes */
  textClassName?: string;
  /** Optional header element to display inside the pinned viewport */
  header?: ReactNode;
}

const parseWord = (word: string) => {
  let isBold = false;
  let isBeige = false;
  let isBlue = false;
  let cleanWord = word;

  if (cleanWord.includes("**")) {
    isBold = true;
    cleanWord = cleanWord.replaceAll("**", "");
  }
  if (cleanWord.includes("__")) {
    isBeige = true;
    cleanWord = cleanWord.replaceAll("__", "");
  }

  // Neidhal specific beige highlighting (strip punctuation for match)
  const plain = cleanWord.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
  if (plain === "Neidhal") {
    isBeige = true;
  }

  return { cleanWord, isBold, isBeige, isBlue };
};

const ScrollTextRise: FC<ScrollTextRiseProps> = ({
  text,
  className,
  textClassName,
  header,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Track scroll progress when the runway enters the screen
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const words = text.split(" ");

  return (
    /* Parent scroll runway */
    <div
      ref={containerRef}
      className={cn("relative h-[180vh] w-full", className)}
    >
      {/* Sticky viewport container (pinned to screen) */}
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col items-center justify-center overflow-hidden gap-10 md:gap-14 px-4">
        {header && <div className="w-full flex justify-center">{header}</div>}
        <p
          className={cn(
            "flex flex-wrap justify-center text-center leading-[1.5] tracking-tight text-[#0B1F3A] max-w-4xl px-4",
            textClassName ? textClassName : "text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light"
          )}
        >
          {words.map((word, i) => {
            const { cleanWord, isBold, isBeige, isBlue } = parseWord(word);
            const start = i / words.length;
            // Stagger reveal: each word reveals over a span of 0.08 scroll progress
            const end = Math.min(start + 0.08, 1);
            return (
              <RevealWord
                key={`${i}-${cleanWord}`}
                progress={scrollYProgress}
                range={[start, end]}
                isBold={isBold}
                isBeige={isBeige}
                isBlue={isBlue}
              >
                {cleanWord}
              </RevealWord>
            );
          })}
        </p>
      </div>
    </div>
  );
};

interface RevealWordProps {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
  isBold?: boolean;
  isBeige?: boolean;
  isBlue?: boolean;
}

const RevealWord: FC<RevealWordProps> = ({
  children,
  progress,
  range,
  isBold,
  isBeige,
  isBlue,
}) => {
  const [start, end] = range;
  
  // Custom non-extrapolating transforms to prevent words from translating out of view or fading out
  const opacity = useTransform(progress, (value) => {
    if (value < start) return 0;
    if (value > end) return 1;
    return (value - start) / (end - start);
  });

  const y = useTransform(progress, (value) => {
    if (value < start) return 12;
    if (value > end) return 0;
    const progressRatio = (value - start) / (end - start);
    return 12 - progressRatio * 12;
  });

  return (
    // inline-block relative wrapping ensures the layout bounds match and overflow clips properly
    <span className="relative inline-block mx-1 overflow-hidden lg:mx-2 xl:mx-2.5 my-0.5 align-bottom">
      {/* Ghost text underlay aligned perfectly at left-0 top-0 */}
      <span
        className={cn(
          "absolute left-0 top-0 select-none pointer-events-none text-center w-full h-full",
          isBold
            ? "text-[#0B1F3A]/20 font-bold"
            : isBeige
            ? "text-[#BCA688]/30 font-bold"
            : "text-[#0B1F3A]/15 font-light"
        )}
      >
        {children}
      </span>
      {/* Active revealed text */}
      <motion.span
        style={{ opacity, y }}
        className={cn(
          "block text-center w-full",
          isBold
            ? "text-[#0B1F3A] font-bold"
            : isBeige
            ? "text-[#BCA688] font-bold"
            : "text-[#0B1F3A] font-light"
        )}
      >
        {children}
      </motion.span>
    </span>
  );
};

export { ScrollTextRise };
