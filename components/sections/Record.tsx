import { achievements, certifications, leadership } from "@/data/milestones";
import { RoomTitle } from "@/components/ui-lab/RoomTitle";

const ROOM = 8;

/** Milestones: kept factual and deliberately quiet. The posts in the scene mark the years. */
export function Record() {
  return (
    <section id="record" className="room" aria-labelledby="record-title">
      <div className="room-flow">
        <div className="col">
          <RoomTitle room={ROOM} id="record-title" lines={["Record"]} />

          <h3 className="meta mt-12">Recognition</h3>
          <ol className="mt-3 grid gap-7">
            {achievements.map((a) => (
              <li key={a.title} className="grid grid-cols-[3.5rem_1fr] border-t border-line pt-4">
                <span className="readout pt-1 text-signal">{a.year}</span>
                <div>
                  <p className="font-semibold">{a.title}</p>
                  <p className="mt-1 text-[0.95rem] text-bone/75">{a.detail}</p>
                </div>
              </li>
            ))}
          </ol>

          <h3 className="meta mt-14">Community</h3>
          <ul className="mt-3 grid gap-6">
            {leadership.map((l) => (
              <li key={l.role} className="border-t border-line pt-4">
                <p className="font-semibold">
                  {l.role}, {l.org}
                </p>
                <p className="meta text-sm">{l.period}</p>
                <p className="mt-1 text-[0.95rem] text-bone/75">{l.desc}</p>
              </li>
            ))}
          </ul>

          <h3 className="meta mt-14">Certifications</h3>
          <ul className="mt-3 border-t border-line">
            {certifications.map((c) => (
              <li key={c.title} className="border-b border-line">
                <a
                  href={c.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-baseline justify-between gap-4 py-2.5 text-sm"
                >
                  <span>
                    <span className="transition-colors group-hover:text-signal">{c.title}</span>
                    <span className="text-slate">, {c.organizer}</span>
                  </span>
                  <span className="readout shrink-0 text-slate">
                    {c.date} <span aria-hidden="true">↗</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
