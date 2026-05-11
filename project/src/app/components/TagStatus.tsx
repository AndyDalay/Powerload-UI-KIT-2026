// ─── TagStatus ────────────────────────────────────────────────────────────────
// Tag/Status component — 6 variants: success · warning · danger · info · neutral · primary
// Height 22px · Poppins SemiBold 11px · UPPERCASE · dot 6px
//
// Props:
//   icon?    — ReactNode: renders an icon instead of the dot (use 11–12px lucide icons)
//   rounded? — boolean:  uses pill border-radius (999px) instead of default 4px

import { ReactNode } from "react";

export type TagVariant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral"
  | "primary";

export interface TagStatusProps {
  label: string;
  variant?: TagVariant;
  /** Pass a lucide icon (11–12px) to replace the dot with an icon */
  icon?: ReactNode;
  /** true → pill shape (border-radius 999px). false → squared (4px, default) */
  rounded?: boolean;
}

// ─── Color map ────────────────────────────────────────────────────────────────

const VARIANTS: Record<TagVariant, { bg: string; fg: string }> = {
  success: { bg: "#E8F7EE", fg: "#389760" },
  warning: { bg: "#FFF7E5", fg: "#AE7D03" },
  danger:  { bg: "#FBE4E4", fg: "#B91C19" },
  info:    { bg: "#DBEEFF", fg: "#015DAE" },
  neutral: { bg: "#ECECF4", fg: "#55556C" },
  primary: { bg: "#FBE1E1", fg: "#8F1A31" },
};

// ─── Component ────────────────────────────────────────────────────────────────

export function TagStatus({
  label,
  variant = "neutral",
  icon,
  rounded = false,
}: TagStatusProps) {
  const { bg, fg } = VARIANTS[variant];

  return (
    <div
      style={{
        display:         "inline-flex",
        alignItems:      "center",
        gap:             "5px",
        height:          "22px",
        paddingTop:      "3px",
        paddingBottom:   "3px",
        paddingLeft:     rounded ? "9px" : "8px",
        paddingRight:    rounded ? "9px" : "8px",
        borderRadius:    rounded ? "999px" : "4px",
        backgroundColor: bg,
        flexShrink:      0,
      }}
    >
      {/* Icon OR filled dot */}
      {icon ? (
        <span
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            color:          fg,
            flexShrink:     0,
            lineHeight:     1,
          }}
        >
          {icon}
        </span>
      ) : (
        <span
          style={{
            display:         "block",
            width:           "6px",
            height:          "6px",
            borderRadius:    "50%",
            backgroundColor: fg,
            flexShrink:      0,
          }}
        />
      )}

      {/* Label */}
      <span
        style={{
          fontFamily:    "'Poppins', sans-serif",
          fontSize:      "11px",
          fontWeight:    600,
          lineHeight:    1,
          letterSpacing: "0.5px",
          textTransform: "uppercase",
          color:         fg,
          whiteSpace:    "nowrap",
        }}
      >
        {label}
      </span>
    </div>
  );
}
