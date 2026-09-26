"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { omnidimension } from "@/data/experience";
import { frame } from "@/lib/lab-state";
import { clamp, smoothstep } from "@/lib/math";
import { Frame, Glow, Tag, sceneTime, useRoomPresence } from "../helpers";
import { ORIGINS, PALETTE } from "../layout";

const ROOM = 2;
const STEPS = omnidimension.pipeline;

/** Node positions, relative to the room origin, left to right. */
const NODES: [number, number, number][] = [
  [-4.8, 2.0, 1.4],
  [-3.2, 2.9, -0.6],
  [-1.3, 2.5, 0.6],
  [0.7, 3.3, -1.3],
  [2.4, 2.1, 0.5],
  [3.8, 3.0, -0.9],
  [5.3, 2.3, 1.0],
];

const bone = new THREE.Color(PALETTE.bone);
const signal = new THREE.Color(PALETTE.signal);

function buildCurves() {
  return NODES.slice(0, -1).map((a, i) => {
    const b = NODES[i + 1];
    const va = new THREE.Vector3(...a);
    const vb = new THREE.Vector3(...b);
    const mid = va.clone().lerp(vb, 0.5);
    mid.y += 0.7;
    return new THREE.QuadraticBezierCurve3(va, mid, vb);
  });
}

