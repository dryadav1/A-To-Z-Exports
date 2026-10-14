import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Brand social preview — shown when the site is shared on WhatsApp,
 * LinkedIn and other platforms. Pure markup (no external assets) so it
 * renders at build time on any host.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 90px",
          backgroundColor: "#10291d",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontFamily: "Arial, sans-serif",
            fontSize: 22,
            letterSpacing: 8,
            color: "#537A46",
            fontWeight: 700,
          }}
        >
          INDIAN AGRICULTURE · GLOBAL REACH
        </div>
        <div
          style={{
            marginTop: 24,
            display: "flex",
            flexDirection: "column",
            fontSize: 92,
            lineHeight: 1.05,
            color: "#F8F6EF",
          }}
        >
          <div>From Indian Farms</div>
          <div>to Global Markets.</div>
        </div>
        <div
          style={{
            marginTop: 36,
            display: "flex",
            alignItems: "center",
            gap: 28,
          }}
        >
          <div
            style={{
              height: 3,
              width: 220,
              backgroundColor: "#C7A568",
            }}
          />
          <div
            style={{
              fontFamily: "Arial, sans-serif",
              fontSize: 24,
              letterSpacing: 5,
              color: "#C7A568",
              fontWeight: 700,
            }}
          >
            A TO Z EXPORTS · IEC · APEDA · GST
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
