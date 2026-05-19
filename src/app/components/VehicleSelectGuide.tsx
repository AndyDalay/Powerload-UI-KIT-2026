// ─── Guideline / showcase — Input/VehicleSelect + Vehicle/SVG ────────────────

import { useMemo, useState, type ReactNode } from "react";
import {
  VehicleSelect,
  VEHICLE_OPTIONS,
  VehicleSelectOption,
  VehicleIllustration,
  GenericTruckIllustration,
  type VehicleTypeId,
  type VehicleOption,
} from "./vehicleSelect/VehicleSelect";
import { ChevronDown } from "lucide-react";

const FONT = "'Poppins', sans-serif";

const SIX: VehicleTypeId[] = [
  "trailer-curtain-side",
  "trailer-dry-van",
  "trailer-flatbed",
  "trailer-refrigerated-reefer",
  "truck-rigid-body",
  "van-delivery",
];

const THREE_MULTI: VehicleTypeId[] = [
  "trailer-curtain-side",
  "trailer-dry-van",
  "truck-tanker",
];

function OpenMultiThreeDemo({ options }: { options: readonly VehicleOption[] }) {
  const [v, setV] = useState<VehicleTypeId[]>(["trailer-curtain-side", "trailer-dry-van"]);
  return (
    <VehicleSelect
      mode="multi"
      options={options}
      initialOpen
      showLabel
      value={v}
      onChange={setV}
    />
  );
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <p
        style={{
          fontFamily: FONT,
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: "1.3px",
          color: "#A1A1B9",
          textTransform: "uppercase",
          margin: "0 0 14px 0",
        }}
      >
        {label}
      </p>
      {children}
    </div>
  );
}

function Cell({ children, tag }: { children: ReactNode; tag: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 7 }}>
      {children}
      <span
        style={{
          fontFamily: FONT,
          fontSize: 10,
          color: "#A1A1B9",
          letterSpacing: "0.2px",
          maxWidth: 220,
        }}
      >
        {tag}
      </span>
    </div>
  );
}

/** Static trigger row matching Input/VehicleSelect tokens (for hover / focus / disabled frames). */
function TriggerFrame({
  border,
  boxShadow,
  backgroundColor = "#FFFFFF",
  cursor = "default",
  children,
}: {
  border: string;
  boxShadow?: string;
  backgroundColor?: string;
  cursor?: string;
  children: ReactNode;
}) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 360,
        height: 40,
        padding: "0 16px 0 8px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        overflow: "hidden",
        backgroundColor,
        border,
        borderRadius: 12,
        boxSizing: "border-box",
        boxShadow,
        cursor,
      }}
    >
      {children}
    </div>
  );
}

