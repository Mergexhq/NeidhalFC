/**
 * sounds.ts - Lightweight audio stub (no external dependencies).
 *
 * Currently plays nothing -acts as a zero-cost no-op layer.
 * When real audio files are added, replace the `src` values and
 * uncomment the AudioContext logic below.
 *
 * This removes the ~30 KB gzipped Howler.js dependency.
 */

/* eslint-disable @typescript-eslint/no-unused-vars */

let initialized = false;

export async function initSounds(): Promise<void> {
  if (initialized || typeof window === "undefined") return;
  initialized = true;
  // When audio files are ready:
  // const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
  // Pre-fetch and decode audio buffers here
}

export function playKick(): void { /* noop until audio files added */ }
export function playNet(): void { /* noop until audio files added */ }
export function playCrowd(): void { /* noop until audio files added */ }
export function stopCrowd(): void { /* noop until audio files added */ }
