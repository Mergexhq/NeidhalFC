"use client";

/**
 * AimOverlay.tsx — Full-screen drag layer for aiming.
 *
 * The drag can only START from within ~72px of the ball (enforced in useGame).
 * All aim-guide graphics are drawn FROM the ball centre, regardless of where
 * the user first touched — so the arrow always appears to come out of the ball.
 *
 * Ball is anchored at 50% x, 76% y of the overlay (matches Scene2D idle position).
 */

import { useRef, useCallback } from "react";
import type { AimDrag } from "@/types/game";

// Ball position as fractions of the overlay size — must match Scene2D getBallPos()
const BALL_X_PCT = 0.50;
const BALL_Y_PCT = 0.76;

interface AimOverlayProps {
  active:  boolean;
  aim:     AimDrag | null;
  onPointerDown: (e: React.PointerEvent, rect: DOMRect) => void;
  onPointerMove: (e: React.PointerEvent, rect: DOMRect) => void;
  onPointerUp:   (w: number, h: number) => void;
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

  // ── Guide geometry — always anchored to the ball centre ──────────────────
  const w = divRef.current?.clientWidth  ?? 400;
  const h = divRef.current?.clientHeight ?? 600;

  // Ball screen position in overlay coordinates
  const ballX = w * BALL_X_PCT;
  const ballY = h * BALL_Y_PCT;

  // Drag delta — how far / which direction the user has dragged
  const dx = aim ? aim.currentX - aim.startX : 0;
  const dy = aim ? aim.currentY - aim.startY : 0;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const showGuide = aim !== null && dist > 8;

  // Shot direction = opposite of drag (slingshot mechanic)
  const normDist  = dist || 1;
  const arrowLen  = Math.min(dist * 1.4, 130);
  // Arrow endpoint — from ball centre in shot direction
  const arrowEndX = ballX - (dx / normDist) * arrowLen;
  const arrowEndY = ballY - (dy / normDist) * arrowLen;

  // Finger dot — where the user is actually touching
  const fingerX = aim?.currentX ?? 0;
  const fingerY = aim?.currentY ?? 0;

  // Power ring radius — grows with drag distance, capped
  const ringR = Math.min(dist * 0.45, 50);

  return (
    <div
      ref={divRef}
      onPointerDown={handleDown}
      onPointerMove={handleMove}
      onPointerUp={handleUp}
      onPointerLeave={handleUp}
      onPointerCancel={handleUp}
      className="absolute inset-0 z-30"
      style={{
        cursor: active ? (aim ? "grabbing" : "default") : "default",
        touchAction: "none",
        pointerEvents: active ? "auto" : "none",
      }}
    >
      {/* ── "DRAG TO AIM" hint ── */}
      {active && !aim && (
        <div className="absolute top-[12%] left-1/2 -translate-x-1/2 text-center select-none pointer-events-none z-30">
          <span
            className="text-[#0B1F3A]/80 font-light text-sm tracking-[0.5em] uppercase"
            style={{ fontFamily: "var(--font-primary, sans-serif)", letterSpacing: "0.45em" }}
          >
            Drag to Aim
          </span>
        </div>
      )}

      {/* ── "RELEASE TO SHOOT" while dragging ── */}
      {active && aim && (
        <div className="absolute top-[12%] left-1/2 -translate-x-1/2 text-center select-none pointer-events-none z-30">
          <span
            className="text-[#0B1F3A]/80 font-light text-sm tracking-[0.5em] uppercase"
            style={{ fontFamily: "var(--font-primary, sans-serif)", letterSpacing: "0.45em" }}
          >
            Release to Shoot
          </span>
        </div>
      )}

      {/* ── Aim slingshot guide — all anchored to ball centre ── */}
      {showGuide && aim && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${w} ${h}`}
        >
          {/* Power ring at ball centre */}
          <circle
            cx={ballX}
            cy={ballY}
            r={ringR}
            stroke="rgba(11,31,58,0.45)"
            strokeWidth="2"
            fill="none"
          />

          {/* Pull-back line — ball to finger */}
          <line
            x1={ballX} y1={ballY}
            x2={fingerX} y2={fingerY}
            stroke="rgba(11,31,58,0.30)"
            strokeWidth="2"
            strokeDasharray="4 4"
          />

          {/* Shot direction line — ball toward goal */}
          <line
            x1={ballX} y1={ballY}
            x2={arrowEndX} y2={arrowEndY}
            stroke="rgba(11,31,58,0.75)"
            strokeWidth="2.5"
            strokeDasharray="8 5"
            strokeLinecap="round"
          />

          {/* Arrowhead at the end of shot-direction line */}
          {dist > 20 && (
            <ArrowHead x1={ballX} y1={ballY} x2={arrowEndX} y2={arrowEndY} />
          )}

          {/* Finger drag dot */}
          <circle cx={fingerX} cy={fingerY} r="9" fill="rgba(11,31,58,0.7)" />
          <circle cx={fingerX} cy={fingerY} r="4.5" fill="#ECDAB9" />
        </svg>
      )}
    </div>
  );
}

function ArrowHead({
  x1, y1, x2, y2,
}: { x1: number; y1: number; x2: number; y2: number }) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const hl = 16;
  const x3 = x2 - hl * Math.cos(angle - 0.45);
  const y3 = y2 - hl * Math.sin(angle - 0.45);
  const x4 = x2 - hl * Math.cos(angle + 0.45);
  const y4 = y2 - hl * Math.sin(angle + 0.45);
  return (
    <polygon
      points={`${x2},${y2} ${x3},${y3} ${x4},${y4}`}
      fill="rgba(11,31,58,0.9)"
    />
  );
}
