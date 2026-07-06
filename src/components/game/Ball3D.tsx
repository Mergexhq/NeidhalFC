"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { getBallPosition, getBallSpin, BALL_START } from "@/lib/ballTrajectory";
import type { AimTarget } from "@/types/game";

interface BallProps {
  phase:     string;
  shootT:    number;      // 0→1 during shooting phase
  aimTarget: AimTarget;
}

const BALL_RADIUS = 0.20;

export function Ball3D({ phase, shootT, aimTarget }: BallProps) {
  const ballRef      = useRef<Mesh>(null!);
  const shadowRef    = useRef<Mesh>(null!);

  useFrame(() => {
    if (!ballRef.current) return;

    let pos;
    if (phase === "shooting" || phase === "result") {
      pos = getBallPosition(aimTarget.x, aimTarget.y, shootT);
    } else {
      // Idle: breathe gently on the spot
      pos = BALL_START.clone();
      pos.y += Math.sin(Date.now() * 0.002) * 0.015;
    }

    ballRef.current.position.copy(pos);

    // Spin during flight
    if (phase === "shooting") {
      const spin = getBallSpin(shootT);
      ballRef.current.rotation.x = spin;
      ballRef.current.rotation.z = spin * 0.4;
    }

    // Shadow: project onto sand (y=0), scale/fade with height
    if (shadowRef.current) {
      shadowRef.current.position.set(pos.x, 0.005, pos.z);
      const height      = Math.max(0, pos.y);
      const shadowScale = Math.max(0.2, 1 - height * 0.12);
      shadowRef.current.scale.setScalar(shadowScale);
      const mat = shadowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 0.35 - height * 0.04);
    }
  });

  return (
    <group>
      {/* Ground shadow */}
      <mesh ref={shadowRef} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[BALL_RADIUS * 1.4, 24]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.30} depthWrite={false} />
      </mesh>

      {/* Ball body */}
      <mesh ref={ballRef} castShadow>
        <icosahedronGeometry args={[BALL_RADIUS, 2]} />
        <meshStandardMaterial
          color="#F8F8F4"
          roughness={0.30}
          metalness={0.05}
        />
      </mesh>

      {/* Black patches — 6 pentagon-ish discs placed on icosphere surface */}
      <BallPatches ballRef={ballRef} />
    </group>
  );
}

// Patches rendered as a child group that follows the ball mesh
import { forwardRef, RefObject } from "react";
import * as THREE from "three";

function BallPatches({ ballRef }: { ballRef: RefObject<Mesh | null> }) {
  const patchRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (!patchRef.current || !ballRef.current) return;
    patchRef.current.position.copy(ballRef.current.position);
    patchRef.current.rotation.copy(ballRef.current.rotation);
  });

  // 6 pentagon patch positions on unit sphere, scaled to ball radius
  const patches: [number, number, number][] = [
    [0, 1, 0],                     // top
    [0, -1, 0],                    // bottom
    [0.894, 0.447, 0],             // right
    [-0.894, 0.447, 0],            // left
    [0.276, -0.447, 0.851],        // front-right
    [-0.276, -0.447, 0.851],       // front-left
  ];

  return (
    <group ref={patchRef}>
      {patches.map(([x, y, z], i) => {
        // Normal points outward, position on surface
        const pos = new THREE.Vector3(x, y, z).multiplyScalar(BALL_RADIUS * 1.01);
        const normal = new THREE.Vector3(x, y, z);
        // Create rotation to orient disc toward outward normal
        const quat = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 0, 1),
          normal,
        );
        return (
          <mesh key={i} position={pos} quaternion={quat}>
            <circleGeometry args={[BALL_RADIUS * 0.34, 5]} />
            <meshStandardMaterial color="#111111" roughness={0.4} depthWrite={false} />
          </mesh>
        );
      })}
    </group>
  );
}
