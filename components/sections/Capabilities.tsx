"use client";

import { useEffect, useState } from "react";
import { capabilities } from "@/data/skills";
import { RoomTitle } from "@/components/ui-lab/RoomTitle";
import { Decode } from "@/components/ui-lab/Decode";
import { useRoomStep } from "@/lib/scroll";

const ROOM = 7;

/**
 * Skills as capabilities, not a badge wall. Scrolling walks through them;
 * choosing one pins it until you scroll on.
 */
export function Capabilities() {
  const step = useRoomStep(ROOM, capabilities.length);
  const [picked, setPicked] = useState<number | null>(null);
  useEffect(() => setPicked(null), [step]);
  const current = picked ?? step;
  const cap = capabilities[current];

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = (current + dir + capabilities.length) % capabilities.length;
    setPicked(next);
    document.getElementById(`cap-tab-${next}`)?.focus();
  };

  return (
    <section
      id="capabilities"
      className="room"
      aria-labelledby="cap-title"
      style={{ ["--room-h" as string]: "230vh" }}
    >
      <div className="room-pin">
        <div className="col">
          <RoomTitle room={ROOM} id="cap-title" lines={["What I", "work with"]} />

          <div role="tablist" aria-label="Capabilities" className="mt-9 flex flex-wrap gap-x-5 gap-y-2" onKeyDown={onKey}>
            {capabilities.map((c, i) => (
              <button
                key={c.id}
                id={`cap-tab-${i}`}
                role="tab"
                type="button"
                aria-selected={i === current}
                aria-controls="cap-panel"
                tabIndex={i === current ? 0 : -1}
                onClick={() => setPicked(i)}
                className="border-b py-1.5 text-left transition-colors duration-300"
                style={{
                  borderColor: i === current ? "var(--signal)" : "transparent",
                  color: i === current ? "var(--bone)" : "var(--slate)",
                }}
              >
                {c.title}
              </button>
            ))}
          </div>

          <div id="cap-panel" role="tabpanel" aria-labelledby={`cap-tab-${current}`} className="mt-7 min-h-[20rem]">
            <p className="lede">{cap.line}</p>
            <div className="mt-7 grid gap-6 sm:grid-cols-2">
              {cap.groups.map((g) => (
                <div key={`${cap.id}-${g.name}`}>
                  <h3 className="meta mb-2">{g.name}</h3>
                  <ul className="grid gap-1.5">
                    {g.items.map((item) => (
                      <li key={item}>
                        <Decode text={item} onMount />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
