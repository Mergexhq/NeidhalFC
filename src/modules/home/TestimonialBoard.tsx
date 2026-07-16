"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import Image from "next/image";

const TESTIMONIALS = [
  {
    quote: "Neidhal FC is an exceptional football academy that has made a significant impact on my 6 and-a-half year old son's development in the sport. Their dedication, knowledge, and passion for coaching are truly inspiring. They offer a unique training experience.",
    parent: "Dheeban M",
    role: "Kottivakkam Center",
    stars: 5,
  },
  {
    quote: "My son started his football journey here.. its been 8 months now and im able to see good improvement in his way of playing and had to mention the coach team is amazing and kids friendly that the kids completely enjoy the session everytime.",
    parent: "Keetz Subash",
    role: "Kottivakkam Center",
    stars: 5,
  },
  {
    quote: "My grandson looks forward to coming for football coaching classes. He enjoys it and I personally feel it is a good decision to have enrolled him at Neidhal football club.",
    parent: "Ranjini Jayaraman",
    role: "Kottivakkam Center",
    stars: 5,
  },
  {
    quote: "Appreciate the response and immediate attention been given on our needs. Kids thoroughly enjoy being a part of Neidhal Football Club... looking forward for more memorable moments with them Keep it up .",
    parent: "Adline Ady",
    role: "Kottivakkam Center",
    stars: 5,
  },
  {
    quote: "Very good coaching and a great atmosphere for learning football. The training drills are professional and help players improve quickly. Happy to see young talents developing here.",
    parent: "Aisha Rizwan",
    role: "Nandanam Center",
    stars: 5,
  },
  {
    quote: "Amazing football academy! The coaches are very knowledgeable and give personal attention to every player. Training sessions are well structured and focus on fitness, technique, and game understanding. Perfect place for kids to develop their football talent.",
    parent: "Rajesh Kumar",
    role: "Injambakkam Center",
    stars: 5,
  },
];

export const TestimonialBoard: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);

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
    <section className="bg-transparent px-4 pt-24 pb-2 md:px-6 md:pt-36 md:pb-3 relative overflow-hidden">
      {/* Cinematic Rounded Testimonial Box */}
      <div ref={containerRef} className="relative w-full min-h-[50vh] md:min-h-[520px] rounded-3xl bg-primary text-white py-10 md:py-14 flex flex-col items-center justify-center overflow-hidden border border-white/5">

        {/* Background visual image with smooth parallax */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            style={{
              y,
              position: "absolute",
              top: "-15%",
              bottom: "-15%",
              left: 0,
              right: 0,
              width: "100%",
              height: "130%",
            }}
          >
            <Image
              src="/images/neidhal testimonial.jpg"
              alt="Coastal football training background"
              fill
              className="object-cover pointer-events-none select-none"
              priority
            />
          </motion.div>
          {/* Mild black overlay to optimize text contrast and match reference image */}
          <div className="absolute inset-0 bg-black/65 backdrop-blur-[2.5px] pointer-events-none z-[1]" />
        </div>

        <div className="relative z-10 w-full flex flex-col items-center">

          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 md:mb-10 px-6">
            <h2 className="font-raleway font-semibold text-white uppercase tracking-tight leading-none text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-center">
              Voices of Neidhal FC
            </h2>
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
                  <div className="h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl py-8 px-4 md:py-10 md:px-5 flex flex-col justify-between hover:bg-white/10 hover:border-white/20 transition-all duration-300 shadow-xl min-h-[350px] text-left">
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
              className="h-12 w-12 rounded-full border border-white/20 bg-white/5 text-white flex items-center justify-center hover:scale-105 active:scale-95 hover:bg-white/10 transition-all cursor-pointer shadow-md shrink-0"
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
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeDotIndex === idx ? "w-6 bg-sand" : "w-2 bg-white/30 hover:bg-white/50"
                      }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                );
              })}
            </div>

            <button
              onClick={handleNext}
              className="h-12 w-12 rounded-full border border-white/20 bg-white/5 text-white flex items-center justify-center hover:scale-105 active:scale-95 hover:bg-white/10 transition-all cursor-pointer shadow-md shrink-0"
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
