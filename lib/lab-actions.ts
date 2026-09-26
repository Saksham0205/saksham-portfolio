"use client";

import type { ProjectId } from "@/data/projects";
import { ui } from "@/lib/lab-state";
import { lockScroll } from "@/lib/scroll";

let returnFocus: HTMLElement | null = null;

export function openProject(id: ProjectId) {
  if (typeof document !== "undefined") returnFocus = document.activeElement as HTMLElement | null;
  ui.set({ focus: id, hoverProject: null, cursor: "default" });
  lockScroll(true);
}

export function closeProject() {
  const id = ui.get().focus;
  if (!id) return;
  ui.set({ focus: null });
  lockScroll(false);
  // Return keyboard focus to whatever opened the case study.
  const fallback = document.querySelector<HTMLElement>(`[data-project-trigger="${id}"]`);
  (returnFocus?.isConnected ? returnFocus : fallback)?.focus({ preventScroll: true });
  returnFocus = null;
}
