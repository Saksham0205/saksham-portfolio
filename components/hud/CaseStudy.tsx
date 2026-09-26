"use client";

import { useEffect, useRef } from "react";
import { getProject, projects, type ProjectId } from "@/data/projects";
import { ui, useUI } from "@/lib/lab-state";
import { closeProject } from "@/lib/lab-actions";
import { useFocusTrap } from "@/lib/use-focus-trap";

/**
 * The case study that slides in beside an opened artifact. The camera move
 * happens in the scene; this is the reading layer.
 */
export function CaseStudy() {
  const focus = useUI((s) => s.focus);
  // Keep showing the last project while the panel animates out.
  const last = useRef<ProjectId | null>(null);
  if (focus) last.current = focus;
  const shown = focus ?? last.current;
  const panel = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  useFocusTrap(panel, focus !== null, closeProject);

  useEffect(() => {
    if (focus) scroller.current?.scrollTo({ top: 0 });
  }, [focus]);

  const project = shown ? getProject(shown) : null;
  const open = focus !== null;
  const nextId = project ? projects[(projects.findIndex((p) => p.id === project.id) + 1) % projects.length].id : null;

  return (
    <>
      {/* Click-away layer (desktop): clicking the scene closes, the cursor says so */}
      <div
        className="fixed inset-0 z-40 hidden md:block"
        style={{ pointerEvents: open ? "auto" : "none" }}
        onClick={closeProject}
        data-cursor="close"
        data-no-scene
        aria-hidden="true"
      />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        className="case-panel fixed z-50 flex flex-col bg-void/90 backdrop-blur-xl"
        data-open={open}
        style={{ visibility: open ? "visible" : "hidden" }}
      >
        {project && (
          <>
            <div className="flex items-center justify-between border-b border-line px-6 py-4 md:px-10">
              <p className="meta">{project.kind}</p>
              <button type="button" onClick={closeProject} className="link-line text-sm" data-cursor="close">
                Close <span className="text-slate">(Esc)</span>
              </button>
            </div>

            <div ref={scroller} className="no-scrollbar flex-1 overflow-y-auto overscroll-contain px-6 pb-10 pt-8 md:px-10">
              <h2 id="case-title" className="display text-[clamp(2.2rem,4.4vw,4rem)]">
                {project.name}
              </h2>
              <p className="lede mt-6 text-bone/90">{project.summary}</p>

              <dl className="mt-10 grid gap-8">
                <div>
                  <dt className="meta mb-2">The problem</dt>
                  <dd>{project.problem}</dd>
                </div>
                <div>
                  <dt className="meta mb-2">What I built</dt>
                  <dd>
                    <ul className="grid gap-2">
                      {project.built.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="mt-[0.7em] h-px w-4 shrink-0 bg-signal" aria-hidden="true" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
                <div>
                  <dt className="meta mb-2">How it flows</dt>
                  <dd>
                    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                      {project.flow.map((step, i) => (
                        <li key={step} className="flex items-center gap-2">
                          {step}
                          {i < project.flow.length - 1 && (
                            <span className="text-slate" aria-hidden="true">
                              →
                            </span>
                          )}
                        </li>
                      ))}
                    </ol>
                  </dd>
                </div>
                <div className="border-t border-line pt-6">
                  <dt className="meta mb-1">Outcome</dt>
                  <dd className="flex items-baseline gap-4">
                    <span className="display text-5xl text-signal">{project.outcome.value}</span>
                    <span className="text-slate">{project.outcome.label}</span>
                  </dd>
                </div>
                <div>
                  <dt className="meta mb-2">Built with</dt>
                  <dd className="text-sm text-bone/85">{project.tech.join(", ")}</dd>
                </div>
              </dl>

              <div className="mt-10 flex flex-wrap items-center gap-6">
                {project.links.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-enter"
                  >
                    Open on {l.label} <span className="arrow" aria-hidden="true">↗</span>
                  </a>
                ))}
                {nextId && (
                  <button type="button" className="link-line text-sm" onClick={() => ui.set({ focus: nextId })}>
                    Next: {getProject(nextId).name}
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
