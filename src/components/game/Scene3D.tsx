"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import { Sand3D }   from "./Sand3D";
import { Goal3D }   from "./Goal3D";
import { Ball3D }   from "./Ball3D";
import { Keeper3D } from "./Keeper3D";
import type { GamePhase, AimTarget, KeeperAction } from "@/types/game";

// ── Camera target positions per phase ─────────────────────────────────────────
const CAMERA_STATES: Record<string, { pos: [number, number, number]; look: [number, number, number] }> = {
  idle:      { pos: [0,  3.5,  9  ], look: [0, 1.2, 0   ] },
  countdown: { pos: [0,  3.0,  8  ], look: [0, 1.2, 0   ] },
  ready:     { pos: [0,  2.2,  7.5], look: [0, 1.0, -1  ] },
  aiming:    { pos: [0,  2.0,  7.2], look: [0, 1.0, -1  ] },
  shooting:  { pos: [0.5, 2.8,  6.5], look: [0, 1.5, -3  ] },
  result:    { pos: [0,  4.5,  7  ], look: [0, 1.0, -2  ] },
};

interface SceneInnerProps {
  phase:      GamePhase;
  shootT:     number;
  aimTarget:  AimTarget;
  keeperPos:  KeeperAction;
  cameraShake: boolean;
  netShake:   boolean;
}

// Inner component — has access to R3F context (useThree, useFrame)
function SceneInner({ phase, shootT, aimTarget, keeperPos, cameraShake, netShake }: SceneInnerProps) {
  const { camera } = useThree();
  const targetPosRef  = useRef(new Vector3(0, 3.5, 9));
  const targetLookRef = useRef(new Vector3(0, 1.2, 0));

  useFrame((_, delta) => {
    const state     = CAMERA_STATES[phase] ?? CAMERA_STATES.idle;
    const shakeAmt  = cameraShake ? 0.08 : 0;

    targetPosRef.current.set(...state.pos);
    targetLookRef.current.set(...state.look);

    camera.position.lerp(targetPosRef.current, delta * 3);

    const lookX = targetLookRef.current.x + (cameraShake ? (Math.random() - 0.5) * shakeAmt : 0);
    const lookY = targetLookRef.current.y + (cameraShake ? (Math.random() - 0.5) * shakeAmt : 0);
    camera.lookAt(lookX, lookY, targetLookRef.current.z);
  });

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.7} color="#FFF4E0" />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.8}
        color="#FFE8A0"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-5, 4, -4]} intensity={0.3} color="#A0C8FF" />

      {/* Scene objects */}
      <Sand3D />
      <Goal3D netShake={netShake} />
      <Ball3D phase={phase} shootT={shootT} aimTarget={aimTarget} />
      <Keeper3D action={keeperPos} shooting={phase === "shooting" || phase === "result"} />

      {/* Subtle fog for depth */}
      <fog attach="fog" args={["#0D1B2A", 12, 40]} />
    </>
  );
}

// ── Public component — renders the Canvas ─────────────────────────────────────
interface Scene3DProps extends SceneInnerProps {
  className?: string;
}

export function Scene3D({ className = "", ...innerProps }: Scene3DProps) {
  return (
    <Canvas
      className={className}
      shadows
      camera={{ position: [0, 3.5, 9], fov: 52, near: 0.1, far: 80 }}
      gl={{ antialias: true, alpha: false }}
      style={{ background: "linear-gradient(180deg,#0D1B2A 0%,#1A3A2A 60%,#2C5A2C 100%)" }}
    >
      <SceneInner {...innerProps} />
    </Canvas>
  );
}
