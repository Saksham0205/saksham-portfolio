"use client";

import { useMemo } from "react";
import * as THREE from "three";
import { Frame } from "../helpers";
import { PALETTE, sampleCamera } from "../layout";

const WIDTH = 7.5;

/**
 * A doorway at each transition between rooms. Positions are sampled from the
 * camera path itself, so the camera always passes through the opening.
 */
export function Portals({ mobile }: { mobile: boolean }) {
  const portals = useMemo(() => {
    // The camera leaves a room with its hold complete, so sample with full drift.
    const locals = new Float32Array(10).fill(1);
    const pos = new THREE.Vector3();
    const ahead = new THREE.Vector3();
    const target = new THREE.Vector3();
    // Transitions: signal→omni, omni→spyne, spyne→ajnabee, ajnabee→lab, lab→about.
    return [1, 2, 3, 4, 5].map((i) => {
      sampleCamera(i + 0.5, locals, mobile, pos, target);
      const p = pos.clone();
      sampleCamera(i + 0.55, locals, mobile, ahead, target);
      const dir = ahead.sub(p);
      return {
        key: i,
        position: [p.x, 0, p.z] as [number, number, number],
        rotation: Math.atan2(dir.x, dir.z),
        height: Math.max(p.y + 2.4, 6),
      };
    });
  }, [mobile]);

  return (
    <group>
      {portals.map((p) => (
        <group key={p.key} position={p.position} rotation-y={p.rotation}>
          <mesh position={[-WIDTH / 2, p.height / 2, 0]}>
            <boxGeometry args={[0.14, p.height, 0.5]} />
            <meshStandardMaterial color={PALETTE.graphite} roughness={0.7} metalness={0.2} />
          </mesh>
          <mesh position={[WIDTH / 2, p.height / 2, 0]}>
            <boxGeometry args={[0.14, p.height, 0.5]} />
            <meshStandardMaterial color={PALETTE.graphite} roughness={0.7} metalness={0.2} />
          </mesh>
          <mesh position={[0, p.height, 0]}>
            <boxGeometry args={[WIDTH + 0.14, 0.14, 0.5]} />
            <meshStandardMaterial color={PALETTE.graphite} roughness={0.7} metalness={0.2} />
          </mesh>
          <Frame width={WIDTH - 0.3} height={p.height - 0.3} position={[0, p.height / 2, 0.26]} opacity={0.18} />
          <mesh position={[0, p.height - 0.2, 0.27]}>
            <planeGeometry args={[0.6, 0.03]} />
            <meshBasicMaterial color={PALETTE.signal} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
