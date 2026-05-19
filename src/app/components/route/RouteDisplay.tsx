// ─── RouteDisplay Component ──────────────────────────────────────────────────
//
// Visual representation of a logistics route with origin and destination points.
// Features: Size variants (sm/md/lg), connector line, additional info support.
// Design tokens: All colors via CSS variables (--color/blue/*, --color/red/*, --color/neutral/*)
// Micro-components: RoutePoint (internal)

import React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface RoutePointData {
  /** City name (e.g., "Madrid") */
  city: string;
  /** Country code or name (e.g., "ES" or "España") */
  country: string;
  /** Date and time (e.g., "05/05 - 08:00") */
  dateTime: string;
  /** Optional additional info (e.g., "Carga general", "Palets") */
  additionalInfo?: string;
}

export interface RouteDisplayProps {
  /** Origin point data */
  origin: RoutePointData;
  /** Destination point data */
  destination: RoutePointData;
  /** Size variant: sm (compact), md (standard), lg (expanded) */
  size?: "sm" | "md" | "lg";
  /** Show connector line between points */
  showConnector?: boolean;
  /** Horizontal alignment: left or center */
  align?: "left" | "center";
  /** Optional className for custom styling */
  className?: string;
}

// ─── Font size and spacing tokens per size variant ────────────────────────────

const FONT_SIZES = {
  sm: {
    point: 6,
    city: 12,
    dateTime: 10,
    additionalInfo: 10,
    gap: "12px",
    pointMarginTop: "1px",
  },
  md: {
    point: 8,
    city: 13,
    dateTime: 11,
    additionalInfo: 10,
    gap: "16px",
    pointMarginTop: "2px",
  },
  lg: {
    point: 10,
    city: 14,
    dateTime: 12,
    additionalInfo: 10,
    gap: "20px",
    pointMarginTop: "2px",
  },
};

// ─── Micro-component: RoutePoint ──────────────────────────────────────────────
// Individual route point (origin or destination) with city, country, date/time, and optional info

interface RoutePointProps {
  data: RoutePointData;
  variant: "origin" | "destination";
  size: "sm" | "md" | "lg";
}

function RoutePoint({ data, variant, size }: RoutePointProps) {
  const pointColor =
    variant === "origin"
      ? "var(--color/blue/600)"
      : "var(--color/red/600)";

  const sizes = FONT_SIZES[size];

  const pointStyles: React.CSSProperties = {
    width: `${sizes.point}px`,
    height: `${sizes.point}px`,
    borderRadius: "50%",
    backgroundColor: pointColor,
    flexShrink: 0,
    marginTop: sizes.pointMarginTop,
  };

  const containerStyles: React.CSSProperties = {
    display: "flex",
    gap: "8px",
  };

  const textContainerStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
  };

  const cityCountryStyles: React.CSSProperties = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: `${sizes.city}px`,
    fontWeight: 600,
    color: "var(--color/neutral/900)",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    margin: 0,
  };

  const dateTimeStyles: React.CSSProperties = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: `${sizes.dateTime}px`,
    fontWeight: 400,
    color: "var(--color/neutral/600)",
    margin: 0,
  };

  const additionalInfoStyles: React.CSSProperties = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: `${sizes.additionalInfo}px`,
    fontWeight: 500,
    color: "var(--color/neutral/800)",
    margin: 0,
  };

  return (
    <div style={containerStyles}>
      {/* Point circle */}
      <div style={pointStyles} />

      {/* Text content: city, dateTime, additionalInfo */}
      <div style={textContainerStyles}>
        {/* City, Country */}
        <div style={cityCountryStyles}>
          {data.city}, {data.country}
        </div>

        {/* Date/Time */}
        <div style={dateTimeStyles}>{data.dateTime}</div>

        {/* Additional Info (conditional) */}
        {data.additionalInfo && (
          <div style={additionalInfoStyles}>{data.additionalInfo}</div>
        )}
      </div>
    </div>
  );
}

// ─── Main Component: RouteDisplay ─────────────────────────────────────────────
// Container for origin, connector line (optional), and destination points

export function RouteDisplay({
  origin,
  destination,
  size = "md",
  showConnector = true,
  align = "left",
  className,
}: RouteDisplayProps) {
  const sizes = FONT_SIZES[size];
  const justifyContent = align === "left" ? "flex-start" : "center";

  // Connector line height calculation based on size
  const connectorHeight = size === "sm" ? "16px" : size === "lg" ? "32px" : "24px";
  const connectorMarginLeft =
    size === "sm" ? "3px" : size === "lg" ? "5px" : "4px";

  const containerStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    gap: sizes.gap,
    justifyContent,
    alignItems: align === "left" ? "flex-start" : "center",
  };

  const connectorStyles: React.CSSProperties = {
    width: "1px",
    height: connectorHeight,
    borderLeft: "1px dashed var(--color/neutral/400)",
    marginLeft: connectorMarginLeft,
  };

  return (
    <div
      className={className}
      style={containerStyles}
      aria-label={`Ruta: ${origin.city} a ${destination.city}`}
    >
      {/* Origin point */}
      <RoutePoint data={origin} variant="origin" size={size} />

      {/* Connector Line (conditional) */}
      {showConnector && <div style={connectorStyles} />}

      {/* Destination point */}
      <RoutePoint data={destination} variant="destination" size={size} />
    </div>
  );
}

export type { RoutePointData, RouteDisplayProps };
