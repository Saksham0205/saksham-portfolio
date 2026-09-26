"use client";

import { useEffect, useRef, useState } from "react";
import { ui, useUI } from "@/lib/lab-state";

const LINES = ["Mounting rooms", "Wiring the data spine", "Calibrating camera", "Lab online"];

/**
 * The one orchestrated loading moment. Counts while the 3D chunk loads, then
 * wipes away. Server-rendered so there is no flash of the page beneath it;
 * hidden by <noscript> CSS when JavaScript is off.
 */
export function BootLoader() {
  const sceneReady = useUI((s) => s.sceneReady);
  const webgl = useUI((s) => s.webgl);
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);
  const started = useRef(performance.now());

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let current = 0;
    const tick = () => {
      const elapsed = performance.now() - started.current;
      const ready = ui.get().sceneReady || !ui.get().webgl;
      // Ease towards 90 while loading; finish only once the scene exists.
      const soft = Math.min(90, (elapsed / 1400) * 90);
      current = ready ? Math.min(100, current + 4) : Math.max(current, Math.floor(soft));
      setCount(current);
      if (current < 100) raf = requestAnimationFrame(tick);
    };
    if (reduced) {
      setCount(100);
    } else {
      raf = requestAnimationFrame(tick);
    }
    // Never hold the visitor hostage: give up waiting after 4s.
    const bail = setTimeout(() => setCount(100), 4000);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(bail);
    };
  }, []);

  useEffect(() => {
    if (count < 100 || done) return;
    const t = setTimeout(() => {
      setDone(true);
      ui.set({ booted: true });
    }, 250);
    return () => clearTimeout(t);
  }, [count, done]);

  const line = LINES[Math.min(LINES.length - 1, Math.floor((count / 100) * LINES.length))];

  return (
    <>
      <noscript>
        <style>{`.boot{display:none}`}</style>
      </noscript>
      <div className="boot" data-done={done} aria-hidden={done} role="status" aria-live="polite">
        <div className="w-full">
          <div className="flex items-end justify-between gap-6">
            <p className="display text-[clamp(4rem,16vw,15rem)] leading-none tabular-nums">
              {String(count).padStart(3, "0")}
            </p>
            <div className="readout mb-4 hidden text-right text-slate sm:block">
              <p>Saksham&apos;s product lab</p>
              <p className="text-bone">{webgl || !sceneReady ? line : "Lab online"}</p>
            </div>
          </div>
          <div className="mt-4 h-px w-full bg-line">
            <div className="h-px bg-signal transition-[width] duration-200" style={{ width: `${count}%` }} />
          </div>
        </div>
      </div>
    </>
  );
}
