"use client";

import { Reveal } from "@/components/Reveal";

interface EducationProps {
  addToRefs?: (el: HTMLElement | null) => void;
}

export function Education({ addToRefs }: EducationProps) {
  return (
    <section id="education" ref={addToRefs} className="px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 flex items-baseline justify-between border-b border-border pb-4">
          <h2 className="font-display text-3xl font-extrabold uppercase tracking-[-0.03em] md:text-5xl">
            Education
          </h2>
          <span className="label">04 / Education</span>
        </div>

        <Reveal>
          <div className="max-w-xl border border-border bg-surface/50 p-8 backdrop-blur-md">
            <span className="label text-primary">Education</span>
            <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">
              Maharaja Agrasen Institute of Technology
            </h3>
            <p className="mt-2 text-foreground/80 text-sm">
              B.Tech in Computer Science and Engineering
            </p>
            <div className="mt-6 flex justify-between border-t border-border pt-4 font-mono text-xs text-muted-foreground">
              <span>2022 — 2026</span>
              <span>New Delhi, India</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
