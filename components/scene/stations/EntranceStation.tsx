"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { frame, ui } from "@/lib/lab-state";
import { clamp } from "@/lib/math";
import { Frame, sceneTime, useRoomPresence } from "../helpers";
import { PALETTE } from "../layout";

const W = 5.4;
const H = 8.6;

/** The monolithic doorway you enter the lab through, with light spilling out of it. */
export function EntranceStation() {
  const { groupRef, active } = useRoomPresence(0);
  const scan = useRef<THREE.Mesh>(null);
  const spill = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 }, uOpen: { value: 0 }, uColor: { value: new THREE.Color(PALETTE.bone) } },
        vertexShader: /* glsl */ `
          varying vec2 vUv;
          void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
        `,
        fragmentShader: /* glsl */ `
          uniform float uTime;
          uniform float uOpen;
          uniform vec3 uColor;
          varying vec2 vUv;
          void main() {
            float edge = smoothstep(0.0, 0.18, vUv.x) * smoothstep(1.0, 0.82, vUv.x);
            float floorGlow = smoothstep(0.55, 0.0, vUv.y);
            float lines = 0.5 + 0.5 * sin(vUv.y * 180.0 - uTime * 2.0);
            float a = edge * (0.05 + floorGlow * 0.16 + lines * 0.025) * (0.6 + uOpen * 0.8);
            gl_FragColor = vec4(uColor, a);
          }
        `,
      }),
    [],
  );

  useFrame(({ clock }) => {
    if (!active.current) return;
    const t = sceneTime(clock.elapsedTime);
    spill.uniforms.uTime.value = t;
    spill.uniforms.uOpen.value = clamp(frame.param * 2) + (ui.get().booted ? 0.2 : 0);
    if (scan.current) scan.current.position.y = 0.2 + ((t * 0.9) % 1) * (H - 0.4);
  });

  return (
    <group ref={groupRef}>
      {/* Pillars and lintel */}
      {[-W / 2 - 0.35, W / 2 + 0.35].map((x) => (
        <mesh key={x} position={[x, H / 2, 0]}>
          <boxGeometry args={[0.7, H, 1.2]} />
          <meshStandardMaterial color={PALETTE.graphite} roughness={0.85} metalness={0.15} />
        </mesh>
      ))}
      <mesh position={[0, H + 0.35, 0]}>
        <boxGeometry args={[W + 1.4, 0.7, 1.2]} />
        <meshStandardMaterial color={PALETTE.graphite} roughness={0.85} metalness={0.15} />
      </mesh>
      <Frame width={W} height={H} position={[0, H / 2, 0.61]} opacity={0.35} />

      {/* Light spilling from inside the lab */}
      <mesh position={[0, H / 2, -0.2]} material={spill}>
        <planeGeometry args={[W, H]} />
      </mesh>
      <mesh ref={scan} position={[0, 1, 0.62]}>
        <planeGeometry args={[W, 0.012]} />
        <meshBasicMaterial color={PALETTE.signal} transparent opacity={0.7} toneMapped={false} />
      </mesh>

      {/* Threshold line on the floor */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.015, 0.9]}>
        <planeGeometry args={[W + 1.4, 0.04]} />
        <meshBasicMaterial color={PALETTE.signal} toneMapped={false} />
      </mesh>
    </group>
  );
}
