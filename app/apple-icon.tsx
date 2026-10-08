import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0A0D10",
        }}
      >
        <svg width="108" height="108" viewBox="0 0 32 32">
          <path
            d="M16 8c0 4-3 5-3 9a3 3 0 0 0 6 0c0-4-3-5-3-9Z"
            fill="#C9A96A"
          />
          <g stroke="#C9A96A" strokeWidth="1.6" strokeLinecap="round" fill="none">
            <path d="M16 21v3" />
            <path d="M12.5 22.5l-1.5 2.5" />
            <path d="M19.5 22.5l1.5 2.5" />
          </g>
        </svg>
      </div>
    ),
    { ...size }
  );
}
