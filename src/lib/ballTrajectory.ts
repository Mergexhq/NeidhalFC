/**
 * ballTrajectory.ts - Parabolic arc math for the football shot.
 *
 * No physics engine - ball follows a deterministic quadratic Bézier curve
 * from the player's foot to a point in the goal frame. This gives editorial,
 * film-like ball flight that matches the premium brand feel.
 */

import type { KeeperAction, ShotResult } from "@/types/game";

export interface Position3D {
  x: number;
  y: number;
  z: number;
}

// ── Scene coordinate constants ─────────────────────────────────────────────────
export const BALL_START = { x: 0, y: 0.12, z: 3.4 };
export const GOAL_Z = -4.2;
export const GOAL_HALF_W = 1.9;   // goal post x positions: ±1.9
export const GOAL_TOP_Y = 2.25;  // crossbar height
export const GOAL_FLOOR_Y = 0.0;
export const SHOT_DURATION_MS = 900; // ms for ball to reach goal

// ── Bezier arc ─────────────────────────────────────────────────────────────────

/**
 * Returns ball world position at normalized time t (0 → 1).
 *
 * @param aimX  -1 (far left) → +1 (far right)
 * @param aimY   0 (floor)    →  1 (crossbar)
 */
export function getBallPosition(aimX: number, aimY: number, t: number): Position3D {
  const targetX = aimX * GOAL_HALF_W * 0.92;
  const targetY = GOAL_FLOOR_Y + aimY * (GOAL_TOP_Y - GOAL_FLOOR_Y) * 0.92 + 0.1;
  const target = { x: targetX, y: targetY, z: GOAL_Z };
  const start = { ...BALL_START };

  // Lift the mid-point for an editorial arc
  const arcHeight = 2.0 + Math.abs(aimY - 0.5) * 1.5;
  const controlY = Math.max(start.y, target.y) + arcHeight;
  const control = {
    x: (start.x + target.x) * 0.5,
    y: controlY,
    z: (start.z + target.z) * 0.5,
  };

  // Quadratic Bézier
  const mt = 1 - t;
  return {
    x: mt * mt * start.x + 2 * mt * t * control.x + t * t * target.x,
    y: mt * mt * start.y + 2 * mt * t * control.y + t * t * target.y,
    z: mt * mt * start.z + 2 * mt * t * control.z + t * t * target.z,
  };
}

/** Ball spin angle (rad) at time t - simple linear spin */
export function getBallSpin(t: number): number {
  return t * Math.PI * 6; // ~3 full rotations over flight
}

// ── Outcome logic ──────────────────────────────────────────────────────────────

export function determineOutcome(
  aimX: number,
  aimY: number,
  keeperAction: KeeperAction,
): ShotResult {
  // Miss: outside post width or over bar / under floor
  const inPosts = aimX > -0.9 && aimX < 0.9;
  const inFrame = aimY > 0.03 && aimY < 0.97;
  if (!inPosts || !inFrame) return "missed";

  // Keeper coverage zones (with some tolerance)
  const saved =
    (keeperAction === "left" && aimX < -0.12) ||
    (keeperAction === "right" && aimX > 0.12) ||
    (keeperAction === "center" && Math.abs(aimX) < 0.28 && aimY < 0.55);

  return saved ? "saved" : "goal";
}
