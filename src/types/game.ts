/**
 * game.ts — Type definitions for the R3F penalty mini-game.
 * No physics-engine types — ball movement is pure parabolic arc math.
 */

export type GamePhase =
  | "idle"        // footer section visible, CTA glows
  | "countdown"   // 3-2-1-SHOOT overlay
  | "ready"       // brief flash before aiming
  | "aiming"      // user drags aim overlay
  | "shooting"    // ball in flight
  | "result";     // GOAL / SAVED / MISSED

export type ShotResult = "goal" | "saved" | "missed";

/** Normalized aim position in goal frame: x -1…1, y 0…1 */
export interface AimTarget {
  x: number;
  y: number;
}

/** Current pointer drag state (pixels in overlay coords) */
export interface AimDrag {
  startX:   number;
  startY:   number;
  currentX: number;
  currentY: number;
}

export type KeeperAction = "left" | "center" | "right";
