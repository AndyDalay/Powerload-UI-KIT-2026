// ─── Input/Select — general-purpose dropdown (48px trigger, outline icons) ──

import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import type { CSSProperties, ReactNode } from "react";
import { ChevronDown, Check } from "lucide-react";
import { TagCategory } from "../TagCategory";
import { CheckboxStep } from "../CheckboxStep";
import "./input-select.css";

const FONT = "'Poppins', sans-serif";
const BRAND = "#C22339";
const DANGER = "#E22824";

export interface SelectOption {
  id: string;
  label: string;
  /** Optional 16px outline icon (left of label in list rows) */
  icon?: ReactNode;
  disabled?: boolean;
}

export interface InputSelectProps {
  variant?: "single-select" | "multi-select";
  options: readonly SelectOption[];
  /** Single: option id · Multi: option ids */
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  label?: string;
  showLabel?: boolean;
  placeholder?: string;
  showPrefixIcon?: boolean;
  prefixIcon?: ReactNode;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  showError?: boolean;
  /**
   * Multi-select: when `selected.length` exceeds this, trigger shows the first tag
   * only plus "+(N−1) más" (e.g. 4 selections → 1 tag + "+3 más").
   */
  maxTagsBeforeOverflow?: number;
  /** Opens the panel on mount (documentation). */
  initialOpen?: boolean;
  className?: string;
  style?: CSSProperties;
}

function isMulti(variant: string): boolean {
  return variant === "multi-select";
}

function useControllableSingle(
  valueProp: string | undefined,
  defaultValue: string | undefined,
  onChange: InputSelectProps["onChange"]
): [string | undefined, (v: string | undefined) => void] {
  const [inner, setInner] = useState<string | undefined>(defaultValue);
  const controlled = valueProp !== undefined;
  const v = controlled ? valueProp : inner;
  const set = useCallback(
    (next: string | undefined) => {
      if (!controlled) setInner(next);
      onChange?.(next ?? "");
    },
    [controlled, onChange]
  );
  return [v, set];
}

function useControllableMulti(
  valueProp: string[] | undefined,
  defaultValue: string[] | undefined,
  onChange: InputSelectProps["onChange"]
): [string[], (v: string[]) => void] {
  const [inner, setInner] = useState<string[]>(defaultValue ?? []);
  const controlled = valueProp !== undefined;
  const v = controlled ? (valueProp as string[]) : inner;
  const set = useCallback(
    (next: string[]) => {
      if (!controlled) setInner(next);
      onChange?.(next);
    },
    [controlled, onChange]
  );
  return [v, set];
}

function tintIcon(node: ReactNode, size: number): ReactNode {
  if (!isValidElement(node)) return node;
  const p = node.props as { strokeWidth?: number; style?: CSSProperties };
  return cloneElement(node, {
    size,
    color: "#A1A1B9",
    strokeWidth: p.strokeWidth ?? 2,
    style: { ...p.style, flexShrink: 0 },
  } as Record<string, unknown>);
}

function SelectOptionSingle({
  option,
  selected,
  onPick,
}: {
  option: SelectOption;
  selected: boolean;
  onPick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const dis = !!option.disabled;

  let bg = "transparent";
  let fg = "#55556C";
  let fw: 400 | 500 = 400;
  if (selected) {
    bg = "#FBE1E1";
    fg = BRAND;
    fw = 500;
  } else if (hovered && !dis) {
    bg = "#F9F9FC";
    fg = "#2A2A38";
  }

  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      disabled={dis}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onPick}
      style={{
        width: "100%",
        height: 40,
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        border: "none",
        backgroundColor: bg,
        cursor: dis ? "not-allowed" : "pointer",
        textAlign: "left",
        boxSizing: "border-box",
      }}
    >
      <span style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0, flex: 1 }}>
        {option.icon && (
          <span style={{ display: "flex", flexShrink: 0 }}>{tintIcon(option.icon, 16)}</span>
        )}
        <span
          style={{
            fontFamily: FONT,
            fontSize: 14,
            fontWeight: fw,
            color: dis ? "#BDBDD1" : fg,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {option.label}
        </span>
      </span>
      {selected && !dis && <Check size={14} color={BRAND} strokeWidth={2.5} style={{ flexShrink: 0 }} />}
      {(!selected || dis) && <span style={{ width: 14, flexShrink: 0 }} aria-hidden />}
    </button>
  );
}

