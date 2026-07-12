"use client";

import React, {
  useRef,
  forwardRef,
  useImperativeHandle,
  useState,
  useEffect,
} from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface GalleryItem {
  src: string;
  alt: string;
  key?: string;
  onClick?: () => void;
}

/**
 * Props for the CircularGallery component.
 */
interface CircularGalleryProps extends React.HTMLAttributes<HTMLDivElement> {
  items: GalleryItem[];
  /** Base radius of the 3D cylinder in pixels for desktop screens. Defaults to 700. */
  radius?: number;
  /** Radius for mobile screens (<768px). Defaults to half of `radius`. */
  mobileRadius?: number;
  /** Total scroll height in pixels. Determines the speed of rotation relative to scroll depth. */
  scrollDistance?: number;
  /** Total rotation in degrees that occurs over the `scrollDistance`. Defaults to -360. */
  rotationTotal?: number;
  /** Width of each gallery item in pixels. */
  itemWidth?: number;
  /** Height of each gallery item in pixels. */
  itemHeight?: number;
  /** CSS perspective value for the 3D container. */
  perspective?: number;
  ariaLabel?: string;
}

/**
 * A 3D circular gallery component that rotates elements around a central Y-axis
 * based on the user's vertical scroll position.
 *
 * Utilizes GSAP ScrollTrigger for animation.
 */
