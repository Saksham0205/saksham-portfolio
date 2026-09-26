"use client";

import { useEffect, useRef } from "react";
import { rooms } from "@/data/rooms";
import { profile } from "@/data/profile";
import { ui } from "@/lib/lab-state";
import { lockScroll, scrollToId } from "@/lib/scroll";
import { useFocusTrap } from "@/lib/use-focus-trap";

/** Fallback navigation: every room, one click away. */
export function Menu({ open, onClose, current }: { open: boolean; onClose: () => void; current: number }) {
  const panel = useRef<HTMLDivElement>(null);
  useFocusTrap(panel, open, onClose);

  useEffect(() => {
    if (!open) return;
    lockScroll(true);
    return () => {
      if (!ui.get().focus) lockScroll(false);
    };
  }, [open]);

  const go = (id: string) => {
    onClose();
    // Let the scroll lock release before travelling.
    requestAnimationFrame(() => scrollToId(id));
  };

  return (
    <div
      ref={panel}
      role="dialog"
      aria-modal="true"
      aria-label="Index of rooms"
      className="fixed inset-0 z-[80] overflow-y-auto bg-void/95 backdrop-blur-md transition-[opacity,visibility] duration-500"
      style={{ opacity: open ? 1 : 0, visibility: open ? "visible" : "hidden" }}
    >
      <div className="flex min-h-full flex-col px-[var(--gutter)] pb-10 pt-5 md:pt-7">
        <div className="flex items-start justify-between">
          <p className="meta">Index · {rooms.length} rooms</p>
          <button type="button" onClick={onClose} className="link-line text-sm" data-cursor="close">
            Close
          </button>
        </div>

        <ol className="mt-10 grid gap-x-12 md:mt-16 md:grid-cols-2">
          {rooms.map((r, i) => (
            <li key={r.id} className="border-t border-line">
              <button
                type="button"
                onClick={() => go(r.id)}
                className="group flex w-full items-baseline gap-5 py-3 text-left md:py-4"
                aria-current={i === current ? "location" : undefined}
              >
                <span className={`readout ${i === current ? "text-signal" : "text-slate"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="display text-[clamp(1.6rem,4vw,3rem)] transition-colors duration-300 group-hover:text-signal">
                  {r.name}
                </span>
              </button>
            </li>
          ))}
        </ol>

        <div className="mt-auto flex flex-wrap gap-x-8 gap-y-3 pt-12 text-sm">
          <a className="link-line" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          <a className="link-line" href={profile.links.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a className="link-line" href={profile.links.github} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a className="link-line" href={profile.links.resume} target="_blank" rel="noopener noreferrer">
            Resume
          </a>
        </div>
      </div>
    </div>
  );
}
