"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { rooms } from "@/data/rooms";
import { profile } from "@/data/profile";
import { frame, onScrollFrame, useUI } from "@/lib/lab-state";
import { scrollToId } from "@/lib/scroll";
import { Decode } from "@/components/ui-lab/Decode";
import { Menu } from "./Menu";

/** Progress bar on the rail, written straight to the DOM on scroll. */
function useRailProgress() {
  const fill = useRef<HTMLDivElement>(null);
  useEffect(
    () =>
      onScrollFrame(() => {
        if (fill.current) fill.current.style.transform = `scaleY(${frame.param / (rooms.length - 1)})`;
      }),
    [],
  );
  return fill;
}

export function Hud() {
  const room = useUI((s) => s.room);
  const booted = useUI((s) => s.booted);
  const focus = useUI((s) => s.focus);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const fill = useRailProgress();
  const hidden = !booted || focus !== null;
  const current = rooms[room];

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-40 flex items-start justify-between bg-gradient-to-b from-void from-75% to-transparent px-[var(--gutter)] pb-9 pt-5 transition-opacity duration-700 md:bg-none md:pb-0 md:pt-7"
        style={{ opacity: booted ? 1 : 0 }}
      >
        <a
          href="#entrance"
          onClick={(e) => {
            e.preventDefault();
            scrollToId("entrance");
          }}
          className="group leading-tight"
          aria-label="Saksham Chauhan — back to the entrance"
        >
          <span className="display block text-sm tracking-normal md:text-base">{profile.name}</span>
          <span className="meta mt-0.5 flex items-baseline gap-2 text-xs" aria-hidden="true">
            <span>Product lab</span>
            <span className="readout text-signal">{String(room + 1).padStart(2, "0")}</span>
            <Decode text={current.name} className="text-bone" />
          </span>
        </a>
        <nav aria-label="Primary" className="flex items-center gap-5 md:gap-8">
          <a href={profile.links.resume} target="_blank" rel="noopener noreferrer" className="link-line text-sm">
            Resume
          </a>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={menuOpen}
            className="flex items-center gap-2.5 text-sm"
          >
            <span className="flex flex-col gap-[5px]" aria-hidden="true">
              <span className="block h-px w-5 bg-bone" />
              <span className="block h-px w-3.5 bg-bone" />
            </span>
            Index
          </button>
        </nav>
      </header>

      <p className="sr-only" aria-live="polite">
        {booted ? `Now in: ${current.name}` : ""}
      </p>

      {/* Room rail (right edge): a map of the journey, every stop clickable */}
      <nav
        aria-label="Rooms"
        className="fixed right-3 top-1/2 z-30 hidden -translate-y-1/2 transition-opacity duration-500 md:block"
        style={{ opacity: hidden ? 0 : 1, pointerEvents: hidden ? "none" : "auto" }}
      >
        <div className="absolute right-[13px] top-2 bottom-2 w-px bg-line" aria-hidden="true">
          <div ref={fill} className="h-full w-px origin-top bg-signal" style={{ transform: "scaleY(0)" }} />
        </div>
        <ol className="relative flex flex-col gap-3.5">
          {rooms.map((r, i) => (
            <li key={r.id}>
              <button
                type="button"
                onClick={() => scrollToId(r.id)}
                className="group flex items-center justify-end gap-3 py-0.5"
                aria-label={`Go to ${r.name}`}
                aria-current={i === room ? "location" : undefined}
              >
                <span
                  className="text-xs text-slate opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                  aria-hidden="true"
                >
                  {r.name}
                </span>
                <span
                  className="block h-px transition-all duration-500"
                  style={{
                    width: i === room ? 28 : 12,
                    background: i === room ? "var(--signal)" : "var(--slate)",
                  }}
                  aria-hidden="true"
                />
              </button>
            </li>
          ))}
        </ol>
      </nav>

      {/* Live camera coordinates — the lab is a real 3D space */}
      <p
        id="cam-readout"
        className="readout pointer-events-none fixed bottom-5 right-[var(--gutter)] z-30 hidden text-slate lg:block"
        style={{ opacity: hidden ? 0 : 0.8 }}
        aria-hidden="true"
      />

      <Menu open={menuOpen} onClose={closeMenu} current={room} />
    </>
  );
}
