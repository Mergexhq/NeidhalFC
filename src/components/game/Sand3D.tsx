"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Stylized Beach Diorama Platform
export function Sand3D() {
  return (
    <group>
      {/* ── Diorama Base Cylinder (Navy Slab) ── */}
      <mesh receiveShadow position={[0, -0.6, 0]}>
        <cylinderGeometry args={[10, 10.2, 1.2, 64]} />
        <meshStandardMaterial 
          color="#0B1F3A" // Neidhal Navy
          roughness={0.4} 
          metalness={0.15} 
        />
      </mesh>

      {/* ── Diorama Gold Accent Ring ── */}
      <mesh receiveShadow position={[0, -0.01, 0]}>
        <cylinderGeometry args={[10.02, 10.02, 0.04, 64]} />
        <meshStandardMaterial 
          color="#ECDAB9" // Gold
          roughness={0.2} 
          metalness={0.85} 
        />
      </mesh>

      {/* ── Sand Surface ── */}
      <mesh receiveShadow position={[0, 0.005, 0]}>
        <cylinderGeometry args={[9.95, 9.95, 0.01, 64]} />
        <meshStandardMaterial 
          color="#FAF2E6" // Soft Warm Sand
          roughness={0.95} 
          metalness={0.0} 
        />
      </mesh>

      {/* ── Procedural Soft Dunes (Submerged beige spheres) ── */}
      <Dune position={[-5, -0.3, -3]} scale={[4.5, 0.6, 4.5]} />
      <Dune position={[6, -0.4, -4]} scale={[5, 0.7, 5]} />
      <Dune position={[-3, -0.4, 5]} scale={[3, 0.4, 3]} />
      <Dune position={[4, -0.3, 4]} scale={[3.5, 0.5, 3.5]} />

      {/* ── Shoreline Ocean Water (Behind the goal post) ── */}
      <OceanShoreline />

      {/* ── Penalty Spot ring ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 3.4]}>
        <ringGeometry args={[0.18, 0.22, 32]} />
        <meshStandardMaterial 
          color="#ECDAB9" 
          roughness={0.9} 
          transparent 
          opacity={0.7} 
        />
      </mesh>

      {/* ── Stylized Palm Trees (Wind-Animated) ── */}
      <StylizedPalmTree position={[-6.5, 0, -2.5]} scale={1.05} rotationY={0.5} />
      <StylizedPalmTree position={[7.2, 0, 0.5]} scale={0.85} rotationY={-0.8} />
    </group>
  );
}

// ── Soft Sand Dune ──
function Dune({ position, scale }: { position: [number, number, number]; scale: [number, number, number] }) {
  return (
    <mesh position={position} scale={scale} receiveShadow>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#FAF2E6" roughness={0.98} />
    </mesh>
  );
}

// ── Shoreline Ocean Water ──
function OceanShoreline() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    // Gentle breathing wave motion
    meshRef.current.position.y = 0.01 + Math.sin(t * 1.2) * 0.012;
    // Slight rocking rotation
    meshRef.current.rotation.x = -Math.PI / 2 + Math.sin(t * 0.8) * 0.005;
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0.01, -6.5]} // Sit at the back edge of the diorama
      receiveShadow
    >
      {/* Curved ocean segment fitting the diorama edge */}
      <planeGeometry args={[12, 4]} />
      <meshPhysicalMaterial
        color="#3A86C8" // Beautiful clear ocean blue
        roughness={0.1}
        metalness={0.1}
        transmission={0.4}
        thickness={0.5}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

// ── Stylized Curved Wind-Animated Palm Tree ──
interface PalmProps {
  position?: [number, number, number];
  scale?: number;
  rotationY?: number;
}

function StylizedPalmTree({ position = [0, 0, 0], scale = 1, rotationY = 0 }: PalmProps) {
  const leavesRef = useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (!leavesRef.current) return;
    const t = clock.getElapsedTime();
    
    // Wind sways the entire leaf canopy
    leavesRef.current.rotation.x = Math.sin(t * 1.1) * 0.03;
    leavesRef.current.rotation.z = Math.cos(t * 0.9) * 0.02;
    
    // Individual leaf sway cycle
    const childLeaves = leavesRef.current.children;
    for (let i = 0; i < childLeaves.length; i++) {
      const leaf = childLeaves[i] as THREE.Mesh;
      const offset = i * 1.5;
      leaf.rotation.x = Math.sin(t * 1.4 + offset) * 0.04;
    }
  });

  // Stacked segments to make a curved organic trunk
  const trunkSegments = [
    { pos: [0, 0.4, 0], rad: 0.18, rotX: 0.02 },
    { pos: [0.03, 1.1, 0.01], rad: 0.16, rotX: 0.05 },
    { pos: [0.10, 1.8, 0.03], rad: 0.14, rotX: 0.08 },
    { pos: [0.22, 2.5, 0.06], rad: 0.12, rotX: 0.11 },
    { pos: [0.38, 3.1, 0.10], rad: 0.10, rotX: 0.14 },
    { pos: [0.58, 3.7, 0.15], rad: 0.09, rotX: 0.18 },
  ];

  const topTrunkPos = trunkSegments[trunkSegments.length - 1].pos;

  return (
    <group position={position} scale={scale} rotation={[0, rotationY, 0]}>
      {/* ── Curved Trunk Segments ── */}
      {trunkSegments.map((seg, idx) => (
        <mesh 
          key={idx} 
          castShadow 
          position={[seg.pos[0], seg.pos[1], seg.pos[2]]}
          rotation={[seg.rotX, 0, 0]}
        >
          <cylinderGeometry args={[seg.rad * 0.9, seg.rad, 0.72, 8]} />
          <meshStandardMaterial color="#7B5B3A" roughness={0.92} />
        </mesh>
      ))}

      {/* ── Wind-Animated Leaf Canopy ── */}
      <group ref={leavesRef} position={[topTrunkPos[0], topTrunkPos[1] + 0.3, topTrunkPos[2]]}>
        {/* 6 Stylized curved palm leaves */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          return (
            <group key={i} rotation={[0, rad, 0]}>
              <mesh
                castShadow
                position={[0.8, -0.2, 0]}
                rotation={[0.1, 0, -0.25]} // Droop down
              >
                {/* Thin curved leaf geometry */}
                <boxGeometry args={[1.5, 0.02, 0.35]} />
                <meshStandardMaterial 
                  color="#2D5A27" // Deep coastal green
                  roughness={0.8} 
                />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}
