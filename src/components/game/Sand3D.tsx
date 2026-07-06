"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

// Sandy beach ground plane
export function Sand3D() {
  const meshRef = useRef<Mesh>(null!);

  // Gentle shimmer — subtle normal-map-like effect via time
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    // slight emissive pulse for a sun-baked feel
    const mat = meshRef.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.04 + Math.sin(clock.elapsedTime * 0.6) * 0.015;
  });

  return (
    <group>
      {/* Main sand plane */}
      <mesh
        ref={meshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
        receiveShadow
      >
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial
          color="#C8A97E"
          roughness={0.92}
          metalness={0.0}
          emissive="#C8A97E"
          emissiveIntensity={0.04}
        />
      </mesh>

      {/* Penalty spot circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 3.4]}>
        <ringGeometry args={[0.18, 0.22, 32]} />
        <meshStandardMaterial color="#E8C89A" roughness={0.9} />
      </mesh>

      {/* Simple palm tree — left side decoration */}
      <PalmTree position={[-7, 0, -1]} />
      <PalmTree position={[8, 0, 2]} scale={0.8} />
    </group>
  );
}

// ── Simple low-poly palm tree ──────────────────────────────────────────────────
interface PalmProps {
  position?: [number, number, number];
  scale?:    number;
}

function PalmTree({ position = [0, 0, 0], scale = 1 }: PalmProps) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh castShadow position={[0, 2.5, 0]}>
        <cylinderGeometry args={[0.12, 0.18, 5, 7]} />
        <meshStandardMaterial color="#7B5B3A" roughness={0.95} />
      </mesh>
      {/* Fronds — 5 low-poly leaf cones */}
      {[0, 72, 144, 216, 288].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <mesh
            key={i}
            castShadow
            position={[
              Math.sin(rad) * 0.9,
              5.1,
              Math.cos(rad) * 0.9,
            ]}
            rotation={[
              Math.cos(rad) * 0.55,
              0,
              -Math.sin(rad) * 0.55,
            ]}
          >
            <coneGeometry args={[0.5, 1.8, 5]} />
            <meshStandardMaterial color="#3D7A3A" roughness={0.9} />
          </mesh>
        );
      })}
    </group>
  );
}

// needed for material typing in useFrame
import * as THREE from "three";
