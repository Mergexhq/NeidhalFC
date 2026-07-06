"use client";

import { useRef, useCallback } from "react";
import type { AimDrag } from "@/types/game";

interface AimOverlayProps {
  active:  boolean;                          // only show when phase === "aiming"
  aim:     AimDrag | null;
  onPointerDown: (e: React.PointerEvent, rect: DOMRect) => void;
  onPointerMove: (e: React.PointerEvent, rect: DOMRect) => void;
  onPointerUp:   (w: number, h: number)     => void;
}

export function AimOverlay({
  active,
  aim,
  onPointerDown,
  onPointerMove,
  onPointerUp,
}: AimOverlayProps) {
  const divRef = useRef<HTMLDivElement>(null);

  const getRect = () => divRef.current?.getBoundingClientRect() ?? new DOMRect();

  const handleDown = useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    onPointerDown(e, getRect());
  }, [onPointerDown]);

  const handleMove = useCallback((e: React.PointerEvent) => {
    onPointerMove(e, getRect());
  }, [onPointerMove]);

  const handleUp = useCallback(() => {
    const el = divRef.current;
    onPointerUp(el?.clientWidth ?? 400, el?.clientHeight ?? 600);
  }, [onPointerUp]);

  // Compute drag vector for the visual guide
  const dx = aim ? aim.currentX - aim.startX : 0;
  const dy = aim ? aim.currentY - aim.startY : 0;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const showGuide = aim !== null && dist > 8;

  return (
    <div
      ref={divRef}
      onPointerDown={handleDown}
      onPointerMove={handleMove}
      onPointerUp={handleUp}
      onPointerLeave={handleUp}
      onPointerCancel={handleUp}
      className="absolute inset-0 z-10"
      style={{
        cursor:  active ? (aim ? "grabbing" : "crosshair") : "default",
        touchAction: "none",
        pointerEvents: active ? "auto" : "none",
      }}
    >
      {/* Idle hint */}
      {active && !aim && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 text-center select-none">
          <div
            className="text-white/60 text-sm font-light tracking-[0.2em] uppercase"
            style={{ fontFamily: "var(--font-primary, sans-serif)" }}
          >
            Drag to aim
          </div>
          {/* Animated arrow */}
          <div className="mt-2 flex justify-center">
            <svg width="24" height="36" viewBox="0 0 24 36" fill="none">
              <line x1="12" y1="0" x2="12" y2="28" stroke="white" strokeWidth="1.5" strokeOpacity="0.5"
                strokeDasharray="4 4">
                <animate attributeName="stroke-dashoffset" from="0" to="8" dur="0.8s" repeatCount="indefinite" />
              </line>
              <path d="M6 22 L12 30 L18 22" stroke="white" strokeWidth="1.5" strokeOpacity="0.5"
                fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      )}

      {/* Drag aim guide */}
      {showGuide && aim && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${divRef.current?.clientWidth ?? 400} ${divRef.current?.clientHeight ?? 600}`}
        >
          {/* Slingshot line from start to current */}
          <line
            x1={aim.startX} y1={aim.startY}
            x2={aim.currentX} y2={aim.currentY}
            stroke="rgba(255,255,255,0.4)"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          {/* Power ring at start */}
          <circle
            cx={aim.startX} cy={aim.startY}
            r={Math.min(dist * 0.5, 38)}
            stroke="rgba(255,255,255,0.25)"
            strokeWidth="1.5"
            fill="none"
          />
          {/* Current pointer dot */}
          <circle
            cx={aim.currentX} cy={aim.currentY}
            r="6"
            fill="rgba(255,255,255,0.8)"
          />
          {/* Direction arrow */}
          {dist > 20 && (
            <ArrowHead
              x1={aim.currentX} y1={aim.currentY}
              x2={aim.startX - (dx / dist) * 30}
              y2={aim.startY - (dy / dist) * 30}
            />
          )}
        </svg>
      )}
    </div>
  );
}

function ArrowHead({
  x1, y1, x2, y2,
}: { x1: number; y1: number; x2: number; y2: number }) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const hl = 12;
  const hw = 7;
  const x3 = x2 - hl * Math.cos(angle - 0.4);
  const y3 = y2 - hl * Math.sin(angle - 0.4);
  const x4 = x2 - hl * Math.cos(angle + 0.4);
  const y4 = y2 - hl * Math.sin(angle + 0.4);
  return (
    <polygon
      points={`${x2},${y2} ${x3},${y3} ${x4},${y4}`}
      fill="rgba(255,255,255,0.7)"
    />
  );
}
