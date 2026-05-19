// ─── Guideline — Input/Select (single + multi, Lucide icons) ────────────────

import { useState, type ReactNode } from "react";
import {
  Building2,
  ChevronDown,
  Factory,
  Flag,
  MapPin,
  MapPinned,
  Truck,
  Warehouse,
} from "lucide-react";
import { InputSelect, type SelectOption } from "./inputSelect/InputSelect";

const FONT = "'Poppins', sans-serif";

const COUNTRIES: SelectOption[] = [
  { id: "es", label: "España", icon: <Flag strokeWidth={2} /> },
  { id: "fr", label: "Francia", icon: <Flag strokeWidth={2} /> },
  { id: "de", label: "Alemania", icon: <Flag strokeWidth={2} /> },
  { id: "it", label: "Italia", icon: <Flag strokeWidth={2} /> },
  { id: "pt", label: "Portugal", icon: <Flag strokeWidth={2} /> },
];

const COMPANY_TYPES: SelectOption[] = [
  { id: "carrier", label: "Transportista", icon: <Truck strokeWidth={2} /> },
  { id: "shipper", label: "Cargador", icon: <Factory strokeWidth={2} /> },
  { id: "both", label: "Ambos", icon: <Building2 strokeWidth={2} /> },
  { id: "warehouse", label: "Almacén", icon: <Warehouse strokeWidth={2} /> },
];

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
          maxWidth: 280,
        }}
      >
        {tag}
      </span>
    </div>
  );
}

function TriggerSnapshot({
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
        height: 48,
        padding: "0 16px",
        display: "flex",
        alignItems: "center",
        gap: 8,
        backgroundColor,
        border,
        borderRadius: 10,
        boxSizing: "border-box",
        boxShadow,
        cursor,
      }}
    >
      {children}
    </div>
  );
}

function OpenMultiDemo({ options }: { options: readonly SelectOption[] }) {
  const [v, setV] = useState<string[]>(["carrier", "shipper"]);
  return (
    <InputSelect
      variant="multi-select"
      options={options}
      label="Tipo de empresa"
      value={v}
      onChange={(ids) => setV(ids as string[])}
      initialOpen
    />
  );
}

