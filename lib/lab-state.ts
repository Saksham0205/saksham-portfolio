"use client";

import { useSyncExternalStore } from "react";
import type { ProjectId } from "@/data/projects";
import { ROOM_COUNT } from "@/data/rooms";

/* ------------------------------------------------------------------ */
/* Per-frame state                                                     */
/* Mutated on scroll / pointer events and read inside useFrame. Never  */
/* triggers React renders.                                             */
/* ------------------------------------------------------------------ */

export const frame = {
  scrollY: 0,
  velocity: 0,
  /** Continuous camera position along the room sequence: 2.5 = halfway between rooms 2 and 3. */
  param: 0,
  /** How far through its "hold" each room is, 0..1. */
  local: new Float32Array(ROOM_COUNT),
  /** Pointer in normalized device coords, -1..1. */
  pointer: { x: 0, y: 0 },
  sections: [] as { top: number; height: number }[],
  vh: 800,
};

/**
 * A room "holds" (camera parked, content readable) while its section is
 * pinned to the viewport, then transitions to the next room during the
 * final viewport-height of scroll, as the next section slides in.
 */
export function computeScroll(scrollY: number) {
  const { sections, vh, local } = frame;
  frame.scrollY = scrollY;
  if (!sections.length) return;

  let param = 0;
  for (let i = 0; i < sections.length; i++) {
    const { top, height } = sections[i];
    const hold = Math.max(height - vh, 0);
    local[i] = hold > 0 ? Math.min(Math.max((scrollY - top) / hold, 0), 1) : scrollY >= top ? 1 : 0;

    if (scrollY >= top) {
      const leaveStart = top + hold;
      const next = sections[i + 1];
      if (!next) {
        param = i;
      } else {
        const span = Math.max(next.top - leaveStart, 1);
        param = i + Math.min(Math.max((scrollY - leaveStart) / span, 0), 1);
      }
    }
  }
  frame.param = param;
}

/**
 * Fixed layer that 3D labels portal into. Without it drei's Html mounts into
 * R3F's eventSource (the scrolling page root) and labels drift off-screen.
 * Lives here, not in the scene, so the main bundle never imports three.js.
 */
export const labelLayer: { current: HTMLElement } = { current: null as unknown as HTMLElement };

const scrollListeners = new Set<() => void>();
export const onScrollFrame = (fn: () => void) => {
  scrollListeners.add(fn);
  return () => void scrollListeners.delete(fn);
};
export const emitScrollFrame = () => scrollListeners.forEach((fn) => fn());

/* ------------------------------------------------------------------ */
/* UI state                                                            */
/* Low-frequency state that React components render from.             */
/* ------------------------------------------------------------------ */

export type CursorKind = "default" | "link" | "explore" | "view" | "close" | "drag";
export type Quality = "high" | "low";

export interface UIState {
  room: number;
  focus: ProjectId | null;
  hoverProject: ProjectId | null;
  cursor: CursorKind;
  booted: boolean;
  quality: Quality;
  reduced: boolean;
  webgl: boolean;
  sceneReady: boolean;
}

let state: UIState = {
  room: 0,
  focus: null,
  hoverProject: null,
  cursor: "default",
  booted: false,
  quality: "high",
  reduced: false,
  webgl: true,
  sceneReady: false,
};

const listeners = new Set<() => void>();

export const ui = {
  get: () => state,
  set(patch: Partial<UIState>) {
    let changed = false;
    for (const key in patch) {
      const k = key as keyof UIState;
      if (state[k] !== patch[k]) changed = true;
    }
    if (!changed) return;
    state = { ...state, ...patch };
    listeners.forEach((l) => l());
  },
  subscribe(fn: () => void) {
    listeners.add(fn);
    return () => void listeners.delete(fn);
  },
};

export function useUI<T>(selector: (s: UIState) => T): T {
  return useSyncExternalStore(
    ui.subscribe,
    () => selector(state),
    () => selector(state),
  );
}
