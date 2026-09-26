"use client";

import { projects } from "@/data/projects";
import { RoomTitle } from "@/components/ui-lab/RoomTitle";
import { openProject } from "@/lib/lab-actions";
import { ui, useUI } from "@/lib/lab-state";

const ROOM = 5;

/**
 * The Lab: products as objects. Clicking an artifact in the scene opens it;
 * these buttons do the same for keyboard, touch and screen-reader users.
 */
export function Lab() {
  const hover = useUI((s) => s.hoverProject);

  return (
    <section id="lab" className="room" aria-labelledby="lab-title" style={{ ["--room-h" as string]: "190vh" }}>
      <div className="room-pin !justify-between">
        <div className="col">
          <RoomTitle room={ROOM} id="lab-title" lines={["The Lab"]} />
          <p className="lede mt-6">Three products I shipped. Pick one up to see how it works.</p>
        </div>

        <ul className="mt-10 grid gap-x-8 sm:grid-cols-3 md:max-w-5xl" aria-label="Projects">
          {projects.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                data-cursor="view"
                data-project-trigger={p.id}
                onClick={() => openProject(p.id)}
                onPointerEnter={() => ui.set({ hoverProject: p.id })}
                onPointerLeave={() => ui.set({ hoverProject: null })}
                onFocus={() => ui.set({ hoverProject: p.id })}
                onBlur={() => ui.set({ hoverProject: null })}
                className="group block w-full border-t py-4 text-left transition-colors duration-300"
                style={{ borderColor: hover === p.id ? "var(--signal)" : "var(--line)" }}
              >
                <span className="display block whitespace-nowrap text-lg transition-colors group-hover:text-signal lg:text-xl">
                  {p.name}
                </span>
                <span className="mt-1.5 block text-sm text-slate">
                  {p.kind}
                  <span className="text-bone"> · {p.outcome.value}</span> {p.outcome.label}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
