"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";
import { GOAL_HALF_W, GOAL_TOP_Y } from "@/lib/ballTrajectory";

const GOAL_Z     = -4.2;
const POST_R     = 0.06;
const POST_COLOR = "#DADADA";

interface GoalProps {
  netShake?: boolean; // ripple the net when a goal is scored
}

export function Goal3D({ netShake = false }: GoalProps) {
  const netRef = useRef<Group>(null!);

  useFrame(({ clock }) => {
    if (!netRef.current) return;
    if (netShake) {
      netRef.current.position.x = Math.sin(clock.elapsedTime * 28) * 0.06 * Math.exp(-clock.elapsedTime % 1.5 * 3);
    } else {
      netRef.current.position.x = 0;
    }
  });

  const postHeight = GOAL_TOP_Y;
  const goalWidth  = GOAL_HALF_W * 2;

  return (
    <group position={[0, 0, GOAL_Z]}>
      {/* Left post */}
      <mesh castShadow receiveShadow position={[-GOAL_HALF_W, postHeight / 2, 0]}>
        <cylinderGeometry args={[POST_R, POST_R, postHeight, 8]} />
        <meshStandardMaterial color={POST_COLOR} roughness={0.35} metalness={0.6} />
      </mesh>

      {/* Right post */}
      <mesh castShadow receiveShadow position={[GOAL_HALF_W, postHeight / 2, 0]}>
        <cylinderGeometry args={[POST_R, POST_R, postHeight, 8]} />
        <meshStandardMaterial color={POST_COLOR} roughness={0.35} metalness={0.6} />
      </mesh>

      {/* Crossbar */}
      <mesh castShadow receiveShadow position={[0, postHeight, 0]}>
        <boxGeometry args={[goalWidth + POST_R * 2, POST_R * 2, POST_R * 2]} />
        <meshStandardMaterial color={POST_COLOR} roughness={0.35} metalness={0.6} />
      </mesh>

      {/* Back top bar */}
      <mesh receiveShadow position={[0, postHeight, -0.6]}>
        <boxGeometry args={[goalWidth, POST_R * 1.5, POST_R * 1.5]} />
        <meshStandardMaterial color={POST_COLOR} roughness={0.35} metalness={0.6} />
      </mesh>

      {/* Net — horizontal & vertical line segments via thin planes */}
      <group ref={netRef}>
        <Net width={goalWidth} height={postHeight} depth={0.65} />
      </group>
    </group>
  );
}

// ── Simple net: overlapping planes ─────────────────────────────────────────────
function Net({ width, height, depth }: { width: number; height: number; depth: number }) {
  const COLS = 9;
  const ROWS = 7;
  const col_step = width / COLS;
  const row_step = height / ROWS;

  const verticalLines   = Array.from({ length: COLS + 1 }, (_, i) => i * col_step - width / 2);
  const horizontalLines = Array.from({ length: ROWS + 1 }, (_, i) => i * row_step);

  const netMat = <meshStandardMaterial color="#AAAAAA" transparent opacity={0.35} roughness={0.8} side={2} />;

  return (
    <group>
      {/* Back face */}
      <mesh position={[0, height / 2, -depth]}>
        <planeGeometry args={[width, height, COLS, ROWS]} />
        <meshStandardMaterial
          color="#BBBBBB"
          transparent
          opacity={0.22}
          wireframe
          side={2}
        />
      </mesh>

      {/* Vertical side faces */}
      {[-width / 2, width / 2].map((x, i) => (
        <mesh
          key={i}
          position={[x, height / 2, -depth / 2]}
          rotation={[0, Math.PI / 2, 0]}
        >
          <planeGeometry args={[depth, height, 4, ROWS]} />
          <meshStandardMaterial color="#BBBBBB" transparent opacity={0.18} wireframe side={2} />
        </mesh>
      ))}

      {/* Top face */}
      <mesh position={[0, height, -depth / 2]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, depth, COLS, 3]} />
        <meshStandardMaterial color="#BBBBBB" transparent opacity={0.18} wireframe side={2} />
      </mesh>
    </group>
  );
}
