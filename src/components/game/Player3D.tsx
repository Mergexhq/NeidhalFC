"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, MathUtils } from "three";
import type { GamePhase } from "@/types/game";

interface PlayerProps {
  phase: GamePhase;
  shootT: number;
}

export function Player3D({ phase, shootT }: PlayerProps) {
  const playerRef = useRef<Group>(null!);
  const chestRef = useRef<Group>(null!);
  const rightLegRef = useRef<Group>(null!);
  const leftArmRef = useRef<Group>(null!);
  const rightArmRef = useRef<Group>(null!);

  useFrame(({ clock }) => {
    if (!playerRef.current) return;
    const t = clock.getElapsedTime();

    // ── Kicking Animation (linked to shootT) ──
    if (phase === "shooting" || phase === "result") {
      // 1. Kick follow-through: right leg swings forward fast, then slowly returns
      // During initial flight (shootT 0 -> 0.35), hold the high follow-through pose
      const swingT = Math.min(shootT * 3, 1);
      const returnT = Math.max(0, (shootT - 0.5) * 2);
      
      const kickAngle = MathUtils.lerp(0, -1.3, swingT) + MathUtils.lerp(0, 1.3, returnT);
      if (rightLegRef.current) {
        rightLegRef.current.rotation.x = kickAngle;
      }
      
      // Torso leans forward during kick
      const leanAngle = MathUtils.lerp(0, 0.3, swingT) + MathUtils.lerp(0, -0.3, returnT);
      if (chestRef.current) {
        chestRef.current.rotation.x = leanAngle;
      }

      // Arms swing back for balance
      const leftArmAngle = MathUtils.lerp(0.4, -0.6, swingT) + MathUtils.lerp(0, 0.6, returnT);
      const rightArmAngle = MathUtils.lerp(-0.4, 0.8, swingT) + MathUtils.lerp(0, -0.8, returnT);
      if (leftArmRef.current) leftArmRef.current.rotation.x = leftArmAngle;
      if (rightArmRef.current) rightArmRef.current.rotation.x = rightArmAngle;

      // Slight shift forward during kick
      const shiftZ = MathUtils.lerp(0, -0.2, swingT) + MathUtils.lerp(0, 0.2, returnT);
      playerRef.current.position.z = 4.3 + shiftZ;

    } else {
      // ── Idle/Aiming Breathing Animation ──
      const breath = Math.sin(t * 2.0) * 0.015;
      
      if (chestRef.current) {
        chestRef.current.scale.set(1 + breath, 1 + breath, 1 + breath);
        chestRef.current.rotation.x = 0;
      }
      if (rightLegRef.current) {
        rightLegRef.current.rotation.x = 0.05 + Math.sin(t * 1.5) * 0.02; // slight sway
      }
      if (leftArmRef.current) {
        leftArmRef.current.rotation.z = 0.3 + Math.sin(t * 2.0) * 0.02;
        leftArmRef.current.rotation.x = 0;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = -0.3 - Math.sin(t * 2.0) * 0.02;
        rightArmRef.current.rotation.x = 0;
      }
      playerRef.current.position.z = 4.3; // Reset
    }
  });

  return (
    <group ref={playerRef} position={[0, 0, 4.3]} rotation={[0, 0, 0]}>
      {/* Base shadow grounding */}
      <mesh position={[0, -0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.34, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.12} />
      </mesh>
      
      <PlayerBody 
        chestRef={chestRef} 
        rightLegRef={rightLegRef} 
        leftArmRef={leftArmRef} 
        rightArmRef={rightArmRef} 
      />
    </group>
  );
}

// ── Mannequin Player Body Elements ──
interface BodyProps {
  chestRef: React.RefObject<Group | null>;
  rightLegRef: React.RefObject<Group | null>;
  leftArmRef: React.RefObject<Group | null>;
  rightArmRef: React.RefObject<Group | null>;
}

function PlayerBody({ chestRef, rightLegRef, leftArmRef, rightArmRef }: BodyProps) {
  const JERSEY  = "#0B1F3A"; // Brand Navy
  const SHORTS  = "#ECDAB9"; // Brand Gold
  const SKIN    = "#FAF2E6"; // Cream
  const ACCENT  = "#FFFFFF"; // Clean White

  return (
    <group position={[0, 0.15, 0]}>
      {/* ── Torso & Pelvis ── */}
      <group ref={chestRef}>
        {/* Torso */}
        <mesh castShadow position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.18, 0.13, 0.5, 16]} />
          <meshStandardMaterial color={JERSEY} roughness={0.4} metalness={0.15} />
        </mesh>
        
        {/* Shoulders */}
        <mesh castShadow position={[0, 1.05, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color={JERSEY} roughness={0.4} />
        </mesh>

        {/* Pelvis Shorts */}
        <mesh castShadow position={[0, 0.55, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color={SHORTS} roughness={0.5} />
        </mesh>
      </group>

      {/* ── Head ── */}
      <group position={[0, 1.28, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.14, 20, 20]} />
          <meshStandardMaterial color={SKIN} roughness={0.6} />
        </mesh>
        {/* Hair Cap (White/Gold Band/Sculpt) */}
        <mesh position={[0, 0.05, -0.02]} rotation={[0.25, 0, 0]}>
          <sphereGeometry args={[0.142, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={SHORTS} roughness={0.7} />
        </mesh>
      </group>

      {/* ── Arms ── */}
      {/* Left Arm */}
      <group ref={leftArmRef} position={[-0.20, 1.02, 0]} rotation={[0, 0, 0.3]}>
        <mesh castShadow position={[0, -0.18, 0]}>
          <cylinderGeometry args={[0.045, 0.038, 0.36, 12]} />
          <meshStandardMaterial color={JERSEY} roughness={0.4} />
        </mesh>
        <mesh castShadow position={[0, -0.42, 0]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial color={SKIN} roughness={0.6} />
        </mesh>
      </group>

      {/* Right Arm */}
      <group ref={rightArmRef} position={[0.20, 1.02, 0]} rotation={[0, 0, -0.3]}>
        <mesh castShadow position={[0, -0.18, 0]}>
          <cylinderGeometry args={[0.045, 0.038, 0.36, 12]} />
          <meshStandardMaterial color={JERSEY} roughness={0.4} />
        </mesh>
        <mesh castShadow position={[0, -0.42, 0]}>
          <sphereGeometry args={[0.045, 12, 12]} />
          <meshStandardMaterial color={SKIN} roughness={0.6} />
        </mesh>
      </group>

      {/* ── Legs ── */}
      {/* Left Leg (Supporting) */}
      <group position={[-0.10, 0.45, 0]}>
        <mesh castShadow position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.065, 0.055, 0.44, 12]} />
          <meshStandardMaterial color={SKIN} roughness={0.6} />
        </mesh>
        {/* Shoe */}
        <mesh castShadow position={[0, -0.48, 0.03]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.16]} />
          <meshStandardMaterial color={JERSEY} roughness={0.4} />
        </mesh>
      </group>

      {/* Right Leg (Kicking) */}
      <group ref={rightLegRef} position={[0.10, 0.45, 0]}>
        <mesh castShadow position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.065, 0.055, 0.44, 12]} />
          <meshStandardMaterial color={SKIN} roughness={0.6} />
        </mesh>
        {/* Shoe */}
        <mesh castShadow position={[0, -0.48, 0.03]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.16]} />
          <meshStandardMaterial color={SHORTS} roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}