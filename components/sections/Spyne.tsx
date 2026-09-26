"use client";

import { spyne as role } from "@/data/experience";
import { RoomTitle } from "@/components/ui-lab/RoomTitle";
import { Counter } from "@/components/ui-lab/Counter";
import { useRoomStep } from "@/lib/scroll";
import { RoleMeta } from "./RoleMeta";

const ROOM = 3;

export function Spyne() {
  const phase = useRoomStep(ROOM, role.phases.length);

  return (
    <section id="spyne" className="room" aria-labelledby="spyne-title" style={{ ["--room-h" as string]: "300vh" }}>
      <div className="room-pin">
        <div className="col">
          <RoomTitle room={ROOM} id="spyne-title" lines={["Spyne"]} />
          <RoleMeta role={role} />
          <p className="meta mt-2">AI call operations</p>

          {/* Campaigns → call insights → dashboards, lit in step with the scene */}
          <ol className="mt-7 grid gap-4 border-t border-line pt-5">
            {role.phases.map((p, i) => (
              <li
                key={p.id}
                className="grid grid-cols-[2.2rem_1fr] transition-opacity duration-500"
                style={{ opacity: i === phase ? 1 : 0.42 }}
                aria-current={i === phase ? "step" : undefined}
              >
                <span className={`readout pt-1 ${i === phase ? "text-signal" : "text-slate"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="font-semibold">{p.title}</h3>
                  <p className="mt-1 max-w-[46ch] text-[0.95rem] text-bone/80">{p.point}</p>
                </div>
              </li>
            ))}
          </ol>

          <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-line pt-5">
            {role.metrics.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <Counter value={m.value} suffix={m.suffix} className="display block text-[clamp(1.8rem,3vw,2.6rem)]" />
                  <span className="mt-1 block text-xs leading-snug text-slate" aria-hidden="true">
                    {m.label}
                  </span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 border-t border-line pt-5">
            <h3 className="font-semibold">{role.featuredBuild.title}</h3>
            <p className="mt-1 max-w-[50ch] text-sm text-bone/75">{role.featuredBuild.summary}</p>
            <p className="meta mt-3 text-xs">
              {role.featuredBuild.pipeline.join(" → ")} · with {role.featuredBuild.integrations.join(" & ")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
