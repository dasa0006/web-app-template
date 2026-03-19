import { SITE_CONFIG } from "@/lib/seo";
import { ImageResponse } from "next/og";

// ─────────────────────────────────────────────
// Route segment config
//
// `size` and `contentType` are picked up automatically by Next.js when this
// file is named opengraph-image.tsx (or twitter-image.tsx for the Twitter
// variant). The Edge runtime keeps cold-starts fast.
// ─────────────────────────────────────────────

export const runtime = "edge";
export const alt = SITE_CONFIG.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// ─────────────────────────────────────────────
// Default OG image
//
// This file generates the fallback image used by pages that do NOT provide
// a custom `image` to `buildMetadata()`.
//
// For per-page images, co-locate an opengraph-image.tsx next to the page:
//
//   app/blog/[slug]/opengraph-image.tsx
//
// That file receives the same params as generateMetadata() and can fetch
// live data (post title, author, etc.) to render a personalised image.
// ─────────────────────────────────────────────

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        width: "100%",
        height: "100%",
        padding: "60px 72px",
        backgroundColor: "#09090b", // zinc-950
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Background accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)",
        }}
      />

      {/* Site name / logo area */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "auto",
          paddingTop: 0,
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: "#a1a1aa", // zinc-400
            letterSpacing: "-0.02em",
          }}
        >
          {SITE_CONFIG.name}
        </span>
      </div>

      {/* Main headline */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        <p
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: "#fafafa", // zinc-50
            lineHeight: 1.1,
            letterSpacing: "-0.04em",
            margin: 0,
            maxWidth: 900,
          }}
        >
          {SITE_CONFIG.name}
        </p>
        <p
          style={{
            fontSize: 28,
            fontWeight: 400,
            color: "#71717a", // zinc-500
            margin: 0,
            maxWidth: 760,
            lineHeight: 1.4,
          }}
        >
          {SITE_CONFIG.description}
        </p>
      </div>

      {/* URL strip at the bottom */}
      <div
        style={{
          display: "flex",
          marginTop: 48,
        }}
      >
        <span
          style={{
            fontSize: 20,
            color: "#52525b", // zinc-600
            letterSpacing: "0.02em",
          }}
        >
          {SITE_CONFIG.url.replace(/^https?:\/\//, "")}
        </span>
      </div>
    </div>,
    { ...size }
  );
}
