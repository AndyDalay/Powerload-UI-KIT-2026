// ─── Vehicle/SVG — rasterized silhouettes (#000000 in source assets) ─────────

import type { CSSProperties } from "react";

/** Option row / filled trigger: ~53×24 frame, assets are 36px tall variable width. */
export function VehicleIllustration({
  src,
  alt,
  variant = "option",
  style,
  className,
}: {
  src: string;
  alt: string;
  /** `option` — max 53×24 · `trigger` — scales in ~53×24 · `placeholder` — 18×18 generic */
  variant?: "option" | "trigger" | "placeholder";
  style?: CSSProperties;
  className?: string;
}) {
  const frame =
    variant === "placeholder"
      ? { width: 18, height: 18 }
      : { width: 53, height: 24 };

  return (
    <span
      className={className}
      style={{
        ...frame,
        flexShrink: 0,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "flex-start",
        overflow: "hidden",
        ...style,
      }}
    >
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{
          height: variant === "placeholder" ? 18 : 24,
          width: "auto",
          maxWidth: variant === "placeholder" ? 18 : 53,
          display: "block",
          objectFit: "contain",
          objectPosition: "left center",
        }}
      />
    </span>
  );
}

/** Vehicle/SVG/GenericTruck — 18×18 placeholder for empty trigger (fill currentColor). */
export function GenericTruckIllustration({
  color = "#A1A1B9",
  style,
}: {
  color?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      style={{ flexShrink: 0, display: "block", color, ...style }}
    >
      <path
        fill="currentColor"
        d="M20 8h-3V4H5v11h1.5c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5H15c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5H22v-7l-2-4Zm-1.5 1.5h1.7l1.3 2.6V12h-3v-2.5ZM10 15c-.83 0-1.5.67-1.5 1.5S9.17 18 10 18s1.5-.67 1.5-1.5S10.83 15 10 15Zm7 0c-.83 0-1.5.67-1.5 1.5S16.17 18 17 18s1.5-.67 1.5-1.5S17.83 15 17 15Z"
      />
    </svg>
  );
}
