"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { frame, ui } from "@/lib/lab-state";
import { dampFactor, smoothstep } from "@/lib/math";
import { focusShot, sampleCamera } from "./layout";

const desiredPos = new THREE.Vector3();
const desiredTarget = new THREE.Vector3();

/**
 * Moves the camera along the lab. Scroll decides where it should be; this
 * rig decides how it gets there (damping, pointer parallax, focus shots).
 */
export function CameraRig({ mobile }: { mobile: boolean }) {
  const camera = useThree((s) => s.camera);
  const scene = useThree((s) => s.scene);
  const pos = useRef<THREE.Vector3 | null>(null);
  const target = useRef(new THREE.Vector3());
  const light = useRef<THREE.PointLight>(null);
  const readout = useRef<HTMLElement | null>(null);
  const tick = useRef(0);

  useFrame((_, rawDt) => {
    const dt = Math.min(rawDt, 0.1);
    const { focus, reduced } = ui.get();

    if (focus) {
      const shot = focusShot(focus, mobile);
      desiredPos.set(...shot.pos);
      desiredTarget.set(...shot.target);
    } else {
      sampleCamera(frame.param, frame.local, mobile, desiredPos, desiredTarget);
    }

    if (!reduced && !mobile) {
      desiredPos.x += frame.pointer.x * 0.55;
      desiredPos.y += frame.pointer.y * 0.3;
    }

    if (!pos.current) {
      pos.current = desiredPos.clone();
      target.current.copy(desiredTarget);
    }
    const k = reduced ? 1 : dampFactor(focus ? 3.2 : 5, dt);
    pos.current.lerp(desiredPos, k);
    target.current.lerp(desiredTarget, k);
    camera.position.copy(pos.current);
    camera.lookAt(target.current);

    // Open the fog up for the final pull-back so the whole lab is visible.
    const overview = smoothstep(8, 9, frame.param);
    if (scene.fog instanceof THREE.Fog) {
      scene.fog.near = 10 + overview * 50;
      scene.fog.far = 62 + overview * 360;
    }

    // Pointer-led key light: the cursor lights the room.
    if (light.current) {
      light.current.position.set(
        pos.current.x + frame.pointer.x * 6,
        pos.current.y + 3 + frame.pointer.y * 3,
        pos.current.z - 4,
      );
    }

    // Live camera coordinates in the HUD (throttled, written straight to the DOM).
    if (++tick.current % 6 === 0) {
      readout.current ??= document.getElementById("cam-readout");
      if (readout.current) {
        const p = pos.current;
        readout.current.textContent = `x ${p.x.toFixed(1)}  y ${p.y.toFixed(1)}  z ${p.z.toFixed(1)}`;
      }
    }
  });

  return <pointLight ref={light} intensity={18} distance={22} decay={1.6} color="#fff1dc" />;
}
