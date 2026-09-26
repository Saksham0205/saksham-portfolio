"use client";

import { useEffect, useRef } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/<>_-+";

/**
 * Text that resolves out of noise whenever `text` changes, like a readout
 * settling. Screen readers get the final text only.
 */
export function Decode({
  text,
  className,
  duration = 520,
  onMount = false,
}: {
  text: string;
  className?: string;
  duration?: number;
  /** Also decode when first mounted (e.g. content swapped in by a tab). */
  onMount?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const first = useRef(!onMount);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (first.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      first.current = false;
      el.textContent = text;
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const settled = Math.floor(p * text.length);
      let out = text.slice(0, settled);
      for (let i = settled; i < text.length; i++) {
        out += text[i] === " " ? " " : GLYPHS[(Math.random() * GLYPHS.length) | 0];
      }
      el.textContent = out;
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [text, duration]);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
    </span>
  );
}
