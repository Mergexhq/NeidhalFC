"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Group, MathUtils } from "three";
import type { KeeperAction } from "@/types/game";
import { GOAL_Z, GOAL_TOP_Y } from "@/lib/ballTrajectory";

interface KeeperProps {
  action:   KeeperAction;
  shooting: boolean;
}

const KEEPER_Y       = 0.0;
const KEEPER_Z       = GOAL_Z + 0.8;  // slightly in front of goal line
const DIVE_OFFSET_X  = 1.3;
const DIVE_OFFSET_Y  = 0.7;

export function Keeper3D({ action, shooting }: KeeperProps) {
  const groupRef = useRef<Group>(null!);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Target position based on action
    const targetX =
      action === "left"  ? -DIVE_OFFSET_X :
      action === "right" ?  DIVE_OFFSET_X : 0;
    const targetY = (shooting && action !== "center") ? KEEPER_Y + DIVE_OFFSET_Y : KEEPER_Y;
    const targetRz =
      action === "left"  ?  0.6 :
      action === "right" ? -0.6 : 0;

    // Lerp toward target (fast when shooting, slow when swaying)
    const speed = shooting ? 10 : 2.5;
    groupRef.current.position.x = MathUtils.lerp(groupRef.current.position.x, targetX, delta * speed);
    groupRef.current.position.y = MathUtils.lerp(groupRef.current.position.y, targetY, delta * speed);
    groupRef.current.rotation.z = MathUtils.lerp(groupRef.current.rotation.z, targetRz, delta * speed);
  });

  return (
    <group ref={groupRef} position={[0, KEEPER_Y, KEEPER_Z]}>
      <KeeperBody />
    </group>
  );
}

// ── Low-poly goalkeeper built from primitives ──────────────────────────────────
function KeeperBody() {
  const JERSEY  = "#1A3A6B"; // Neidhal FC navy
  const SHORTS  = "#F5C842"; // gold
  const SKIN    = "#FDBCB4";
  const GLOVE   = "#F5F5F5";

  return (
    <group>
      {/* Torso */}
      <mesh castShadow position={[0, 1.05, 0]}>
        <boxGeometry args={[0.42, 0.55, 0.22]} />
        <meshStandardMaterial color={JERSEY} roughness={0.85} />
      </mesh>

      {/* Shorts */}
      <mesh castShadow position={[0, 0.72, 0]}>
        <boxGeometry args={[0.40, 0.22, 0.20]} />
        <meshStandardMaterial color={SHORTS} roughness={0.85} />
      </mesh>

      {/* Head */}
      <mesh castShadow position={[0, 1.52, 0]}>
        <sphereGeometry args={[0.17, 10, 10]} />
        <meshStandardMaterial color={SKIN} roughness={0.9} />
      </mesh>

      {/* Left arm */}
      <mesh castShadow position={[-0.32, 1.12, 0]} rotation={[0, 0, 0.4]}>
        <boxGeometry args={[0.13, 0.42, 0.13]} />
        <meshStandardMaterial color={JERSEY} roughness={0.85} />
      </mesh>

      {/* Right arm */}
      <mesh castShadow position={[0.32, 1.12, 0]} rotation={[0, 0, -0.4]}>
        <boxGeometry args={[0.13, 0.42, 0.13]} />
        <meshStandardMaterial color={JERSEY} roughness={0.85} />
      </mesh>

      {/* Left glove */}
      <mesh castShadow position={[-0.45, 0.95, 0]}>
        <boxGeometry args={[0.14, 0.14, 0.10]} />
        <meshStandardMaterial color={GLOVE} roughness={0.6} />
      </mesh>

      {/* Right glove */}
      <mesh castShadow position={[0.45, 0.95, 0]}>
        <boxGeometry args={[0.14, 0.14, 0.10]} />
        <meshStandardMaterial color={GLOVE} roughness={0.6} />
      </mesh>

      {/* Left leg */}
      <mesh castShadow position={[-0.12, 0.42, 0]}>
        <boxGeometry args={[0.16, 0.32, 0.16]} />
        <meshStandardMaterial color={SKIN} roughness={0.9} />
      </mesh>

      {/* Right leg */}
      <mesh castShadow position={[0.12, 0.42, 0]}>
        <boxGeometry args={[0.16, 0.32, 0.16]} />
        <meshStandardMaterial color={SKIN} roughness={0.9} />
      </mesh>

      {/* Left boot */}
      <mesh castShadow position={[-0.12, 0.22, 0.03]}>
        <boxGeometry args={[0.18, 0.12, 0.24]} />
        <meshStandardMaterial color="#111111" roughness={0.8} />
      </mesh>

      {/* Right boot */}
      <mesh castShadow position={[0.12, 0.22, 0.03]}>
        <boxGeometry args={[0.18, 0.12, 0.24]} />
        <meshStandardMaterial color="#111111" roughness={0.8} />
      </mesh>

      {/* Jersey number "1" badge */}
      <mesh position={[0, 1.05, 0.12]}>
        <planeGeometry args={[0.12, 0.14]} />
        <meshStandardMaterial color="#FFFFFF" roughness={1} />
      </mesh>
    </group>
  );
}
