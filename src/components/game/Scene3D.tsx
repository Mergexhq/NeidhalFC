"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MathUtils, Vector3 } from "three";
import * as THREE from "three";
import { Ball3D }   from "./Ball3D";
import { Keeper3D } from "./Keeper3D";
import { Player3D } from "./Player3D";
import type { GamePhase, AimTarget, KeeperAction } from "@/types/game";

// ── Camera target base positions per phase ──
const CAMERA_STATES: Record<string, { pos: [number, number, number]; look: [number, number, number] }> = {
  idle:      { pos: [0,  3.2,  8.2], look: [0, 1.1, 0   ] },
  countdown: { pos: [0,  2.8,  7.6], look: [0, 1.1, 0   ] },
  ready:     { pos: [0,  2.1,  7.2], look: [0, 0.9, -1  ] },
  aiming:    { pos: [0,  1.9,  6.8], look: [0, 0.9, -1  ] },
  shooting:  { pos: [0.6, 2.5,  5.8], look: [0, 1.2, -3  ] },
  result:    { pos: [0,  4.2,  6.6], look: [0, 0.9, -2  ] },
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
  const targetPosRef  = useRef(new Vector3(0, 3.2, 8.2));
  const targetLookRef = useRef(new Vector3(0, 1.1, 0));

  useFrame(({ clock }, delta) => {
    const state     = CAMERA_STATES[phase] ?? CAMERA_STATES.idle;
    const shakeAmt  = cameraShake ? 0.08 : 0;
    const t         = clock.getElapsedTime();

    // 1. Calculate slow camera breathing drift (Alto's/Nike editorial style)
    let driftX = 0;
    let driftY = 0;
    let driftZ = 0;
    
    if (phase === "idle" || phase === "ready" || phase === "aiming") {
      driftX = Math.sin(t * 0.5) * 0.16;
      driftY = Math.cos(t * 0.4) * 0.08;
      driftZ = Math.sin(t * 0.3) * 0.14;
    }

    targetPosRef.current.set(
      state.pos[0] + driftX, 
      state.pos[1] + driftY, 
      state.pos[2] + driftZ
    );
    targetLookRef.current.set(...state.look);

    // Smooth camera placement
    camera.position.lerp(targetPosRef.current, delta * 3.5);

    // Apply look-at target with subtle screen shake on goal hits
    const lookX = targetLookRef.current.x + (cameraShake ? (Math.random() - 0.5) * shakeAmt : 0);
    const lookY = targetLookRef.current.y + (cameraShake ? (Math.random() - 0.5) * shakeAmt : 0);
    camera.lookAt(lookX, lookY, targetLookRef.current.z);
  });

  return (
    <>
      {/* Warm morning ambient light */}
      <ambientLight intensity={0.9} color="#FFF8EE" />

      {/* Main warm morning sunlight (casting long, soft shadows) */}
      <directionalLight
        position={[12, 9, 7]}
        intensity={2.2}
        color="#FFEAA8"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />

      {/* Crisp rim light from the back left (cool blue sky fill highlights the mannequin silhouettes) */}
      <directionalLight 
        position={[-10, 5, -8]} 
        intensity={0.7} 
        color="#B3D8FD" 
      />

      {/* Soft fill light from the front-left */}
      <directionalLight 
        position={[-6, 3, 5]} 
        intensity={0.3} 
        color="#FFFFFF" 
      />

      {/* Invisible shadow receiver plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial opacity={0.4} />
      </mesh>

      <Ball3D phase={phase} shootT={shootT} aimTarget={aimTarget} />
      <Keeper3D action={keeperPos} shooting={phase === "shooting" || phase === "result"} />
      <Player3D phase={phase} shootT={shootT} />
    </>
  );
}

// ── Public Canvas Component ──
interface Scene3DProps extends SceneInnerProps {
  className?: string;
}

export function Scene3D({ className = "", ...innerProps }: Scene3DProps) {
  return (
    <Canvas
      className={className}
      shadows
      camera={{ position: [0, 3.2, 8.2], fov: 50, near: 0.1, far: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ 
        backgroundImage: "url('/environment.png')",
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <SceneInner {...innerProps} />
    </Canvas>
  );
}
