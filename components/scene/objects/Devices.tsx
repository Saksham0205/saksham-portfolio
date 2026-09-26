"use client";

import { useEffect, useMemo, type ReactNode } from "react";
import { RoundedBox } from "@react-three/drei";
import type { ThreeElements } from "@react-three/fiber";
import * as THREE from "three";
import { PALETTE } from "../layout";
import { refreshScreenFont } from "./screens";

/**
 * A canvas-backed texture that is only redrawn when `version` changes, so
 * screen content costs nothing per frame.
 */
export function useScreenTexture(
  width: number,
  height: number,
  draw: (ctx: CanvasRenderingContext2D, w: number, h: number) => void,
  version: unknown,
) {
  const { canvas, texture } = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = width;
    c.height = height;
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = 4;
    return { canvas: c, texture: t };
  }, [width, height]);

  useEffect(() => {
    refreshScreenFont();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    draw(ctx, width, height);
    texture.needsUpdate = true;
    // `draw` is intentionally excluded: callers pass a fresh closure each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvas, texture, version, width, height]);

  useEffect(() => () => texture.dispose(), [texture]);
  return texture;
}

const bodyMaterial = () => (
  <meshStandardMaterial color={PALETTE.graphite} roughness={0.45} metalness={0.6} />
);

export function Phone({
  screen,
  children,
  ...props
}: { screen: THREE.Texture; children?: ReactNode } & ThreeElements["group"]) {
  return (
    <group {...props}>
      <RoundedBox args={[1.3, 2.7, 0.12]} radius={0.1} smoothness={3}>
        {bodyMaterial()}
      </RoundedBox>
      <mesh position={[0, 0, 0.062]}>
        <planeGeometry args={[1.18, 2.56]} />
        <meshBasicMaterial map={screen} toneMapped={false} />
      </mesh>
      {children}
    </group>
  );
}

export function Tablet({
  screen,
  children,
  ...props
}: { screen: THREE.Texture; children?: ReactNode } & ThreeElements["group"]) {
  return (
    <group {...props}>
      <RoundedBox args={[3.3, 2.15, 0.1]} radius={0.09} smoothness={3}>
        {bodyMaterial()}
      </RoundedBox>
      <mesh position={[0, 0, 0.052]}>
        <planeGeometry args={[3.14, 1.99]} />
        <meshBasicMaterial map={screen} toneMapped={false} />
      </mesh>
      {children}
    </group>
  );
}
