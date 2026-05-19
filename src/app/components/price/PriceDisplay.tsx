// ─── PriceDisplay Component ───────────────────────────────────────────────────
//
// Visual representation of logistics pricing with total cost and per-kilometer
// breakdown. Designed for table cells in "Mis Cargas" and billing card metrics.
//
// Features:
//   - Size variants: sm / md (default) / lg
//   - Currency support: EUR, USD, GBP, CUP
//   - Layouts: vertical (default) or horizontal
//   - Optional vertical divider in horizontal layout
//   - Highlighted style using primary-600 (Powerload red)
//   - Disabled state with muted colors
//   - Clickable mode with hover + focus styles (a11y)
//   - Footnote with ellipsis overflow
//
// Design tokens: exclusively CSS variables
//   --color/neutral/900  →  Total price (default)
//   --color/neutral/600  →  PerKm + Footnote text
//   --color/neutral/200  →  Divider color
//   --color/neutral/50   →  Hover background (interactive only)
//   --color/neutral/400  →  Disabled text
//   --color/primary/600  →  Total price (highlighted)
//   --color/primary/400  →  Focus outline (interactive)

import React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type CurrencyCode = "EUR" | "USD" | "GBP" | "CUP";

export interface PriceDisplayProps {
  /** Total price of the load (e.g., 650) */
  total: number;
  /** Price per kilometer (e.g., 1.32) */
  perKm?: number;
  /** Currency code for formatting */
  currency?: CurrencyCode;
  /** Show currency symbol (€, $, £) — default: true */
  showSymbol?: boolean;
  /** Show per-km breakdown — default: true */
  showPerKm?: boolean;
  /** Component size variant — default: "md" */
  size?: "sm" | "md" | "lg";
  /** Horizontal text alignment — default: "left" */
  align?: "left" | "right" | "center";
  /** Layout direction — default: "vertical" */
  layout?: "vertical" | "horizontal";
  /** Show vertical divider between total and perKm in horizontal layout — default: true */
  showDivider?: boolean;
  /** Use primary-600 color for the total (e.g., priority prices) */
  highlighted?: boolean;
  /** Muted style — disables interaction and reduces visual prominence */
  disabled?: boolean;
  /** Additional text below the price (e.g., "IVA incluido", "Negociable") */
  footnote?: string;
  /** Optional className for custom styling */
  className?: string;
  /** Callback if the price is clickable */
  onClick?: () => void;
}

// ─── Formatting utilities ─────────────────────────────────────────────────────

const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  CUP: "$",
};

/**
 * Formats a price value with locale-specific separators and optional symbol.
 * EUR/GBP/USD → es-ES locale  |  CUP → es-CU locale
 */
function formatPrice(
  value: number,
  currency: CurrencyCode,
  showSymbol: boolean
): string {
  const locale = currency === "CUP" ? "es-CU" : "es-ES";

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return showSymbol ? `${formatted} ${CURRENCY_SYMBOLS[currency]}` : formatted;
}

/**
 * Formats a per-km price value with the "/km" unit suffix.
 * E.g.: "1,32 €/km"
 */
function formatPerKm(
  value: number,
  currency: CurrencyCode,
  showSymbol: boolean
): string {
  const locale = currency === "CUP" ? "es-CU" : "es-ES";

  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  const symbol = showSymbol ? ` ${CURRENCY_SYMBOLS[currency]}` : "";
  return `${formatted}${symbol}/km`;
}

// ─── Size tokens ──────────────────────────────────────────────────────────────
// All spacing and typography values per size variant

const SIZE_TOKENS = {
  sm: {
    total:    { fontSize: 13, fontWeight: 600 as const },
    perKm:    { fontSize: 10, fontWeight: 400 as const },
    footnote: { fontSize:  9, fontWeight: 400 as const },
    gapVertical:   "2px",
    gapHorizontal: "6px",
    dividerHeight: "16px",
    dividerMargin: "0 6px",
  },
  md: {
    total:    { fontSize: 14, fontWeight: 600 as const },
    perKm:    { fontSize: 11, fontWeight: 400 as const },
    footnote: { fontSize: 10, fontWeight: 400 as const },
    gapVertical:   "4px",
    gapHorizontal: "8px",
    dividerHeight: "20px",
    dividerMargin: "0 8px",
  },
  lg: {
    total:    { fontSize: 16, fontWeight: 600 as const },
    perKm:    { fontSize: 12, fontWeight: 400 as const },
    footnote: { fontSize: 11, fontWeight: 400 as const },
    gapVertical:   "6px",
    gapHorizontal: "12px",
    dividerHeight: "24px",
    dividerMargin: "0 12px",
  },
};

// ─── Alignment helper ─────────────────────────────────────────────────────────

const JUSTIFY_MAP: Record<"left" | "right" | "center", string> = {
  left:   "flex-start",
  right:  "flex-end",
  center: "center",
};

// ─── Main Component: PriceDisplay ─────────────────────────────────────────────

