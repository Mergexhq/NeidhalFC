"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useVelocity,
  useAnimationFrame,
  useTransform,
} from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Carousel,
  Slider,
  SliderContainer,
  SliderPrevButton,
  SliderNextButton,
  SliderSnapDisplay,
  useCarousel,
} from "@/components/ui/carousel";
import type { EmblaOptionsType } from "embla-carousel";
import Autoplay from "embla-carousel-autoplay";
import { BlurVignette, BlurVignetteArticle } from "@/components/ui/blur-vignette";
import { RevealText } from "@/components/ui/reveal-text";

// ─── IMAGE DATA ───────────────────────────────────────────────────────────────
// portrait = true means the image is taller than wide (2:3 ratio)
type GalleryImage = {
  src: string;
  portrait: boolean;
};

const ALL_IMAGES: GalleryImage[] = [
  { src: "/images/gallery/gallery-01.webp",   portrait: false },
  { src: "/images/gallery/gallery-02-r.webp", portrait: true  },
  { src: "/images/gallery/gallery-03-r.webp", portrait: true  },
  { src: "/images/gallery/gallery-04.webp",   portrait: false },
  { src: "/images/gallery/gallery-05-r.webp", portrait: true  },
  { src: "/images/gallery/gallery-06.webp",   portrait: false },
  { src: "/images/gallery/gallery-07-r.webp", portrait: true  },
  { src: "/images/gallery/gallery-08.webp",   portrait: false },
  { src: "/images/gallery/gallery-09.webp",   portrait: false },
  { src: "/images/gallery/gallery-10.webp",   portrait: true  },
  { src: "/images/gallery/gallery-11.webp",   portrait: true  },
  { src: "/images/gallery/gallery-12.webp",   portrait: false },
  { src: "/images/gallery/gallery-13.webp",   portrait: false },
];

// ─── GROUP IMAGES INTO SLIDES ──────────────────────────────────────────────
// Pair consecutive portraits together; leave landscape as solo slides.
type Slide = GalleryImage[]; // 1 or 2 items

function buildSlides(images: GalleryImage[]): Slide[] {
  const slides: Slide[] = [];
  let i = 0;
  while (i < images.length) {
    if (images[i].portrait && i + 1 < images.length && images[i + 1].portrait) {
      slides.push([images[i], images[i + 1]]);
      i += 2;
    } else {
      slides.push([images[i]]);
      i += 1;
    }
  }
  return slides;
}

const SLIDES = buildSlides(ALL_IMAGES);

// MOBILE marquee widths / aspect ratios
const ROW_WIDTHS = [
  "w-36","w-44","w-32","w-52","w-40","w-36","w-48","w-36","w-56","w-44","w-32","w-48","w-40",
];
const ASPECT_RATIOS = [
  "4/3","2/3","1/1","3/4","3/2","1/1","2/3","2/1","4/3","1.5/1","2.5/3","16/9","3/4",
];
const MOBILE_IMAGES = ALL_IMAGES.map((g) => g.src);

// ─── MOBILE VELOCITY ROW ──────────────────────────────────────────────────────
type VelocityRowProps = {
  images: string[];
  baseVelocity?: number;
  widthOffset?: number;
  ratioOffset?: number;
};

