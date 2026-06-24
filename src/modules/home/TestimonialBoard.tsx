"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";

const TESTIMONIALS = [
  {
    quote: "My son's technical growth exploded after we switched to Neidhal FC. The 2:1 ratio is a game changer—the assistant coach corrects his body shape and touch while the main coach handles the play structure. He's playing with a level of confidence I've never seen before.",
    parent: "Arun Krishnan",
    role: "Parent of U12 Player (Kottivakkam Center)",
    stars: 5,
  },
  {
    quote: "Unlike other Chennai academies that prioritize winning local matches by playing long balls, Neidhal FC forces the kids to keep the ball on the ground, take players on 1v1, and play with authentic flair. It is a breath of fresh air.",
    parent: "Dr. Deepa Rajan",
    role: "Parent of U9 Player (YMCA Nandanam)",
    stars: 5,
  },
  {
    quote: "Their beach roots training on ECR is incredible. Playing on sand developed my daughter's physical strength, balance, and quick feet. She looks forward to every session, and the community of parents here is extremely supportive.",
    parent: "Suresh Mukund",
    role: "Parent of U14 Player (Injambakkam Center)",
    stars: 5,
  },
  {
    quote: "The individual attention at Neidhal FC is unlike any other club in Chennai. My daughter has learned to make smart technical decisions under pressure. They don't just teach football; they nurture intelligence on the field.",
    parent: "Priya Sundar",
    role: "Parent of U10 Player (Kottivakkam Center)",
    stars: 5,
  },
  {
    quote: "We chose Neidhal FC because we wanted our son to learn structured football without losing his natural style. The focus on street-style touch, barefoot agility, and creative play has been absolutely fantastic.",
    parent: "Karthik Chander",
    role: "Parent of U13 Player (YMCA Nandanam)",
    stars: 5,
  },
  {
    quote: "My 8-year-old daughter used to be shy during matches, but the positive reinforcement from coaches Pradeep and Vijay has transformed her. She now demands the ball and plays with zero fear.",
    parent: "Meera Sen",
    role: "Parent of U8 Player (Injambakkam Center)",
    stars: 5,
  },
];

