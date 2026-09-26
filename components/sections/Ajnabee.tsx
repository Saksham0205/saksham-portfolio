"use client";

import { ajnabee as role } from "@/data/experience";
import { achievements } from "@/data/milestones";
import { getProject } from "@/data/projects";
import { RoomTitle } from "@/components/ui-lab/RoomTitle";
import { Decode } from "@/components/ui-lab/Decode";
import { useRoomStep } from "@/lib/scroll";
import { RoleMeta } from "./RoleMeta";

const ROOM = 4;
const partner = getProject("ajnabee-partner");

/** Founder room: the product ecosystem, built 0 → 1. */
export function Ajnabee() {
  const step = useRoomStep(ROOM, role.flow.length);
  const award = achievements[0];

  return (
    <section id="ajnabee" className="room" aria-labelledby="ajnabee-title" style={{ ["--room-h" as string]: "330vh" }}>
      <div className="room-pin">
        <div className="col">
          <RoomTitle room={ROOM} id="ajnabee-title" lines={[role.company]} />
          <RoleMeta role={role} />
          <p className="lede mt-6">
            A women-first salon booking ecosystem: one app for customers, one for the salons serving them.
          </p>

          <div className="mt-7 border-t border-line pt-5">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm" aria-label="Customer journey">
              {role.flow.map((f, i) => (
                <li key={f.id} className="flex items-center gap-2" aria-current={i === step ? "step" : undefined}>
                  <span className={i === step ? "text-signal" : i < step ? "text-bone" : "text-slate"}>{f.label}</span>
                  {i < role.flow.length - 1 && (
                    <span className="text-slate" aria-hidden="true">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-3 text-bone/85" aria-hidden="true">
              <Decode text={step === role.flow.length - 1 ? "Salon operations: Ajnabee Partner" : "Customer experience: Ajnabee"} />
            </p>
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-line pt-5">
            {role.metrics.map((m) => (
              <div key={m.label}>
                <dt className="sr-only">{m.label}</dt>
                <dd>
                  <span className="display block text-[clamp(1.6rem,2.6vw,2.3rem)]">{m.value}</span>
                  <span className="block text-xs leading-snug text-slate">{m.label}</span>
                </dd>
              </div>
            ))}
          </dl>

          <ul className="mt-6 grid gap-2 text-[0.93rem] text-bone/80">
            {role.points.map((p) => (
              <li key={p} className="flex gap-3">
                <span className="mt-[0.72em] h-px w-4 shrink-0 bg-slate" aria-hidden="true" />
                <span>{p}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm text-slate">
            {award.title}, {award.year}: Best Startup Idea for Ajnabee.
          </p>
          <p className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <a href={role.url} target="_blank" rel="noopener noreferrer" className="link-line">
              Ajnabee on Play Store ↗
            </a>
            <a href={partner.links[0].url} target="_blank" rel="noopener noreferrer" className="link-line">
              Ajnabee Partner on Play Store ↗
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
