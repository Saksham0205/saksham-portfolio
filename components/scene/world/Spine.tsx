"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { frame, ui } from "@/lib/lab-state";
import { smoothstep } from "@/lib/math";
import { PALETTE, SPINE_POINTS } from "../layout";

type LineRef = React.ComponentRef<typeof Line>;

/**
 * The data bus that runs under every room. Pulses travel along it faster
 * when you scroll faster, and it lights up fully at the end.
 */
export function Spine() {
  const points = useMemo(
    () => new THREE.CatmullRomCurve3(SPINE_POINTS.map((p) => new THREE.Vector3(...p))).getPoints(480),
    [],
  );
  const pulse = useRef<LineRef>(null);

  useFrame((_, dt) => {
    const line = pulse.current;
    if (!line || ui.get().reduced) return;
    const m = line.material as unknown as { dashOffset: number; opacity: number };
    m.dashOffset -= Math.min(dt, 0.1) * (3 + Math.min(Math.abs(frame.velocity), 60) * 0.5);
    m.opacity = 0.55 + smoothstep(8, 9, frame.param) * 0.45;
  });

  return (
    <group>
      <Line points={points} color={PALETTE.bone} lineWidth={1} transparent opacity={0.14} />
      <Line
        ref={pulse}
        points={points}
        color={PALETTE.signal}
        lineWidth={2}
        dashed
        dashSize={0.8}
        gapSize={7}
        transparent
        opacity={0.6}
        toneMapped={false}
      />
    </group>
  );
}
