// ─── Input/VehicleSelect — specialized vehicle-type dropdown (40px trigger) ───

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type { CSSProperties } from "react";
import { ChevronDown, Search } from "lucide-react";
import { VehicleIllustration, GenericTruckIllustration } from "./VehicleIllustration";
import { VehicleSelectOption } from "./VehicleSelectOption";
import {
  VEHICLE_OPTIONS,
  getVehicleById,
  type VehicleOption,
  type VehicleTypeId,
} from "./vehicleTypes";
import "./vehicle-select.css";

const FONT = "'Poppins', sans-serif";

export interface VehicleSelectProps {
  mode?: "single" | "multi";
  options?: readonly VehicleOption[];
  value?: VehicleTypeId[];
  defaultValue?: VehicleTypeId[];
  onChange?: (ids: VehicleTypeId[]) => void;
  disabled?: boolean;
  showLabel?: boolean;
  /** Label above trigger — design default: “Tipo de Vehículo” */
  label?: string;
  placeholder?: string;
  /** Opens the panel on first mount (documentation / story-style demos). */
  initialOpen?: boolean;
  className?: string;
  style?: CSSProperties;
}

function useControllableSelection(
  valueProp: VehicleTypeId[] | undefined,
  defaultValue: VehicleTypeId[] | undefined,
  onChange: ((ids: VehicleTypeId[]) => void) | undefined
): [VehicleTypeId[], (next: VehicleTypeId[]) => void] {
  const [inner, setInner] = useState<VehicleTypeId[]>(defaultValue ?? []);
  const isControlled = valueProp !== undefined;
  const selected = isControlled ? (valueProp as VehicleTypeId[]) : inner;

  const setSelected = useCallback(
    (next: VehicleTypeId[]) => {
      if (!isControlled) setInner(next);
      onChange?.(next);
    },
    [isControlled, onChange]
  );

  return [selected, setSelected];
}

