"use client";

import { useEffect, useRef } from "react";
import { profile } from "@/data/profile";
import { RoomTitle } from "@/components/ui-lab/RoomTitle";

const ROOM = 6;
export const LOOP_WORDS = ["Build", "Ship", "Learn", "Iterate"];

/** Story told in fragments; each one brightens as it crosses the middle of the screen. */
function Fragments() {
  const list = useRef<HTMLOListElement>(null);
  useEffect(() => {
    const items = list.current?.querySelectorAll<HTMLElement>("li");
    if (!items) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => (e.target as HTMLElement).setAttribute("data-on", String(e.isIntersecting))),
      { rootMargin: "-38% 0px -38% 0px" },
    );
    items.forEach((i) => io.observe(i));
    return () => io.disconnect();
  }, []);

  return (
    <ol ref={list} className="fragments mt-[18vh] grid gap-[16vh]">
      {profile.story.map((line) => (
        <li key={line} className="max-w-[26ch] text-[clamp(1.35rem,2.4vw,2.1rem)] font-medium leading-[1.2] tracking-[-0.01em]">
          {line}
        </li>
      ))}
    </ol>
  );
}

export function About() {
  return (
    <section id="about" className="room" aria-labelledby="about-title">
      <div className="room-flow">
        <div className="col">
          <RoomTitle room={ROOM} id="about-title" lines={["About"]} className="!text-[clamp(1.2rem,2vw,1.6rem)] text-slate" />
          <p className="display mt-4 text-[clamp(2.6rem,6.5vw,5.8rem)]">{profile.name}</p>
          <p className="mt-5 text-lg">{profile.roles.join(", ")}</p>

          {/* Lit in step with the runner on the loop in the scene */}
          <ol id="loop-words" data-hot="0" className="loop-words mt-10 flex flex-wrap items-baseline gap-x-3 gap-y-1" aria-label="How I work">
            {LOOP_WORDS.map((w, i) => (
              <li key={w} className="flex items-baseline gap-3">
                <span className="display text-[clamp(1.4rem,3vw,2.4rem)] transition-colors duration-500">{w}</span>
                <span className="text-slate" aria-hidden="true">
                  {i < LOOP_WORDS.length - 1 ? "→" : "↺"}
                </span>
              </li>
            ))}
          </ol>

          <Fragments />

          <div className="mt-[18vh] border-t border-line pt-5">
            <p className="meta">Education</p>
            <p className="mt-2 text-lg font-semibold">{profile.education.school}</p>
            <p className="text-bone/80">{profile.education.degree}</p>
            <p className="meta mt-1">
              {profile.education.period}, {profile.education.place}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
