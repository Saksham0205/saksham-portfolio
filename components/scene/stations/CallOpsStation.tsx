"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { frame } from "@/lib/lab-state";
import { smoothstep } from "@/lib/math";
import { Frame, Glow, Tag, sceneTime, useRoomPresence } from "../helpers";
import { ORIGINS, PALETTE } from "../layout";

const ROOM = 3;
const LANES = 6;
const PER_LANE = 44;
const X0 = -6.2;
const X1 = 6;
const GATE_X = 0.6;
const HUB: [number, number, number] = [-7.4, 2.45, 0];
const CHANNELS: [number, number, number][] = [
  [-10, 4.4, -3.5],
  [-10.6, 3.1, -3.2],
  [-10.6, 1.8, -3.2],
  [-10, 0.6, -3.5],
];
const PANELS: [number, number][] = [
  [4.3, 3.4],
  [7.1, 3.4],
  [4.3, 1.5],
  [7.1, 1.5],
];
// Decorative chart shapes; the dashboards themselves are internal.
const CHART = [0.35, 0.6, 0.45, 0.8, 0.55, 0.95];

const bone = new THREE.Color(PALETTE.bone);
const signal = new THREE.Color(PALETTE.signal);
const coral = new THREE.Color(PALETTE.coral);
const dim = new THREE.Color(PALETTE.slate);
const tmpColor = new THREE.Color();
const m = new THREE.Matrix4();
const hash = (n: number) => {
  const s = Math.sin(n * 78.233) * 43758.5453;
  return s - Math.floor(s);
};

