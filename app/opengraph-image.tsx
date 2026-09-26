import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const dynamic = "force-static";
export const alt = "Saksham Chauhan — Product Engineer, AI Builder, Founder";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social card: the entrance of the lab, in type. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0D12",
          color: "#E8E4DA",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* The portal */}
        <div
          style={{
            position: "absolute",
            left: 760,
            top: 70,
            width: 240,
            height: 400,
            border: "3px solid rgba(232,228,218,0.5)",
            background: "linear-gradient(180deg, rgba(232,228,218,0.02), rgba(232,228,218,0.16))",
          }}
        />
        <div style={{ position: "absolute", left: 736, top: 486, width: 288, height: 4, background: "#FFB547" }} />

        <div style={{ display: "flex", flexDirection: "column", fontSize: 26, color: "#8A919C", letterSpacing: 1 }}>
          {profile.roles.map((r) => (
            <span key={r}>{r.toUpperCase()}</span>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 128, fontWeight: 800, lineHeight: 0.9, letterSpacing: -4, display: "flex", flexDirection: "column" }}>
            <span>{profile.firstName.toUpperCase()}</span>
            <span>{profile.lastName.toUpperCase()}</span>
          </div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#E8E4DA", maxWidth: 760 }}>{profile.statement}</div>
        </div>
      </div>
    ),
    size,
  );
}