const CircularGallery = forwardRef<HTMLDivElement, CircularGalleryProps>(
  (
    {
      items,
      radius = 700,
      mobileRadius,
      scrollDistance = 2000,
      rotationTotal = -360,
      itemWidth = 256,
      itemHeight = 384,
      perspective = 650,
      ariaLabel = "3D Circular Gallery",
      className,
      children,
      ...rest
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const carouselRef = useRef<HTMLUListElement>(null);

    useImperativeHandle(ref, () => containerRef.current!);

    const [dimensions, setDimensions] = useState({
      itemWidth: 290,
      itemHeight: 450, // ~9:14 fallback
      radius: 560,
    });

    useEffect(() => {
      if (typeof window === "undefined") return;

      const handleResize = () => {
        const w = window.innerWidth;
        const isMobile = w < 768;

        // Desktop: w * 0.12 (tighter spacing, closer to reference)
        // Mobile: w * 0.40
        const width = isMobile ? w * 0.40 : w * 0.12;
        const height = width * 2.0;

        // Radius formula to ensure correct card padding and spacing
        const angleIncrement = 360 / items.length;
        const rad = (180 / items.length) * (Math.PI / 180);
        const calculatedRadius = (width / (2 * Math.sin(rad))) * 1.15;

        setDimensions({
          itemWidth: width,
          itemHeight: height,
          radius: calculatedRadius,
        });
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, [items.length]);

    const initialRotation = 180 / items.length;
    const rotationRef = useRef(initialRotation);
    const isScrollingRef = useRef(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    // Tracks whether the cursor is hovering over the card belt (not header/footer)
    const isCursorOverCarouselRef = useRef(false);

    useGSAP(
      () => {
        if (!carouselRef.current || !wrapperRef.current) return;

        const direction = rotationTotal < 0 ? -1 : 1;

        // Optimize video playback: only play videos that are in the front half (visible)
        const updateVideos = () => {
          const videos = carouselRef.current?.querySelectorAll("video");
          if (!videos) return;
          const currentRotation = rotationRef.current;
          videos.forEach((video, index) => {
            const cardAngle = angleIncrement * index;
            const worldAngle = (currentRotation + cardAngle) % 360;
            const normalized = ((worldAngle + 180) % 360) - 180;

            // Only play the cards facing the camera (angle near 0, i.e. < 90)
            const isVisible = Math.abs(normalized) < 90;

            if (isVisible) {
              if (video.paused) {
                video.play().catch(() => {});
              }
            } else {
              if (!video.paused) {
                video.pause();
              }
            }
          });
        };

        const handleWheel = (e: WheelEvent) => {
          // Only intercept scroll when the cursor is directly over a card <li> element.
          // Title zone, CTA button, and any other non-card area pass scroll through normally.
          if (!isCursorOverCarouselRef.current) return;

          e.preventDefault();
          isScrollingRef.current = true;

          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }

          // Rotate the carousel proportional to the wheel delta
          const scrollSpeed = 0.15;
          const scrollDelta = e.deltaX !== 0 ? e.deltaX : e.deltaY;
          // Invert scroll direction physics
          rotationRef.current -= scrollDelta * scrollSpeed * direction;

          gsap.to(carouselRef.current, {
            rotationY: rotationRef.current,
            duration: 0.6,
            ease: "power2.out",
            onUpdate: updateVideos,
          });

          // Reset scrolling flag after gesture finishes
          scrollTimeoutRef.current = setTimeout(() => {
            isScrollingRef.current = false;
          }, 1500);
        };

        // Use mousemove + DOM hit-testing so the flag is only true when the
        // cursor is literally over a card <li> face — not the title, CTA, or
        // any gap between cards.
        const handleMouseMove = (e: MouseEvent) => {
          const target = e.target as HTMLElement;
          // Walk up the DOM from the hovered element to see if we're inside a <li>
          isCursorOverCarouselRef.current = !!target.closest("li");
        };

        const handleMouseLeave = () => {
          // Reset when the cursor exits the section entirely
          isCursorOverCarouselRef.current = false;
        };

        const container = containerRef.current!;
        // Wheel on the whole section (passive:false so we can preventDefault when needed)
        container.addEventListener("wheel", handleWheel, { passive: false });
        container.addEventListener("mousemove", handleMouseMove);
        container.addEventListener("mouseleave", handleMouseLeave);

        // Run initial check once mounted
        setTimeout(updateVideos, 100);

        return () => {
          container.removeEventListener("wheel", handleWheel);
          container.removeEventListener("mousemove", handleMouseMove);
          container.removeEventListener("mouseleave", handleMouseLeave);
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }
        };
      },
      { scope: containerRef, dependencies: [rotationTotal, items.length] }
    );

    if (!items || items.length === 0) return null;

    const angleIncrement = 360 / items.length;

    return (
      <div
        ref={containerRef}
        className={cn(
          "relative flex min-h-screen w-full flex-col items-center justify-center bg-transparent z-10",
          className
        )}
        {...rest}
      >
        {children}
        <div
          ref={wrapperRef}
          className="relative flex w-full items-center justify-center translate-y-20 md:translate-y-24 z-30 pointer-events-auto"
          style={{ 
            perspective: `${perspective}px`,
            height: `${dimensions.itemHeight + 120}px`
          }}
        >
          <ul
            ref={carouselRef}
            className="group absolute flex h-0 w-0 items-center justify-center will-change-transform"
            style={{
              transformStyle: "preserve-3d",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: `rotateY(${rotationRef.current}deg)`,
            }}
            role="list"
            aria-label={ariaLabel}
          >
            {items.map((item, index) => {
              const uniqueKey = item.key || `${item.src}-${index}`;
              const angle = angleIncrement * index;
              const isInteractive = !!item.onClick;

              return (
                <li
                  key={uniqueKey}
                  role={isInteractive ? "button" : "listitem"}
                  tabIndex={isInteractive ? 0 : -1}
                  onClick={item.onClick}
                  onKeyDown={(e) => {
                    if (isInteractive && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      item.onClick?.();
                    }
                  }}
                  className={cn(
                    "absolute overflow-hidden rounded-xl border border-black/5 bg-[#FAF7F2] shadow-sm",
                    "transition-all duration-700 ease-[cubic-bezier(0.25,0.4,0.25,1)]",
                    isInteractive ? "cursor-pointer" : "cursor-default",
                    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2"
                  )}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    width: `${dimensions.itemWidth}px`,
                    height: `${dimensions.itemHeight}px`,
                    marginLeft: `-${dimensions.itemWidth / 2}px`,
                    marginTop: `-${dimensions.itemHeight / 2}px`,
                    transform: `rotateY(${angle}deg) translateZ(-${dimensions.radius * 1.08}px)`,
                    backfaceVisibility: "hidden",
                  }}
                >
                  <div className="relative h-full w-full bg-sand/10">
                    {item.src.match(/\.(mp4|webm|ogg)/i) || 
                     item.src.includes("assets.mixkit.co") || 
                     item.src.includes("/video-files/") || 
                     item.src.includes("/download/video/") ? (
                      <video
                        src={item.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none"
                      />
                    ) : (
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        sizes="(max-w-768px) 100vw, 30vw"
                        className="object-cover select-none pointer-events-none"
                        priority={index < 4}
                      />
                    )}
                    {/* Vignette overlay */}
                    <div
                      className="absolute inset-0 bg-[#0B1F3A]/5"
                      aria-hidden="true"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
);

CircularGallery.displayName = "CircularGallery";

export default CircularGallery;
