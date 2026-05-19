// ─── StatusProgress Component ─────────────────────────────────────────────────
//
// Visual representation of logistics load status with a horizontal progress bar
// and descriptive text. Designed for table cells in "Mis Cargas" and summary cards.
//
// Features:
//   - Size variants: sm / md (default) / lg
//   - Status variants: success / warning / danger / info / neutral
//   - Layouts: vertical (default) or horizontal
//   - Optional icon support
//   - Footnote for additional context
//   - Animated progress transition
//   - Clickable mode with hover + focus styles (a11y)
//   - Disabled state with muted colors
//
// Design tokens: exclusively CSS variables
//   --color/neutral/900  →  Label text (default)
//   --color/neutral/600  →  Percentage + Footnote text
//   --color/neutral/200  →  Track background
//   --color/neutral/50   →  Hover background (interactive only)
//   --color/success/600  →  Success variant fill
//   --color/warning/600  →  Warning variant fill
//   --color/danger/600   →  Danger variant fill
//   --color/primary/600  →  Info variant fill (Powerload red)
//   --color/neutral/400  →  Neutral variant fill + Disabled text
//   --color/primary/400  →  Focus outline (interactive)
//

import React, { useEffect, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export type StatusVariant = "success" | "warning" | "danger" | "info" | "neutral";

export interface StatusProgressProps {
  /** Descriptive label of the status (e.g., "Recogida realizada", "En tránsito") */
  label: string;
  /** Progress percentage (0-100) */
  progress: number;
  /** Color variant based on status type — default: "info" */
  variant?: StatusVariant;
  /** Component size variant — default: "md" */
  size?: "sm" | "md" | "lg";
  /** Show numeric percentage next to the bar — default: true */
  showPercentage?: boolean;
  /** Optional icon before the label */
  icon?: React.ReactNode;
  /** Additional text below the label (e.g., "Estimado: 2h") */
  footnote?: string;
  /** Animate progress on mount and changes — default: true */
  animated?: boolean;
  /** Disable visual interactions (hover, click) */
  disabled?: boolean;
  /** Optional className for custom styling */
  className?: string;
  /** Callback if the component is clickable */
  onClick?: () => void;
  /** Layout direction — default: "vertical" */
  layout?: "vertical" | "horizontal";
  /** Use variant color for the label text */
  coloredLabel?: boolean;
  /** Decimal places for percentage display — default: 0 */
  decimalPlaces?: number;
  /** Hide footnote on mobile devices */
  hideFootnoteOnMobile?: boolean;
}

// ─── Color tokens mapping ─────────────────────────────────────────────────────

const VARIANT_FILL: Record<StatusVariant, string> = {
  success: "var(--color/success/600)",
  warning: "var(--color/warning/600)",
  danger: "var(--color/danger/600)",
  info: "var(--color/primary/600)",
  neutral: "var(--color/neutral/400)",
};

const VARIANT_TEXT: Record<StatusVariant, string> = {
  success: "var(--color/success/600)",
  warning: "var(--color/warning/600)",
  danger: "var(--color/danger/600)",
  info: "var(--color/primary/600)",
  neutral: "var(--color/neutral/800)",
};

// ─── Size tokens ──────────────────────────────────────────────────────────────
// All spacing and typography values per size variant

const SIZE_TOKENS = {
  sm: {
    trackHeight: 4,
    trackRadius: 2,
    labelFontSize: 11,
    labelFontWeight: 500 as const,
    percentageFontSize: 9,
    footnoteFontSize: 9,
    gapVertical: "4px",
    gapHorizontal: "6px",
    iconSize: 12,
    animationDuration: "200ms",
  },
  md: {
    trackHeight: 6,
    trackRadius: 3,
    labelFontSize: 12,
    labelFontWeight: 500 as const,
    percentageFontSize: 10,
    footnoteFontSize: 9,
    gapVertical: "6px",
    gapHorizontal: "8px",
    iconSize: 14,
    animationDuration: "300ms",
  },
  lg: {
    trackHeight: 8,
    trackRadius: 4,
    labelFontSize: 13,
    labelFontWeight: 600 as const,
    percentageFontSize: 11,
    footnoteFontSize: 10,
    gapVertical: "8px",
    gapHorizontal: "12px",
    iconSize: 16,
    animationDuration: "400ms",
  },
};

// ─── Micro-component: ProgressBar ─────────────────────────────────────────────
// Internal progress bar with track and fill, animated transition

interface ProgressBarProps {
  progress: number;
  variant: StatusVariant;
  size: "sm" | "md" | "lg";
  animated?: boolean;
}

function ProgressBar({ progress, variant, size, animated }: ProgressBarProps) {
  const tokens = SIZE_TOKENS[size];
  const [width, setWidth] = useState(animated ? 0 : progress);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setWidth(progress), 50);
      return () => clearTimeout(timer);
    } else {
      setWidth(progress);
    }
  }, [progress, animated]);

  const clampedWidth = Math.min(100, Math.max(0, width));

  const trackStyles: React.CSSProperties = {
    width: "100%",
    height: `${tokens.trackHeight}px`,
    backgroundColor: "var(--color/neutral/200)",
    borderRadius: `${tokens.trackRadius}px`,
    overflow: "hidden",
    position: "relative",
  };

  const fillStyles: React.CSSProperties = {
    height: "100%",
    width: `${clampedWidth}%`,
    backgroundColor: VARIANT_FILL[variant],
    borderRadius: `${tokens.trackRadius}px`,
    transition: animated ? `width ${tokens.animationDuration} ease-out` : "none",
  };

  return (
    <div
      style={trackStyles}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div style={fillStyles} />
    </div>
  );
}