export const TestimonialBoard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(TESTIMONIALS.length);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const [isTransitionEnabled, setIsTransitionEnabled] = useState(true);

  // We duplicate the testimonials array to allow seamless scrolling
  const extendedItems = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  // Handle responsive layout to decide visible cards count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setCardsPerPage(1);
      } else if (window.innerWidth < 1024) {
        setCardsPerPage(2);
      } else {
        setCardsPerPage(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Seamless jump to center copies once transition completes
  useEffect(() => {
    // If scrolled past the second set (scrolling forward)
    if (currentIndex >= TESTIMONIALS.length * 2) {
      const timer = setTimeout(() => {
        setIsTransitionEnabled(false);
        setCurrentIndex(currentIndex - TESTIMONIALS.length);
      }, 1200); // match transition duration (1200ms)
      return () => clearTimeout(timer);
    }
    // If scrolled past the first set (scrolling backward)
    if (currentIndex < TESTIMONIALS.length) {
      const timer = setTimeout(() => {
        setIsTransitionEnabled(false);
        setCurrentIndex(currentIndex + TESTIMONIALS.length);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  // Re-enable transition on the next paint tick
  useEffect(() => {
    if (!isTransitionEnabled) {
      const raf = requestAnimationFrame(() => {
        setIsTransitionEnabled(true);
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [isTransitionEnabled]);

  // Very slow auto scroll effect (every 10 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitionEnabled(true);
      setCurrentIndex((prev) => prev + 1);
    }, 10000); 
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setIsTransitionEnabled(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    setIsTransitionEnabled(true);
    setCurrentIndex((prev) => prev + 1);
  };

  return (
    <section className="bg-[#FAF7F2] px-4 py-4 md:px-6 md:py-6 relative overflow-hidden">
      {/* Cinematic Rounded Testimonial Box */}
      <div className="relative w-full min-h-[70vh] rounded-[2.5rem] bg-primary text-white py-20 flex flex-col items-center justify-center overflow-hidden border border-white/5">
        
        {/* Background visual image matching reference */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/neidhal testimonial.jpg"
            alt="Coastal football training background"
            fill
            className="object-cover pointer-events-none select-none"
            priority
          />
          {/* Mild black overlay to optimize text contrast and match reference image */}
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[2.5px] pointer-events-none" />
        </div>

        <div className="relative z-10 w-full flex flex-col items-center">
          
          {/* Header - Kept centered */}
          <div className="text-center max-w-3xl mx-auto mb-16 px-6">
            <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-sand mb-4 block">
              Chapter 2: The Voices
            </span>
            <h2 className="text-4xl md:text-5xl font-semibold text-white font-display tracking-wide leading-tight">
              Trusted by Chennai Parents
            </h2>
            <p className="text-slate-300/80 font-normal text-xs md:text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              Read stories of how our dual-coach development system and coastal roots have transformed kids' technical and personal growth.
            </p>
          </div>

          {/* Carousel Viewport Container - Edge-to-Edge with no padding */}
          <div className="relative overflow-hidden w-full px-0">
            {/* Card slider track */}
            <div 
              className={`flex gap-6 ${isTransitionEnabled ? "transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,1,0.5,1)]" : ""}`}
              style={{
                transform: `translateX(-${currentIndex * (100 / extendedItems.length)}%)`,
                width: `${(extendedItems.length / cardsPerPage) * 100}%`
              }}
            >
              {extendedItems.map((t, idx) => (
                <div 
                  key={idx} 
                  style={{ width: `calc(${100 / extendedItems.length}% - ${(24 * (cardsPerPage - 1)) / cardsPerPage}px)` }}
                  className="shrink-0"
                >
                  {/* Premium Glassmorphic Card matching mockup */}
                  <div className="h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl py-8 px-4 md:py-10 md:px-5 flex flex-col justify-between hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-xl min-h-[350px] text-left">
                    <div>
                      {/* 5-Star Rating stack matching the mockup */}
                      <div className="flex gap-1.5 mb-4 text-[#FFF] pl-1">
                        {[...Array(t.stars)].map((_, i) => (
                          <Star key={i} size={14} className="fill-current text-white" />
                        ))}
                      </div>

                      {/* Parent Name directly below stars */}
                      <h3 className="font-sans font-semibold text-xl text-white mb-5 pl-1">
                        {t.parent}
                      </h3>

                      {/* Testimonial Quote text - removed large padding spaces on ends */}
                      <p className="text-slate-100 text-xs md:text-sm leading-relaxed font-normal mb-6 pl-1 pr-1">
                        {t.quote}
                      </p>
                    </div>

                    {/* Subtext info */}
                    <div className="border-t border-white/10 pt-4 pl-1 text-[10px] text-slate-300 font-medium tracking-wide uppercase">
                      {t.role}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Control Bar - Centered */}
          <div className="flex items-center justify-between w-full max-w-xs mx-auto mt-12 px-6">
            <button
              onClick={handlePrev}
              className="h-12 w-12 rounded-full border border-white/20 bg-white/5 text-white flex items-center justify-center hover:scale-105 active:scale-95 hover:bg-white/10 transition-all cursor-pointer shadow-md"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots Indicator */}
            <div className="flex gap-2">
              {[...Array(TESTIMONIALS.length)].map((_, idx) => {
                const activeDotIndex = currentIndex % TESTIMONIALS.length;
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      setIsTransitionEnabled(true);
                      setCurrentIndex(idx + TESTIMONIALS.length);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                      activeDotIndex === idx ? "w-6 bg-sand" : "w-2 bg-white/30 hover:bg-white/50"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                );
              })}
            </div>

            <button
              onClick={handleNext}
              className="h-12 w-12 rounded-full border border-white/20 bg-white/5 text-white flex items-center justify-center hover:scale-105 active:scale-95 hover:bg-white/10 transition-all cursor-pointer shadow-md"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialBoard;