/** Tiny animated waveform used by the speech and voice nodes. */
function MiniWave({ phase }: { phase: number }) {
  const bars = useRef<(THREE.Mesh | null)[]>([]);
  useFrame(({ clock }) => {
    const t = sceneTime(clock.elapsedTime);
    bars.current.forEach((b, i) => {
      if (b) b.scale.y = 0.2 + Math.abs(Math.sin(t * 5 + i * 0.9 + phase)) * (1 - Math.abs(i - 4) / 5);
    });
  });
  return (
    <group>
      {Array.from({ length: 9 }, (_, i) => (
        <mesh key={i} ref={(el) => void (bars.current[i] = el)} position={[(i - 4) * 0.09, 0, 0.02]}>
          <planeGeometry args={[0.035, 0.6]} />
          <meshBasicMaterial color={PALETTE.bone} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function AgentGlyph() {
  const ring = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const ticks = useMemo(() => {
    const pts: number[] = [];
    for (let i = 0; i < 48; i++) {
      const a = (i / 48) * Math.PI * 2;
      const r1 = 0.5;
      const r2 = i % 4 === 0 ? 0.62 : 0.56;
      pts.push(Math.cos(a) * r1, Math.sin(a) * r1, 0, Math.cos(a) * r2, Math.sin(a) * r2, 0);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, []);
  useFrame(({ clock }) => {
    const t = sceneTime(clock.elapsedTime);
    if (ring.current) ring.current.rotation.z = -t * 0.4;
    if (core.current) core.current.rotation.z = t * 0.9;
  });
  return (
    <group>
      <group ref={ring}>
        <lineSegments geometry={ticks}>
          <lineBasicMaterial color={PALETTE.bone} transparent opacity={0.8} />
        </lineSegments>
      </group>
      <mesh ref={core}>
        <planeGeometry args={[0.36, 0.36]} />
        <meshBasicMaterial color={PALETTE.signal} wireframe toneMapped={false} />
      </mesh>
    </group>
  );
}

function ToolsGlyph() {
  const cells = useRef<(THREE.Mesh | null)[]>([]);
  useFrame(({ clock }) => {
    const t = sceneTime(clock.elapsedTime);
    const hot = Math.floor(t * 2.2) % 3;
    cells.current.forEach((c, i) => {
      if (!c) return;
      (c.material as THREE.MeshBasicMaterial).color.copy(i === hot ? signal : bone);
      (c.material as THREE.MeshBasicMaterial).opacity = i === hot ? 1 : 0.35;
    });
  });
  return (
    <group>
      {[-0.28, 0, 0.28].map((x, i) => (
        <mesh key={x} ref={(el) => void (cells.current[i] = el)} position={[x, 0, 0.02]}>
          <planeGeometry args={[0.2, 0.2]} />
          <meshBasicMaterial transparent toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

function DataGlyph() {
  return (
    <group>
      {[-0.16, 0, 0.16].map((y) => (
        <mesh key={y} position={[0, y, 0.02]}>
          <planeGeometry args={[0.6, 0.08]} />
          <meshBasicMaterial color={PALETTE.bone} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function ResponseGlyph() {
  const lines = useRef<(THREE.Mesh | null)[]>([]);
  const widths = [0.62, 0.48, 0.56, 0.3];
  useFrame(({ clock }) => {
    const t = (sceneTime(clock.elapsedTime) * 0.6) % 1.4;
    lines.current.forEach((l, i) => {
      if (!l) return;
      const s = clamp((t * 4 - i) / 1);
      l.scale.x = Math.max(s, 0.001);
      // Grow from a fixed left margin, like text being typed.
      l.position.x = -0.31 + (widths[i] * s) / 2;
    });
  });
  return (
    <group>
      {widths.map((w, i) => (
        <mesh key={i} ref={(el) => void (lines.current[i] = el)} position={[0, 0.2 - i * 0.13, 0.02]}>
          <planeGeometry args={[w, 0.045]} />
          <meshBasicMaterial color={PALETTE.bone} />
        </mesh>
      ))}
    </group>
  );
}

function UserGlyph() {
  const geometry = useMemo(() => {
    const curve = new THREE.EllipseCurve(0, 0.08, 0.16, 0.16, 0, Math.PI * 2);
    const pts = curve.getPoints(40).map((p) => new THREE.Vector3(p.x, p.y, 0.02));
    const arc = new THREE.EllipseCurve(0, -0.34, 0.3, 0.26, 0.15 * Math.PI, 0.85 * Math.PI);
    const pts2 = arc.getPoints(24).map((p) => new THREE.Vector3(p.x, p.y, 0.02));
    return [pts, pts2];
  }, []);
  return (
    <group>
      <Line points={geometry[0]} color={PALETTE.bone} lineWidth={1.4} />
      <Line points={geometry[1]} color={PALETTE.bone} lineWidth={1.4} />
    </group>
  );
}

function Glyph({ id }: { id: string }) {
  switch (id) {
    case "user":
      return <UserGlyph />;
    case "speech":
      return <MiniWave phase={0} />;
    case "agent":
      return <AgentGlyph />;
    case "tools":
      return <ToolsGlyph />;
    case "data":
      return <DataGlyph />;
    case "response":
      return <ResponseGlyph />;
    default:
      return <MiniWave phase={2} />;
  }
}

export function PipelineStation() {
  const { groupRef, active, labels } = useRoomPresence(ROOM);
  const curves = useMemo(buildCurves, []);
  const curvePoints = useMemo(() => curves.map((c) => c.getPoints(32)), [curves]);
  const packet = useRef<THREE.Sprite>(null);
  const ambient = useRef<(THREE.Sprite | null)[]>([]);
  const frames = useRef<(THREE.LineSegments | null)[]>([]);
  const nodeGroups = useRef<(THREE.Group | null)[]>([]);
  const tool = useRef<THREE.Group>(null);
  const tmp = useMemo(() => new THREE.Vector3(), []);

  const pointAt = (s: number, out: THREE.Vector3) => {
    const seg = Math.min(Math.floor(s), curves.length - 1);
    return curves[seg].getPoint(clamp(s - seg), out);
  };

  useFrame(({ clock }, dt) => {
    if (!active.current) return;
    const t = sceneTime(clock.elapsedTime);
    const local = frame.local[ROOM];
    // Scroll scrubs the main packet through the pipeline; step k sits on node k.
    const s = clamp(local * STEPS.length - 0.5, 0, STEPS.length - 1);
    const hot = Math.min(STEPS.length - 1, Math.floor(local * STEPS.length));

    if (packet.current) {
      pointAt(Math.min(s, curves.length - 0.0001), tmp);
      packet.current.position.copy(tmp);
    }
    ambient.current.forEach((a, i) => {
      if (!a) return;
      const u = (t * 0.35 + i / 3) % 1;
      pointAt(u * curves.length * 0.9999, tmp);
      a.position.copy(tmp);
    });

    frames.current.forEach((f, i) => {
      if (!f) return;
      const mat = f.material as THREE.LineBasicMaterial;
      const on = i === hot ? 1 : i < hot ? 0.35 : 0;
      mat.color.copy(bone).lerp(signal, on);
      mat.opacity = 0.3 + on * 0.7;
      const g = nodeGroups.current[i];
      if (g) {
        const target = 1 + (i === hot ? 0.12 : 0);
        g.scale.setScalar(g.scale.x + (target - g.scale.x) * Math.min(dt * 6, 1));
      }
    });

    // Internal tool lights up in the last stretch of the room.
    if (tool.current) {
      const glow = smoothstep(0.82, 0.95, local);
      tool.current.children.forEach((c, i) => {
        const mat = (c as THREE.Mesh).material as THREE.MeshBasicMaterial | undefined;
        if (mat && "opacity" in mat) mat.opacity = 0.18 + glow * (0.5 - i * 0.08);
      });
    }
  });

  return (
    <group ref={groupRef} position={ORIGINS.omnidimension}>
      {curvePoints.map((pts, i) => (
        <Line key={i} points={pts} color={PALETTE.bone} lineWidth={1} transparent opacity={0.3} />
      ))}

      {STEPS.map((step, i) => {
        const big = step.id === "agent";
        const size = big ? 1.7 : 1.15;
        return (
          <group key={step.id} position={NODES[i]} ref={(el) => void (nodeGroups.current[i] = el)}>
            <mesh>
              <planeGeometry args={[size, size]} />
              <meshBasicMaterial color={PALETTE.graphite} transparent opacity={0.85} side={THREE.DoubleSide} />
            </mesh>
            <Frame ref={(el) => void (frames.current[i] = el)} width={size} height={size} position={[0, 0, 0.01]} />
            <group scale={big ? 1.2 : 1}>
              <Glyph id={step.id} />
            </group>
            {labels && (
              <Tag position={[0, -size / 2 - 0.28, 0]} tone={step.id === "agent" ? "live" : "dim"}>
                {String(i + 1).padStart(2, "0")} {step.label}
              </Tag>
            )}
          </group>
        );
      })}

      <Glow ref={packet} scale={0.9} />
      {[0, 1, 2].map((i) => (
        <Glow key={i} ref={(el: THREE.Sprite | null) => void (ambient.current[i] = el)} scale={0.35} opacity={0.5} />
      ))}

      {/* Internal invoice tool: model → service → REST, stacked like a ledger */}
      <group ref={tool} position={[4.2, 0, 4]}>
        {omnidimension.internalTool.layers.map((layer, i) => (
          <mesh key={layer} position={[0, 0.25 + i * 0.42, 0]} rotation-x={-Math.PI / 2}>
            <planeGeometry args={[1.8, 1.1]} />
            <meshBasicMaterial color={i === 2 ? PALETTE.signal : PALETTE.bone} transparent opacity={0.2} side={THREE.DoubleSide} />
          </mesh>
        ))}
      </group>
      {labels && (
        <Tag position={[4.2, 1.6, 4]}>internal tool · invoicing</Tag>
      )}
    </group>
  );
}
