"use client";

import { omnidimension as role } from "@/data/experience";
import { RoomTitle } from "@/components/ui-lab/RoomTitle";
import { RoleMeta } from "./RoleMeta";
import { useRoomStep } from "@/lib/scroll";

const ROOM = 2;

export function OmniDimension() {
  const step = useRoomStep(ROOM, role.pipeline.length);
  const active = role.pipeline[step];

  return (
    <section
      id="omnidimension"
      className="room"
      aria-labelledby="omni-title"
      style={{ ["--room-h" as string]: "330vh" }}
    >
      <div className="room-pin">
        <div className="col">
          <RoomTitle room={ROOM} id="omni-title" lines={[role.company]} />
          <RoleMeta role={role} />

          {/* The pipeline, scrubbed by scroll — the packet in the scene sits on the active step */}
          <div className="mt-8 border-t border-line pt-5">
            <p className="meta mb-3">A voice agent, end to end</p>
            <ol className="flex flex-wrap gap-x-1 gap-y-2 text-sm" aria-label="Voice agent pipeline">
              {role.pipeline.map((s, i) => (
                <li key={s.id} className="flex items-center gap-1" aria-current={i === step ? "step" : undefined}>
                  <span
                    className="px-2 py-1 transition-colors duration-300"
                    style={{
                      color: i === step ? "var(--void)" : i < step ? "var(--bone)" : "var(--slate)",
                      background: i === step ? "var(--signal)" : "transparent",
                    }}
                  >
                    {s.label}
                    <span className="sr-only">: {s.note}</span>
                  </span>
                  {i < role.pipeline.length - 1 && (
                    <span className="text-slate" aria-hidden="true">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-4 min-h-[3.2em] max-w-[40ch] text-bone/90" aria-hidden="true">
              <span className="readout mr-2 text-signal">{String(step + 1).padStart(2, "0")}</span>
              {active.note}
            </p>
          </div>

          <ul className="mt-6 grid gap-3 text-[0.95rem] text-bone/80">
            {role.points.map((p) => (
              <li key={p} className="flex gap-3">
                <span className="mt-[0.72em] h-px w-4 shrink-0 bg-slate" aria-hidden="true" />
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <p className="meta mt-6 text-sm">{role.tech.join(", ")}</p>
        </div>
      </div>
    </section>
  );
}