export function VehicleSelectGuide() {
  const [singleVal, setSingleVal] = useState<VehicleTypeId[]>([]);
  const [multiVal, setMultiVal] = useState<VehicleTypeId[]>([
    "trailer-curtain-side",
    "trailer-double-deck",
    "truck-head-standard",
  ]);

  const sixOptions = useMemo(() => VEHICLE_OPTIONS.filter((o) => SIX.includes(o.id)), []);
  const threeOptions = useMemo(() => VEHICLE_OPTIONS.filter((o) => THREE_MULTI.includes(o.id)), []);

  const lona = VEHICLE_OPTIONS.find((o) => o.id === "trailer-curtain-side")!;

  return (
    <div>
      <Section label="Interactivo — modo single (lista completa)">
        <div style={{ maxWidth: 400 }}>
          <VehicleSelect mode="single" value={singleVal} onChange={setSingleVal} showLabel />
        </div>
      </Section>

      <Section label="Interactivo — modo multi (valor inicial: 3 ítems + badge)">
        <div style={{ maxWidth: 400 }}>
          <VehicleSelect mode="multi" value={multiVal} onChange={setMultiVal} showLabel />
        </div>
      </Section>

      <Section label="Documentación — default + single (placeholder + GenericTruck 18px)">
        <Cell tag="mode single · sin selección">
          <div style={{ maxWidth: 360 }}>
            <VehicleSelect mode="single" showLabel />
          </div>
        </Cell>
      </Section>

      <Section label="Documentación — open + single (6 opciones, panel abierto al montar)">
        <Cell tag="initialOpen · options acotadas a 6 tipos">
          <div style={{ maxWidth: 360 }}>
            <VehicleSelect key="open-six" mode="single" options={sixOptions} initialOpen showLabel />
          </div>
        </Cell>
      </Section>

      <Section label="Documentación — filled-single (Remolque de lona)">
        <Cell tag="value = trailer-curtain-side">
          <div style={{ maxWidth: 360 }}>
            <VehicleSelect
              mode="single"
              showLabel
              value={["trailer-curtain-side"]}
              onChange={() => {}}
            />
          </div>
        </Cell>
      </Section>

      <Section label="Documentación — filled-multi + badge (3)">
        <Cell tag="mode multi · tres IDs · contador">
          <div style={{ maxWidth: 360 }}>
            <VehicleSelect
              mode="multi"
              showLabel
              value={["trailer-curtain-side", "trailer-double-deck", "truck-head-standard"]}
              onChange={() => {}}
            />
          </div>
        </Cell>
      </Section>

      <Section label="Documentación — open + multi (3 filas · 2 seleccionadas)">
        <Cell tag="initialOpen · subset 3 · dos checks rojos">
          <div style={{ maxWidth: 360 }}>
            <OpenMultiThreeDemo options={threeOptions} />
          </div>
        </Cell>
      </Section>

      <Section label="Documentación — estados de trigger (cerrado)">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "flex-start" }}>
          <Cell tag="hover · borde #BDBDD1">
            <TriggerFrame border="1px solid #BDBDD1">
              <GenericTruckIllustration color="#A1A1B9" />
              <span
                style={{
                  flex: 1,
                  minWidth: 0,
                  fontFamily: FONT,
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#A1A1B9",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Selecciona un tipo
              </span>
              <ChevronDown size={16} color="#A1A1B9" strokeWidth={2} style={{ flexShrink: 0 }} />
            </TriggerFrame>
          </Cell>

          <Cell tag="focus · borde 2px #C22339 + glow">
            <TriggerFrame border="2px solid #C22339" boxShadow="0 0 0 3px rgba(194,35,57,0.12)">
              <GenericTruckIllustration color="#A1A1B9" />
              <span
                style={{
                  flex: 1,
                  minWidth: 0,
                  fontFamily: FONT,
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#A1A1B9",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Selecciona un tipo
              </span>
              <ChevronDown size={16} color="#A1A1B9" strokeWidth={2} style={{ flexShrink: 0 }} />
            </TriggerFrame>
          </Cell>

          <Cell tag="disabled">
            <TriggerFrame
              border="1px solid #ECECF4"
              backgroundColor="#F3F3F9"
              cursor="not-allowed"
            >
              <span style={{ opacity: 0.4 }}>
                <GenericTruckIllustration color="#BDBDD1" />
              </span>
              <span
                style={{
                  flex: 1,
                  minWidth: 0,
                  fontFamily: FONT,
                  fontSize: 14,
                  fontWeight: 400,
                  color: "#BDBDD1",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                Selecciona un tipo
              </span>
              <ChevronDown
                size={16}
                color="#BDBDD1"
                strokeWidth={2}
                style={{ flexShrink: 0, opacity: 0.4 }}
              />
            </TriggerFrame>
          </Cell>
        </div>
      </Section>

      <Section label="VehicleSelectOption — fila aislada (Lona · seleccionado)">
        <div style={{ maxWidth: 400, border: "1px solid #D2D2E1", borderRadius: 12, padding: "4px 8px" }}>
          <VehicleSelectOption option={lona} selected onClick={() => {}} />
        </div>
      </Section>

      <Section label="Vehicle/SVG — mosaico de siluetas (~53×24)">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "12px 16px",
            alignItems: "center",
          }}
        >
          {VEHICLE_OPTIONS.map((v) => (
            <div
              key={v.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 10px",
                borderRadius: 8,
                border: "1px solid #ECECF4",
                backgroundColor: "#FAFAFC",
              }}
            >
              <VehicleIllustration src={v.src} alt="" variant="option" />
              <span
                style={{
                  fontFamily: FONT,
                  fontSize: 11,
                  color: "#55556C",
                  lineHeight: 1.35,
                }}
              >
                {v.label}
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section label="Select deshabilitado (componente real)">
        <div style={{ maxWidth: 360 }}>
          <VehicleSelect mode="single" disabled showLabel />
        </div>
      </Section>
    </div>
  );
}
