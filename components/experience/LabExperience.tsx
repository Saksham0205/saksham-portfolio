"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { labelLayer, ui, useUI } from "@/lib/lab-state";
import { ScrollDirector } from "./ScrollDirector";
import { Hud } from "@/components/hud/Hud";
import { Cursor } from "@/components/hud/Cursor";
import { BootLoader } from "@/components/hud/BootLoader";
import { CaseStudy } from "@/components/hud/CaseStudy";

// three.js and the whole scene live in their own chunk, loaded after first paint.
const LabCanvas = dynamic(() => import("@/components/scene/LabCanvas"), { ssr: false });

function detectWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

function detectQuality(): "high" | "low" {
  const nav = navigator as Navigator & { deviceMemory?: number };
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const small = window.innerWidth < 768;
  const weakCpu = (nav.hardwareConcurrency ?? 8) <= 4;
  const lowMemory = (nav.deviceMemory ?? 8) <= 4;
  return coarse || small || weakCpu || lowMemory ? "low" : "high";
}

export function LabExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const webgl = useUI((s) => s.webgl);
  const focus = useUI((s) => s.focus);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ui.set({ webgl: detectWebGL(), quality: detectQuality(), reduced });
    setMounted(true);
    if (window.matchMedia("(pointer: fine)").matches) document.documentElement.classList.add("has-cursor");
    return () => document.documentElement.classList.remove("has-cursor");
  }, []);

  return (
    <div ref={root} className="relative" data-focus={focus !== null}>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[95] focus:bg-signal focus:px-4 focus:py-2 focus:text-void"
      >
        Skip the tour and read about Saksham
      </a>
      {mounted && webgl ? (
        <div className="stage" aria-hidden="true">
          <LabCanvas eventSource={root} />
        </div>
      ) : (
        <div className="stage-fallback" aria-hidden="true" />
      )}
      <div className="legibility" aria-hidden="true" />
      <div
        className="scene-labels"
        aria-hidden="true"
        ref={(el) => {
          if (el) labelLayer.current = el;
        }}
      />

      <ScrollDirector />
      <BootLoader />
      <Hud />
      <CaseStudy />
      {children}
      <Cursor />
    </div>
  );
}
