"use client";

import { useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { frame, ui } from "@/lib/lab-state";
import { PALETTE } from "../layout";

/**
 * Airborne particles along the lab's length. All motion happens in the vertex
 * shader, so the CPU cost is one uniform update per frame.
 */
export function Dust({ count }: { count: number }) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 48;
      positions[i * 3 + 1] = Math.random() * 14;
      positions[i * 3 + 2] = 16 - Math.random() * 270;
      seeds[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    return g;
  }, [count]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uPointer: { value: new THREE.Vector2() },
          uBone: { value: new THREE.Color(PALETTE.bone) },
          uSignal: { value: new THREE.Color(PALETTE.signal) },
          uPixel: { value: 1 },
        },
        vertexShader: /* glsl */ `
          attribute float aSeed;
          uniform float uTime;
          uniform vec2 uPointer;
          uniform float uPixel;
          varying float vSeed;
          varying float vFade;
          void main() {
            vec3 p = position;
            float t = uTime * (0.15 + aSeed * 0.2);
            p.x += sin(t + aSeed * 40.0) * 0.6 + uPointer.x * aSeed * 0.8;
            p.y += sin(t * 0.7 + aSeed * 13.0) * 0.5 + uPointer.y * aSeed * 0.4;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = (1.0 + aSeed * 2.2) * uPixel * (14.0 / -mv.z);
            vSeed = aSeed;
            vFade = 1.0 - smoothstep(18.0, 46.0, -mv.z);
          }
        `,
        fragmentShader: /* glsl */ `
          uniform vec3 uBone;
          uniform vec3 uSignal;
          varying float vSeed;
          varying float vFade;
          void main() {
            float d = length(gl_PointCoord - 0.5);
            if (d > 0.5) discard;
            vec3 c = vSeed > 0.94 ? uSignal : uBone;
            gl_FragColor = vec4(c, smoothstep(0.5, 0.0, d) * vFade * 0.55);
          }
        `,
      }),
    [],
  );

  useFrame(({ clock, gl }) => {
    const u = material.uniforms;
    if (!ui.get().reduced) u.uTime.value = clock.elapsedTime;
    u.uPointer.value.set(frame.pointer.x, frame.pointer.y);
    u.uPixel.value = gl.getPixelRatio();
  });

  return <points geometry={geometry} material={material} frustumCulled={false} />;
}
