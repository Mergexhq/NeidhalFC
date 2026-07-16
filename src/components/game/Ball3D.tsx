"use client";

/**
 * Ball3D.tsx - React Three Fiber 3D football (GLTF model).
 *
 * Model: /Ball/ball.gltf (copy of "Ball BLEND.gltf" - space removed for URL safety)
 * Materials: "Bianco" (white panels), "Nero.001" (black patches)
 *
 * Fixes:
 *   1. URL-safe path - no space in filename (was failing to load silently).
 *   2. Canvas pointer-events explicitly disabled so AimOverlay receives
 *      all drag events across the whole scene, not just the ball area.
 *   3. Environment preset ("park") for PBR reflections → looks like real leather.
 *   4. Higher-quality material settings: slight glossy sheen on white panels.
 *   5. Fixed canvas size + CSS scale for smooth trajectory (no renderer resize).
 *   6. No idle rotation - ball stays still until kicked.
 */

import React, { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import * as THREE from "three";
import type { AimTarget } from "@/types/game";

// ── Inner ball mesh ──────────────────────────────────────────────────────────
interface BallMeshProps {
  shootT: number;
  aimTarget: AimTarget;
  isShooting: boolean;
}

function BallModel({ shootT, aimTarget, isShooting }: BallMeshProps) {
  const groupRef = useRef<THREE.Group>(null!);

  // URL-safe path - no spaces
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { scene, materials } = useGLTF("/game/ball/ball.gltf") as unknown as {
    scene: THREE.Group;
    materials: Record<string, THREE.MeshStandardMaterial>;
  };

  // Apply polished leather colours once
  useEffect(() => {
    const bianco = materials["Bianco"];
    const nero = materials["Nero.001"];

    if (bianco) {
      bianco.color.set("#F2F2F2");
      bianco.roughness = 0.35;   // slightly glossy - like real leather
      bianco.metalness = 0.0;
      bianco.envMapIntensity = 0.8;
      bianco.needsUpdate = true;
    }
    if (nero) {
      nero.color.set("#111111");
      nero.roughness = 0.45;
      nero.metalness = 0.0;
      nero.envMapIntensity = 0.5;
      nero.needsUpdate = true;
    }
  }, [materials]);

  // Spin only during flight
  useFrame(() => {
    if (!groupRef.current || !isShooting) return;
    groupRef.current.rotation.x = -(shootT * Math.PI * 6);
    groupRef.current.rotation.y = aimTarget.x * shootT * Math.PI * 2;
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

// Pre-load immediately
useGLTF.preload("/game/ball/ball.gltf");

// ── Canvas wrapper ───────────────────────────────────────────────────────────
interface Ball3DProps {
  left: number;
  top: number;
  scale: number;
  shootT: number;
  aimTarget: AimTarget;
  isShooting: boolean;
  baseSizeVw?: number;
}

export function Ball3D({
  left,
  top,
  scale,
  shootT,
  aimTarget,
  isShooting,
  baseSizeVw = 5,
}: Ball3DProps) {
  return (
    <div
      className="absolute z-10"
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: `${baseSizeVw}vw`,
        height: `${baseSizeVw}vw`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        transformOrigin: "center center",
        // Critical: wrapper must not capture pointer events
        pointerEvents: "none",
      }}
    >
      <Canvas
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 3.0], fov: 45 }}
        dpr={[1, 2]}
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          // Canvas element itself must not steal pointer events from AimOverlay
          pointerEvents: "none",
        }}
      >
        {/* PBR environment - gives the leather panels real reflections */}
        <Suspense fallback={null}>
          <Environment preset="park" />
          <BallModel
            shootT={shootT}
            aimTarget={aimTarget}
            isShooting={isShooting}
          />
        </Suspense>

        {/* Bright outdoor sun from top-left */}
        <ambientLight intensity={1.8} />
        <directionalLight position={[4, 8, 5]} intensity={2.2} />
        {/* Warm sand bounce */}
        <directionalLight position={[0, -2, 3]} intensity={0.8} color="#ffddaa" />
        {/* Cool sky fill */}
        <directionalLight position={[-3, 2, 2]} intensity={0.4} color="#b8d4f0" />
      </Canvas>
    </div>
  );
}
