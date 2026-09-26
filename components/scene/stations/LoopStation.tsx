"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { timeline } from "@/data/milestones";
import { frame } from "@/lib/lab-state";
import { smoothstep } from "@/lib/math";
import { Frame, Glow, Tag, sceneTime, useRoomPresence } from "../helpers";
import { ORIGINS, PALETTE } from "../layout";

const CENTER: [number, number, number] = [0, 3.3, 0];
const R = 2.4;
const PHASES = ["Build", "Ship", "Learn", "Iterate"];
// Clockwise from the top.
const phaseAngle = (i: number) => Math.PI / 2 - (i * Math.PI) / 2;
const TRAIL = 14;

/** The quiet room: one loop, run forever. */
export function LoopStation() {
  const { groupRef, active, labels } = useRoomPresence(6, 8);
  const [hot, setHot] = useState(0);
  const runner = useRef<THREE.Sprite>(null);
  const trail = useRef<(THREE.Sprite | null)[]>([]);
  const posts = useRef<(THREE.Group | null)[]>([]);
  const [postLabels, setPostLabels] = useState(false);

  // Mirror the runner's phase onto the About copy (#loop-words) so text and scene move together.
  useEffect(() => {
    document.getElementById("loop-words")?.setAttribute("data-hot", String(hot));
  }, [hot]);

  const circle = useMemo(
    () => new THREE.EllipseCurve(0, 0, R, R, 0, Math.PI * 2).getPoints(128).map((p) => new THREE.Vector3(p.x, p.y, 0)),
    [],
  );

  useFrame(({ clock }) => {
    if (!active.current) return;
    const t = sceneTime(clock.elapsedTime);
    const a = Math.PI / 2 - t * 0.55;
    runner.current?.position.set(Math.cos(a) * R, Math.sin(a) * R, 0.02);
    trail.current.forEach((s, i) => {
      if (!s) return;
      const ta = a + (i + 1) * 0.07;
      s.position.set(Math.cos(ta) * R, Math.sin(ta) * R, 0.01);
    });
    // Which phase the runner most recently passed
    const travelled = ((t * 0.55) / (Math.PI / 2)) % 4;
    const h = Math.floor(travelled + 0.15) % 4;
    if (h !== hot) setHot(h);

    // Timeline posts rise as you arrive at the record
    const rise = smoothstep(7.3, 8, frame.param);
    posts.current.forEach((p, i) => {
      if (p) p.scale.y = Math.max(0.001, smoothstep(i * 0.12, 0.5 + i * 0.12, rise));
    });
    const wantPostLabels = rise > 0.9 && frame.param < 8.6;
    if (wantPostLabels !== postLabels) setPostLabels(wantPostLabels);
  });

  return (
    <group ref={groupRef} position={ORIGINS.loop}>
      <group position={CENTER}>
        <Line points={circle} color={PALETTE.bone} lineWidth={1.2} transparent opacity={0.35} />
        {PHASES.map((p, i) => {
          const a = phaseAngle(i);
          const pos: [number, number, number] = [Math.cos(a) * R, Math.sin(a) * R, 0];
          const labelPos: [number, number, number] = [Math.cos(a) * (R + 0.65), Math.sin(a) * (R + 0.45), 0];
          return (
            <group key={p}>
              <Frame
                width={0.26}
                height={0.26}
                position={pos}
                rotation-z={Math.PI / 4}
                color={i === hot ? PALETTE.signal : PALETTE.bone}
                opacity={i === hot ? 1 : 0.6}
              />
              {labels && (
                <Tag position={labelPos} tone={i === hot ? "live" : "dim"}>
                  {p}
                </Tag>
              )}
            </group>
          );
        })}
        <Glow ref={runner} scale={0.7} />
        {Array.from({ length: TRAIL }, (_, i) => (
          <Glow
            key={i}
            ref={(el: THREE.Sprite | null) => void (trail.current[i] = el)}
            scale={0.4 * (1 - i / TRAIL)}
            opacity={0.5 * (1 - i / TRAIL)}
          />
        ))}
      </group>

      {/* Timeline: one post per year, each taller than the last */}
      {timeline.map((m, i) => {
        const x = -0.5 + i * 1.3;
        const h = 0.9 + i * 0.45;
        return (
          <group key={m.year} position={[x, 0, 3.4]}>
            <group ref={(el) => void (posts.current[i] = el)} scale-y={0.001}>
              <mesh position={[0, h / 2, 0]}>
                <boxGeometry args={[0.04, h, 0.04]} />
                <meshBasicMaterial color={i === timeline.length - 1 ? PALETTE.signal : PALETTE.bone} toneMapped={false} />
              </mesh>
              <Frame width={0.22} height={0.22} position={[0, h, 0]} rotation-z={Math.PI / 4} opacity={0.9} />
            </group>
            {postLabels && (
              <Tag position={[0, h + 0.45, 0]} tone={i === timeline.length - 1 ? "live" : "dim"}>
                {m.year}
              </Tag>
            )}
          </group>
        );
      })}
    </group>
  );
}