export function PriceDisplay({
  total,
  perKm,
  currency    = "EUR",
  showSymbol  = true,
  showPerKm   = true,
  size        = "md",
  align       = "left",
  layout      = "vertical",
  showDivider = true,
  highlighted = false,
  disabled    = false,
  footnote,
  className,
  onClick,
}: PriceDisplayProps) {
  const tokens      = SIZE_TOKENS[size];
  const isInteractive = !!onClick && !disabled;

  // Pre-formatted values
  const formattedTotal = formatPrice(total, currency, showSymbol);
  const formattedPerKm =
    perKm !== undefined && perKm !== 0 && showPerKm
      ? formatPerKm(perKm, currency, showSymbol)
      : null;

  // ── Resolve total color ──────────────────────────────────────────────────
  // Priority: disabled → highlighted → default
  const totalColor = disabled
    ? "var(--color/neutral/400)"
    : highlighted
      ? "var(--color/primary/600)"
      : "var(--color/neutral/900)";

  const mutedColor = disabled
    ? "var(--color/neutral/400)"
    : "var(--color/neutral/600)";

  // ── Container styles ─────────────────────────────────────────────────────
  const containerStyles: React.CSSProperties = {
    display:        "flex",
    flexDirection:  layout === "vertical" ? "column" : "row",
    alignItems:     layout === "vertical" ? "flex-start" : "center",
    justifyContent: JUSTIFY_MAP[align],
    gap:            layout === "vertical" ? tokens.gapVertical : tokens.gapHorizontal,
    fontFamily:     "'Poppins', sans-serif",
    cursor:         disabled ? "not-allowed" : isInteractive ? "pointer" : "default",
    opacity:        disabled ? 0.6 : 1,
    transition:     isInteractive
      ? "background-color 150ms ease-in-out, color 200ms ease-in-out"
      : "none",
    borderRadius:   isInteractive ? "4px" : undefined,
    padding:        isInteractive ? "2px 4px" : undefined,
    outline:        "none",
  };

  // ── Total price styles ───────────────────────────────────────────────────
  const totalStyles: React.CSSProperties = {
    fontSize:   `${tokens.total.fontSize}px`,
    fontWeight: tokens.total.fontWeight,
    color:      totalColor,
    lineHeight: 1.2,
    whiteSpace: "nowrap",
    margin:     0,
    transition: "color 200ms ease-in-out",
  };

  // ── Per-km styles ────────────────────────────────────────────────────────
  const perKmStyles: React.CSSProperties = {
    fontSize:   `${tokens.perKm.fontSize}px`,
    fontWeight: tokens.perKm.fontWeight,
    color:      mutedColor,
    lineHeight: 1.2,
    whiteSpace: "nowrap",
    margin:     0,
  };

  // ── Footnote styles ──────────────────────────────────────────────────────
  const footnoteStyles: React.CSSProperties = {
    fontSize:     `${tokens.footnote.fontSize}px`,
    fontWeight:   tokens.footnote.fontWeight,
    color:        mutedColor,
    lineHeight:   1.2,
    whiteSpace:   "nowrap",
    overflow:     "hidden",
    textOverflow: "ellipsis",
    maxWidth:     "100%",
    margin:       0,
    // Extra top spacing when in horizontal layout (footnote wraps below)
    marginTop: layout === "horizontal" ? "4px" : tokens.gapVertical,
    // In horizontal layout the footnote breaks into a new flex line
    ...(layout === "horizontal" && { flexBasis: "100%" }),
  };

  // ── Divider styles (horizontal layout only) ──────────────────────────────
  const dividerStyles: React.CSSProperties = {
    width:           "1px",
    height:          tokens.dividerHeight,
    backgroundColor: "var(--color/neutral/200)",
    margin:          tokens.dividerMargin,
    alignSelf:       "center",
    flexShrink:      0,
  };

  // ── Interactive event handlers ───────────────────────────────────────────
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isInteractive) {
      e.currentTarget.style.backgroundColor = "var(--color/neutral/50)";
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isInteractive) {
      e.currentTarget.style.backgroundColor = "transparent";
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLDivElement>) => {
    if (isInteractive) {
      e.currentTarget.style.outline = "2px solid var(--color/primary/400)";
      e.currentTarget.style.outlineOffset = "2px";
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (isInteractive) {
      e.currentTarget.style.outline = "none";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isInteractive && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick?.();
    }
  };

  // ── Accessibility label ──────────────────────────────────────────────────
  const ariaLabel = [
    `Precio: ${formattedTotal}`,
    formattedPerKm ? `${formattedPerKm} por kilómetro` : null,
    footnote ?? null,
    disabled ? "(deshabilitado)" : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      className={className}
      style={containerStyles}
      // Interaction props — only applied when interactive
      onClick={isInteractive ? onClick : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      // Accessibility
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={ariaLabel}
      aria-disabled={disabled ? true : undefined}
    >
      {/* ── Total price ─────────────────────────────────────────────────── */}
      <span style={totalStyles}>{formattedTotal}</span>

      {/* ── Horizontal layout: optional divider + perKm ─────────────────── */}
      {layout === "horizontal" && formattedPerKm && (
        <>
          {showDivider && <div style={dividerStyles} aria-hidden="true" />}
          <span style={perKmStyles}>{formattedPerKm}</span>
        </>
      )}

      {/* ── Vertical layout: perKm below total ──────────────────────────── */}
      {layout === "vertical" && formattedPerKm && (
        <span style={perKmStyles}>{formattedPerKm}</span>
      )}

      {/* ── Footnote: always below regardless of layout ──────────────────── */}
      {footnote && (
        <span style={footnoteStyles}>{footnote}</span>
      )}
    </div>
  );
}
