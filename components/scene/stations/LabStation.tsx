"use client";

import { Suspense, useMemo, useRef, useState, type ReactNode } from "react";
import { useFrame, type ThreeEvent } from "@react-three/fiber";
import { Line, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { getProject, reswipeScreens, type ProjectId } from "@/data/projects";
import { ajnabee } from "@/data/experience";
import { frame, ui, useUI } from "@/lib/lab-state";
import { openProject } from "@/lib/lab-actions";
import { Frame, Glow, Tag, sceneTime, useRoomPresence } from "../helpers";
import { LAB_ARTIFACTS, PALETTE } from "../layout";
import { Phone, Tablet, useScreenTexture } from "../objects/Devices";
import { drawCustomerScreen, drawPartnerScreen } from "../objects/screens";

const ROOM = 5;
const TOP = 1.1;

const inLab = () => Math.abs(frame.param - ROOM) < 0.45;

/** Pointer events reach the scene through the DOM; ignore those aimed at real UI. */
const aimedAtUI = (e: ThreeEvent<PointerEvent | MouseEvent>) =>
  Boolean((e.nativeEvent.target as HTMLElement | null)?.closest?.("a, button, [data-no-scene], [role='dialog']"));

/** The travelling flow shown above an opened artifact: each project's own pipeline. */
function FlowArc({ id, mobile, carrier }: { id: ProjectId; mobile: boolean; carrier?: ReactNode }) {
  const steps = getProject(id).flow;
  const span = mobile ? 1.25 : 1.9;
  const nodes = useMemo(
    () =>
      steps.map((_, i) => {
        const u = steps.length === 1 ? 0.5 : i / (steps.length - 1);
        return new THREE.Vector3((u - 0.5) * 2 * span, 3.75 + Math.sin(u * Math.PI) * 0.35, -0.6);
      }),
    [steps, span],
  );
  const curve = useMemo(() => new THREE.CatmullRomCurve3(nodes), [nodes]);
  const points = useMemo(() => curve.getPoints(60), [curve]);
  const mover = useRef<THREE.Group>(null);
  const [hot, setHot] = useState(0);

  useFrame(({ clock }) => {
    const t = sceneTime(clock.elapsedTime);
    const u = (t * 0.16) % 1;
    const idx = Math.round(u * (steps.length - 1));
    if (idx !== hot) setHot(idx);
    if (mover.current) {
      curve.getPoint(u, mover.current.position);
      mover.current.rotation.z = id === "reswipe" && idx === 3 ? -0.5 : 0; // the swipe
    }
  });

  return (
    <group>
      <Line points={points} color={PALETTE.bone} lineWidth={1} transparent opacity={0.3} />
      {nodes.map((n, i) => (
        <group key={steps[i]} position={n}>
          <Frame width={0.2} height={0.2} color={i === hot ? PALETTE.signal : PALETTE.bone} opacity={0.9} />
          <Tag position={[0, 0.3, 0]} tone={i === hot ? "live" : "dim"}>
            {steps[i]}
          </Tag>
        </group>
      ))}
      <group ref={mover}>{carrier ?? <Glow scale={0.55} />}</group>
    </group>
  );
}

function AjnabeeArtifact({ focused }: { focused: boolean }) {
  const [step, setStep] = useState(0);
  const screen = useScreenTexture(
    540,
    1172,
    (ctx, w, h) => drawCustomerScreen(ctx, w, h, step, ajnabee.flow[step].screen, ajnabee.flow.length),
    step,
  );
  useFrame(({ clock }) => {
    const s = focused ? Math.floor(sceneTime(clock.elapsedTime) / 1.6) % 5 : 0;
    if (s !== step) setStep(s);
  });
  return <Phone screen={screen} scale={0.62} position={[0, 0.95, 0]} />;
}

function PartnerArtifact({ focused }: { focused: boolean }) {
  const [on, setOn] = useState(0);
  const screen = useScreenTexture(1024, 649, (ctx, w, h) => drawPartnerScreen(ctx, w, h, on), on);
  useFrame(({ clock }) => {
    const v = focused && Math.floor(sceneTime(clock.elapsedTime) * 0.8) % 2 === 0 ? 1 : 0;
    if (v !== on) setOn(v);
  });
  return <Tablet screen={screen} scale={0.52} position={[0, 0.7, 0]} rotation-x={-0.18} />;
}

function ReSwipeScreen() {
  const texture = useTexture(reswipeScreens[0]);
  texture.colorSpace = THREE.SRGBColorSpace;
  return (
    <mesh position={[0, 0, 0.062]}>
      <planeGeometry args={[1.18, 2.56]} />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
}

function ReSwipeArtifact() {
  const blank = useScreenTexture(8, 8, (ctx) => ((ctx.fillStyle = "#101419"), ctx.fillRect(0, 0, 8, 8)), 0);
  return (
    <group position={[0, 0.95, 0]} scale={0.62}>
      <Phone screen={blank}>
        <Suspense fallback={null}>
          <ReSwipeScreen />
        </Suspense>
      </Phone>
      {/* The deck of candidate cards */}
      {[0, 1, 2].map((i) => (
        <group key={i} position={[1.05 + i * 0.16, -0.35 + i * 0.06, -0.25 + i * 0.1]} rotation-z={-0.08 - i * 0.1}>
          <mesh>
            <planeGeometry args={[0.95, 1.3]} />
            <meshBasicMaterial color={PALETTE.graphite} transparent opacity={0.9} side={THREE.DoubleSide} />
          </mesh>
          <Frame width={0.95} height={1.3} position={[0, 0, 0.005]} opacity={0.6} color={i === 2 ? PALETTE.signal : PALETTE.bone} />
        </group>
      ))}
    </group>
  );
}

function SwipeCard() {
  return (
    <group scale={0.5}>
      <mesh>
        <planeGeometry args={[0.8, 1.1]} />
        <meshBasicMaterial color={PALETTE.graphite} side={THREE.DoubleSide} />
      </mesh>
      <Frame width={0.8} height={1.1} position={[0, 0, 0.01]} color={PALETTE.signal} opacity={1} />
    </group>
  );
}

function Plinth({ id, mobile, children }: { id: ProjectId; mobile: boolean; children: ReactNode }) {
  const focus = useUI((s) => s.focus);
  const hover = useUI((s) => s.hoverProject);
  const focused = focus === id;
  const lit = focused || hover === id;
  const dimmed = focus !== null && !focused;
  const lift = useRef<THREE.Group>(null);
  const ring = useRef<THREE.LineSegments>(null);

  useFrame(({ clock }, dt) => {
    const g = lift.current;
    if (!g) return;
    const t = sceneTime(clock.elapsedTime);
    const k = Math.min(dt * 5, 1);
    const targetY = TOP + (lit ? 0.3 : 0) + Math.sin(t * 0.9 + LAB_ARTIFACTS[id][0]) * 0.05;
    g.position.y += (targetY - g.position.y) * k;
    const yaw = lit ? frame.pointer.x * 0.5 : Math.sin(t * 0.3 + LAB_ARTIFACTS[id][0]) * 0.2;
    g.rotation.y += (yaw - g.rotation.y) * k;
    const s = dimmed ? 0.85 : 1;
    g.scale.setScalar(g.scale.x + (s - g.scale.x) * k);
    if (ring.current) {
      const mat = ring.current.material as THREE.LineBasicMaterial;
      mat.color.set(lit ? PALETTE.signal : PALETTE.bone);
      mat.opacity = lit ? 1 : 0.35;
    }
  });

  const over = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    if (!inLab() || ui.get().focus || aimedAtUI(e)) return;
    ui.set({ hoverProject: id, cursor: "view" });
  };
  const out = () => {
    if (ui.get().hoverProject === id) ui.set({ hoverProject: null, cursor: "default" });
  };
  const click = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (!inLab() || ui.get().focus || aimedAtUI(e)) return;
    openProject(id);
  };

  return (
    <group position={LAB_ARTIFACTS[id]}>
      <mesh position={[0, TOP / 2, 0]}>
        <boxGeometry args={[1.9, TOP, 1.9]} />
        <meshStandardMaterial color="#262d38" roughness={0.75} metalness={0.25} />
      </mesh>
      <Frame ref={ring} width={1.9} height={1.9} rotation-x={-Math.PI / 2} position={[0, TOP + 0.005, 0]} />
      <group ref={lift} position={[0, TOP, 0]}>
        {children}
      </group>
      {/* Generous invisible hit volume so small artifacts are easy to target */}
      <mesh position={[0, 1.9, 0]} onPointerOver={over} onPointerOut={out} onClick={click}>
        <boxGeometry args={[2.2, 3.6, 2.2]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>
      {focused && (
        <FlowArc id={id} mobile={mobile} carrier={id === "reswipe" ? <SwipeCard /> : undefined} />
      )}
    </group>
  );
}

export function LabStation({ mobile }: { mobile: boolean }) {
  const { groupRef, labels } = useRoomPresence(ROOM);
  const focus = useUI((s) => s.focus);

  return (
    <group ref={groupRef}>
      <Plinth id="ajnabee" mobile={mobile}>
        <AjnabeeArtifact focused={focus === "ajnabee"} />
      </Plinth>
      <Plinth id="ajnabee-partner" mobile={mobile}>
        <PartnerArtifact focused={focus === "ajnabee-partner"} />
      </Plinth>
      <Plinth id="reswipe" mobile={mobile}>
        <ReSwipeArtifact />
      </Plinth>
      {labels &&
        !focus &&
        (Object.keys(LAB_ARTIFACTS) as ProjectId[]).map((id) => (
          <Tag key={id} position={[LAB_ARTIFACTS[id][0], 0.35, LAB_ARTIFACTS[id][2] + 1.1]}>
            {getProject(id).name}
          </Tag>
        ))}
    </group>
  );
}
