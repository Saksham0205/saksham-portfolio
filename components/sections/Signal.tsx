"use client";

import { RoomTitle } from "@/components/ui-lab/RoomTitle";
import { scrollToId } from "@/lib/scroll";

const ROOM = 1;

/** Where the lab starts: a voice. Everything after it is what the voice passes through. */
export function Signal() {
  return (
    <section id="signal" className="room" aria-labelledby="signal-title" style={{ ["--room-h" as string]: "190vh" }}>
      <div className="room-pin">
        <div className="col">
          <RoomTitle room={ROOM} id="signal-title" lines={["It starts", "with a voice"]} />
          <p className="lede mt-8">
            Most of what I build now listens first. A caller speaks, an agent reasons, calls tools, and answers back
            — in a voice.
          </p>
          <p className="mt-5 max-w-[34ch] text-slate">
            <span className="hidden [@media(pointer:fine)]:inline">Move your cursor across the wall: you are the speaker. </span>
            The next two rooms are the systems I built around that loop.
          </p>
          <ul className="mt-10 grid gap-3 text-sm">
            <li>
              <a
                href="#omnidimension"
                className="link-line"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("omnidimension");
                }}
              >
                OmniDimension: production voice agents
              </a>
            </li>
            <li>
              <a
                href="#spyne"
                className="link-line"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("spyne");
                }}
              >
                Spyne: AI calling and call insights
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
