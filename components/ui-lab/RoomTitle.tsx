"use client";

import type { ReactNode } from "react";
import { useRoomReached } from "@/lib/scroll";

/**
 * A room heading that rises out of a mask when the camera arrives in its
 * room — tied to the journey, not to the element scrolling into view.
 */
export function RoomTitle({
  room,
  id,
  lines,
  className = "",
  as: Tag = "h2",
  children,
}: {
  room: number;
  id?: string;
  lines: string[];
  className?: string;
  as?: "h1" | "h2";
  children?: ReactNode;
}) {
  const reached = useRoomReached(room);
  return (
    <Tag
      id={id}
      className={`display room-title ${className}`}
      data-in={reached}
      style={{ ["--chars" as string]: Math.max(...lines.map((l) => l.length)) }}
    >
      {lines.map((line, i) => (
        <span key={line} className="mask-line">
          <span style={{ transitionDelay: `${i * 90}ms` }}>{line}</span>{" "}
        </span>
      ))}
      {children}
    </Tag>
  );
}
