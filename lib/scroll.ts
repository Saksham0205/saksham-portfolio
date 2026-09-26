"use client";

import { useEffect, useState } from "react";
import type Lenis from "lenis";
import { frame, onScrollFrame } from "@/lib/lab-state";

let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};
export const getLenis = () => lenis;

export function scrollToId(id: string, opts: { immediate?: boolean } = {}) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) {
    lenis.scrollTo(el, { duration: opts.immediate ? 0 : 2.2, immediate: opts.immediate, force: true });
  } else {
    el.scrollIntoView({ behavior: opts.immediate ? "auto" : "smooth" });
  }
}

export const lockScroll = (locked: boolean) => {
  if (lenis) {
    if (locked) lenis.stop();
    else lenis.start();
  }
  document.documentElement.style.overflow = locked ? "hidden" : "";
};

/**
 * Returns which of `steps` equal slices of a room's hold progress is active.
 * Only re-renders when the step changes.
 */
export function useRoomStep(room: number, steps: number) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const update = () => {
      const s = Math.min(steps - 1, Math.floor(frame.local[room] * steps));
      setStep((prev) => (prev === s ? prev : s));
    };
    update();
    return onScrollFrame(update);
  }, [room, steps]);
  return step;
}

/** True once the camera has (mostly) arrived in the room. Latches on first arrival. */
export function useRoomReached(room: number) {
  const [reached, setReached] = useState(false);
  useEffect(() => {
    if (reached) return;
    const update = () => {
      if (frame.param > room - 0.35) setReached(true);
    };
    update();
    return onScrollFrame(update);
  }, [room, reached]);
  return reached;
}
