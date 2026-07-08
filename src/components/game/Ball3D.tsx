"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { Group, Vector3 } from "three";
import { getBallPosition, getBallSpin, BALL_START } from "@/lib/ballTrajectory";
import type { AimTarget } from "@/types/game";
import * as THREE from "three";

// Pre-load the GLTF asset so it's ready before the game starts
useGLTF.preload("/Ball/Ball%20BLEND.gltf");

interface BallProps {
  phase:     string;
  shootT:    number;   // 0→1 during shooting phase
  aimTarget: AimTarget;
}

// Model bounding box ≈ ±1.006 units — scale to match the scene's BALL_RADIUS
const BALL_RADIUS  = 0.20;
const BALL_SCALE   = BALL_RADIUS / 1.006; // ≈ 0.199
const TRAIL_LENGTH = 5;

/** Apply brand colours to a cloned MeshStandardMaterial based on its name */
function applyBallMaterial(mat: THREE.MeshStandardMaterial) {
  if (mat.name === "Bianco") {
    mat.color.set("#F5F5F5");   // Soft white panels
    mat.roughness = 0.45;
    mat.metalness = 0.04;
  } else if (mat.name === "Nero.001") {
    mat.color.set("#0B1F3A");   // Brand navy black patches
    mat.roughness = 0.55;
    mat.metalness = 0.04;
  }
  mat.needsUpdate = true;
}

export function Ball3D({ phase, shootT, aimTarget }: BallProps) {
  const { scene } = useGLTF("/Ball/Ball%20BLEND.gltf");

  // Clone scene once and override material colours.
  // We deep-clone materials so we never mutate the cached shared scene.
  const ballScene = useMemo(() => {
    const clone = scene.clone(true); // true = deep clone children
    clone.traverse((child) => {
      if (!(child as THREE.Mesh).isMesh) return;
      const mesh = child as THREE.Mesh;
      mesh.castShadow    = true;
      mesh.receiveShadow = false;

      if (Array.isArray(mesh.material)) {
        mesh.material = mesh.material.map((m) => {
          const cloned = (m as THREE.MeshStandardMaterial).clone();
          applyBallMaterial(cloned as THREE.MeshStandardMaterial);
          return cloned;
        });
      } else {
        const cloned = (mesh.material as THREE.MeshStandardMaterial).clone();
        applyBallMaterial(cloned as THREE.MeshStandardMaterial);
        mesh.material = cloned;
      }
    });
    return clone;
  }, [scene]);

  const ballGroupRef = useRef<Group>(null!);
  const shadowRef    = useRef<THREE.Mesh>(null!);
  const trailRef     = useRef<Group>(null!);

  // History of positions for speed trail
  const trailHistory = useRef<Vector3[]>(
    Array.from({ length: TRAIL_LENGTH }, () => new Vector3(0, -99, 0))
  );

  useFrame(() => {
    if (!ballGroupRef.current) return;

    let pos: Vector3;
    if (phase === "shooting" || phase === "result") {
      pos = getBallPosition(aimTarget.x, aimTarget.y, shootT);
    } else {
      // Idle: gentle floating bob
      pos = BALL_START.clone();
      pos.y += Math.sin(Date.now() * 0.0025) * 0.012;
    }

    ballGroupRef.current.position.copy(pos);

    // Spin during flight (multi-axis)
    if (phase === "shooting") {
      const spin = getBallSpin(shootT) * 1.5;
      ballGroupRef.current.rotation.x = spin;
      ballGroupRef.current.rotation.y = spin * 0.5;
      ballGroupRef.current.rotation.z = spin * 0.3;
    }

    // Shadow: project onto ground, scale/fade with height
    if (shadowRef.current) {
      shadowRef.current.position.set(pos.x, 0.006, pos.z);
      const height      = Math.max(0, pos.y);
      const shadowScale = Math.max(0.15, 1.1 - height * 0.16);
      shadowRef.current.scale.setScalar(shadowScale);
      const mat = shadowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = Math.max(0, 0.26 - height * 0.05);
    }

    // Speed trail logic
    if (trailRef.current) {
      if (phase === "shooting" && shootT > 0.02 && shootT < 0.95) {
        const history = trailHistory.current;
        history.pop();
        history.unshift(pos.clone());

        const meshes = trailRef.current.children;
        for (let i = 0; i < meshes.length; i++) {
          const mesh     = meshes[i] as THREE.Mesh;
          const trailPos = history[i];
          if (trailPos) {
            mesh.position.copy(trailPos);
            const factor = 1 - i / TRAIL_LENGTH;
            mesh.scale.setScalar(factor);
            const mat = mesh.material as THREE.MeshBasicMaterial;
            mat.opacity = 0.30 * factor;
          }
        }
      } else {
        // Hide trail
        trailHistory.current.forEach((p) => p.set(0, -99, 0));
        trailRef.current.children.forEach((mesh) => {
          mesh.position.set(0, -99, 0);
        });
      }
    }
  });

  return (
    <group>
      {/* Soft ground contact shadow */}
      <mesh ref={shadowRef} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[BALL_RADIUS * 1.3, 32]} />
        <meshBasicMaterial color="#0b131f" transparent opacity={0.24} depthWrite={false} />
      </mesh>

      {/* Ball speed trail */}
      <group ref={trailRef}>
        {Array.from({ length: TRAIL_LENGTH }).map((_, idx) => (
          <mesh key={idx} position={[0, -99, 0]}>
            <sphereGeometry args={[BALL_RADIUS * 0.85, 8, 8]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0} depthWrite={false} />
          </mesh>
        ))}
      </group>

      {/* Real 3D football — GLTF model with corrected Bianco + Nero.001 materials */}
      <group
        ref={ballGroupRef}
        scale={[BALL_SCALE, BALL_SCALE, BALL_SCALE]}
      >
        <primitive object={ballScene} />
      </group>
    </group>
  );
}