export function CallOpsStation() {
  const { groupRef, active, labels } = useRoomPresence(ROOM);
  const bars = useRef<THREE.InstancedMesh>(null);
  const chart = useRef<THREE.InstancedMesh>(null);
  const scanner = useRef<THREE.Mesh>(null);
  const gateLine = useRef<THREE.Mesh>(null);
  const hubGlow = useRef<THREE.Sprite>(null);
  const packets = useRef<(THREE.Sprite | null)[]>([]);
  const panelFrames = useRef<(THREE.LineSegments | null)[]>([]);
  const geometry = useMemo(() => new THREE.BoxGeometry(0.05, 1, 0.05), []);
  const chartGeometry = useMemo(() => {
    const g = new THREE.BoxGeometry(0.22, 1, 0.05);
    g.translate(0, 0.5, 0); // grow from the baseline
    return g;
  }, []);

  const arcs = useMemo(
    () =>
      CHANNELS.map((c) => {
        const a = new THREE.Vector3(...HUB);
        const b = new THREE.Vector3(...c);
        const mid = a.clone().lerp(b, 0.5).add(new THREE.Vector3(0, 0.6, 0.5));
        return new THREE.QuadraticBezierCurve3(a, mid, b);
      }),
    [],
  );

  useLayoutEffect(() => {
    for (let i = 0; i < LANES * PER_LANE; i++) bars.current!.setColorAt(i, bone);
    for (let i = 0; i < PANELS.length * CHART.length; i++) chart.current!.setColorAt(i, bone);
  }, []);

  useFrame(({ clock }) => {
    if (!active.current) return;
    const t = sceneTime(clock.elapsedTime);
    const local = frame.local[ROOM];
    const campaigns = 1 - smoothstep(0.3, 0.4, local);
    const insights = smoothstep(0.28, 0.38, local) * (1 - smoothstep(0.64, 0.72, local));
    const dashboards = smoothstep(0.62, 0.8, local);

    // Streaming call waveforms
    const im = bars.current!;
    for (let k = 0; k < LANES; k++) {
      const speed = 0.045 + hash(k + 1) * 0.03;
      for (let j = 0; j < PER_LANE; j++) {
        const i = k * PER_LANE + j;
        const travel = j / PER_LANE + t * speed;
        const u = travel % 1;
        const x = X0 + u * (X1 - X0);
        const call = Math.floor(j / 11) + Math.floor(travel) * 7 + k * 31;
        const sentiment = hash(call);
        const inCall = Math.sin(((j % 11) / 11) * Math.PI);
        let h: number;
        if (x < GATE_X) {
          h = 0.04 + inCall * Math.abs(Math.sin(j * 1.7 + k * 3 + t * 6)) * 0.38;
          tmpColor.copy(bone).lerp(dim, 0.4);
        } else {
          // Past the gate: analyzed, scored, tinted by sentiment.
          const fade = 1 - smoothstep(3.1, 3.9, x);
          h = (0.06 + sentiment * 0.24) * fade * (0.4 + inCall * 0.6) + 0.0001;
          tmpColor.copy(sentiment > 0.55 ? signal : sentiment > 0.22 ? bone : coral);
        }
        m.makeScale(1, h, 1);
        m.setPosition(x, 1.2 + k * 0.5, 0);
        im.setMatrixAt(i, m);
        im.setColorAt(i, tmpColor);
      }
    }
    im.instanceMatrix.needsUpdate = true;
    if (im.instanceColor) im.instanceColor.needsUpdate = true;

    // Gate scanner
    if (scanner.current) scanner.current.position.y = 1.0 + (0.5 + 0.5 * Math.sin(t * 1.6)) * 2.9;
    if (gateLine.current) (gateLine.current.material as THREE.MeshBasicMaterial).opacity = 0.35 + insights * 0.65;

    // Campaign hub and outbound packets
    if (hubGlow.current) hubGlow.current.material.opacity = 0.35 + campaigns * 0.65;
    packets.current.forEach((p, i) => {
      if (!p) return;
      arcs[i].getPoint((t * 0.4 + i * 0.27) % 1, p.position);
      p.material.opacity = 0.25 + campaigns * 0.75;
    });

    // Dashboards grow in the final phase
    const cm = chart.current!;
    let n = 0;
    PANELS.forEach(([px, py], p) => {
      CHART.forEach((v, b) => {
        const wobble = 0.06 * Math.sin(t * 1.3 + b + p * 2);
        const h = (0.08 + dashboards * (v * 0.85 + wobble)) * (0.7 + hash(p * 9 + b) * 0.3);
        m.makeScale(1, Math.max(h, 0.02), 1);
        m.setPosition(px - 0.9 + b * 0.36, py - 0.6, 0);
        cm.setMatrixAt(n, m);
        cm.setColorAt(n, b === CHART.length - 1 && dashboards > 0.5 ? signal : bone);
        n++;
      });
      const f = panelFrames.current[p];
      if (f) (f.material as THREE.LineBasicMaterial).opacity = 0.2 + dashboards * 0.5;
    });
    cm.instanceMatrix.needsUpdate = true;
    if (cm.instanceColor) cm.instanceColor.needsUpdate = true;
  });

  return (
    <group ref={groupRef} position={ORIGINS.spyne}>
      {/* Campaign engine hub + outbound channels */}
      <group position={HUB}>
        <Frame width={1.1} height={1.1} opacity={0.6} />
        <Frame width={0.6} height={0.6} opacity={0.6} rotation-z={Math.PI / 4} />
        <Glow ref={hubGlow} scale={1.6} />
      </group>
      {arcs.map((c, i) => (
        <group key={i}>
          <Line points={c.getPoints(24)} color={PALETTE.bone} lineWidth={1} transparent opacity={0.25} />
          <Frame width={0.35} height={0.35} position={CHANNELS[i]} opacity={0.5} />
          <Glow ref={(el: THREE.Sprite | null) => void (packets.current[i] = el)} scale={0.4} />
        </group>
      ))}

      {/* Call lanes */}
      <instancedMesh ref={bars} args={[geometry, undefined, LANES * PER_LANE]} frustumCulled={false}>
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      {Array.from({ length: LANES }, (_, k) => (
        <mesh key={k} position={[(X0 + 3.4) / 2, 1.2 + k * 0.5, -0.04]}>
          <planeGeometry args={[3.4 - X0, 0.004]} />
          <meshBasicMaterial color={PALETTE.bone} transparent opacity={0.15} />
        </mesh>
      ))}

      {/* AI analysis gate */}
      <group position={[GATE_X, 2.45, 0]}>
        <Frame width={1.6} height={3.5} rotation-y={-0.9} opacity={0.5} />
        <mesh ref={gateLine}>
          <planeGeometry args={[0.03, 3.5]} />
          <meshBasicMaterial color={PALETTE.signal} transparent toneMapped={false} />
        </mesh>
      </group>
      <mesh ref={scanner} position={[GATE_X, 2, 0]} rotation-y={-0.9}>
        <planeGeometry args={[1.6, 0.02]} />
        <meshBasicMaterial color={PALETTE.signal} transparent opacity={0.8} toneMapped={false} />
      </mesh>

      {/* Dashboard wall */}
      <group position={[0, 0, -1.6]}>
        {PANELS.map(([x, y], i) => (
          <group key={i} position={[x, y, 0]}>
            <mesh position={[0, 0, -0.03]}>
              <planeGeometry args={[2.5, 1.6]} />
              <meshBasicMaterial color={PALETTE.graphite} transparent opacity={0.8} />
            </mesh>
            <Frame ref={(el) => void (panelFrames.current[i] = el)} width={2.5} height={1.6} />
          </group>
        ))}
        <instancedMesh ref={chart} args={[chartGeometry, undefined, PANELS.length * CHART.length]} frustumCulled={false}>
          <meshBasicMaterial toneMapped={false} />
        </instancedMesh>
      </group>

      {labels && (
        <>
          <Tag position={[HUB[0], HUB[1] - 0.95, 0]}>campaign engine</Tag>
          <Tag position={[-10.2, -0.1, -3.4]}>outbound · multi-channel</Tag>
          <Tag position={[-3, 4.3, 0]}>calls</Tag>
          <Tag position={[GATE_X, 4.55, 0]} tone="live">
            AI analysis · scoring
          </Tag>
          <Tag position={[5.7, 4.65, -1.6]}>dashboards</Tag>
        </>
      )}
    </group>
  );
}
