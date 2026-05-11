import { useState, ReactNode } from "react";
import "./button-animations.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type ButtonSize    = "xs" | "s" | "m" | "l";
export type ButtonVariant = "primary" | "secondary" | "tertiary";

export interface PowerloadButtonProps {
  /** Text label. Omit (or pass undefined) for icon-only square button. */
  label?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  size?: ButtonSize;
  variant?: ButtonVariant;
  /** Primary only — adds a red downward glow shadow */
  glow?: boolean;
  /**
   * Secondary / Tertiary — switches text (and border for secondary) to brand red.
   * When false (default) secondary uses neutral-400 border + neutral-800 text.
   */
  accent?: boolean;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  style?: React.CSSProperties;
}

// ─── Size tokens ─────────────────────────────────────────────────────────────

const SIZE: Record<
  ButtonSize,
  { height: number; px: number; fontSize: number; iconSize: number; gap: number; radius: number }
> = {
  xs: { height: 36, px: 14, fontSize: 13, iconSize: 14, gap: 5,  radius: 8  },
  s:  { height: 40, px: 16, fontSize: 14, iconSize: 15, gap: 6,  radius: 10 },
  m:  { height: 48, px: 20, fontSize: 15, iconSize: 17, gap: 7,  radius: 12 },
  l:  { height: 56, px: 26, fontSize: 16, iconSize: 19, gap: 8,  radius: 12 },
};

// ─── Design tokens ───────────────────────────────────────────────────────────

const RED           = "#C22339";
const RED_HOVER     = "#CF4758";
const RED_PRESSED   = "#8F1A31";                    // primary/800
const RED_GLOW_DEF  = "0 10px 24px -4px rgba(194,35,57,0.36)";
const RED_GLOW_HOV  = "0 12px 28px -4px rgba(194,35,57,0.50)";
const RED_GHOST_BG  = "rgba(194,35,57,0.07)";       // primary/opacity ~7%
const RED_GHOST_PR  = "rgba(194,35,57,0.13)";       // pressed ghost

const NEUTRAL_400   = "#D2D2E1";                    // border for non-accent secondary
const NEUTRAL_500   = "#BDBDD1";                    // border hover for non-accent secondary
const NEUTRAL_800   = "#55556C";                    // text / icon for non-accent secondary/tertiary
const NEUTRAL_100   = "#F3F3F9";                    // hover bg for non-accent secondary
const NEUTRAL_200   = "#ECECF4";                    // pressed bg for non-accent secondary

const WHITE         = "#FFFFFF";
const DISABLED_BG   = "#ECECF4";
const DISABLED_FG   = "#BDBDD1";

// ─── Spinner ─────────────────────────────────────────────────────────────────

/**
 * Circular loader:
 *  - Light bg (secondary / tertiary): neutral-400 track + red arc
 *  - Red bg (primary): white track + black arc
 */
