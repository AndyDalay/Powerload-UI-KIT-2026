// ─── TagCategory ──────────────────────────────────────────────────────────────
// Tag/Category component — 3 variants: default · selected · disabled
// Height 28px · Poppins Medium 12px
//
// Props:
//   showIcon?  — shows a left icon (14px, same color as text)
//   rounded?   — pill border-radius (999px) instead of 6px
//   closable?  — shows an × button on the right to remove the tag
//   onClose?   — callback fired when the × is clicked

import { useState, ReactNode } from "react";

export type TagCategoryVariant = "default" | "selected" | "disabled";

export interface TagCategoryProps {
  label: string;
  variant?: TagCategoryVariant;
  /** Whether to show the icon slot */
  showIcon?: boolean;
  /** Icon node to display (14px lucide icon recommended) */
  icon?: ReactNode;
  /** Pill shape — border-radius 999px instead of 6px */
  rounded?: boolean;
  /** Shows an × button on the right to dismiss/remove the tag */
  closable?: boolean;
  /** Called when the × close button is clicked */
  onClose?: () => void;
  onClick?: () => void;
}

// ─── Style map ────────────────────────────────────────────────────────────────

const VARIANTS: Record<
  TagCategoryVariant,
  { bg: string; fg: string; border: string; cursor: string; closeFg: string; closeHoverBg: string }
> = {
  default:  {
    bg: "#F3F3F9", fg: "#55556C", border: "1px solid transparent",
    cursor: "pointer", closeFg: "#A1A1B9", closeHoverBg: "#E1E1EC",
  },
  selected: {
    bg: "#FBE1E1", fg: "#C22339", border: "1px solid #C22339",
    cursor: "pointer", closeFg: "#C22339", closeHoverBg: "#F6C4C4",
  },
  disabled: {
    bg: "#F3F3F9", fg: "#BDBDD1", border: "1px solid transparent",
    cursor: "not-allowed", closeFg: "#D2D2E1", closeHoverBg: "transparent",
  },
};

// ─── Close (×) button ────────────────────────────────────────────────────────

function CloseButton({
  fg,
  hoverBg,
  disabled,
  onClose,
}: {
  fg: string;
  hoverBg: string;
  disabled: boolean;
  onClose?: () => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      role={disabled ? undefined : "button"}
      aria-label="Eliminar"
      tabIndex={disabled ? -1 : 0}
      onClick={
        disabled
          ? undefined
          : (e) => { e.stopPropagation(); onClose?.(); }
      }
      onKeyDown={
        disabled
          ? undefined
          : (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                onClose?.();
              }
            }
      }
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display:         "flex",
        alignItems:      "center",
        justifyContent:  "center",
        width:           "14px",
        height:          "14px",
        borderRadius:    "50%",
        backgroundColor: hovered && !disabled ? hoverBg : "transparent",
        color:           fg,
        flexShrink:      0,
        cursor:          disabled ? "not-allowed" : "pointer",
        transition:      "background-color 100ms ease",
        outline:         "none",
        lineHeight:      1,
        marginLeft:      "1px",
      }}
    >
      {/* Hand-drawn × at 10px — cleaner than a lucide icon at this size */}
      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
        <line x1="1" y1="1" x2="7" y2="7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="7" y1="1" x2="1" y2="7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function TagCategory({
  label,
  variant = "default",
  showIcon = false,
  icon,
  rounded = false,
  closable = false,
  onClose,
  onClick,
}: TagCategoryProps) {
  const { bg, fg, border, cursor, closeFg, closeHoverBg } = VARIANTS[variant];
  const isDisabled = variant === "disabled";

  return (
    <div
      role={isDisabled || closable ? undefined : "button"}
      tabIndex={isDisabled ? -1 : 0}
      onClick={isDisabled ? undefined : onClick}
      onKeyDown={
        isDisabled
          ? undefined
          : (e) => { if (e.key === "Enter" || e.key === " ") onClick?.(); }
      }
      style={{
        display:         "inline-flex",
        alignItems:      "center",
        gap:             "5px",
        height:          "28px",
        paddingTop:      "4px",
        paddingBottom:   "4px",
        paddingLeft:     "10px",
        paddingRight:    closable ? "6px" : "10px",
        borderRadius:    rounded ? "999px" : "6px",
        backgroundColor: bg,
        border,
        cursor,
        flexShrink:      0,
        userSelect:      "none",
        outline:         "none",
        transition:      "background-color 120ms ease, border-color 120ms ease, color 120ms ease",
        boxSizing:       "border-box",
      }}
    >
      {/* Left icon slot */}
      {showIcon && icon && (
        <span
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "center",
            width:          "14px",
            height:         "14px",
            color:          fg,
            flexShrink:     0,
            lineHeight:     1,
          }}
        >
          {icon}
        </span>
      )}

      {/* Label */}
      <span
        style={{
          fontFamily: "'Poppins', sans-serif",
          fontSize:   "12px",
          fontWeight: 500,
          lineHeight: 1,
          color:      fg,
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>

      {/* Right close button */}
      {closable && (
        <CloseButton
          fg={closeFg}
          hoverBg={closeHoverBg}
          disabled={isDisabled}
          onClose={onClose}
        />
      )}
    </div>
  );
}
