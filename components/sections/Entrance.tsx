"use client";

import { profile } from "@/data/profile";
import { useUI } from "@/lib/lab-state";
import { scrollToId } from "@/lib/scroll";

/**
 * The only thing on screen at first: a name, three roles, one sentence and
 * a door. The lab's portal glows between the type.
 */
export function Entrance() {
  const booted = useUI((s) => s.booted);

  return (
    <section id="entrance" className="room" aria-labelledby="name" style={{ ["--room-h" as string]: "100svh" }}>
      <div
        className="flex min-h-svh flex-col justify-between gap-10 px-[var(--gutter)] pb-8 pt-24 md:pb-10 md:pt-32"
        data-in={booted}
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <ul aria-label="Roles">
            {profile.roles.map((role, i) => (
              <li key={role} className="mask-line">
                <span
                  className="display text-[clamp(0.95rem,1.6vw,1.35rem)] leading-[1.25] tracking-[0.01em] text-slate"
                  style={{ transitionDelay: `${500 + i * 110}ms` }}
                >
                  {role}
                </span>
              </li>
            ))}
          </ul>

          <div
            className="order-last max-w-[23rem] transition-[opacity,transform] delay-700 duration-1000 md:order-none"
            style={{ opacity: booted ? 1 : 0, transform: booted ? "none" : "translateY(12px)" }}
          >
            <p className="lede">{profile.statement}</p>
            <a
              href="#signal"
              className="btn-enter mt-7"
              data-cursor="explore"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("signal");
              }}
            >
              Enter the lab <span className="arrow" aria-hidden="true">→</span>
            </a>
            <p className="meta mt-5 text-xs">{profile.currently}</p>
          </div>
        </div>

        <h1 id="name" className="display text-[clamp(2.6rem,12.4vw,13.5rem)] leading-[0.82]">
          <span className="mask-line">
            <span style={{ transitionDelay: "80ms" }}>{profile.firstName}</span>{" "}
          </span>
          <span className="mask-line">
            <span style={{ transitionDelay: "180ms" }}>{profile.lastName}</span>
          </span>
        </h1>
      </div>
    </section>
  );
}
