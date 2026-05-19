// ─── VehicleSelectOption — row inside Input/VehicleSelect dropdown ───────────

import { useState } from "react";
import type { CSSProperties } from "react";
import { VehicleIllustration } from "./VehicleIllustration";
import type { VehicleOption } from "./vehicleTypes";

const RED = "#C22339";

function CheckCircle({ selected }: { selected: boolean }) {
  if (selected) {
    return (
      <span
        style={{
          width: 16,
          height: 16,
          borderRadius: "50%",
          backgroundColor: RED,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width={10} height={8} viewBox="0 0 10 8" fill="none" aria-hidden>
          <path
            d="M1 4.25L3.5 6.75L9 1.25"
            stroke="#FFFFFF"
            strokeWidth={1.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }
  return (
    <span
      style={{
        width: 16,
        height: 16,
        borderRadius: "50%",
        backgroundColor: "#FFFFFF",
        border: "1.5px solid #E5E7EB",
        boxSizing: "border-box",
        flexShrink: 0,
      }}
    />
  );
}

export interface VehicleSelectOptionProps {
  option: VehicleOption;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
  style?: CSSProperties;
}

export function VehicleSelectOption({
  option,
  selected,
  onClick,
  disabled = false,
  style,
}: VehicleSelectOptionProps) {
  const [hovered, setHovered] = useState(false);

  let backgroundColor = "transparent";
  if (selected && hovered) backgroundColor = "#FBE1E1";
  else if (hovered) backgroundColor = "#F3F3F9";
  else if (selected) backgroundColor = "#F3F3F9";

  return (
    <button
      type="button"
      disabled={disabled}
      role="option"
      aria-selected={selected}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        padding: "4px 8px 4px 12px",
        borderRadius: 8,
        border: "none",
        backgroundColor,
        cursor: disabled ? "not-allowed" : "pointer",
        textAlign: "left",
        ...style,
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0, flex: 1 }}>
        <VehicleIllustration src={option.src} alt="" variant="option" />
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: 14,
            fontWeight: 400,
            color: "#55556C",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {option.label}
        </span>
      </span>
      <CheckCircle selected={selected} />
    </button>
  );
}