function ButtonSpinner({ iconSize, onRed }: { iconSize: number; onRed: boolean }) {
  const sz   = iconSize;
  const sw   = Math.max(1.5, Math.round(sz * 0.12));   // stroke width
  const r    = (sz - sw * 2) / 2;
  const cx   = sz / 2;
  const cy   = sz / 2;
  const circ = 2 * Math.PI * r;
  const arc  = circ * 0.22;                             // 22% visible arc

  const trackColor = onRed ? "rgba(255,255,255,0.40)" : NEUTRAL_400;
  const arcColor   = onRed ? "#FFFFFF"                : RED;

  return (
    <svg
      width={sz}
      height={sz}
      viewBox={`0 0 ${sz} ${sz}`}
      fill="none"
      style={{
        animation:       "powerload-spin 0.72s linear infinite",
        transformOrigin: `${cx}px ${cy}px`,
        flexShrink:      0,
        display:         "block",
      }}
    >
      {/* Track */}
      <circle cx={cx} cy={cy} r={r} stroke={trackColor} strokeWidth={sw} />
      {/* Arc — starts at 12 o'clock via rotate(-90) */}
      <circle
        cx={cx} cy={cy} r={r}
        stroke={arcColor}
        strokeWidth={sw}
        strokeDasharray={`${arc} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
      />
    </svg>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function PowerloadButton({
  label,
  icon,
  iconPosition = "left",
  size = "m",
  variant = "primary",
  glow = false,
  accent = false,
  disabled = false,
  loading = false,
  onClick,
  style: extraStyle,
}: PowerloadButtonProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [focused, setFocused] = useState(false);

  const cfg      = SIZE[size];
  const iconOnly = !label;
  const inactive = disabled || loading;

  // ── Variant styles ──────────────────────────────────────────────────────────

  function getVariantStyles(): React.CSSProperties {

    // ── DISABLED ────────────────────────────────────────────────────────────
    if (disabled) {
      return {
        backgroundColor: variant === "tertiary" ? "transparent" : DISABLED_BG,
        color:           DISABLED_FG,
        border:          variant === "primary"   ? "none"
                       : variant === "secondary" ? `1.5px solid ${DISABLED_BG}`
                       :                          "none",
        boxShadow:       "none",
      };
    }

    // ── PRIMARY ─────────────────────────────────────────────────────────────
    if (variant === "primary") {
      const bg =
        loading  ? RED                                  // loading keeps default red
        : pressed ? RED_PRESSED
        : hovered ? RED_HOVER
        :           RED;

      const shadow = glow
        ? pressed || loading
          ? "none"
          : hovered
            ? RED_GLOW_HOV
            : RED_GLOW_DEF
        : focused && !pressed
          ? `0 0 0 2px ${WHITE}, 0 0 0 4px ${RED}, 0 0 0 6px rgba(194,35,57,0.18)`
          : "none";

      return { backgroundColor: bg, color: WHITE, border: "none", boxShadow: shadow };
    }

    // ── SECONDARY ───────────────────────────────────────────────────────────
    if (variant === "secondary") {
      if (accent) {
        // Red border + red text
        const bg =
          loading  ? "transparent"
          : pressed ? RED_GHOST_PR
          : hovered ? RED_GHOST_BG
          :           "transparent";

        const focusShadow = focused && !pressed
          ? `0 0 0 2px ${WHITE}, 0 0 0 4px ${RED}, 0 0 0 6px rgba(194,35,57,0.15)`
          : "none";

        return {
          backgroundColor: bg,
          color:           RED,
          border:          `1.5px solid ${RED}`,
          boxShadow:       focusShadow,
        };
      }

      // Neutral border + neutral-800 text (default secondary)
      const borderColor =
        loading  ? NEUTRAL_400
        : pressed ? NEUTRAL_400
        : hovered ? NEUTRAL_500
        :           NEUTRAL_400;

      const bg =
        loading  ? "transparent"
        : pressed ? NEUTRAL_200
        : hovered ? NEUTRAL_100
        :           "transparent";

      const focusShadow = focused && !pressed
        ? `0 0 0 2px ${WHITE}, 0 0 0 4px ${NEUTRAL_400}`
        : "none";

      return {
        backgroundColor: bg,
        color:           NEUTRAL_800,
        border:          `1.5px solid ${borderColor}`,
        boxShadow:       focusShadow,
      };
    }

    // ── TERTIARY ────────────────────────────────────────────────────────────
    const accentOrHover = accent || hovered;
    const textColor =
      loading  ? (accent ? RED : NEUTRAL_800)
      : pressed ? (accent ? RED_PRESSED : NEUTRAL_800)
      : accentOrHover ? RED
      :                 NEUTRAL_800;

    const bg =
      loading  ? "transparent"
      : pressed ? RED_GHOST_PR
      : hovered ? RED_GHOST_BG
      :           "transparent";

    const focusShadow = focused && !pressed
      ? `0 0 0 2px ${WHITE}, 0 0 0 4px ${RED}, 0 0 0 6px rgba(194,35,57,0.15)`
      : "none";

    return { backgroundColor: bg, color: textColor, border: "none", boxShadow: focusShadow };
  }

  const variantStyles = getVariantStyles();

  const isOnRed = variant === "primary";

  const baseStyle: React.CSSProperties = {
    position:       "relative",
    display:        "inline-flex",
    alignItems:     "center",
    justifyContent: "center",
    gap:            `${cfg.gap}px`,
    height:         `${cfg.height}px`,
    minWidth:       iconOnly ? `${cfg.height}px` : undefined,
    width:          iconOnly ? `${cfg.height}px`  : undefined,
    paddingLeft:    iconOnly ? 0 : `${cfg.px}px`,
    paddingRight:   iconOnly ? 0 : `${cfg.px}px`,
    borderRadius:   `${cfg.radius}px`,
    fontFamily:     "'Poppins', sans-serif",
    fontSize:       `${cfg.fontSize}px`,
    fontWeight:     600,
    lineHeight:     1.2,
    letterSpacing:  "0px",
    cursor:         disabled ? "not-allowed" : loading ? "default" : "pointer",
    transition:     [
      "background-color 150ms ease",
      "box-shadow 150ms ease",
      "color 120ms ease",
      "border-color 120ms ease",
      "transform 100ms ease",
    ].join(", "),
    transform:      pressed && !inactive ? "scale(0.97)" : "scale(1)",
    outline:        "none",
    whiteSpace:     "nowrap",
    flexShrink:     0,
    pointerEvents:  loading ? "none" : undefined,
    ...variantStyles,
    ...extraStyle,
  };

  // ── Slot renderer ──────────────────────────────────────────────────────────

  function IconSlot({ forPosition }: { forPosition: "left" | "right" }) {
    const showSpinner =
      loading && (iconOnly || forPosition === "left" || (!icon && forPosition === "left"));

    const showIcon =
      !loading &&
      !!icon &&
      (iconOnly || forPosition === iconPosition);

    if (!showSpinner && !showIcon) return null;

    return (
      <span
        style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          width:          `${cfg.iconSize}px`,
          height:         `${cfg.iconSize}px`,
          flexShrink:     0,
        }}
      >
        {showSpinner ? (
          <ButtonSpinner iconSize={cfg.iconSize} onRed={isOnRed} />
        ) : (
          icon
        )}
      </span>
    );
  }

  return (
    <button
      style={baseStyle}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => !inactive && setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false); }}
      onMouseDown={() => !inactive && setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      aria-label={label}
      aria-busy={loading}
    >
      {/* Left slot: spinner (when loading) or left icon */}
      <IconSlot forPosition="left" />

      {/* Label */}
      {label && <span>{label}</span>}

      {/* Right slot (icon-only never renders here) */}
      {!iconOnly && <IconSlot forPosition="right" />}
    </button>
  );
}