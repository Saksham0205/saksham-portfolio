import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Home-screen icon: the lab's doorway, matching favicon.svg. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#0A0D12", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            left: 52,
            top: 34,
            width: 76,
            height: 104,
            border: "8px solid #E8E4DA",
            background: "rgba(232,228,218,0.12)",
          }}
        />
        <div style={{ position: "absolute", left: 32, top: 142, width: 116, height: 10, background: "#FFB547" }} />
      </div>
    ),
    size,
  );
}