export function SelectGuide() {
  const [singleLive, setSingleLive] = useState<string | undefined>(undefined);
  const [multiLive, setMultiLive] = useState<string[]>(["carrier", "shipper"]);

  return (
    <div>
      <Section label="Interactivo — single (país)">
        <div style={{ maxWidth: 380 }}>
          <InputSelect
            variant="single-select"
            options={COUNTRIES}
            label="País"
            placeholder="Selecciona país"
            value={singleLive}
            onChange={(val) => setSingleLive(Array.isArray(val) ? val[0] : val || undefined)}
            showPrefixIcon
            prefixIcon={<MapPin />}
          />
        </div>
      </Section>

      <Section label="Interactivo — multi (tipo de empresa)">
        <div style={{ maxWidth: 380 }}>
          <InputSelect
            variant="multi-select"
            options={COMPANY_TYPES}
            label="Tipo de empresa"
            placeholder="Seleccionar…"
            value={multiLive}
            onChange={(val) => setMultiLive(val as string[])}
          />
        </div>
      </Section>

      <Section label="Single — default-empty (sin prefijo)">
        <Cell tag="variant single-select">
          <div style={{ maxWidth: 360 }}>
            <InputSelect variant="single-select" options={COUNTRIES} label="País" placeholder="Seleccionar país" />
          </div>
        </Cell>
      </Section>

      <Section label="Single — default-empty (con MapPin 18px)">
        <Cell tag="showPrefixIcon">
          <div style={{ maxWidth: 360 }}>
            <InputSelect
              variant="single-select"
              options={COUNTRIES}
              label="Ciudad"
              placeholder="Buscar ciudad"
              showPrefixIcon
              prefixIcon={<MapPinned />}
            />
          </div>
        </Cell>
      </Section>

      <Section label="Single — filled (España)">
        <Cell tag="value = es">
          <div style={{ maxWidth: 360 }}>
            <InputSelect
              variant="single-select"
              options={COUNTRIES}
              label="País"
              value="es"
              onChange={() => {}}
            />
          </div>
        </Cell>
      </Section>

      <Section label="Single — hover / focused (snapshots estáticos)">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "flex-start" }}>
          <Cell tag="hover · borde #BDBDD1">
            <TriggerSnapshot border="1px solid #BDBDD1">
              <span style={{ flex: 1, fontFamily: FONT, fontSize: 14, color: "#BDBDD1" }}>Seleccionar país</span>
              <ChevronDown size={18} color="#A1A1B9" strokeWidth={2} />
            </TriggerSnapshot>
          </Cell>
          <Cell tag="focused · #C22339 + glow">
            <TriggerSnapshot border="2px solid #C22339" boxShadow="0 0 0 3px rgba(194,35,57,0.12)">
              <span style={{ flex: 1, fontFamily: FONT, fontSize: 14, color: "#BDBDD1" }}>Seleccionar país</span>
              <ChevronDown size={18} color="#A1A1B9" strokeWidth={2} />
            </TriggerSnapshot>
          </Cell>
        </div>
      </Section>

      <Section label="Single — open (5 opciones · España seleccionada)">
        <Cell tag="initialOpen">
          <div style={{ maxWidth: 360 }}>
            <InputSelect
              key="open-countries"
              variant="single-select"
              options={COUNTRIES}
              label="País"
              value="es"
              onChange={() => {}}
              initialOpen
            />
          </div>
        </Cell>
      </Section>

      <Section label="Single — disabled / error">
        <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", alignItems: "flex-start" }}>
          <Cell tag="disabled">
            <div style={{ maxWidth: 360 }}>
              <InputSelect
                variant="single-select"
                options={COUNTRIES}
                label="Estado"
                placeholder="No disponible"
                disabled
              />
            </div>
          </Cell>
          <Cell tag="error + mensaje">
            <div style={{ maxWidth: 360 }}>
              <InputSelect
                variant="single-select"
                options={COUNTRIES}
                label="País"
                placeholder="Seleccionar país"
                error
                errorMessage="Campo requerido"
                showError
                value=""
                onChange={() => {}}
              />
            </div>
          </Cell>
        </div>
      </Section>

      <Section label="Multi — default-empty">
        <Cell tag="placeholder">
          <div style={{ maxWidth: 360 }}>
            <InputSelect variant="multi-select" options={COMPANY_TYPES} label="Tipo de empresa" />
          </div>
        </Cell>
      </Section>

      <Section label="Multi — open (checkboxes · 2 marcados)">
        <Cell tag="initialOpen · interactivo">
          <div style={{ maxWidth: 360 }}>
            <OpenMultiDemo options={COMPANY_TYPES} />
          </div>
        </Cell>
      </Section>

      <Section label="Multi — filled (2 chips)">
        <Cell tag="TagCategory selected">
          <div style={{ maxWidth: 360 }}>
            <InputSelect
              variant="multi-select"
              options={COMPANY_TYPES}
              label="Tipo de empresa"
              value={["carrier", "shipper"]}
              onChange={() => {}}
            />
          </div>
        </Cell>
      </Section>

      <Section label="Multi — overflow (1 chip + “+3 más”)">
        <Cell tag="maxTagsBeforeOverflow={2} · 4 seleccionados">
          <div style={{ maxWidth: 360 }}>
            <InputSelect
              variant="multi-select"
              options={COMPANY_TYPES}
              label="Tipo de empresa"
              value={["carrier", "shipper", "both", "warehouse"]}
              onChange={() => {}}
              maxTagsBeforeOverflow={2}
            />
          </div>
        </Cell>
      </Section>
    </div>
  );
}