function SelectOptionMulti({
  option,
  selected,
  onToggle,
}: {
  option: SelectOption;
  selected: boolean;
  onToggle: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const dis = !!option.disabled;

  let bg = "transparent";
  let fg = "#55556C";
  let fw: 400 | 500 = 400;
  if (selected) {
    bg = "#FBE1E1";
    fg = BRAND;
    fw = 500;
  } else if (hovered && !dis) {
    bg = "#F9F9FC";
  }

  return (
    <div
      role="option"
      aria-selected={selected}
      tabIndex={-1}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => !dis && onToggle()}
      style={{
        width: "100%",
        height: 40,
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
        backgroundColor: bg,
        cursor: dis ? "not-allowed" : "pointer",
        boxSizing: "border-box",
        outline: "none",
      }}
    >
      <span
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 16,
          height: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          transform: "scale(0.8)",
          transformOrigin: "center center",
        }}
      >
        <CheckboxStep
          shape="square"
          size="sm"
          checked={selected}
          disabled={dis}
          onChange={() => {
            if (!dis) onToggle();
          }}
        />
      </span>
      <span
        style={{
          flex: 1,
          minWidth: 0,
          fontFamily: FONT,
          fontSize: 14,
          fontWeight: fw,
          color: dis ? "#BDBDD1" : fg,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {option.label}
      </span>
    </div>
  );
}

