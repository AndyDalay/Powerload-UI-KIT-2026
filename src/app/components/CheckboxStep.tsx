import { useState } from "react";
import "./button-animations.css";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CheckboxShape  = "circle" | "square";
export type CheckboxSize   = "sm" | "md" | "lg";

export interface CheckboxStepProps {
  /** circle = fully rounded (radio-style) · square = 8px radius (checkbox-style) */
  shape?:         CheckboxShape;
  /** Checked / active / completed */
  checked?:       boolean;
  /** Loading state — shows animated spinner instead of checkmark */
  loading?:       boolean;
  /** Disabled — no interaction; works on checked & unchecked */
  disabled?:      boolean;
  /** Error state — red border, no fill */
  error?:         boolean;
  /** Indeterminate — minus dash (useful for "partially done" steps) */
  indeterminate?: boolean;
  /** Optional text label */
  label?:         string;
  /** sm=20px · md=24px (default) · lg=28px */
  size?:          CheckboxSize;
  /** If provided the component becomes interactive (click to toggle) */
  onChange?:      (checked: boolean) => void;
  style?:         React.CSSProperties;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PX: Record<CheckboxSize, number> = { sm: 20, md: 24, lg: 28 };

// Design-system tokens
const RED        = "#C22339";
const RED_HOVER  = "#CF4758";
const RED_0      = "#FBE1E1";          // primary/0 — ghost hover bg
const N200       = "#ECECF4";          // neutral/200 — disabled bg
const N300       = "#E1E1EC";          // neutral/300 — unchecked border
const N400       = "#D2D2E1";          // neutral/400 — disabled border
const N500       = "#BDBDD1";          // neutral/500 — disabled checked bg
const N600       = "#A1A1B9";          // neutral/600 — track color in spinner
const N800       = "#55556C";          // neutral/800 — label text
const DANGER     = "#E22824";          // danger/600
const DANGER_0   = "#FBE4E4";          // danger/0 — error hover bg
const WHITE      = "#FFFFFF";

// Checkmark path from design (viewBox 0 0 11.0839 8.16662)
const CHECK_PATH = "M9.59027 0.256038C9.93195 -0.0852915 10.486 -0.0854002 10.8276 0.256038C11.1693 0.597746 11.1693 1.15261 10.8276 1.49432L4.41058 7.91033C4.06887 8.25204 3.51498 8.25204 3.17327 7.91033L0.256281 4.99432C-0.0854271 4.65261 -0.0854272 4.09775 0.256281 3.75604C0.59799 3.41433 1.15285 3.41433 1.49456 3.75604L3.79144 6.05389L9.59027 0.256038Z";

// ─── Spinner ─────────────────────────────────────────────────────────────────

function CheckSpinner({ px }: { px: number }) {
  const sw    = Math.max(1.5, Math.round(px * 0.1));
  const r     = (px - sw * 2) / 2;
  const cx    = px / 2;
  const cy    = px / 2;
  const circ  = 2 * Math.PI * r;
  const arc   = circ * 0.22;

  return (
    <svg
      width={px} height={px}
      viewBox={`0 0 ${px} ${px}`}
      fill="none"
      style={{
        animation:       "powerload-spin 0.72s linear infinite",
        transformOrigin: `${cx}px ${cy}px`,
        flexShrink: 0,
        display: "block",
      }}
    >
      {/* Track */}
      <circle cx={cx} cy={cy} r={r} stroke={N600} strokeWidth={sw} />
      {/* Red arc — starts at 12 o'clock */}
      <circle
        cx={cx} cy={cy} r={r}
        stroke={RED}
        strokeWidth={sw}
        strokeDasharray={`${arc} ${circ}`}
        strokeLinecap="round"
        transform={`rotate(-90 ${cx} ${cy})`}
      />
    </svg>
  );
}

// ─── Checkmark icon ───────────────────────────────────────────────────────────

function CheckIcon({ px, color = WHITE }: { px: number; color?: string }) {
  const w = px * 0.462;
  const h = px * 0.340;
  return (
    <svg width={w} height={h} viewBox="0 0 11.0839 8.16662" fill="none" style={{ flexShrink: 0 }}>
      <path d={CHECK_PATH} fill={color} />
    </svg>
  );
}

// ─── Indeterminate dash ───────────────────────────────────────────────────────

function DashIcon({ px, color = WHITE }: { px: number; color?: string }) {
  return (
    <div style={{
      width:           px * 0.5,
      height:          Math.max(2, Math.round(px * 0.085)),
      backgroundColor: color,
      borderRadius:    "2px",
      flexShrink:      0,
    }} />
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CheckboxStep({
  shape         = "square",
  checked       = false,
  loading       = false,
  disabled      = false,
  error         = false,
  indeterminate = false,
  label,
  size          = "md",
  onChange,
  style,
}: CheckboxStepProps) {
  const [hovered, setHovered] = useState(false);
  const [pressed, setPressed] = useState(false);

  const px           = PX[size];
  const isInteractive = !!onChange && !disabled && !loading;

  // Resolve which visual mode takes priority
  // loading > disabled > error > indeterminate > checked > unchecked
  type VisualMode = "loading" | "disabled-checked" | "disabled-unchecked" | "error" | "indeterminate" | "checked" | "unchecked";

  let mode: VisualMode;
  if (loading)                          mode = "loading";
  else if (disabled && checked)         mode = "disabled-checked";
  else if (disabled)                    mode = "disabled-unchecked";
  else if (error)                       mode = "error";
  else if (indeterminate && !checked)   mode = "indeterminate";
  else if (checked)                     mode = "checked";
  else                                  mode = "unchecked";

  // ── Container visual styles ──────────────────────────────────────────────────
  function boxStyle(): React.CSSProperties {
    const base: React.CSSProperties = {
      width:           px,
      height:          px,
      borderRadius:    shape === "circle" ? "9999px" : "8px",
      display:         "flex",
      alignItems:      "center",
      justifyContent:  "center",
      flexShrink:      0,
      transition:      "background-color 150ms ease, border-color 150ms ease, transform 100ms ease",
      cursor:          isInteractive ? "pointer" : disabled ? "not-allowed" : "default",
      transform:       pressed && isInteractive ? "scale(0.92)" : "scale(1)",
      boxSizing:       "border-box" as const,
    };

    switch (mode) {
      case "loading":
        return { ...base, backgroundColor: "transparent", border: `1.5px solid ${N300}` };

      case "disabled-checked":
        return { ...base, backgroundColor: N500, border: "none" };

      case "disabled-unchecked":
        return { ...base, backgroundColor: N200, border: `2px solid ${N400}` };

      case "error":
        return {
          ...base,
          backgroundColor: hovered ? DANGER_0 : WHITE,
          border:          `2px solid ${DANGER}`,
        };

      case "indeterminate":
      case "checked":
        return {
          ...base,
          backgroundColor: pressed  ? "#8F1A31"
                         : hovered  ? RED_HOVER
                         : RED,
          border:          "none",
        };

      case "unchecked":
      default:
        return {
          ...base,
          backgroundColor: hovered ? RED_0 : WHITE,
          border:          `2px solid ${hovered ? RED : N300}`,
        };
    }
  }

  // ── Label color ──────────────────────────────────────────────────────────────
  function labelColor(): string {
    if (disabled)  return N400;
    if (error)     return DANGER;
    return N800;
  }

  // ── Handler ──────────────────────────────────────────────────────────────────
  function handleClick() {
    if (isInteractive) onChange!(!checked);
  }

  // ── Render ───────────────────────────────────────────────────────────────────
  const fontSize = size === "sm" ? 13 : size === "lg" ? 15 : 14;

  return (
    <div
      style={{
        display:    "inline-flex",
        alignItems: "center",
        gap:        px * 0.45,
        ...style,
      }}
    >
      {/* ── Indicator ────────────────────────────────────────────────── */}
      <div
        role={isInteractive ? "checkbox" : undefined}
        aria-checked={isInteractive ? checked : undefined}
        aria-disabled={disabled || undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={handleClick}
        onMouseEnter={() => { if (!disabled && !loading) setHovered(true); }}
        onMouseLeave={() => { setHovered(false); setPressed(false); }}
        onMouseDown={() => { if (isInteractive) setPressed(true); }}
        onMouseUp={() => setPressed(false)}
        onKeyDown={e => { if (isInteractive && (e.key === " " || e.key === "Enter")) { e.preventDefault(); handleClick(); } }}
        style={boxStyle()}
      >
        {mode === "loading"          && <CheckSpinner px={px - 4} />}
        {mode === "checked"          && <CheckIcon px={px} />}
        {mode === "disabled-checked" && <CheckIcon px={px} color="rgba(255,255,255,0.80)" />}
        {mode === "indeterminate"    && <DashIcon px={px} />}
      </div>

      {/* ── Label ────────────────────────────────────────────────────── */}
      {label && (
        <span
          style={{
            fontFamily:  "'Poppins', sans-serif",
            fontSize:    fontSize,
            fontWeight:  400,
            lineHeight:  "1.4",
            color:       labelColor(),
            userSelect:  "none",
            cursor:      isInteractive ? "pointer" : "default",
          }}
          onClick={handleClick}
        >
          {label}
        </span>
      )}
    </div>
  );
}