function VelocityRow({ images, baseVelocity = -2, widthOffset = 0, ratioOffset = 0 }: VelocityRowProps) {
  const scrollY = useMotionValue(0);
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });

  const x = useMotionValue(0);
  const directionFactor = useRef(1);
  const stripRef = useRef<HTMLDivElement>(null);
  const [stripWidth, setStripWidth] = useState(0);

  useEffect(() => {
    const onScroll = () => scrollY.set(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollY]);

  useEffect(() => {
    if (stripRef.current) setStripWidth(stripRef.current.scrollWidth / 2);
  }, []);

  useAnimationFrame((_, delta) => {
    const moveBy = directionFactor.current * baseVelocity * (delta / 16);
    if (velocityFactor.get() < 0) directionFactor.current = -1;
    else if (velocityFactor.get() > 0) directionFactor.current = 1;
    const extra = directionFactor.current * moveBy * Math.abs(velocityFactor.get());
    const newX = x.get() + moveBy + extra;
    x.set(stripWidth ? ((newX % stripWidth) - stripWidth) % -stripWidth : newX);
  });

  const skewX = useSpring(useMotionValue(0));
  useEffect(() => {
    return smoothVelocity.on("change", (latest) => {
      skewX.set(Math.min(Math.max(latest / 125, -4), 4));
    });
  }, [smoothVelocity, skewX]);

  const doubled = [...images, ...images];

  return (
    <div className="overflow-hidden">
      <motion.div
        ref={stripRef}
        className="flex gap-2"
        style={{ x, skewX, width: "max-content" }}
      >
        {doubled.map((src, i) => {
          const widthClass = ROW_WIDTHS[(i + widthOffset) % ROW_WIDTHS.length];
          const ratio = ASPECT_RATIOS[(i + ratioOffset) % ASPECT_RATIOS.length];
          return (
            <div
              key={"vel-" + i}
              className={`${widthClass} shrink-0 overflow-hidden rounded-lg border border-black/5 shadow-sm bg-slate-100`}
              style={{ aspectRatio: ratio }}
            >
              <Image
                src={src}
                alt="Neidhal FC training"
                width={240}
                height={180}
                className="w-full h-full object-cover"
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

// ─── CUSTOM VERTICAL THUMBS PANEL ────────────────────────────────────────────
function ThumbsPanel() {
  const { selectedIndex, onThumbClick } = useCarousel();

  return (
    <div className="w-24 shrink-0 overflow-hidden h-[600px]">
      <div className="flex flex-col gap-3 h-full py-1 overflow-y-auto scrollbar-none">
        {SLIDES.map((slide, idx) => {
          const active = selectedIndex === idx;
          const isPair = slide.length === 2;

          return (
            <button
              key={idx}
              type="button"
              onClick={() => onThumbClick(idx)}
              className={[
                "shrink-0 w-full rounded-xl overflow-hidden border-2 transition-all duration-200 cursor-pointer",
                isPair ? "h-16" : "h-16",
                active
                  ? "border-[#0B1F3A] opacity-100 shadow-md"
                  : "border-transparent opacity-35 hover:opacity-60",
              ].join(" ")}
            >
              {isPair ? (
                /* Split thumbnail for portrait pairs */
                <div className="flex w-full h-full gap-[2px]">
                  <div className="flex-1 overflow-hidden">
                    <img
                      src={slide[0].src}
                      alt={`Thumbnail ${idx + 1}a`}
                      className="w-full h-full object-cover object-center"
                      style={{ minHeight: 0 }}
                    />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <img
                      src={slide[1].src}
                      alt={`Thumbnail ${idx + 1}b`}
                      className="w-full h-full object-cover object-center"
                      style={{ minHeight: 0 }}
                    />
                  </div>
                </div>
              ) : (
                <img
                  src={slide[0].src}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover object-center"
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── SLIDE CONTENT ────────────────────────────────────────────────────────────
function SlideContent({ slide, idx }: { slide: Slide; idx: number }) {
  if (slide.length === 2) {
    // Portrait pair: two images side-by-side
    return (
      <div className="flex gap-2 w-full h-[600px]">
        {slide.map((img, pIdx) => (
          <div key={pIdx} className="flex-1 relative overflow-hidden rounded-xl border border-black/5 shadow-md">
            <BlurVignette
              radius="12px"
              inset="10px"
              transitionLength="28px"
              blur="7px"
              classname="w-full h-full"
            >
              <Image
                src={img.src}
                alt={`Life at Neidhal training session ${idx + 1}`}
                fill
                className="object-cover object-center z-0"
                sizes="(max-width: 1200px) 50vw, 33vw"
                unoptimized
                priority={idx === 0}
              />
              <BlurVignetteArticle />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none z-10" />
              {pIdx === 0 && (
                <div className="absolute bottom-6 left-6 z-10 text-white text-left">
                  <span className="text-[10px] uppercase tracking-widest font-semibold text-[#D9C3A5] block mb-1 font-raleway">
                    Training Moment {idx + 1}
                  </span>
                  <h4 className="text-lg font-bold font-raleway tracking-wide">Neidhal Coastal Turf</h4>
                </div>
              )}
            </BlurVignette>
          </div>
        ))}
      </div>
    );
  }

  // Single landscape image
  return (
    <BlurVignette
      radius="16px"
      inset="12px"
      transitionLength="32px"
      blur="8px"
      classname="w-full h-[600px] border border-black/5 shadow-md bg-transparent"
    >
      <Image
        src={slide[0].src}
        alt={`Life at Neidhal training session ${idx + 1}`}
        fill
        className="object-cover z-0"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        unoptimized
        priority={idx === 0}
      />
      <BlurVignetteArticle />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-6 left-6 z-10 text-white text-left">
        <span className="text-[10px] uppercase tracking-widest font-semibold text-[#D9C3A5] block mb-1 font-raleway">
          Training Moment {idx + 1}
        </span>
        <h4 className="text-lg font-bold font-raleway tracking-wide">Neidhal Coastal Turf</h4>
      </div>
    </BlurVignette>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export const LifeAtNeidhal: React.FC = () => {
  const OPTIONS: EmblaOptionsType = {
    loop: true,
    axis: "y",
  };

  const autoplay = useRef(
    Autoplay({ delay: 6000, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <section className="py-24 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,31,58,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(11,31,58,0.01)_1px,transparent_1px)] bg-[size:6rem_6rem] pointer-events-none" />

      {/* Section Header */}
      <div className="relative z-10 w-full px-6 sm:px-10 md:px-16 pt-0 pb-12 md:pb-16 text-center">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
          <RevealText
            as="h2"
            split="word"
            text="Life at Neidhal"
            className="font-raleway font-semibold text-[#0B1F3A] uppercase tracking-tight leading-none text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-center"
            whileInView
            once
          />
        </div>
      </div>

      {/* ─── DESKTOP LAYOUT (md+) ─── */}
      <div className="hidden md:block">
        <div className="max-w-[1500px] w-full mx-auto px-4 sm:px-8 md:px-12 relative z-10">
          <Carousel
            options={OPTIONS}
            plugins={[autoplay.current]}
            className="relative flex flex-row gap-8 h-[600px] w-full items-stretch"
          >
            {/* Custom Thumbnail Panel (Left side) */}
            <ThumbsPanel />

            {/* Main Images (Right side) */}
            <div className="flex-1 relative h-full">
              <SliderContainer className="h-[600px] w-full">
                {SLIDES.map((slide, idx) => (
                  <Slider
                    key={idx}
                    className="h-full w-full"
                    /* Pass first image as thumbnailSrc so the internal
                       slidesArr updates correctly (used by SliderSnapDisplay) */
                    thumbnailSrc={slide[0].src}
                  >
                    <SlideContent slide={slide} idx={idx} />
                  </Slider>
                ))}
              </SliderContainer>

              {/* Prev / Next Buttons */}
              <div className="absolute bottom-6 right-6 flex items-center gap-3 z-20">
                <SliderPrevButton className="w-10 h-10 rounded-full flex items-center justify-center bg-white/95 hover:bg-white text-primary border border-black/5 shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer">
                  <ChevronLeft size={18} />
                </SliderPrevButton>
                <SliderNextButton className="w-10 h-10 rounded-full flex items-center justify-center bg-white/95 hover:bg-white text-primary border border-black/5 shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer">
                  <ChevronRight size={18} />
                </SliderNextButton>
              </div>

              {/* Slide counter */}
              <div className="absolute top-6 right-6 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white font-raleway text-xs font-semibold z-20 flex items-center gap-2">
                <SliderSnapDisplay className="text-white font-raleway" />
              </div>
            </div>
          </Carousel>
        </div>
      </div>

      {/* ─── MOBILE LAYOUT (< md) ─── */}
      <div className="md:hidden">
        <div className="mb-2">
          <VelocityRow images={MOBILE_IMAGES} baseVelocity={-0.95} widthOffset={0} ratioOffset={0} />
        </div>
        <VelocityRow images={[...MOBILE_IMAGES].reverse()} baseVelocity={0.95} widthOffset={3} ratioOffset={2} />
      </div>
    </section>
  );
};

export default LifeAtNeidhal;