export function InputSelect({
  variant = "single-select",
  options,
  value,
  defaultValue,
  onChange,
  label = "Campo",
  showLabel = true,
  placeholder = "Seleccionar…",
  showPrefixIcon = false,
  prefixIcon,
  disabled = false,
  error = false,
  errorMessage = "Campo requerido",
  showError = true,
  maxTagsBeforeOverflow = 999,
  initialOpen = false,
  className,
  style,
}: InputSelectProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerId = useId();
  const [open, setOpen] = useState(initialOpen);
  const [hoverTrigger, setHoverTrigger] = useState(false);
  const [focusTrigger, setFocusTrigger] = useState(false);

  const multi = isMulti(variant);

  const [singleVal, setSingleVal] = useControllableSingle(
    multi ? undefined : (value as string | undefined),
    multi ? undefined : (defaultValue as string | undefined),
    multi ? undefined : onChange
  );

  const [multiVal, setMultiVal] = useControllableMulti(
    multi ? (value as string[] | undefined) : undefined,
    multi ? (defaultValue as string[] | undefined) : undefined,
    multi ? onChange : undefined
  );

  const selectedSingle = multi ? undefined : singleVal;
  const selectedMulti = multi ? multiVal : [];

  const selectedLabel = useMemo(() => {
    if (multi) return "";
    const o = options.find((x) => x.id === selectedSingle);
    return o?.label ?? "";
  }, [multi, options, selectedSingle]);

  const showPlaceholder = multi ? selectedMulti.length === 0 : !selectedSingle;

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  const toggleOpen = () => {
    if (disabled) return;
    setOpen((o) => !o);
  };

  const pickSingle = (id: string) => {
    const o = options.find((x) => x.id === id);
    if (o?.disabled) return;
    setSingleVal(id);
    setOpen(false);
  };

  const toggleMulti = (id: string) => {
    const o = options.find((x) => x.id === id);
    if (o?.disabled) return;
    const set = new Set(selectedMulti);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    setMultiVal([...set]);
  };

  const borderFocused = (focusTrigger || open) && !disabled && !error;
  const borderError = error && showError && !disabled;

  let border = "1px solid #D2D2E1";
  let boxShadow: string | undefined;
  if (disabled) border = "1px solid #ECECF4";
  else if (borderError) border = `2px solid ${DANGER}`;
  else if (borderFocused) {
    border = `2px solid ${BRAND}`;
    boxShadow = "0 0 0 3px rgba(194,35,57,0.12)";
  } else if (hoverTrigger && !open) border = "1px solid #BDBDD1";

  const triggerBg = disabled ? "#F3F3F9" : "#FFFFFF";
  const chevronColor = disabled ? "#D2D2E1" : "#A1A1B9";
  const textMain = disabled ? "#BDBDD1" : showPlaceholder ? "#BDBDD1" : "#2A2A38";

  const collapseTags =
    multi &&
    maxTagsBeforeOverflow < 999 &&
    selectedMulti.length > maxTagsBeforeOverflow;

  const visibleTagIds = collapseTags ? selectedMulti.slice(0, 1) : selectedMulti;

  const overflowCount = collapseTags ? selectedMulti.length - 1 : 0;

  return (
    <div ref={rootRef} className={className} style={{ width: "100%", position: "relative", ...style }}>
      {showLabel && (
        <label
          htmlFor={triggerId}
          style={{
            display: "block",
            fontFamily: FONT,
            fontSize: 13,
            fontWeight: 500,
            color: "#55556C",
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
        onMouseEnter={() => setHoverTrigger(true)}
        onMouseLeave={() => setHoverTrigger(false)}
        onFocus={() => setFocusTrigger(true)}
        onBlur={() => setFocusTrigger(false)}
        style={{
          width: "100%",
          height: 48,
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          backgroundColor: triggerBg,
          border,
          borderRadius: 10,
          boxShadow,
          boxSizing: "border-box",
          cursor: disabled ? "not-allowed" : "pointer",
          textAlign: "left",
          outline: "none",
        }}
      >
        {showPrefixIcon && prefixIcon && (
          <span style={{ display: "flex", flexShrink: 0, opacity: disabled ? 0.5 : 1 }}>
            {tintIcon(prefixIcon, 18)}
          </span>
        )}

        <span
          style={{
            flex: 1,
            minWidth: 0,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 4,
            overflow: "hidden",
          }}
        >
          {multi && !showPlaceholder ? (
            <>
              {visibleTagIds.map((id) => {
                const o = options.find((x) => x.id === id);
                if (!o) return null;
                return (
                  <TagCategory key={id} label={o.label} variant="selected" />
                );
              })}
              {overflowCount > 0 && (
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 12,
                    fontWeight: 500,
                    color: "#55556C",
                    backgroundColor: "#F3F3F9",
                    borderRadius: 4,
                    padding: "2px 6px",
                    lineHeight: 1.2,
                    flexShrink: 0,
                  }}
                >
                  +{overflowCount} más
                </span>
              )}
            </>
          ) : (
            <span
              style={{
                fontFamily: FONT,
                fontSize: 14,
                fontWeight: 400,
                color: textMain,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "100%",
                textAlign: "left",
              }}
            >
              {showPlaceholder ? placeholder : selectedLabel}
            </span>
          )}
        </span>

        <ChevronDown
          size={18}
          color={chevronColor}
          strokeWidth={2}
          style={{
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : undefined,
            transition: "transform 160ms ease",
          }}
        />
      </button>

      {borderError && showError && errorMessage && (
        <p
          style={{
            fontFamily: FONT,
            fontSize: 12,
            fontWeight: 400,
            color: DANGER,
            margin: "6px 0 0",
          }}
        >
          {errorMessage}
        </p>
      )}

      {open && !disabled && (
        <div
          role="listbox"
          aria-multiselectable={multi}
          className="pl-input-select__panel-scroll"
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            marginTop: 4,
            zIndex: 50,
            maxHeight: 240,
            overflowY: "auto",
            backgroundColor: "#FFFFFF",
            border: "1px solid #ECECF4",
            borderRadius: 10,
            boxShadow: "0 4px 16px -6px rgba(0,0,0,0.12)",
          }}
        >
          {options.map((opt) =>
            multi ? (
              <SelectOptionMulti
                key={opt.id}
                option={opt}
                selected={selectedMulti.includes(opt.id)}
                onToggle={() => toggleMulti(opt.id)}
              />
            ) : (
              <SelectOptionSingle
                key={opt.id}
                option={opt}
                selected={selectedSingle === opt.id}
                onPick={() => pickSingle(opt.id)}
              />
            )
          )}
        </div>
      )}
    </div>
  );
}