// ─── Main Component: StatusProgress ───────────────────────────────────────────

export function StatusProgress({
  label,
  progress,
  variant = "info",
  size = "md",
  showPercentage = true,
  icon,
  footnote,
  animated = true,
  disabled = false,
  className,
  onClick,
  layout = "vertical",
  coloredLabel = false,
  decimalPlaces = 0,
  hideFootnoteOnMobile = false,
}: StatusProgressProps) {
  const tokens = SIZE_TOKENS[size];
  const isInteractive = !!onClick && !disabled;
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const formattedPercentage = `${clampedProgress.toFixed(decimalPlaces)}%`;

  // Resolve label color
  const labelColor = disabled
    ? "var(--color/neutral/400)"
    : coloredLabel
      ? VARIANT_TEXT[variant]
      : "var(--color/neutral/900)";

  const mutedColor = disabled
    ? "var(--color/neutral/400)"
    : "var(--color/neutral/600)";

  // ── Container styles ─────────────────────────────────────────────────────
  const containerStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: layout === "vertical" ? "column" : "row",
    alignItems: layout === "vertical" ? "flex-start" : "center",
    gap: layout === "vertical" ? tokens.gapVertical : tokens.gapHorizontal,
    fontFamily: "'Poppins', sans-serif",
    cursor: disabled ? "not-allowed" : isInteractive ? "pointer" : "default",
    opacity: disabled ? 0.6 : 1,
    transition: isInteractive
      ? "background-color 150ms ease-in-out"
      : "none",
    borderRadius: isInteractive ? "4px" : undefined,
    padding: isInteractive ? "2px 4px" : undefined,
  };

  // ── Label styles ─────────────────────────────────────────────────────────
  const labelStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: icon ? "6px" : "0",
    fontSize: `${tokens.labelFontSize}px`,
    fontWeight: tokens.labelFontWeight,
    color: labelColor,
    lineHeight: 1.2,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    margin: 0,
  };

  // ── Percentage styles ────────────────────────────────────────────────────
  const percentageStyles: React.CSSProperties = {
    fontSize: `${tokens.percentageFontSize}px`,
    fontWeight: 400,
    color: mutedColor,
    lineHeight: 1.2,
    whiteSpace: "nowrap",
    flexShrink: 0,
  };

  // ── Footnote styles ──────────────────────────────────────────────────────
  const footnoteStyles: React.CSSProperties = {
    fontSize: `${tokens.footnoteFontSize}px`,
    fontWeight: 400,
    color: mutedColor,
    lineHeight: 1.2,
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: "100%",
    margin: 0,
    ...(layout === "horizontal" && { flexBasis: "100%", marginTop: "4px" }),
  };

  // ── Icon styles ──────────────────────────────────────────────────────────
  const iconStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    width: `${tokens.iconSize}px`,
    height: `${tokens.iconSize}px`,
    flexShrink: 0,
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
    `${label}: ${formattedPercentage} completado`,
    footnote ?? null,
    disabled ? "(deshabilitado)" : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div
      className={className}
      style={containerStyles}
      onClick={isInteractive ? onClick : undefined}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={ariaLabel}
      aria-disabled={disabled ? true : undefined}
    >
      {/* ── Vertical layout ──────────────────────────────────────────────── */}
      {layout === "vertical" && (
        <>
          {/* Label + Icon */}
          <span style={labelStyles}>
            {icon && <span style={iconStyles}>{icon}</span>}
            {label}
          </span>

          {/* Progress Bar */}
          <ProgressBar
            progress={clampedProgress}
            variant={variant}
            size={size}
            animated={animated}
          />

          {/* Percentage + Footnote */}
          {(showPercentage || footnote) && (
            <div
              style={{
                display: "flex",
                gap: "8px",
                alignItems: "center",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              {showPercentage && <span style={percentageStyles}>{formattedPercentage}</span>}
              {footnote && !hideFootnoteOnMobile && (
                <span style={footnoteStyles}>{footnote}</span>
              )}
            </div>
          )}
        </>
      )}

      {/* ── Horizontal layout ────────────────────────────────────────────── */}
      {layout === "horizontal" && (
        <>
          {/* Label + Icon */}
          <span style={{ ...labelStyles, flexShrink: 0 }}>
            {icon && <span style={iconStyles}>{icon}</span>}
            {label}
          </span>

          {/* Progress Bar (flexible width) */}
          <div style={{ flex: 1, minWidth: "80px" }}>
            <ProgressBar
              progress={clampedProgress}
              variant={variant}
              size={size}
              animated={animated}
            />
          </div>

          {/* Percentage */}
          {showPercentage && <span style={percentageStyles}>{formattedPercentage}</span>}

          {/* Footnote below (only in horizontal layout) */}
          {footnote && !hideFootnoteOnMobile && (
            <span style={footnoteStyles}>{footnote}</span>
          )}
        </>
      )}
    </div>
  );
}

export type { StatusVariant };
