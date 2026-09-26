"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { rooms } from "@/data/rooms";
import { computeScroll, emitScrollFrame, frame, ui } from "@/lib/lab-state";
import { setLenis } from "@/lib/scroll";

/**
 * Owns smooth scrolling and translates the document scroll position into the
 * camera parameter the 3D scene follows. Renders nothing.
 */
export function ScrollDirector() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const measure = () => {
      frame.vh = window.innerHeight;
      frame.sections = rooms.map(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return { top: 0, height: 0 };
        const rect = el.getBoundingClientRect();
        return { top: rect.top + window.scrollY, height: rect.height };
      });
      update(window.scrollY);
    };

    const update = (y: number) => {
      computeScroll(y);
      const room = Math.round(frame.param);
      ui.set({ room });
      emitScrollFrame();
    };

    let lenis: Lenis | null = null;
    let raf = 0;
    if (!reduced) {
      // Touch devices keep native momentum scrolling; Lenis only smooths wheel input.
      lenis = new Lenis({ duration: 1.25, smoothWheel: true, syncTouch: false });
      setLenis(lenis);
      lenis.on("scroll", (l: Lenis) => {
        frame.velocity = l.velocity;
        update(l.scroll);
      });
      const loop = (time: number) => {
        lenis?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    }

    const onNativeScroll = () => {
      if (!lenis) update(window.scrollY);
    };
    const onPointer = (e: PointerEvent) => {
      frame.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      frame.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    window.addEventListener("scroll", onNativeScroll, { passive: true });
    if (!coarse) window.addEventListener("pointermove", onPointer, { passive: true });

    const ro = new ResizeObserver(measure);
    ro.observe(document.body);
    window.addEventListener("resize", measure);
    measure();

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      setLenis(null);
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", onNativeScroll);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return null;
}
