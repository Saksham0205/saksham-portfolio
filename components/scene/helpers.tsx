"use client";

import { useMemo, useRef, useState, type ReactNode } from "react";
import { useFrame, type ThreeElements } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { frame, labelLayer, ui } from "@/lib/lab-state";
import { PALETTE } from "./layout";

let glowTexture: THREE.Texture | null = null;

/** Shared soft radial sprite used for packets, nodes and highlights. */
export function getGlowTexture() {
  if (glowTexture) return glowTexture;
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.25, "rgba(255,255,255,0.55)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  glowTexture = new THREE.CanvasTexture(canvas);
  return glowTexture;
}

export function Glow({
  color = PALETTE.signal,
  scale = 0.5,
  opacity = 1,
  ...props
}: { color?: string; scale?: number; opacity?: number } & ThreeElements["sprite"]) {
  const material = useMemo(
    () =>
      new THREE.SpriteMaterial({
        map: getGlowTexture(),
        color,
        transparent: true,
        opacity,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      }),
    [color, opacity],
  );
  return <sprite material={material} scale={scale} {...props} />;
}

/**
 * Tracks whether the camera is near a span of rooms. `groupRef` is hidden when
 * far away so its draw calls vanish; `active` gates per-frame animation;
 * `labels` (state) mounts DOM labels only while they can be read.
 */
export function useRoomPresence(from: number, to = from) {
  const groupRef = useRef<THREE.Group>(null);
  const active = useRef(false);
  const [labels, setLabels] = useState(false);

  useFrame(() => {
    const p = frame.param;
    const overview = p > 8.35;
    const visible = overview || (p > from - 1.6 && p < to + 1.6);
    active.current = visible && (overview || (p > from - 1.1 && p < to + 1.1));
    if (groupRef.current) groupRef.current.visible = visible;
    const wantLabels = p > from - 0.45 && p < to + 0.55;
    if (wantLabels !== labels) setLabels(wantLabels);
  });

  return { groupRef, active, labels };
}

/** Small DOM label pinned to a 3D point. Decorative: the section text carries the real content. */
export function Tag({
  children,
  position,
  tone = "dim",
  align = "center",
}: {
  children: ReactNode;
  position: [number, number, number];
  tone?: "dim" | "live";
  align?: "center" | "left";
}) {
  return (
    <Html
      position={position}
      center={align === "center"}
      portal={labelLayer}
      zIndexRange={[4, 0]}
      style={{ pointerEvents: "none" }}
    >
      <span className="scene-tag" data-tone={tone} aria-hidden="true">
        {children}
      </span>
    </Html>
  );
}

/** Thin outlined rectangle, the basic architectural unit of the lab. */
export function Frame({
  width,
  height,
  color = PALETTE.bone,
  opacity = 0.5,
  ...props
}: {
  width: number;
  height: number;
  color?: string;
  opacity?: number;
} & ThreeElements["lineSegments"]) {
  const geometry = useMemo(() => {
    const w = width / 2;
    const h = height / 2;
    const pts = [-w, -h, 0, w, -h, 0, w, -h, 0, w, h, 0, w, h, 0, -w, h, 0, -w, h, 0, -w, -h, 0];
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return g;
  }, [width, height]);
  return (
    <lineSegments geometry={geometry} {...props}>
      <lineBasicMaterial color={color} transparent opacity={opacity} toneMapped={false} />
    </lineSegments>
  );
}

export const isReduced = () => ui.get().reduced;

/** Scene time that freezes under reduced motion. */
export const sceneTime = (elapsed: number) => (ui.get().reduced ? 1.5 : elapsed);
