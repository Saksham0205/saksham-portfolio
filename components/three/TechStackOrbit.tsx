"use client";

import { useEffect, useRef } from "react";
import {
  siDart,
  siFastapi,
  siFirebase,
  siFlutter,
  siGooglecloud,
  siMongodb,
  siNestjs,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siTypescript,
} from "simple-icons";

const STACK = [
  // Center & Front (Prominent & High Z)
  { icon: siNestjs, x: -16, y: -6, z: 65, tilt: 4 },
  { icon: siTypescript, x: -75, y: -45, z: 45, tilt: -12 },
  { icon: siPython, x: 62, y: -40, z: 48, tilt: 10 },
  { icon: siNextdotjs, x: 66, y: 24, z: 38, tilt: 8 },
  { icon: siNodedotjs, x: -84, y: 20, z: 32, tilt: -14 },

  // Mid Ring
  { icon: siFlutter, x: 136, y: -62, z: 8, tilt: 20 },
  { icon: siDart, x: 144, y: 8, z: -10, tilt: 18 },
  { icon: siFastapi, x: -142, y: -66, z: 2, tilt: -20 },
  { icon: siMongodb, x: -14, y: 64, z: 12, tilt: 6 },
  { icon: siPostgresql, x: -98, y: 82, z: -4, tilt: -15 },
  { icon: siFirebase, x: 52, y: 84, z: -14, tilt: -8 },

  // Outer accents
  { icon: siGooglecloud, x: -10, y: -86, z: 16, tilt: -6 },
] as const;

export function TechStackOrbit() {
  const clusterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cluster = clusterRef.current;
    if (!cluster) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const parent = cluster.closest("[data-tech-orbit]") as HTMLElement | null;
    if (!parent) return;

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      cluster.style.transform = `rotateX(${-ny * 16}deg) rotateY(${nx * 22}deg)`;
    };

    const onLeave = () => {
      cluster.style.transform = "rotateX(-10deg) rotateY(-16deg)";
    };

    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);
    return () => {
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      data-tech-orbit
      className="relative h-[270px] w-full select-none"
      aria-label="Technologies I use"
    >
      <div className="absolute inset-0 [perspective:900px]">
        <div
          ref={clusterRef}
          className="relative h-full w-full [transform-style:preserve-3d] motion-safe:transition-transform motion-safe:duration-300 motion-safe:ease-out"
          style={{ transform: "rotateX(-10deg) rotateY(-16deg)" }}
        >
          {STACK.map((item, i) => (
            <div
              key={item.icon.slug}
              className="group/tile tech-float absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
              style={{
                transform: `translate3d(${item.x}px, ${item.y}px, ${item.z}px) rotateY(${item.tilt}deg)`,
                animationDelay: `${i * 0.12}s`,
                animationDuration: `${4.2 + (i % 4) * 0.45}s`,
              }}
            >
              <div className="relative h-14 w-14 [transform-style:preserve-3d] transition-transform duration-300 group-hover/tile:scale-115">
                <div
                  className="absolute inset-0 flex items-center justify-center border border-primary/40 bg-[#12141c]/92 shadow-[0_0_28px_-6px_oklch(0.88_0.21_128/0.65)] backdrop-blur-sm"
                  style={{ transform: "translateZ(10px)" }}
                >
                  <svg viewBox="0 0 24 24" className="size-7 fill-primary" aria-hidden>
                    <path d={item.icon.path} />
                  </svg>
                </div>
                <div
                  aria-hidden
                  className="absolute top-0 right-0 h-14 w-2 origin-right bg-primary/45"
                  style={{ transform: "rotateY(90deg)" }}
                />
                <div
                  aria-hidden
                  className="absolute bottom-0 left-0 h-2 w-14 origin-bottom bg-black/55"
                  style={{ transform: "rotateX(90deg)" }}
                />
              </div>
              <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.16em] text-primary opacity-0 transition-opacity duration-200 group-hover/tile:opacity-100">
                {item.icon.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      <ul className="sr-only">
        {STACK.map((item) => (
          <li key={item.icon.slug}>{item.icon.title}</li>
        ))}
      </ul>
    </div>
  );
}
