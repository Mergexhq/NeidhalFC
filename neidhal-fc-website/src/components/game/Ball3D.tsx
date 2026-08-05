"use client";

/**
 * Ball3D.tsx - React Three Fiber 3D football (GLTF model).
 *
 * Performance optimizations:
 *   1. frameloop="demand" - only renders when invalidated (saves GPU during aiming)
 *   2. Removed heavy "park" Environment preset (~1MB HDR download)
 *   3. Capped DPR at [1, 1.5] for mobile performance
 *   4. Ball mesh is memoized to avoid re-creating on every render
 */

import React, { useRef, useEffect, Suspense, memo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import type { AimTarget } from "@/types/game";

// ── Inner ball mesh ──────────────────────────────────────────────────────────
interface BallMeshProps {
  shootT: number;
  aimTarget: AimTarget;
  isShooting: boolean;
}

const BallModel = memo(function BallModel({ shootT, aimTarget, isShooting }: BallMeshProps) {
  const groupRef = useRef<THREE.Group>(null!);
  const { invalidate } = useThree();

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
      bianco.roughness = 0.35;
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

  // Spin only during flight -request frame only when animating
  useFrame(() => {
    if (!groupRef.current || !isShooting) return;
    groupRef.current.rotation.x = -(shootT * Math.PI * 6);
    groupRef.current.rotation.y = aimTarget.x * shootT * Math.PI * 2;
    invalidate(); // Request next render frame
  });

  // Also invalidate when shooting starts/stops to ensure state transitions render
  useEffect(() => {
    invalidate();
  }, [isShooting, invalidate]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
});

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
        pointerEvents: "none",
      }}
    >
      <Canvas
        frameloop="demand"
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 3.0], fov: 45 }}
        dpr={[1, 1.5]}
        style={{
          width: "100%",
          height: "100%",
          background: "transparent",
          pointerEvents: "none",
        }}
      >
        <Suspense fallback={null}>
          <BallModel
            shootT={shootT}
            aimTarget={aimTarget}
            isShooting={isShooting}
          />
        </Suspense>

        {/* Bright outdoor sun from top-left */}
        <ambientLight intensity={2.0} />
        <directionalLight position={[4, 8, 5]} intensity={2.5} />
        {/* Warm sand bounce */}
        <directionalLight position={[0, -2, 3]} intensity={1.0} color="#ffddaa" />
        {/* Cool sky fill */}
        <directionalLight position={[-3, 2, 2]} intensity={0.5} color="#b8d4f0" />
      </Canvas>
    </div>
  );
}
