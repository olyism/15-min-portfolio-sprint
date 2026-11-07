import { ImageResponse } from "next/og";
import { getSite } from "@/lib/content";

// The preview image shown when your site is shared. Generated from site.json.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Portfolio preview";

export default function OpengraphImage() {
  const site = getSite();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#fbfbfd",
          color: "#111114",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, color: "#5f5f66" }}>{site.role}</div>
        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05 }}>{site.headline}</div>
        <div style={{ fontSize: 34, fontWeight: 600 }}>{site.name}</div>
      </div>
    ),
    size,
  );
}
