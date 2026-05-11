// ─── Divider ──────────────────────────────────────────────────────────────────
// Component set: 4 variants
//
//  horizontal-solid   full width · 1px solid
//  horizontal-dashed  full width · 1px dashed (4px dash / 4px gap)
//  vertical-solid     1px wide · full height · solid
//  vertical-dashed    1px wide · full height · dashed (4px dash / 4px gap)
//
// Color: #ECECF4 (neutral-200)
// Optional label (horizontal only): Poppins Regular 12px #A1A1B9, line split ± 12px gap

export type DividerVariant =
  | "horizontal-solid"
  | "horizontal-dashed"
  | "vertical-solid"
  | "vertical-dashed";

export interface DividerProps {
  variant?: DividerVariant;
  /** Optional text label — only rendered for horizontal variants */
  label?: string;
}

const COLOR  = "#ECECF4";
const DASH   = "4px 4px";   // dash 4px · gap 4px

export function Divider({ variant = "horizontal-solid", label }: DividerProps) {
  const isHorizontal = variant.startsWith("horizontal");
  const isDashed     = variant.endsWith("dashed");

  // ── Vertical ──────────────────────────────────────────────────────────────
  if (!isHorizontal) {
    return (
      <div
        style={{
          width:          "1px",
          height:         "100%",
          alignSelf:      "stretch",
          flexShrink:     0,
          backgroundImage: isDashed
            ? `repeating-linear-gradient(
                to bottom,
                ${COLOR} 0px,
                ${COLOR} 4px,
                transparent 4px,
                transparent 8px
              )`
            : "none",
          backgroundColor: isDashed ? "transparent" : COLOR,
        }}
      />
    );
  }

  // ── Horizontal — with label ───────────────────────────────────────────────
  if (label) {
    const lineStyle: React.CSSProperties = {
      flex:            1,
      height:          "1px",
      backgroundImage: isDashed
        ? `repeating-linear-gradient(
            to right,
            ${COLOR} 0px,
            ${COLOR} 4px,
            transparent 4px,
            transparent 8px
          )`
        : "none",
      backgroundColor: isDashed ? "transparent" : COLOR,
    };

    return (
      <div
        style={{
          display:    "flex",
          alignItems: "center",
          gap:        "12px",
          width:      "100%",
        }}
      >
        <div style={lineStyle} />
        <span
          style={{
            fontFamily:  "'Poppins', sans-serif",
            fontSize:    "12px",
            fontWeight:  400,
            color:       "#A1A1B9",
            lineHeight:  1,
            whiteSpace:  "nowrap",
            flexShrink:  0,
          }}
        >
          {label}
        </span>
        <div style={lineStyle} />
      </div>
    );
  }

  // ── Horizontal — no label ─────────────────────────────────────────────────
  return (
    <div
      style={{
        width:           "100%",
        height:          "1px",
        flexShrink:      0,
        backgroundImage: isDashed
          ? `repeating-linear-gradient(
              to right,
              ${COLOR} 0px,
              ${COLOR} 4px,
              transparent 4px,
              transparent 8px
            )`
          : "none",
        backgroundColor: isDashed ? "transparent" : COLOR,
      }}
    />
  );
}
