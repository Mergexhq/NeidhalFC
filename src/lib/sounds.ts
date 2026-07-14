/**
 * sounds.ts - Howler.js sound manager
 *
 * Currently uses a 1-frame silent WAV stub so no 404 errors occur.
 * To add real audio: replace the `src` arrays below with paths to your .mp3 files.
 *
 * Example:
 *   kickSound = new Howl({ src: ['/sounds/kick.mp3'], volume: 0.6 })
 */

// Minimal valid silent WAV (44 bytes, base64)
const SILENT =
  "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let kickSound: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let netSound: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let crowdSound: any = null;

let initialized = false;

export async function initSounds(): Promise<void> {
  if (initialized || typeof window === "undefined") return;

  try {
    const { Howl } = await import("howler");

    // Replace `src` values with real audio file paths when available
    kickSound = new Howl({ src: [SILENT], volume: 0.7, preload: true });
    netSound = new Howl({ src: [SILENT], volume: 0.6, preload: true });
    crowdSound = new Howl({ src: [SILENT], volume: 0.15, loop: true, preload: true });

    initialized = true;
  } catch {
    // Audio is an enhancement - silently fail if unavailable
  }
}

export function playKick(): void { try { kickSound?.play(); } catch { /* noop */ } }
export function playNet(): void { try { netSound?.play(); } catch { /* noop */ } }
export function playCrowd(): void { try { crowdSound?.play(); } catch { /* noop */ } }
export function stopCrowd(): void { try { crowdSound?.stop(); } catch { /* noop */ } }
