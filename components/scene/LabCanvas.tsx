"use client";

import { useEffect, useState, type RefObject } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { AdaptiveEvents, PerformanceMonitor } from "@react-three/drei";
import { onScrollFrame, ui, useUI } from "@/lib/lab-state";
import { CameraRig } from "./CameraRig";
import { PALETTE } from "./layout";
import { Floor } from "./world/Floor";
import { Dust } from "./world/Dust";
import { Spine } from "./world/Spine";
import { Portals } from "./world/Portals";
import { EntranceStation } from "./stations/EntranceStation";
import { SignalStation } from "./stations/SignalStation";
import { PipelineStation } from "./stations/PipelineStation";
import { CallOpsStation } from "./stations/CallOpsStation";
import { AjnabeeStation } from "./stations/AjnabeeStation";
import { LabStation } from "./stations/LabStation";
import { LoopStation } from "./stations/LoopStation";

/** Under reduced motion the scene renders on demand: only when scroll or UI state changes. */
function DemandInvalidator() {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    const offScroll = onScrollFrame(() => invalidate());
    const offUI = ui.subscribe(() => invalidate());
    return () => {
      offScroll();
      offUI();
    };
  }, [invalidate]);
  return null;
}

function useMobileLayout() {
  const [mobile, setMobile] = useState(() => window.matchMedia("(max-width: 767px)").matches);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setMobile(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return mobile;
}

export default function LabCanvas({ eventSource }: { eventSource: RefObject<HTMLElement | null> }) {
  const quality = useUI((s) => s.quality);
  const reduced = useUI((s) => s.reduced);
  const mobile = useMobileLayout();
  const maxDpr = quality === "low" ? 1 : Math.min(window.devicePixelRatio || 1, 1.75);
  const [dpr, setDpr] = useState(maxDpr);

  return (
    <Canvas
      eventSource={eventSource as RefObject<HTMLElement>}
      eventPrefix="client"
      frameloop={reduced ? "demand" : "always"}
      dpr={dpr}
      gl={{ antialias: quality === "high", alpha: false, stencil: false, powerPreference: "high-performance" }}
      camera={{ fov: mobile ? 52 : 42, near: 0.1, far: 700, position: [0, 2.4, 14] }}
      style={{ pointerEvents: "none" }}
      onCreated={() => ui.set({ sceneReady: true })}
      aria-hidden="true"
    >
      <color attach="background" args={[PALETTE.void]} />
      <fog attach="fog" args={[PALETTE.void, 10, 62]} />
      <ambientLight intensity={0.55} />
      <directionalLight position={[8, 18, 10]} intensity={0.7} />

      <PerformanceMonitor
        onDecline={() => setDpr(1)}
        onIncline={() => setDpr(maxDpr)}
        flipflops={3}
        onFallback={() => setDpr(1)}
      />
      <AdaptiveEvents />
      {reduced && <DemandInvalidator />}

      <CameraRig mobile={mobile} />
      <Floor />
      <Spine />
      <Dust count={quality === "low" ? 600 : 2200} />
      <Portals mobile={mobile} />

      <EntranceStation />
      <SignalStation mobile={mobile} />
      <PipelineStation />
      <CallOpsStation />
      <AjnabeeStation />
      <LabStation mobile={mobile} />
      <LoopStation />
    </Canvas>
  );
}
