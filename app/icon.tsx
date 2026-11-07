import { ImageResponse } from "next/og";
import { getSite } from "@/lib/content";

// Browser tab icon: your initials, generated from site.json. Replace with app/icon.png if you have a logo.
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  const initials = getSite()
    .name.split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#111114",
          color: "#fbfbfd",
          borderRadius: 16,
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: "-0.04em",
        }}
      >
        {initials}
      </div>
    ),
    size,
  );
}
