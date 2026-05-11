// ─── BadgeCount ───────────────────────────────────────────────────────────────
// Notification / count badge — 2 variants: circle · pill
//
// circle  →  18×18px fixed, border-radius 50%
// pill    →  18px height, min-width 26px, border-radius 9px, padding 0 5px
//
// Background: #C22339 · Text: #FFFFFF · Poppins Bold 10px

export type BadgeVariant = "circle" | "pill";

export interface BadgeCountProps {
  /** The number or short string to display (e.g. 3, 99, "99+") */
  count: number | string;
  variant?: BadgeVariant;
}

export function BadgeCount({ count, variant = "circle" }: BadgeCountProps) {
  const isCircle = variant === "circle";

  // For circle variant, truncate to "9+" if count > 9
  const display =
    isCircle && typeof count === "number" && count > 9
      ? "9+"
      : String(count);

  return (
    <div
      style={{
        display:         "inline-flex",
        alignItems:      "center",
        justifyContent:  "center",
        backgroundColor: "#C22339",
        color:           "#FFFFFF",
        fontFamily:      "'Poppins', sans-serif",
        fontSize:        "10px",
        fontWeight:      700,
        lineHeight:      1,
        letterSpacing:   "0px",
        whiteSpace:      "nowrap",
        flexShrink:      0,
        // circle
        ...(isCircle
          ? {
              width:        "18px",
              height:       "18px",
              borderRadius: "50%",
              padding:      "0",
            }
          : {
              height:       "18px",
              minWidth:     "26px",
              borderRadius: "9px",
              paddingLeft:  "5px",
              paddingRight: "5px",
            }),
      }}
    >
      {display}
    </div>
  );
}