export function VehicleSelect({
  mode = "single",
  options = VEHICLE_OPTIONS,
  value,
  defaultValue,
  onChange,
  disabled = false,
  showLabel = true,
  label = "Tipo de Vehículo",
  placeholder = "Selecciona un tipo",
  initialOpen = false,
  className,
  style,
}: VehicleSelectProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerId = useId();
  const [open, setOpen] = useState(initialOpen);
  const [query, setQuery] = useState("");
  const [triggerHovered, setTriggerHovered] = useState(false);
  const [triggerFocused, setTriggerFocused] = useState(false);

  const [selected, setSelected] = useControllableSelection(value, defaultValue, onChange);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [...options];
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const first = selected.length ? getVehicleById(selected[0]) : undefined;
  const isEmpty = selected.length === 0;
  const isMulti = mode === "multi";
  const showCounter = isMulti && selected.length > 1;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const toggleOpen = () => {
    if (disabled) return;
    setOpen((o) => !o);
  };

  const onPick = (id: VehicleTypeId) => {
    if (disabled) return;
    if (mode === "single") {
      setSelected([id]);
      setOpen(false);
      return;
    }
    const set = new Set(selected);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    setSelected([...set]);
  };

  let triggerBorder = "1px solid #E4E4E7";
  let triggerBoxShadow: string | undefined;
  if (disabled) triggerBorder = "1px solid #ECECF4";
  else if (triggerFocused) {
    triggerBorder = "2px solid #C22339";
    triggerBoxShadow = "0 0 0 3px rgba(194,35,57,0.12)";
  } else if (triggerHovered && !open) triggerBorder = "1px solid #BDBDD1";

  const triggerBg = disabled ? "#F3F3F9" : "#FFFFFF";
  const muted = disabled ? "#BDBDD1" : "#A1A1B9";
  const labelColor = disabled ? "#BDBDD1" : "#55556C";

  return (
    <div ref={rootRef} className={className} style={{ position: "relative", minWidth: 200, width: "100%", ...style }}>
      {showLabel && (
        <label
          htmlFor={triggerId}
          style={{
            display: "block",
            fontFamily: FONT,
            fontSize: 14,
            fontWeight: 400,
            color: "#09090B",
            marginBottom: 6,
          }}
        >
          {label}
        </label>
      )}

      <button
        id={triggerId}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={toggleOpen}
        onMouseEnter={() => setTriggerHovered(true)}
        onMouseLeave={() => setTriggerHovered(false)}
        onFocus={() => setTriggerFocused(true)}
        onBlur={() => setTriggerFocused(false)}
        style={{
          width: "100%",
          height: 40,
          padding: "0 16px 0 8px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          overflow: "hidden",
          backgroundColor: triggerBg,
          border: triggerBorder,
          borderRadius: 12,
          boxShadow: triggerBoxShadow,
          boxSizing: "border-box",
          cursor: disabled ? "not-allowed" : "pointer",
        }}
      >
        {isEmpty ? (
          <span style={{ opacity: disabled ? 0.4 : 1 }}>
            <GenericTruckIllustration color={muted} />
          </span>
        ) : (
          <span style={{ opacity: disabled ? 0.4 : 1 }}>
            <VehicleIllustration src={first!.src} alt="" variant="trigger" />
          </span>
        )}

        <span
          style={{
            flex: 1,
            minWidth: 0,
            fontFamily: FONT,
            fontSize: 14,
            fontWeight: 400,
            color: isEmpty ? muted : labelColor,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            textAlign: "left",
          }}
        >
          {isEmpty ? placeholder : first?.label}
        </span>

        {showCounter && !disabled && (
          <span
            style={{
              flexShrink: 0,
              backgroundColor: "#FFFFFF",
              border: "1px solid #D2D2E1",
              borderRadius: 4,
              padding: "0 4px",
              fontFamily: FONT,
              fontSize: 12,
              fontWeight: 500,
              color: "#55556C",
              lineHeight: "18px",
            }}
          >
            {selected.length}
          </span>
        )}

        <ChevronDown
          size={16}
          color={muted}
          strokeWidth={2}
          style={{
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : undefined,
            transition: "transform 160ms ease",
            opacity: disabled ? 0.4 : 1,
          }}
        />
      </button>

      {open && !disabled && (
        <div
          role="listbox"
          aria-multiselectable={isMulti}
          className="pl-vehicle-select__panel-scroll"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: "calc(100% + 4px)",
            zIndex: 50,
            maxHeight: 280,
            overflowY: "auto",
            backgroundColor: "#FFFFFF",
            border: "1px solid #D2D2E1",
            borderRadius: 12,
            boxShadow: "0px 4px 4px 0px rgba(0,0,0,0.18)",
          }}
        >
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              height: 44,
              padding: "0 12px",
              display: "flex",
              alignItems: "center",
              gap: 8,
              backgroundColor: "#FFFFFF",
              borderBottom: "1px solid #E4E4E7",
            }}
          >
            <Search size={16} color="#71717A" strokeWidth={2} style={{ opacity: 0.5, flexShrink: 0 }} />
            <input
              className="pl-vehicle-select__search-input"
              type="search"
              placeholder="Buscar categoría..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              style={{
                flex: 1,
                minWidth: 0,
                height: 32,
                border: "none",
                background: "transparent",
                fontFamily: FONT,
                fontSize: 14,
                fontWeight: 400,
                color: "#71717A",
              }}
            />
          </div>

          <div style={{ padding: "4px 8px" }}>
            {filtered.map((opt) => (
              <VehicleSelectOption
                key={opt.id}
                option={opt}
                selected={selected.includes(opt.id)}
                onClick={() => onPick(opt.id)}
              />
            ))}
            {filtered.length === 0 && (
              <p
                style={{
                  fontFamily: FONT,
                  fontSize: 13,
                  color: "#A1A1B9",
                  margin: "12px 8px",
                }}
              >
                Sin resultados
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export { VEHICLE_OPTIONS, getVehicleById } from "./vehicleTypes";
export type { VehicleOption, VehicleTypeId } from "./vehicleTypes";
export { VehicleSelectOption } from "./VehicleSelectOption";
export { VehicleIllustration, GenericTruckIllustration } from "./VehicleIllustration";
