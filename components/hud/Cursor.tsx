"use client";

import { useEffect, useRef } from "react";
import { ui, type CursorKind } from "@/lib/lab-state";

const LABELS: Partial<Record<CursorKind, string>> = {
  explore: "Explore",
  view: "View",
  close: "Close",
  drag: "Move",
};

/**
 * Desktop-only cursor. DOM targets declare intent with `data-cursor`; 3D
 * objects set it through the UI store. Positioned with transforms in a
 * single rAF loop — no React renders on pointer move.
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let x = -100;
    let y = -100;
    let rx = x;
    let ry = y;
    let domKind: CursorKind | null = null;
    let shown = "";
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const el = (e.target as HTMLElement | null)?.closest<HTMLElement>("[data-cursor], a, button, [role='tab']");
      domKind = el ? ((el.dataset.cursor as CursorKind | undefined) ?? "link") : null;
    };
    const onLeave = () => {
      x = y = -100;
    };

    const loop = () => {
      const k = reduced ? 1 : 0.2;
      rx += (x - rx) * k;
      ry += (y - ry) * k;
      const kind: CursorKind = domKind ?? ui.get().cursor;
      if (dot.current) dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
        if (ring.current.dataset.kind !== kind) {
          ring.current.dataset.kind = kind;
          const text = LABELS[kind] ?? "";
          if (label.current && text !== shown) {
            label.current.textContent = text;
            shown = text;
          }
        }
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] hidden [@media(pointer:fine)]:block">
      <div ref={ring} className="cursor-ring" data-kind="default">
        <span ref={label} className="cursor-label" />
      </div>
      <div ref={dot} className="cursor-dot" />
    </div>
  );
}
