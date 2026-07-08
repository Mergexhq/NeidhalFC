"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GOAL_HALF_W, GOAL_TOP_Y } from "@/lib/ballTrajectory";

const GOAL_Z     = -4.2;
const POST_R     = 0.075; // slightly thicker premium posts
const POST_COLOR = "#E2E8F0"; // Aluminum/metallic tint

interface GoalProps {
  netShake?: boolean; // ripple the net when a goal is scored
}

export function Goal3D({ netShake = false }: GoalProps) {
  const netRef = useRef<THREE.Group>(null!);

  const postHeight = GOAL_TOP_Y;
  const goalWidth  = GOAL_HALF_W * 2;

  return (
    <group position={[0, 0, GOAL_Z]}>
      {/* Left post */}
      <mesh castShadow receiveShadow position={[-GOAL_HALF_W, postHeight / 2, 0]}>
        <cylinderGeometry args={[POST_R, POST_R, postHeight, 16]} />
        <meshPhysicalMaterial 
          color={POST_COLOR} 
          roughness={0.12} 
          metalness={0.9} 
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Right post */}
      <mesh castShadow receiveShadow position={[GOAL_HALF_W, postHeight / 2, 0]}>
        <cylinderGeometry args={[POST_R, POST_R, postHeight, 16]} />
        <meshPhysicalMaterial 
          color={POST_COLOR} 
          roughness={0.12} 
          metalness={0.9} 
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Crossbar */}
      <mesh castShadow receiveShadow position={[0, postHeight, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[POST_R, POST_R, goalWidth + POST_R * 2, 16]} />
        <meshPhysicalMaterial 
          color={POST_COLOR} 
          roughness={0.12} 
          metalness={0.9} 
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Back top support bar */}
      <mesh receiveShadow position={[0, postHeight, -0.65]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[POST_R * 0.7, POST_R * 0.7, goalWidth, 12]} />
        <meshPhysicalMaterial 
          color={POST_COLOR} 
          roughness={0.18} 
          metalness={0.8} 
        />
      </mesh>

      {/* Net support bars (angles running back-down from posts) */}
      {[-GOAL_HALF_W, GOAL_HALF_W].map((x, i) => (
        <group key={i} position={[x, postHeight, 0]} rotation={[0.7, 0, 0]}>
          <mesh position={[0, -0.4, 0]}>
            <cylinderGeometry args={[POST_R * 0.5, POST_R * 0.5, 0.9, 8]} />
            <meshStandardMaterial color={POST_COLOR} roughness={0.2} metalness={0.8} />
          </mesh>
        </group>
      ))}

      {/* Net */}
      <group ref={netRef}>
        <Net width={goalWidth} height={postHeight} depth={0.7} netShake={netShake} />
      </group>
    </group>
  );
}

// ── Realistic Rippling Net mesh ──
function Net({ width, height, depth, netShake }: { width: number; height: number; depth: number; netShake: boolean }) {
  const backFaceRef = useRef<THREE.Mesh>(null!);
  const topFaceRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!backFaceRef.current || !topFaceRef.current) return;

    if (netShake) {
      const elapsed = clock.getElapsedTime() * 18;
      const decay = Math.exp(-((clock.getElapsedTime() * 2.5) % 1.5)); // smooth decay curve
      
      // Bulge the back net out and ripple it
      backFaceRef.current.position.z = -depth - Math.sin(elapsed) * 0.16 * decay;
      backFaceRef.current.position.x = Math.cos(elapsed * 0.8) * 0.04 * decay;

      // Ripple the top net downward/backward
      topFaceRef.current.position.y = height + Math.sin(elapsed * 1.2) * 0.05 * decay;
    } else {
      // Return smoothly to rest
      backFaceRef.current.position.z = THREE.MathUtils.lerp(backFaceRef.current.position.z, -depth, 0.1);
      backFaceRef.current.position.x = THREE.MathUtils.lerp(backFaceRef.current.position.x, 0, 0.1);
      topFaceRef.current.position.y = THREE.MathUtils.lerp(topFaceRef.current.position.y, height, 0.1);
    }
  });

  const COLS = 12;
  const ROWS = 9;

  return (
    <group>
      {/* Back face net */}
      <mesh ref={backFaceRef} position={[0, height / 2, -depth]}>
        <planeGeometry args={[width, height, COLS, ROWS]} />
        <meshStandardMaterial
          color="#DDDDDD"
          transparent
          opacity={0.32}
          wireframe
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Left side net */}
      <mesh position={[-width / 2, height / 2, -depth / 2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[depth, height, 6, ROWS]} />
        <meshStandardMaterial
          color="#CCCCCC"
          transparent
          opacity={0.24}
          wireframe
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Right side net */}
      <mesh position={[width / 2, height / 2, -depth / 2]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[depth, height, 6, ROWS]} />
        <meshStandardMaterial
          color="#CCCCCC"
          transparent
          opacity={0.24}
          wireframe
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Top face net */}
      <mesh ref={topFaceRef} position={[0, height, -depth / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, depth, COLS, 6]} />
        <meshStandardMaterial
          color="#DDDDDD"
          transparent
          opacity={0.28}
          wireframe
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
