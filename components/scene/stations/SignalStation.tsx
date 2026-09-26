"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { frame } from "@/lib/lab-state";
import { Tag, sceneTime, useRoomPresence } from "../helpers";
import { ORIGINS, PALETTE } from "../layout";

const BARS = 150;
const SPAN = 18;

const bone = new THREE.Color(PALETTE.bone);
const signal = new THREE.Color(PALETTE.signal);
const tmpColor = new THREE.Color();
const m = new THREE.Matrix4();

/**
 * A voice, drawn as a waveform wall. On desktop the pointer is the speaker:
 * the loudest formant follows it. On touch it speaks on its own.
 */
export function SignalStation({ mobile }: { mobile: boolean }) {
  const { groupRef, active, labels } = useRoomPresence(1);
  const mesh = useRef<THREE.InstancedMesh>(null);
  const focus = useRef(0);
  const geometry = useMemo(() => new THREE.BoxGeometry(0.045, 1, 0.045), []);

  useLayoutEffect(() => {
    const im = mesh.current!;
    for (let i = 0; i < BARS; i++) im.setColorAt(i, bone);
  }, []);

  useFrame(({ clock }, dt) => {
    const im = mesh.current;
    if (!im || !active.current) return;
    const t = sceneTime(clock.elapsedTime);

    // Where the "voice" is loudest: pointer on desktop, a slow sweep on touch.
    const aim = mobile ? Math.sin(t * 0.35) * 0.7 : frame.pointer.x;
    focus.current += (aim - focus.current) * Math.min(dt * 3, 1);
    const fx = focus.current * (SPAN / 2);

    for (let i = 0; i < BARS; i++) {
      const u = i / (BARS - 1);
      const x = (u - 0.5) * SPAN;
      // Syllable-like envelope: bursts of energy that come and go.
      const syllable = Math.max(0, Math.sin(t * 2.3 + Math.sin(t * 0.7) * 2)) ** 2;
      const formant = Math.exp(-((x - fx) ** 2) * 0.09);
      const carrier = 0.5 + 0.5 * Math.sin(x * 3.1 + t * 7) * Math.sin(x * 1.3 - t * 3.3);
      const edge = Math.sin(u * Math.PI);
      const h = 0.06 + edge * (0.18 + formant * (0.6 + syllable * 2.4) * carrier);
      m.makeScale(1, h, 1);
      m.setPosition(x, 2.6, 0);
      im.setMatrixAt(i, m);
      tmpColor.copy(bone).lerp(signal, Math.min(1, formant * carrier * 1.6));
      im.setColorAt(i, tmpColor);
    }
    im.instanceMatrix.needsUpdate = true;
    if (im.instanceColor) im.instanceColor.needsUpdate = true;
  });

  return (
    <group ref={groupRef} position={ORIGINS.signal}>
      <group position={[0, 0, -4]}>
        <instancedMesh ref={mesh} args={[geometry, undefined, BARS]} frustumCulled={false}>
          <meshBasicMaterial toneMapped={false} />
        </instancedMesh>
        <mesh position={[0, 2.6, -0.05]}>
          <planeGeometry args={[SPAN + 1, 0.006]} />
          <meshBasicMaterial color={PALETTE.bone} transparent opacity={0.3} />
        </mesh>
        {labels && (
          <>
            <Tag position={[-SPAN / 2, 4.6, 0]}>input · speech</Tag>
            <Tag position={[SPAN / 2, 4.6, 0]} tone="live">
              {mobile ? "live" : "live · follows your cursor"}
            </Tag>
          </>
        )}
      </group>
    </group>
  );
}
