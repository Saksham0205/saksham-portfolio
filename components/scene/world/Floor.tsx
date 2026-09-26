"use client";

import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { PALETTE } from "../layout";

/** Infinite-looking drafting grid. Lines are derivative-antialiased and fade with distance. */
export function Floor() {
  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        uniforms: {
          uColor: { value: new THREE.Color(PALETTE.bone) },
          uFar: { value: 60 },
        },
        vertexShader: /* glsl */ `
          varying vec3 vWorld;
          void main() {
            vec4 w = modelMatrix * vec4(position, 1.0);
            vWorld = w.xyz;
            gl_Position = projectionMatrix * viewMatrix * w;
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uColor;
          uniform float uFar;
          varying vec3 vWorld;
          float grid(vec2 p, float size) {
            vec2 q = p / size;
            vec2 g = abs(fract(q - 0.5) - 0.5) / fwidth(q);
            return 1.0 - min(min(g.x, g.y), 1.0);
          }
          void main() {
            float minor = grid(vWorld.xz, 1.0) * 0.28;
            float major = grid(vWorld.xz, 6.0);
            float d = distance(cameraPosition.xz, vWorld.xz);
            float fade = 1.0 - smoothstep(uFar * 0.25, uFar, d);
            float a = max(minor, major * 0.7) * fade * 0.16;
            if (a < 0.002) discard;
            gl_FragColor = vec4(uColor, a);
          }
        `,
      }),
    [],
  );

  useFrame(({ scene }) => {
    if (scene.fog instanceof THREE.Fog) material.uniforms.uFar.value = scene.fog.far;
  });

  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, 0, -120]} material={material} renderOrder={-1}>
      <planeGeometry args={[900, 900]} />
    </mesh>
  );
}
