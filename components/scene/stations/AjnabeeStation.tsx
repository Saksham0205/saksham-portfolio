"use client";

import { useMemo, useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { ajnabee } from "@/data/experience";
import { frame } from "@/lib/lab-state";
import { Glow, Tag, sceneTime, useRoomPresence } from "../helpers";
import { ORIGINS, PALETTE } from "../layout";
import { Phone, Tablet, useScreenTexture } from "../objects/Devices";
import { drawCustomerScreen, drawPartnerScreen } from "../objects/screens";

const ROOM = 4;
const FLOW = ajnabee.flow;
const PHONE: [number, number, number] = [-1, 2.7, 0];
const TABLET: [number, number, number] = [3.7, 2.5, -1];

/** Customer experience + salon operations, connected by the booking itself. */
export function AjnabeeStation() {
  const { groupRef, active, labels } = useRoomPresence(ROOM);
  const [step, setStep] = useState(0);
  const phone = useRef<THREE.Group>(null);
  const tablet = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);
  const packets = useRef<(THREE.Sprite | null)[]>([]);

  const phoneScreen = useScreenTexture(
    540,
    1172,
    (ctx, w, h) => drawCustomerScreen(ctx, w, h, step, FLOW[step].screen, FLOW.length),
    step,
  );
  const partnerLive = step === FLOW.length - 1 ? 1 : 0;
  const tabletScreen = useScreenTexture(1024, 649, (ctx, w, h) => drawPartnerScreen(ctx, w, h, partnerLive), partnerLive);

  const bridge = useMemo(
    () =>
      new THREE.CubicBezierCurve3(
        new THREE.Vector3(PHONE[0] + 0.7, PHONE[1] - 0.4, PHONE[2]),
        new THREE.Vector3(0.9, 0.9, 0.4),
        new THREE.Vector3(2.0, 1.0, -0.6),
        new THREE.Vector3(TABLET[0] - 1.7, TABLET[1] - 0.5, TABLET[2]),
      ),
    [],
  );
  const bridgePoints = useMemo(() => bridge.getPoints(40), [bridge]);

  useFrame(({ clock }) => {
    if (!active.current) return;
    const t = sceneTime(clock.elapsedTime);
    const local = frame.local[ROOM];
    const s = Math.min(FLOW.length - 1, Math.floor(local * FLOW.length));
    if (s !== step) setStep(s);

    if (phone.current) {
      phone.current.rotation.y = 0.28 + Math.sin(t * 0.5) * 0.08 + frame.pointer.x * 0.12;
      phone.current.rotation.x = -frame.pointer.y * 0.08;
      phone.current.position.y = PHONE[1] + Math.sin(t * 0.8) * 0.05;
    }
    if (tablet.current) tablet.current.position.y = TABLET[1] + Math.sin(t * 0.7 + 1) * 0.04;

    // UPI confirmation pulse on the payment step
    if (ring.current) {
      const on = s === 4;
      const u = (t * 0.8) % 1;
      ring.current.visible = on;
      ring.current.scale.setScalar(1 + u * 1.6);
      (ring.current.material as THREE.MeshBasicMaterial).opacity = (1 - u) * 0.8;
    }

    // Booking travels to the partner app once it exists
    const flowing = s >= 3;
    packets.current.forEach((p, i) => {
      if (!p) return;
      p.visible = flowing;
      bridge.getPoint((t * 0.45 + i / 3) % 1, p.position);
    });
  });

  return (
    <group ref={groupRef} position={ORIGINS.ajnabee}>
      <group ref={phone} position={PHONE}>
        <Phone screen={phoneScreen} />
        <mesh ref={ring} position={[0, 0, -0.05]} visible={false}>
          <ringGeometry args={[1.45, 1.48, 64]} />
          <meshBasicMaterial color={PALETTE.signal} transparent toneMapped={false} />
        </mesh>
      </group>
      <group ref={tablet} position={TABLET} rotation-y={-0.4}>
        <Tablet screen={tabletScreen} />
      </group>

      <Line points={bridgePoints} color={PALETTE.bone} lineWidth={1} transparent opacity={0.3} dashed dashSize={0.1} gapSize={0.08} />
      {[0, 1, 2].map((i) => (
        <Glow key={i} ref={(el: THREE.Sprite | null) => void (packets.current[i] = el)} scale={0.28} visible={false} />
      ))}

      {labels && (
        <>
          <Tag position={[PHONE[0], 0.95, 0]}>customer app</Tag>
          <Tag position={[TABLET[0], 1.05, TABLET[2]]}>partner app · salon ops</Tag>
          <Tag position={[1.2, 0.55, 0]} tone={step >= 3 ? "live" : "dim"}>
            booking
          </Tag>
        </>
      )}
    </group>
  );
}
