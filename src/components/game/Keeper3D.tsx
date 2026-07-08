"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, MathUtils } from "three";
import type { KeeperAction } from "@/types/game";
import { GOAL_Z } from "@/lib/ballTrajectory";

interface KeeperProps {
  action:   KeeperAction;
  shooting: boolean;
}

const KEEPER_Y       = 0.0;
const KEEPER_Z       = GOAL_Z + 0.8;  // slightly in front of goal line
const DIVE_OFFSET_X  = 1.35;
const DIVE_OFFSET_Y  = 0.8;

export function Keeper3D({ action, shooting }: KeeperProps) {
  const groupRef = useRef<Group>(null!);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Target position and rotation based on action
    const targetX =
      action === "left"  ? -DIVE_OFFSET_X :
      action === "right" ?  DIVE_OFFSET_X : 0;
    
    const targetY = (shooting && action !== "center") ? KEEPER_Y + DIVE_OFFSET_Y : KEEPER_Y;
    
    const targetRz =
      action === "left"  ?  0.75 :
      action === "right" ? -0.75 : 0;

    const targetRy =
      action === "left"  ?  0.2 :
      action === "right" ? -0.2 : 0;

    // Lerp toward target (fast dive, slow sway)
    const speed = shooting ? 12 : 3.0;
    groupRef.current.position.x = MathUtils.lerp(groupRef.current.position.x, targetX, delta * speed);
    groupRef.current.position.y = MathUtils.lerp(groupRef.current.position.y, targetY, delta * speed);
    groupRef.current.rotation.z = MathUtils.lerp(groupRef.current.rotation.z, targetRz, delta * speed);
    groupRef.current.rotation.y = MathUtils.lerp(groupRef.current.rotation.y, targetRy, delta * speed);
  });

  return (
    <group ref={groupRef} position={[0, KEEPER_Y, KEEPER_Z]}>
      <KeeperMannequin action={action} shooting={shooting} />
    </group>
  );
}

// ── Smooth Primitive Mannequin (LEGO/Nike campaign style) ──
function KeeperMannequin({ action, shooting }: { action: KeeperAction; shooting: boolean }) {
  const JERSEY  = "#0B1F3A"; // Brand Navy
  const SHORTS  = "#ECDAB9"; // Brand Gold
  const SKIN    = "#FAF2E6"; // Cream Skin
  const ACCENT  = "#FFFFFF"; // Clean White
  const GLINT   = "#E0E8F5"; 

  const chestRef = useRef<Group>(null!);
  const leftArmRef = useRef<Group>(null!);
  const rightArmRef = useRef<Group>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    // 1. Idle breathing: slight torso scaling and arm rotation
    if (!shooting) {
      const breath = Math.sin(t * 2.2) * 0.02;
      if (chestRef.current) {
        chestRef.current.scale.set(1 + breath, 1 + breath, 1 + breath);
      }
      if (leftArmRef.current) {
        leftArmRef.current.rotation.z = 0.5 + Math.sin(t * 2.2) * 0.03;
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = -0.5 - Math.sin(t * 2.2) * 0.03;
      }
    } else {
      // 2. Dive poses: raise arms up in defensive block
      if (leftArmRef.current) {
        leftArmRef.current.rotation.z = MathUtils.lerp(leftArmRef.current.rotation.z, action === "left" ? 1.9 : 0.8, 0.15);
      }
      if (rightArmRef.current) {
        rightArmRef.current.rotation.z = MathUtils.lerp(rightArmRef.current.rotation.z, action === "right" ? -1.9 : -0.8, 0.15);
      }
    }
  });

  return (
    <group position={[0, 0.15, 0]}>
      {/* ── Base Stand (Subtle shadow grounding) ── */}
      <mesh position={[0, -0.14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.36, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.15} />
      </mesh>

      {/* ── Pelvis & Torso Group ── */}
      <group ref={chestRef}>
        {/* Torso Capsule */}
        <mesh castShadow position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.18, 0.14, 0.5, 16]} />
          <meshStandardMaterial color={JERSEY} roughness={0.4} metalness={0.15} />
        </mesh>
        
        {/* Chest Shoulder Curve */}
        <mesh castShadow position={[0, 1.05, 0]}>
          <sphereGeometry args={[0.18, 16, 16]} />
          <meshStandardMaterial color={JERSEY} roughness={0.4} />
        </mesh>

        {/* Pelvis Curve */}
        <mesh castShadow position={[0, 0.55, 0]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color={SHORTS} roughness={0.5} />
        </mesh>
      </group>

      {/* ── Head ── */}
      <group position={[0, 1.28, 0]}>
        {/* Head Sphere */}
        <mesh castShadow>
          <sphereGeometry args={[0.14, 20, 20]} />
          <meshStandardMaterial color={SKIN} roughness={0.6} />
        </mesh>
        {/* Hair cap (Stylized visor/sculpt) */}
        <mesh position={[0, 0.05, -0.02]} rotation={[0.2, 0, 0]}>
          <sphereGeometry args={[0.142, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color={JERSEY} roughness={0.7} />
        </mesh>
      </group>

      {/* ── Arms (Capsules) ── */}
      {/* Left Arm Group */}
      <group ref={leftArmRef} position={[-0.20, 1.02, 0]} rotation={[0, 0, 0.5]}>
        <mesh castShadow position={[0, -0.18, 0]}>
          <cylinderGeometry args={[0.05, 0.04, 0.36, 12]} />
          <meshStandardMaterial color={JERSEY} roughness={0.4} />
        </mesh>
        <mesh castShadow position={[0, -0.42, 0]}>
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshStandardMaterial color={GLINT} roughness={0.5} metalness={0.2} /> {/* Glove */}
        </mesh>
      </group>

      {/* Right Arm Group */}
      <group ref={rightArmRef} position={[0.20, 1.02, 0]} rotation={[0, 0, -0.5]}>
        <mesh castShadow position={[0, -0.18, 0]}>
          <cylinderGeometry args={[0.05, 0.04, 0.36, 12]} />
          <meshStandardMaterial color={JERSEY} roughness={0.4} />
        </mesh>
        <mesh castShadow position={[0, -0.42, 0]}>
          <sphereGeometry args={[0.065, 12, 12]} />
          <meshStandardMaterial color={GLINT} roughness={0.5} metalness={0.2} /> {/* Glove */}
        </mesh>
      </group>

      {/* ── Legs (Capsules) ── */}
      {/* Left Leg */}
      <group position={[-0.10, 0.45, 0]}>
        <mesh castShadow position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.065, 0.055, 0.44, 12]} />
          <meshStandardMaterial color={SKIN} roughness={0.6} />
        </mesh>
        {/* Boot */}
        <mesh castShadow position={[0, -0.48, 0.03]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.16]} />
          <meshStandardMaterial color={ACCENT} roughness={0.4} metalness={0.1} />
        </mesh>
      </group>

      {/* Right Leg */}
      <group position={[0.10, 0.45, 0]}>
        <mesh castShadow position={[0, -0.22, 0]}>
          <cylinderGeometry args={[0.065, 0.055, 0.44, 12]} />
          <meshStandardMaterial color={SKIN} roughness={0.6} />
        </mesh>
        {/* Boot */}
        <mesh castShadow position={[0, -0.48, 0.03]} rotation={[0.1, 0, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.16]} />
          <meshStandardMaterial color={ACCENT} roughness={0.4} metalness={0.1} />
        </mesh>
      </group>
    </group>
  );
}

