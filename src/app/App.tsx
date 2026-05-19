import { useState, ReactNode } from "react";
import { AvatarUser, AvatarSize } from "./components/AvatarUser";
import { Divider as DividerLine, DividerVariant } from "./components/Divider";
import { PowerloadButton, ButtonSize } from "./components/PowerloadButton";
import { Tooltip } from "./components/Tooltip";
import { TagStatus, TagVariant } from "./components/TagStatus";
import { TagCategory, TagCategoryVariant } from "./components/TagCategory";
import { BadgeCount } from "./components/BadgeCount";
import { PowerloadIconLibrary } from "./components/PowerloadIconLibrary";
import { CheckboxStep } from "./components/CheckboxStep";
import { VehicleSelectGuide } from "./components/VehicleSelectGuide";
import { SelectGuide } from "./components/SelectGuide";
import { SidebarGuide } from "./components/sidebar";
import { Plus, Zap, Search, Settings, ArrowRight, ChevronRight, Bell, CheckCircle, AlertTriangle, XCircle, Info, Circle, Star, Truck, Clock, Package, Zap as ZapIcon, Layers, Tag, Map, BarChart2, FileText, Repeat, ShieldCheck, Flame, Globe } from "lucide-react";

// ─── Design tokens (mirrored for App use) ────────────────────────────────────

const RED      = "#C22339";
const WHITE    = "#FFFFFF";
const N800     = "#55556C";   // neutral-800 — non-accent text/icon
const N400     = "#D2D2E1";   // neutral-400 — non-accent border
const DISABLED = "#BDBDD1";

// ─── Sizes list ──────────────────────────────────────────────────────────────

const SIZES: ButtonSize[] = ["xs", "s", "m", "l"];
const SIZE_LABEL: Record<ButtonSize, string> = {
  xs: "XS · 36px", s: "S · 40px", m: "M · 48px", l: "L · 56px",
};
const ICON_PX: Record<ButtonSize, number> = { xs: 14, s: 15, m: 17, l: 19 };

// ─── Layout helpers ──────────────────────────────────────────────────────────

function Card({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      backgroundColor: "#FFFFFF",
      border: "1px solid #ECECF4",
      borderRadius: "20px",
      padding: "36px",
      boxShadow: "0 4px 16px -6px rgba(0,0,0,0.08)",
      ...style,
    }}>
      {children}
    </div>
  );
}

function CardHeader({ badge, badgeFg, badgeBg = "#FBE1E1", title, desc }: {
  badge: string; badgeFg: string; badgeBg?: string; title: string; desc: string;
}) {
  return (
    <div style={{ marginBottom: "28px" }}>
      <span style={{
        display: "inline-block",
        backgroundColor: badgeBg,
        color: badgeFg,
        fontFamily: "'Poppins', sans-serif",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "1px",
        textTransform: "uppercase",
        padding: "3px 10px",
        borderRadius: "4px",
        marginBottom: "10px",
      }}>{badge}</span>
      <h2 style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: "20px",
        fontWeight: 600,
        color: "#2A2A38",
        margin: "0 0 6px",
      }}>{title}</h2>
      <p style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: "13px",
        color: "#7E7E97",
        margin: 0,
        lineHeight: 1.5,
      }}>{desc}</p>
    </div>
  );
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: "32px" }}>
      <p style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: "10px",
        fontWeight: 600,
        letterSpacing: "1.3px",
        color: "#A1A1B9",
        textTransform: "uppercase",
        margin: "0 0 14px 0",
      }}>{label}</p>
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: "1px", backgroundColor: "#ECECF4", margin: "28px 0" }} />;
}

function Row({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "16px", flexWrap: "wrap" }}>
      {children}
    </div>
  );
}

function Cell({ children, tag }: { children: ReactNode; tag: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "7px" }}>
      {children}
      <span style={{
        fontFamily: "'Poppins', sans-serif",
        fontSize: "10px",
        color: "#A1A1B9",
        letterSpacing: "0.2px",
      }}>{tag}</span>
    </div>
  );
}

// ─── Static state preview pill ───────────────────────────────────────────────

function StatePill({ label, color = "#A1A1B9" }: { label: string; color?: string }) {
  return (
    <span style={{
      display: "inline-block",
      fontFamily: "'Poppins', sans-serif",
      fontSize: "10px",
      fontWeight: 500,
      letterSpacing: "0.8px",
      color,
      textTransform: "uppercase",
      border: `1px solid ${color}`,
      borderRadius: "4px",
      padding: "2px 6px",
      marginBottom: "8px",
    }}>{label}</span>
  );
}

// ─── States section (reusable per variant) ────────────────────────────────────

function StatesGrid({
  variant,
  accent,
  glow,
  labelText,
  icon,
  iconAccent,
}: {
  variant: "primary" | "secondary" | "tertiary";
  accent?: boolean;
  glow?: boolean;
  labelText: string;
  icon: ReactNode;
  iconAccent?: ReactNode;
}) {
  const isPrimary = variant === "primary";

  const states: {
    label: string;
    color?: string;
    props: Partial<React.ComponentProps<typeof PowerloadButton>>;
  }[] = [
    {
      label: "Default",
      color: "#A1A1B9",
      props: {},
    },
    {
      label: "Hover →",
      color: "#7E7E97",
      props: {},  // interactive — user hovers to see
    },
    {
      label: "Loading",
      color: "#0174D9",
      props: { loading: true },
    },
    {
      label: "Disabled",
      color: DISABLED,
      props: { disabled: true },
    },
  ];

  return (
    <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", alignItems: "flex-start" }}>
      {states.map(({ label, color, props }) => {
        const isLoading  = !!props.loading;
        const isDisabled = !!props.disabled;
        const showIcon   = isLoading
          ? false
          : isDisabled
          ? false
          : true;

        const iconNode = isDisabled
          ? isPrimary
            ? <Plus size={17} color={DISABLED} strokeWidth={2.5} />
            : <Search size={17} color={DISABLED} strokeWidth={2} />
          : isPrimary
          ? icon
          : accent
          ? iconAccent ?? icon
          : icon;

        return (
          <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "6px" }}>
            <StatePill label={label} color={color} />
            <Tooltip content={`${variant} ${label.replace(" →", "")} — ${labelText}`}>
              <PowerloadButton
                size="m"
                variant={variant}
                accent={accent}
                glow={glow}
                label={labelText}
                icon={showIcon ? iconNode : undefined}
                {...props}
              />
            </Tooltip>
            {label === "Hover →" && (
              <span style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "10px",
                color: "#A1A1B9",
                fontStyle: "italic",
              }}>
                posa el cursor
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────��──────────────────

export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#F3F3F9",
      fontFamily: "'Poppins', sans-serif",
      padding: "48px 24px",
      display: "flex",
      justifyContent: "center",
    }}>
      <div style={{ maxWidth: "920px", width: "100%", display: "flex", flexDirection: "column", gap: "24px" }}>

        {/* ── Page header ─────────────────────────────────────── */}
        <div>
          <span style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "1.2px",
            color: RED,
            textTransform: "uppercase",
          }}>Powerload Design System</span>
          <h1 style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "26px",
            fontWeight: 600,
            color: "#2A2A38",
            lineHeight: 1.2,
            margin: "6px 0 6px",
          }}>Button System · Guideline</h1>
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "13px",
            color: "#7E7E97",
            margin: 0,
          }}>
            Primary · Secondary · Tertiary — todas las tallas, variantes, estados y versiones solo-ícono.<br />
            Posa el cursor +2 s sobre cualquier botón para ver el tooltip negro.
          </p>
        </div>

        {/* ══════════════════════════════════════════════════════
            PRIMARY
        ══════════════════════════════════════════════════════ */}
        <Card>
          <CardHeader
            badge="Primary"
            badgeFg={WHITE}
            badgeBg={RED}
            title="Primary Button"
            desc="Fondo rojo #C22339 · texto e ícono blancos (fill). Un único CTA primario por vista. Variante Glow proyecta sombra roja hacia abajo."
          />

          {/* Sizes */}
          <Section label="Tallas — Standard">
            <Row>
              {SIZES.map(sz => (
                <Cell key={sz} tag={SIZE_LABEL[sz]}>
                  <Tooltip content={`Primary ${sz.toUpperCase()} — Publicar Carga`}>
                    <PowerloadButton size={sz} label="Publicar Carga"
                      icon={<Plus size={ICON_PX[sz]} color={WHITE} strokeWidth={2.5} />} />
                  </Tooltip>
                </Cell>
              ))}
            </Row>
          </Section>

          <Section label="Tallas — Glow">
            <Row>
              {SIZES.map(sz => (
                <Cell key={sz} tag={SIZE_LABEL[sz]}>
                  <Tooltip content={`Primary Glow ${sz.toUpperCase()} — Publicar Carga`}>
                    <PowerloadButton size={sz} label="Publicar Carga" glow
                      icon={<Plus size={ICON_PX[sz]} color={WHITE} strokeWidth={2.5} />} />
                  </Tooltip>
                </Cell>
              ))}
            </Row>
          </Section>

          <Divider />

          {/* Icon-only */}
          <Section label="Solo ícono (cuadrado)">
            <Row>
              {SIZES.map(sz => (
                <Cell key={sz} tag={SIZE_LABEL[sz]}>
                  <Tooltip content={`Añadir — ${SIZE_LABEL[sz]}`}>
                    <PowerloadButton size={sz}
                      icon={<Plus size={ICON_PX[sz]} color={WHITE} strokeWidth={2.5} />} />
                  </Tooltip>
                </Cell>
              ))}
              {SIZES.map(sz => (
                <Cell key={`g-${sz}`} tag={`Glow ${sz.toUpperCase()}`}>
                  <Tooltip content={`Añadir glow — ${SIZE_LABEL[sz]}`}>
                    <PowerloadButton size={sz} glow
                      icon={<Zap size={ICON_PX[sz]} color={WHITE} strokeWidth={2.5} />} />
                  </Tooltip>
                </Cell>
              ))}
            </Row>
          </Section>

          <Divider />

          {/* States */}
          <Section label="Estados — hover · focus · pressed · loading · disabled">
            <StatesGrid
              variant="primary"
              glow
              labelText="Publicar Carga"
              icon={<Plus size={17} color={WHITE} strokeWidth={2.5} />}
            />
            <div style={{ marginTop: "12px" }}>
              <Row>
                <Cell tag="Loading icon-only">
                  <Tooltip content="Cargando…">
                    <PowerloadButton glow loading
                      icon={<Plus size={17} color={WHITE} strokeWidth={2.5} />} />
                  </Tooltip>
                </Cell>
                <Cell tag="Loading no icon">
                  <Tooltip content="Cargando…">
                    <PowerloadButton glow loading label="Publicando…" />
                  </Tooltip>
                </Cell>
              </Row>
            </div>
          </Section>
        </Card>

        {/* ══════════════════════════════════════════════════════
            SECONDARY
        ══════════════════════════════════════════════════════ */}
        <Card>
          <CardHeader
            badge="Secondary"
            badgeFg="#5E1922"
            badgeBg="#FBE1E1"
            title="Secondary Button"
            desc="Borde 1.5px · fondo transparente · dos modos: Neutral (borde neutral-400 #D2D2E1, texto neutral-800 #55556C) y Accent (borde + texto rojo #C22339)."
          />

          {/* Neutral */}
          <Section label="Neutral — borde gray neutral-400 · texto neutral-800">
            <Row>
              {SIZES.map(sz => (
                <Cell key={sz} tag={SIZE_LABEL[sz]}>
                  <Tooltip content={`Secondary Neutral ${sz.toUpperCase()}`}>
                    <PowerloadButton size={sz} variant="secondary" label="Buscar Carga"
                      icon={<Search size={ICON_PX[sz]} color={N800} strokeWidth={2} />} />
                  </Tooltip>
                </Cell>
              ))}
            </Row>
          </Section>

          {/* Accent */}
          <Section label="Accent — borde + texto rojo #C22339">
            <Row>
              {SIZES.map(sz => (
                <Cell key={sz} tag={SIZE_LABEL[sz]}>
                  <Tooltip content={`Secondary Accent ${sz.toUpperCase()}`}>
                    <PowerloadButton size={sz} variant="secondary" accent label="Buscar Carga"
                      icon={<Search size={ICON_PX[sz]} color={RED} strokeWidth={2} />} />
                  </Tooltip>
                </Cell>
              ))}
            </Row>
          </Section>

          <Divider />

          {/* Icon-only */}
          <Section label="Solo ícono (cuadrado)">
            <Row>
              {SIZES.map(sz => (
                <Cell key={sz} tag={`Neutral ${sz.toUpperCase()}`}>
                  <Tooltip content={`Configuración — ${SIZE_LABEL[sz]}`}>
                    <PowerloadButton size={sz} variant="secondary"
                      icon={<Settings size={ICON_PX[sz]} color={N800} strokeWidth={2} />} />
                  </Tooltip>
                </Cell>
              ))}
              {SIZES.map(sz => (
                <Cell key={`a-${sz}`} tag={`Accent ${sz.toUpperCase()}`}>
                  <Tooltip content={`Configuración accent — ${SIZE_LABEL[sz]}`}>
                    <PowerloadButton size={sz} variant="secondary" accent
                      icon={<Settings size={ICON_PX[sz]} color={RED} strokeWidth={2} />} />
                  </Tooltip>
                </Cell>
              ))}
            </Row>
          </Section>

          <Divider />

          {/* States — neutral */}
          <Section label="Estados Neutral — hover · focus · pressed · loading · disabled">
            <StatesGrid
              variant="secondary"
              labelText="Buscar Carga"
              icon={<Search size={17} color={N800} strokeWidth={2} />}
            />
            <div style={{ marginTop: "12px" }}>
              <Row>
                <Cell tag="Loading icon-only">
                  <Tooltip content="Cargando…">
                    <PowerloadButton variant="secondary" loading
                      icon={<Search size={17} color={N800} strokeWidth={2} />} />
                  </Tooltip>
                </Cell>
                <Cell tag="Loading no icon">
                  <Tooltip content="Cargando…">
                    <PowerloadButton variant="secondary" loading label="Buscando…" />
                  </Tooltip>
                </Cell>
              </Row>
            </div>
          </Section>

          {/* States — accent */}
          <Section label="Estados Accent — hover · focus · pressed · loading · disabled">
            <StatesGrid
              variant="secondary"
              accent
              labelText="Buscar Carga"
              icon={<Search size={17} color={RED} strokeWidth={2} />}
              iconAccent={<Search size={17} color={RED} strokeWidth={2} />}
            />
          </Section>
        </Card>

        {/* ══════════════════════════════════════════════════════
            TERTIARY
        ══════════════════════════════════════════════════════ */}
        <Card>
          <CardHeader
            badge="Tertiary"
            badgeFg="#55556C"
            badgeBg="#ECECF4"
            title="Tertiary Button"
            desc="Sin borde ni relleno · ghost hover · dos modos: Neutral (texto neutral-800 #55556C) y Accent (texto rojo #C22339)."
          />

          {/* Neutral */}
          <Section label="Neutral — texto neutral-800">
            <Row>
              {SIZES.map(sz => (
                <Cell key={sz} tag={SIZE_LABEL[sz]}>
                  <Tooltip content={`Tertiary Neutral ${sz.toUpperCase()}`}>
                    <PowerloadButton size={sz} variant="tertiary" label="Ver Detalles"
                      icon={<ArrowRight size={ICON_PX[sz]} color={N800} strokeWidth={2} />}
                      iconPosition="right" />
                  </Tooltip>
                </Cell>
              ))}
            </Row>
          </Section>

          {/* Accent */}
          <Section label="Accent — texto rojo #C22339">
            <Row>
              {SIZES.map(sz => (
                <Cell key={sz} tag={SIZE_LABEL[sz]}>
                  <Tooltip content={`Tertiary Accent ${sz.toUpperCase()}`}>
                    <PowerloadButton size={sz} variant="tertiary" accent label="Ver Detalles"
                      icon={<ChevronRight size={ICON_PX[sz]} color={RED} strokeWidth={2} />}
                      iconPosition="right" />
                  </Tooltip>
                </Cell>
              ))}
            </Row>
          </Section>

          <Divider />

          {/* Icon-only */}
          <Section label="Solo ícono (cuadrado)">
            <Row>
              {SIZES.map(sz => (
                <Cell key={sz} tag={`Neutral ${sz.toUpperCase()}`}>
                  <Tooltip content={`Notificaciones — ${SIZE_LABEL[sz]}`}>
                    <PowerloadButton size={sz} variant="tertiary"
                      icon={<Bell size={ICON_PX[sz]} color={N800} strokeWidth={2} />} />
                  </Tooltip>
                </Cell>
              ))}
              {SIZES.map(sz => (
                <Cell key={`a-${sz}`} tag={`Accent ${sz.toUpperCase()}`}>
                  <Tooltip content={`Notificaciones accent — ${SIZE_LABEL[sz]}`}>
                    <PowerloadButton size={sz} variant="tertiary" accent
                      icon={<Bell size={ICON_PX[sz]} color={RED} strokeWidth={2} />} />
                  </Tooltip>
                </Cell>
              ))}
            </Row>
          </Section>

          <Divider />

          {/* States — neutral */}
          <Section label="Estados Neutral — hover · focus · pressed · loading · disabled">
            <StatesGrid
              variant="tertiary"
              labelText="Ver Detalles"
              icon={<ArrowRight size={17} color={N800} strokeWidth={2} />}
            />
            <div style={{ marginTop: "12px" }}>
              <Row>
                <Cell tag="Loading icon-only">
                  <Tooltip content="Cargando…">
                    <PowerloadButton variant="tertiary" loading
                      icon={<ArrowRight size={17} color={N800} strokeWidth={2} />} />
                  </Tooltip>
                </Cell>
                <Cell tag="Loading no icon">
                  <Tooltip content="Cargando…">
                    <PowerloadButton variant="tertiary" loading label="Cargando…" />
                  </Tooltip>
                </Cell>
              </Row>
            </div>
          </Section>

          {/* States — accent */}
          <Section label="Estados Accent — hover · focus · pressed · loading · disabled">
            <StatesGrid
              variant="tertiary"
              accent
              labelText="Ver Detalles"
              icon={<ChevronRight size={17} color={RED} strokeWidth={2} />}
              iconAccent={<ChevronRight size={17} color={RED} strokeWidth={2} />}
            />
          </Section>
        </Card>

        {/* ══════════════════════════════════════════════════════
            TAG / STATUS
        ══════════════════════════════════════════════════════ */}
        <Card style={{ marginBottom: "48px" }}>
          <CardHeader
            badge="Tag / Status"
            badgeFg="#55556C"
            badgeBg="#ECECF4"
            title="Tag / Status"
            desc="6 variantes de color · height 22px · Poppins SemiBold 11px UPPERCASE · dot 6px · border-radius 4px · padding 3px 8px · gap 5px."
          />

          {/* All variants */}
          <Section label="Variantes — dot estándar · squared">
            <Row>
              {(
                [
                  { variant: "success", label: "Activo"      },
                  { variant: "warning", label: "Pendiente"   },
                  { variant: "danger",  label: "Rechazado"   },
                  { variant: "info",    label: "En tránsito" },
                  { variant: "neutral", label: "Borrador"    },
                  { variant: "primary", label: "Prioritario" },
                ] as { variant: TagVariant; label: string }[]
              ).map(({ variant, label }) => (
                <Cell key={variant} tag={variant}>
                  <TagStatus variant={variant} label={label} />
                </Cell>
              ))}
            </Row>
          </Section>

          <Divider />

          {/* Icon variants */}
          <Section label="Con ícono a la izquierda — squared">
            <Row>
              {(
                [
                  { variant: "success" as TagVariant, label: "Activo",       icon: <CheckCircle   size={11} strokeWidth={2.5} /> },
                  { variant: "warning" as TagVariant, label: "Pendiente",    icon: <Clock         size={11} strokeWidth={2.5} /> },
                  { variant: "danger"  as TagVariant, label: "Rechazado",    icon: <XCircle       size={11} strokeWidth={2.5} /> },
                  { variant: "info"    as TagVariant, label: "En tránsito",  icon: <Truck         size={11} strokeWidth={2.5} /> },
                  { variant: "neutral" as TagVariant, label: "Borrador",     icon: <Circle        size={11} strokeWidth={2.5} /> },
                  { variant: "primary" as TagVariant, label: "Prioritario",  icon: <Star          size={11} strokeWidth={2.5} /> },
                ]
              ).map(({ variant, label, icon }) => (
                <Cell key={variant} tag={variant}>
                  <TagStatus variant={variant} label={label} icon={icon} />
                </Cell>
              ))}
            </Row>
          </Section>

          <Divider />

          {/* Rounded / pill variants — dot */}
          <Section label="Pill (rounded) — dot estándar">
            <Row>
              {(
                [
                  { variant: "success", label: "Activo"      },
                  { variant: "warning", label: "Pendiente"   },
                  { variant: "danger",  label: "Rechazado"   },
                  { variant: "info",    label: "En tránsito" },
                  { variant: "neutral", label: "Borrador"    },
                  { variant: "primary", label: "Prioritario" },
                ] as { variant: TagVariant; label: string }[]
              ).map(({ variant, label }) => (
                <Cell key={variant} tag={variant}>
                  <TagStatus variant={variant} label={label} rounded />
                </Cell>
              ))}
            </Row>
          </Section>

          <Divider />

          {/* Rounded / pill variants — icon */}
          <Section label="Pill (rounded) — con ícono a la izquierda">
            <Row>
              {(
                [
                  { variant: "success" as TagVariant, label: "Activo",       icon: <CheckCircle   size={11} strokeWidth={2.5} /> },
                  { variant: "warning" as TagVariant, label: "Pendiente",    icon: <Clock         size={11} strokeWidth={2.5} /> },
                  { variant: "danger"  as TagVariant, label: "Rechazado",    icon: <XCircle       size={11} strokeWidth={2.5} /> },
                  { variant: "info"    as TagVariant, label: "En tránsito",  icon: <Truck         size={11} strokeWidth={2.5} /> },
                  { variant: "neutral" as TagVariant, label: "Borrador",     icon: <Circle        size={11} strokeWidth={2.5} /> },
                  { variant: "primary" as TagVariant, label: "Prioritario",  icon: <Star          size={11} strokeWidth={2.5} /> },
                ]
              ).map(({ variant, label, icon }) => (
                <Cell key={variant} tag={variant}>
                  <TagStatus variant={variant} label={label} icon={icon} rounded />
                </Cell>
              ))}
            </Row>
          </Section>

          <Divider />

          {/* Label variations per variant */}
          <Section label="Etiquetas de ejemplo — mismo dot color por variante">
            {(
              [
                {
                  variant: "success" as TagVariant,
                  labels: ["Activo", "Completado", "Entregado", "Verificado"],
                },
                {
                  variant: "warning" as TagVariant,
                  labels: ["Pendiente", "En revisión", "Demorado", "Por confirmar"],
                },
                {
                  variant: "danger" as TagVariant,
                  labels: ["Rechazado", "Cancelado", "Error", "Vencido"],
                },
                {
                  variant: "info" as TagVariant,
                  labels: ["En tránsito", "Procesando", "Asignado", "Programado"],
                },
                {
                  variant: "neutral" as TagVariant,
                  labels: ["Borrador", "Inactivo", "Archivado", "Sin datos"],
                },
                {
                  variant: "primary" as TagVariant,
                  labels: ["Prioritario", "Urgente", "Destacado", "Premium"],
                },
              ]
            ).map(({ variant, labels }) => (
              <div key={variant} style={{ marginBottom: "12px" }}>
                <Row>
                  {labels.map(lbl => (
                    <TagStatus key={lbl} variant={variant} label={lbl} />
                  ))}
                </Row>
              </div>
            ))}
          </Section>

          <Divider />

          {/* In-context demo */}
          <Section label="Uso en contexto — lista de cargas">
            <div style={{
              display:       "flex",
              flexDirection: "column",
              gap:           "0px",
              border:        "1px solid #ECECF4",
              borderRadius:  "12px",
              overflow:      "hidden",
            }}>
              {[
                { id: "PL-001", desc: "Madrid → Barcelona",    kg: "24 000 kg", variant: "success" as TagVariant, status: "Activo",       icon: <CheckCircle size={11} strokeWidth={2.5} /> },
                { id: "PL-002", desc: "Valencia → Sevilla",    kg: "18 500 kg", variant: "info"    as TagVariant, status: "En tránsito",  icon: <Truck       size={11} strokeWidth={2.5} /> },
                { id: "PL-003", desc: "Bilbao → Zaragoza",     kg: "9 200 kg",  variant: "warning" as TagVariant, status: "Pendiente",    icon: <Clock       size={11} strokeWidth={2.5} /> },
                { id: "PL-004", desc: "Málaga → Granada",      kg: "5 800 kg",  variant: "danger"  as TagVariant, status: "Rechazado",    icon: <XCircle     size={11} strokeWidth={2.5} /> },
                { id: "PL-005", desc: "A Coruña → Vigo",       kg: "3 100 kg",  variant: "neutral" as TagVariant, status: "Borrador",     icon: <Circle      size={11} strokeWidth={2.5} /> },
                { id: "PL-006", desc: "Madrid → Lisboa",       kg: "41 000 kg", variant: "primary" as TagVariant, status: "Prioritario",  icon: <Star        size={11} strokeWidth={2.5} /> },
              ].map((row, i, arr) => (
                <div
                  key={row.id}
                  style={{
                    display:         "flex",
                    alignItems:      "center",
                    gap:             "16px",
                    padding:         "12px 20px",
                    backgroundColor: "#FFFFFF",
                    borderBottom:    i < arr.length - 1 ? "1px solid #ECECF4" : "none",
                  }}
                >
                  <span style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize:   "12px",
                    fontWeight: 600,
                    color:      "#2A2A38",
                    minWidth:   "58px",
                  }}>{row.id}</span>
                  <span style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize:   "13px",
                    color:      "#55556C",
                    flex:       1,
                  }}>{row.desc}</span>
                  <span style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontSize:   "12px",
                    color:      "#A1A1B9",
                    minWidth:   "80px",
                    textAlign:  "right",
                  }}>{row.kg}</span>
                  <TagStatus variant={row.variant} label={row.status} icon={row.icon} rounded />
                </div>
              ))}
            </div>
          </Section>

          {/* Color token legend */}
          <div style={{
            marginTop:   "24px",
            padding:     "16px 20px",
            backgroundColor: "#F9F9FC",
            borderRadius:    "10px",
            border:          "1px solid #ECECF4",
            display:         "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap:             "8px 24px",
          }}>
            {[
              { bg: "#E8F7EE", fg: "#389760", label: "success · bg #E8F7EE · fg #389760" },
              { bg: "#FFF7E5", fg: "#AE7D03", label: "warning · bg #FFF7E5 · fg #AE7D03" },
              { bg: "#FBE4E4", fg: "#B91C19", label: "danger  · bg #FBE4E4 · fg #B91C19" },
              { bg: "#DBEEFF", fg: "#015DAE", label: "info    · bg #DBEEFF · fg #015DAE"  },
              { bg: "#ECECF4", fg: "#55556C", label: "neutral · bg #ECECF4 · fg #55556C"  },
              { bg: "#FBE1E1", fg: "#8F1A31", label: "primary · bg #FBE1E1 · fg #8F1A31"  },
            ].map(({ bg, fg, label }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "22px", height: "14px",
                  borderRadius: "3px",
                  backgroundColor: bg,
                  border: "1px solid rgba(0,0,0,0.07)",
                  flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <div style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: fg }} />
                </div>
                <span style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize:   "11px",
                  color:      "#55556C",
                  lineHeight: 1.4,
                }}>{label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* ══════════════════════════════════════════════════════
            TAG / CATEGORY
        ══════════════════════════════════════════════════════ */}
        <Card style={{ marginBottom: "48px" }}>
          <CardHeader
            badge="Tag / Category"
            badgeFg="#55556C"
            badgeBg="#ECECF4"
            title="Tag / Category"
            desc="3 variantes: Default · Selected · Disabled · height 28px · Poppins Medium 12px · border-radius 6px · ícono opcional 14px izquierda."
          />

          {/* ── Variants sin ícono ─────────────────────────────── */}
          <Section label="Variantes — sin ícono">
            <Row>
              <Cell tag="default">
                <TagCategory variant="default"  label="Carga general" />
              </Cell>
              <Cell tag="selected">
                <TagCategory variant="selected" label="Carga general" />
              </Cell>
              <Cell tag="disabled">
                <TagCategory variant="disabled" label="Carga general" />
              </Cell>
            </Row>
          </Section>

          <Divider />

          {/* ── Variants con ícono ────────────────────────────── */}
          <Section label="Variantes — con ícono">
            <Row>
              <Cell tag="default">
                <TagCategory
                  variant="default"
                  label="Carga general"
                  showIcon
                  icon={<Layers size={14} strokeWidth={2} />}
                />
              </Cell>
              <Cell tag="selected">
                <TagCategory
                  variant="selected"
                  label="Carga general"
                  showIcon
                  icon={<Layers size={14} strokeWidth={2} />}
                />
              </Cell>
              <Cell tag="disabled">
                <TagCategory
                  variant="disabled"
                  label="Carga general"
                  showIcon
                  icon={<Layers size={14} strokeWidth={2} />}
                />
              </Cell>
            </Row>
          </Section>

          <Divider />

          {/* ── Catálogo de categorías — sin ícono ───────────── */}
          <Section label="Catálogo de categorías — sin ícono">
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {[
                "Carga general", "Frigorífico", "Peligrosa", "Granel sólido",
                "Granel líquido", "Vehículos", "Maquinaria", "Groupage",
                "Urgente", "Internacional",
              ].map((label, i) => (
                <TagCategory
                  key={label}
                  label={label}
                  variant={i === 2 ? "selected" : "default"}
                />
              ))}
            </div>
          </Section>

          <Divider />

          {/* ── Catálogo de categorías — con ícono ──────────── */}
          <Section label="Catálogo de categorías — con ícono">
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {(
                [
                  { label: "Carga general",  icon: <Layers      size={14} strokeWidth={2} />, selected: false },
                  { label: "Frigorífico",    icon: <Package     size={14} strokeWidth={2} />, selected: false },
                  { label: "Peligrosa",      icon: <Flame       size={14} strokeWidth={2} />, selected: true  },
                  { label: "Granel sólido",  icon: <BarChart2   size={14} strokeWidth={2} />, selected: false },
                  { label: "Vehículos",      icon: <Truck       size={14} strokeWidth={2} />, selected: false },
                  { label: "Maquinaria",     icon: <Settings    size={14} strokeWidth={2} />, selected: false },
                  { label: "Documentos",     icon: <FileText    size={14} strokeWidth={2} />, selected: false },
                  { label: "Groupage",       icon: <Repeat      size={14} strokeWidth={2} />, selected: false },
                  { label: "Verificado",     icon: <ShieldCheck size={14} strokeWidth={2} />, selected: false },
                  { label: "Internacional",  icon: <Globe       size={14} strokeWidth={2} />, selected: false },
                ] as { label: string; icon: ReactNode; selected: boolean }[]
              ).map(({ label, icon, selected }) => (
                <TagCategory
                  key={label}
                  label={label}
                  variant={selected ? "selected" : "default"}
                  showIcon
                  icon={icon}
                />
              ))}
            </div>
          </Section>

          <Divider />

          {/* ── Uso en contexto — filtros de bolsa de cargas ─── */}
          <Section label="Uso en contexto — filtros de búsqueda">
            <div style={{
              backgroundColor: "#F9F9FC",
              border:          "1px solid #ECECF4",
              borderRadius:    "12px",
              padding:         "16px 20px",
              display:         "flex",
              flexDirection:   "column",
              gap:             "12px",
            }}>
              <p style={{
                fontFamily:    "'Poppins', sans-serif",
                fontSize:      "11px",
                fontWeight:    600,
                letterSpacing: "1px",
                textTransform: "uppercase",
                color:         "#A1A1B9",
                margin:        0,
              }}>Tipo de carga</p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {(
                  [
                    { label: "Todos",          icon: <Layers    size={14} strokeWidth={2} />, v: "selected"  },
                    { label: "Frigorífico",    icon: <Package   size={14} strokeWidth={2} />, v: "default"   },
                    { label: "Peligrosa",      icon: <Flame     size={14} strokeWidth={2} />, v: "default"   },
                    { label: "Vehículos",      icon: <Truck     size={14} strokeWidth={2} />, v: "default"   },
                    { label: "Groupage",       icon: <Repeat    size={14} strokeWidth={2} />, v: "default"   },
                    { label: "Granel sólido",  icon: <BarChart2 size={14} strokeWidth={2} />, v: "disabled"  },
                  ] as { label: string; icon: ReactNode; v: TagCategoryVariant }[]
                ).map(({ label, icon, v }) => (
                  <TagCategory key={label} label={label} variant={v} showIcon icon={icon} />
                ))}
              </div>
            </div>
          </Section>

          <Divider />

          {/* ── Pill (rounded) ────────────────────────────────── */}
          <Section label="Pill (rounded) — sin ícono">
            <Row>
              <Cell tag="default">
                <TagCategory variant="default"  label="Carga general" rounded />
              </Cell>
              <Cell tag="selected">
                <TagCategory variant="selected" label="Carga general" rounded />
              </Cell>
              <Cell tag="disabled">
                <TagCategory variant="disabled" label="Carga general" rounded />
              </Cell>
            </Row>
          </Section>

          <Section label="Pill (rounded) — con ícono">
            <Row>
              <Cell tag="default">
                <TagCategory variant="default"  label="Carga general" rounded showIcon icon={<Layers size={14} strokeWidth={2} />} />
              </Cell>
              <Cell tag="selected">
                <TagCategory variant="selected" label="Carga general" rounded showIcon icon={<Layers size={14} strokeWidth={2} />} />
              </Cell>
              <Cell tag="disabled">
                <TagCategory variant="disabled" label="Carga general" rounded showIcon icon={<Layers size={14} strokeWidth={2} />} />
              </Cell>
            </Row>
          </Section>

          <Divider />

          {/* ── Closable tags ─────────────────────────────────── */}
          <Section label="Con × para cerrar — squared">
            <Row>
              <Cell tag="default">
                <TagCategory variant="default"  label="Carga general" closable />
              </Cell>
              <Cell tag="selected">
                <TagCategory variant="selected" label="Carga general" closable />
              </Cell>
              <Cell tag="disabled">
                <TagCategory variant="disabled" label="Carga general" closable />
              </Cell>
            </Row>
          </Section>

          <Section label="Con × para cerrar — con ícono izquierda · squared">
            <Row>
              <Cell tag="default">
                <TagCategory variant="default"  label="Frigorífico" closable showIcon icon={<Package size={14} strokeWidth={2} />} />
              </Cell>
              <Cell tag="selected">
                <TagCategory variant="selected" label="Peligrosa"   closable showIcon icon={<Flame   size={14} strokeWidth={2} />} />
              </Cell>
              <Cell tag="disabled">
                <TagCategory variant="disabled" label="Vehículos"   closable showIcon icon={<Truck   size={14} strokeWidth={2} />} />
              </Cell>
            </Row>
          </Section>

          <Section label="Con × para cerrar — pill · con ícono">
            <Row>
              <Cell tag="default">
                <TagCategory variant="default"  label="Frigorífico" rounded closable showIcon icon={<Package size={14} strokeWidth={2} />} />
              </Cell>
              <Cell tag="selected">
                <TagCategory variant="selected" label="Peligrosa"   rounded closable showIcon icon={<Flame   size={14} strokeWidth={2} />} />
              </Cell>
              <Cell tag="disabled">
                <TagCategory variant="disabled" label="Vehículos"   rounded closable showIcon icon={<Truck   size={14} strokeWidth={2} />} />
              </Cell>
            </Row>
          </Section>

          <Divider />

          {/* ── Demo interactiva — filtros removibles ─────────── */}
          <Section label="Demo interactiva — filtros removibles (haz clic en ×)">
            <ClosableDemoSection />
          </Section>

        </Card>

        {/* ══════════════════════════════════════════════════════
            BADGE / COUNT
        ══════════════════════════════════════════════════════ */}
        <Card>
          <CardHeader
            badge="Badge / Count"
            badgeFg={WHITE}
            badgeBg={RED}
            title="Badge / Count"
            desc="2 variantes: circle (18×18px · border-radius 50%) · pill (18px alto · min-width 26px · border-radius 9px) · fondo #C22339 · texto blanco · Poppins Bold 10px."
          />

          <Section label="Circle — 18×18px · border-radius 50%">
            <Row>
              {([1, 3, 9, 10, 24, 99, "99+"] as (number | string)[]).map(n => (
                <Cell key={String(n)} tag={`count: ${n}`}>
                  <BadgeCount variant="circle" count={n} />
                </Cell>
              ))}
            </Row>
          </Section>

          <Divider />

          <Section label="Pill — 18px alto · min-width 26px · border-radius 9px">
            <Row>
              {([1, 3, 9, 10, 24, 99, "99+"] as (number | string)[]).map(n => (
                <Cell key={String(n)} tag={`count: ${n}`}>
                  <BadgeCount variant="pill" count={n} />
                </Cell>
              ))}
            </Row>
          </Section>

          <Divider />

          <Section label="Uso en contexto — badge sobre botones e íconos">
            <Row>
              <Cell tag="notificaciones">
                <div style={{ position: "relative", display: "inline-flex" }}>
                  <PowerloadButton variant="secondary" size="m"
                    icon={<Bell size={17} color={N800} strokeWidth={2} />} />
                  <span style={{ position: "absolute", top: "-6px", right: "-6px" }}>
                    <BadgeCount variant="circle" count={3} />
                  </span>
                </div>
              </Cell>
              <Cell tag="mensajes">
                <div style={{ position: "relative", display: "inline-flex" }}>
                  <PowerloadButton variant="secondary" size="m"
                    icon={<FileText size={17} color={N800} strokeWidth={2} />} />
                  <span style={{ position: "absolute", top: "-6px", right: "-6px" }}>
                    <BadgeCount variant="pill" count={12} />
                  </span>
                </div>
              </Cell>
              <Cell tag="alertas críticas">
                <div style={{ position: "relative", display: "inline-flex" }}>
                  <PowerloadButton variant="secondary" accent size="m"
                    icon={<AlertTriangle size={17} color={RED} strokeWidth={2} />} />
                  <span style={{ position: "absolute", top: "-6px", right: "-6px" }}>
                    <BadgeCount variant="pill" count={"99+"} />
                  </span>
                </div>
              </Cell>
              <Cell tag="nav item">
                <div style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "8px 14px", borderRadius: "8px", backgroundColor: "#F3F3F9",
                }}>
                  <Truck size={16} color={N800} strokeWidth={2} />
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "13px", color: N800 }}>
                    Mis Cargas
                  </span>
                  <BadgeCount variant="pill" count={7} />
                </div>
              </Cell>
            </Row>
          </Section>
        </Card>

        {/* ══════════════════════════════════════════════════════
            AVATAR / USER
        ══════════════════════════════════════════════════════ */}
        <Card style={{ marginBottom: "48px" }}>
          <CardHeader
            badge="Avatar / User"
            badgeFg={WHITE}
            badgeBg={RED}
            title="Avatar / User"
            desc="2 variantes × 5 tallas · circular · initials: bg #FBE1E1 text #C22339 Poppins SemiBold · image: foto con borde #ECECF4 · L & XL: dot verde verificado."
          />

          {/* Initials — all sizes */}
          <Section label="Initials — todas las tallas">
            <Row>
              {(["xs", "s", "m", "l", "xl"] as AvatarSize[]).map(sz => (
                <Cell key={sz} tag={sz.toUpperCase()}>
                  <AvatarUser variant="initials" size={sz} initials="AL" />
                </Cell>
              ))}
            </Row>
          </Section>

          {/* Initials verified */}
          <Section label="Initials — dot verificado (L y XL)">
            <Row>
              <Cell tag="L · verified"><AvatarUser variant="initials" size="l"  initials="MG" verified /></Cell>
              <Cell tag="XL · verified"><AvatarUser variant="initials" size="xl" initials="MG" verified /></Cell>
              <Cell tag="L · sin verificar"><AvatarUser variant="initials" size="l"  initials="MG" /></Cell>
              <Cell tag="XL · sin verificar"><AvatarUser variant="initials" size="xl" initials="MG" /></Cell>
            </Row>
          </Section>

          <Divider />

          {/* Image — all sizes */}
          <Section label="Image — todas las tallas (con foto)">
            <Row>
              {(["xs", "s", "m", "l", "xl"] as AvatarSize[]).map(sz => (
                <Cell key={sz} tag={sz.toUpperCase()}>
                  <AvatarUser variant="image" size={sz} src={IMG_WOMAN} alt="Ana López" />
                </Cell>
              ))}
            </Row>
          </Section>

          {/* Image verified */}
          <Section label="Image — dot verificado (L y XL)">
            <Row>
              <Cell tag="L · verified">
                <AvatarUser variant="image" size="l"  src={IMG_MAN} alt="Carlos Martín" verified />
              </Cell>
              <Cell tag="XL · verified">
                <AvatarUser variant="image" size="xl" src={IMG_MAN} alt="Carlos Martín" verified />
              </Cell>
              <Cell tag="L · sin verificar">
                <AvatarUser variant="image" size="l"  src={IMG_MAN} alt="Carlos Martín" />
              </Cell>
            </Row>
          </Section>

          {/* Placeholder */}
          <Section label="Image — placeholder (sin foto)">
            <Row>
              {(["xs", "s", "m", "l", "xl"] as AvatarSize[]).map(sz => (
                <Cell key={sz} tag={sz.toUpperCase()}>
                  <AvatarUser variant="image" size={sz} />
                </Cell>
              ))}
            </Row>
          </Section>

          <Divider />

          {/* Variety of initials */}
          <Section label="Initials — variedad de iniciales · talla M">
            <Row>
              {[
                { i: "AL", label: "Ana López"     },
                { i: "CM", label: "Carlos Martín" },
                { i: "PR", label: "Paula Ruiz"    },
                { i: "JG", label: "Javier García" },
                { i: "BS", label: "Beatriz Soto"  },
                { i: "RM", label: "Rubén Molina"  },
              ].map(({ i, label }) => (
                <Cell key={i} tag={label}>
                  <AvatarUser variant="initials" size="m" initials={i} />
                </Cell>
              ))}
            </Row>
          </Section>

          <Divider />

          {/* In-context: transportistas list */}
          <Section label="Uso en contexto — lista de transportistas">
            <div style={{
              display: "flex", flexDirection: "column",
              border: "1px solid #ECECF4", borderRadius: "12px", overflow: "hidden",
            }}>
              {[
                { initials: "CM", name: "Carlos Martín",  role: "Transportista · Madrid",    verified: true,  unread: 2,   src: IMG_MAN   },
                { initials: "AL", name: "Ana López",      role: "Transportista · Barcelona", verified: true,  unread: 0,   src: IMG_WOMAN },
                { initials: "PR", name: "Paula Ruiz",     role: "Cargadora · Valencia",      verified: false, unread: 5,   src: undefined },
                { initials: "JG", name: "Javier García",  role: "Transportista · Sevilla",   verified: false, unread: 0,   src: undefined },
              ].map((user, i, arr) => (
                <div key={user.initials} style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "12px 20px", backgroundColor: "#FFFFFF",
                  borderBottom: i < arr.length - 1 ? "1px solid #ECECF4" : "none",
                }}>
                  <AvatarUser
                    variant={user.src ? "image" : "initials"}
                    size="l"
                    initials={user.initials}
                    src={user.src}
                    verified={user.verified}
                  />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "13px", fontWeight: 600, color: "#2A2A38", margin: "0 0 2px" }}>{user.name}</p>
                    <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", color: "#A1A1B9", margin: 0 }}>{user.role}</p>
                  </div>
                  {user.unread > 0 && <BadgeCount variant="pill" count={user.unread} />}
                </div>
              ))}
            </div>
          </Section>
        </Card>

        {/* ══════════════════════════════════════════════════════
            DIVIDER
        ═══════════════════���══════════════════════════════════ */}
        <Card style={{ marginBottom: "48px" }}>
          <CardHeader
            badge="Divider"
            badgeFg="#55556C"
            badgeBg="#ECECF4"
            title="Divider"
            desc="4 variantes: horizontal-solid · horizontal-dashed · vertical-solid · vertical-dashed · Color #ECECF4 · 1px · dash/gap 4px. Label opcional centrado en horizontales: Poppins Regular 12px #A1A1B9."
          />

          <Section label="horizontal-solid — 1px solid · ancho completo">
            <DividerLine variant="horizontal-solid" />
          </Section>

          <Section label="horizontal-dashed — 1px · dash 4px gap 4px">
            <DividerLine variant="horizontal-dashed" />
          </Section>

          <Section label="horizontal-solid — con label">
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <DividerLine variant="horizontal-solid" label="O" />
              <DividerLine variant="horizontal-solid" label="Continúa con" />
              <DividerLine variant="horizontal-solid" label="Madrid → Barcelona" />
            </div>
          </Section>

          <Section label="horizontal-dashed — con label">
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <DividerLine variant="horizontal-dashed" label="O" />
              <DividerLine variant="horizontal-dashed" label="Sección de resultados" />
              <DividerLine variant="horizontal-dashed" label="Más información" />
            </div>
          </Section>

          <Divider />

          <Section label="vertical-solid y vertical-dashed — height 64px de ejemplo">
            <div style={{ display: "flex", gap: "48px", alignItems: "center" }}>
              {(["vertical-solid", "vertical-dashed"] as DividerVariant[]).map(v => (
                <div key={v} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                  <div style={{ height: "64px", display: "flex" }}>
                    <DividerLine variant={v} />
                  </div>
                  <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "10px", color: "#A1A1B9" }}>{v}</span>
                </div>
              ))}
            </div>
          </Section>

          <Divider />

          <Section label="Las 4 variantes — referencia visual">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px 48px" }}>
              {(["horizontal-solid", "horizontal-dashed", "vertical-solid", "vertical-dashed"] as DividerVariant[]).map(v => (
                <div key={v} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <span style={{
                    fontFamily: "'Poppins', sans-serif", fontSize: "10px", fontWeight: 600,
                    letterSpacing: "0.8px", color: "#A1A1B9", textTransform: "uppercase",
                  }}>{v}</span>
                  {v.startsWith("horizontal") ? (
                    <DividerLine variant={v} />
                  ) : (
                    <div style={{ height: "48px", display: "flex" }}>
                      <DividerLine variant={v} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Section>

          <Divider />

          <Section label="Uso en contexto — ficha de carga con separadores">
            <div style={{ border: "1px solid #ECECF4", borderRadius: "12px", overflow: "hidden", backgroundColor: "#FFFFFF" }}>
              <div style={{ padding: "16px 20px" }}>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "14px", fontWeight: 600, color: "#2A2A38", margin: "0 0 4px" }}>
                  Datos de la carga
                </p>
                <p style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", color: "#A1A1B9", margin: 0 }}>
                  Rellena los detalles de tu envío
                </p>
              </div>
              <DividerLine variant="horizontal-solid" />
              {[
                { label: "Origen",  value: "Madrid, ES"    },
                { label: "Destino", value: "Barcelona, ES" },
                { label: "Peso",    value: "24 000 kg"     },
                { label: "Tipo",    value: "Carga general" },
              ].map((row, i, arr) => (
                <div key={row.label}>
                  <div style={{ display: "flex", alignItems: "center", padding: "12px 20px", gap: "12px" }}>
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "12px", color: "#A1A1B9", minWidth: "80px" }}>{row.label}</span>
                    <span style={{ fontFamily: "'Poppins', sans-serif", fontSize: "13px", fontWeight: 500, color: "#2A2A38" }}>{row.value}</span>
                  </div>
                  {i < arr.length - 1 && <DividerLine variant="horizontal-dashed" />}
                </div>
              ))}
              <DividerLine variant="horizontal-solid" />
              <div style={{ padding: "12px 20px", display: "flex", justifyContent: "flex-end", gap: "8px" }}>
                <PowerloadButton variant="secondary" size="s" label="Cancelar" />
                <PowerloadButton variant="primary" size="s" label="Confirmar" />
              </div>
            </div>
          </Section>

          <Section label="Uso en contexto — separador vertical en barra de acciones">
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "4px",
              padding: "6px 8px", border: "1px solid #ECECF4",
              borderRadius: "10px", backgroundColor: "#FFFFFF",
            }}>
              <PowerloadButton variant="tertiary" size="xs" label="Editar" />
              <div style={{ height: "24px", display: "flex", alignItems: "center", padding: "0 4px" }}>
                <DividerLine variant="vertical-solid" />
              </div>
              <PowerloadButton variant="tertiary" size="xs" label="Duplicar" />
              <div style={{ height: "24px", display: "flex", alignItems: "center", padding: "0 4px" }}>
                <DividerLine variant="vertical-dashed" />
              </div>
              <PowerloadButton variant="tertiary" accent size="xs" label="Eliminar" />
            </div>
          </Section>
        </Card>

        {/* ══════════════════════════════════════════════════════════
            CHECKBOX / STEP SIMPLE
        ══════════════════════════════════════════════════════════ */}
        <Card style={{ marginBottom: "0" }}>
          <CardHeader
            badge="CheckboxStep"
            badgeFg="#C22339"
            badgeBg="#FBE1E1"
            title="Checkbox & Step Simple"
            desc="Componente dual: funciona como checkbox interactivo y como indicador de paso en flujos. Dos formas (circle · square), 5 estados, 3 tallas."
          />
          <CheckboxStepShowcase />
        </Card>

        {/* ══════════════════════════════════════════════════════════
            SIDEBAR / NAVEGACIÓN
        ══════════════════════════════════════════════════════════ */}
        <Card style={{ marginBottom: "48px" }}>
          <CardHeader
            badge="Navegación"
            badgeFg="#FFFFFF"
            badgeBg="#C22339"
            title="Sidebar — navegación por tipo de usuario"
            desc="Menús y submenús según Figma (transportista, cargador, admin, operador con perfil). Estados default, hover y activo; ramificación curva; iconos en assets/iconos-personalizados."
          />
          <SidebarGuide />
        </Card>

        {/* ══════════════════════════════════════════════════════════
            INPUT / VEHICLE SELECT
        ══════════════════════════════════════════════════════════ */}
        <Card style={{ marginBottom: "48px" }}>
          <CardHeader
            badge="Input"
            badgeFg="#FFFFFF"
            badgeBg="#C22339"
            title="VehicleSelect — tipo de vehículo"
            desc="Dropdown 40px de alto con ilustraciones Vehicle/SVG (#000000), búsqueda, modo single/multi, estados de trigger y filas según guía Powerload. Genérico 18×18 en vacío; siluetas ~53×24 en opciones y valor seleccionado."
          />
          <VehicleSelectGuide />
        </Card>

        {/* ══════════════════════════════════════════════════════════
            INPUT / SELECT (GENERAL)
        ══════════════════════════════════════════════════════════ */}
        <Card style={{ marginBottom: "48px" }}>
          <CardHeader
            badge="Input"
            badgeFg="#55556C"
            badgeBg="#ECECF4"
            title="Select — uso general"
            desc="Trigger 48px · borde neutral-400 · íconos outline (Lucide). Modo single (check a la derecha) y multi (CheckboxStep 16px + chips Tag/Category + overflow “+N más”). Distinto de VehicleSelect (40px + siluetas SVG)."
          />
          <SelectGuide />
        </Card>

        {/* ══════════════════════════════════════════════════════════
            ICON LIBRARY
        ══════════════════════════════════════════════════════════ */}
        <Card style={{ marginBottom: "48px" }}>
          <CardHeader
            badge="Iconografía"
            badgeFg="#C22339"
            badgeBg="#FBE1E1"
            title="Librería de Íconos Powerload"
            desc="Sistema completo de íconos: ~340 Lucide (lucide-react) + ~215 Custom (Iconsax). Busca, filtra por categoría y copia el import con un clic."
          />
          <PowerloadIconLibrary />
        </Card>

      </div>
    </div>
  );
}

// ─── CheckboxStep Showcase ────────────────────────────────────────────────────

function CheckboxStepShowcase() {
  // ── Interactive demo state ─────────────────────────────────────────────────
  const [interactiveChecks, setInteractiveChecks] = useState<Record<string, boolean>>({
    "terms":     false,
    "marketing": false,
    "notif":     true,
    "circ1":     false,
    "circ2":     true,
  });

  // ── Step list demo ─────────────────────────────────────────────────────────
  const [currentStep, setCurrentStep] = useState(1);
  const STEPS = [
    { id: 0, label: "Verificar identidad",       detail: "DNI o CIF confirmado" },
    { id: 1, label: "Subir documentos",          detail: "Cargando archivos…" },
    { id: 2, label: "Validar vehículos",         detail: "Pendiente de revisión" },
    { id: 3, label: "Revisar contrato",          detail: "Sin iniciar" },
  ];

  const toggle = (key: string) =>
    setInteractiveChecks(p => ({ ...p, [key]: !p[key] }));

  // ── Re-usable state row ────────────────────────────────────────────────────
  const STATES_CIRCLE: { label: string; props: React.ComponentProps<typeof CheckboxStep> }[] = [
    { label: "Unchecked",           props: { shape:"circle" } },
    { label: "Checked",             props: { shape:"circle", checked:true } },
    { label: "Loading",             props: { shape:"circle", loading:true } },
    { label: "Error",               props: { shape:"circle", error:true } },
    { label: "Disabled",            props: { shape:"circle", disabled:true } },
    { label: "Disabled checked",    props: { shape:"circle", disabled:true, checked:true } },
  ];
  const STATES_SQUARE: typeof STATES_CIRCLE = [
    { label: "Unchecked",           props: { shape:"square" } },
    { label: "Checked",             props: { shape:"square", checked:true } },
    { label: "Loading",             props: { shape:"square", loading:true } },
    { label: "Indeterminate",       props: { shape:"square", indeterminate:true } },
    { label: "Error",               props: { shape:"square", error:true } },
    { label: "Disabled",            props: { shape:"square", disabled:true } },
    { label: "Disabled checked",    props: { shape:"square", disabled:true, checked:true } },
  ];

  // ── Shared label style ─────────────────────────────────────────────────────
  const cellLabel = (text: string) => (
    <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:"11px", color:"#A1A1B9", textAlign:"center", marginTop:"4px" }}>
      {text}
    </span>
  );

  return (
    <div>

      {/* ── 1. States — Circle ─────────────────────────────────────── */}
      <Section label="Variante circular — todos los estados">
        <div style={{ display:"flex", flexWrap:"wrap", gap:"32px 40px", alignItems:"flex-start" }}>
          {STATES_CIRCLE.map(({ label, props }) => (
            <div key={label} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"8px" }}>
              <CheckboxStep {...props} size="md" />
              {cellLabel(label)}
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* ── 2. States — Square ─────────────────────────────────────── */}
      <Section label="Variante cuadrada — todos los estados (incluye indeterminate)">
        <div style={{ display:"flex", flexWrap:"wrap", gap:"32px 40px", alignItems:"flex-start" }}>
          {STATES_SQUARE.map(({ label, props }) => (
            <div key={label} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"8px" }}>
              <CheckboxStep {...props} size="md" />
              {cellLabel(label)}
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* ── 3. Tallas ──────────────────────────────────────────────── */}
      <Section label="Tallas — sm · md · lg">
        <div style={{ display:"flex", flexWrap:"wrap", gap:"48px", alignItems:"flex-end" }}>
          {(["sm","md","lg"] as const).map(sz => (
            <div key={sz} style={{ display:"flex", flexDirection:"column", gap:"20px", alignItems:"center" }}>
              <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:"10px", fontWeight:600, letterSpacing:"0.8px", textTransform:"uppercase", color:"#A1A1B9" }}>
                {sz.toUpperCase()} · {sz==="sm"?"20px":sz==="md"?"24px":"28px"}
              </span>
              <div style={{ display:"flex", gap:"16px", alignItems:"center" }}>
                <CheckboxStep shape="circle" size={sz} />
                <CheckboxStep shape="circle" size={sz} checked />
                <CheckboxStep shape="square" size={sz} />
                <CheckboxStep shape="square" size={sz} checked />
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      {/* ── 4. Interactive checkboxes with labels ───────────────────── */}
      <Section label="Demo interactiva — con etiquetas">
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px 48px", maxWidth:"560px" }}>
          {/* Square group */}
          <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
            <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:"11px", fontWeight:600, letterSpacing:"0.8px", textTransform:"uppercase", color:"#A1A1B9", margin:"0 0 4px" }}>
              Cuadrado (Checkbox)
            </p>
            <CheckboxStep
              shape="square" size="md"
              checked={interactiveChecks.terms}
              onChange={() => toggle("terms")}
              label="Acepto los términos y condiciones"
            />
            <CheckboxStep
              shape="square" size="md"
              checked={interactiveChecks.marketing}
              onChange={() => toggle("marketing")}
              label="Recibir comunicaciones de marketing"
            />
            <CheckboxStep
              shape="square" size="md"
              checked={interactiveChecks.notif}
              onChange={() => toggle("notif")}
              label="Notificaciones de entrega activadas"
            />
            <CheckboxStep
              shape="square" size="md"
              disabled
              label="Opción no disponible (disabled)"
            />
          </div>
          {/* Circle group */}
          <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
            <p style={{ fontFamily:"'Poppins',sans-serif", fontSize:"11px", fontWeight:600, letterSpacing:"0.8px", textTransform:"uppercase", color:"#A1A1B9", margin:"0 0 4px" }}>
              Circular (Radio-style)
            </p>
            <CheckboxStep
              shape="circle" size="md"
              checked={interactiveChecks.circ1}
              onChange={() => { setInteractiveChecks(p => ({ ...p, circ1:true, circ2:false })); }}
              label="Transportista autónomo"
            />
            <CheckboxStep
              shape="circle" size="md"
              checked={interactiveChecks.circ2}
              onChange={() => { setInteractiveChecks(p => ({ ...p, circ1:false, circ2:true })); }}
              label="Empresa de transporte"
            />
            <CheckboxStep
              shape="circle" size="md"
              error
              label="Verificación requerida (error)"
            />
            <CheckboxStep
              shape="circle" size="md"
              disabled checked
              label="Verificado — solo lectura"
            />
          </div>
        </div>
      </Section>

      <Divider />

      {/* ── 5. Steps en proceso ────────────────────────────────────── */}
      <Section label="Como Step Simple — flujo de alta de transportista">
        <div style={{ display:"flex", flexDirection:"column", gap:"0px", maxWidth:"380px" }}>
          {STEPS.map((step, i) => {
            const isCompleted = step.id < currentStep;
            const isCurrent   = step.id === currentStep;
            const isPending   = step.id > currentStep;

            return (
              <div key={step.id} style={{ display:"flex", gap:"16px", alignItems:"stretch" }}>
                {/* Left column: indicator + connector */}
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
                  <CheckboxStep
                    shape="circle"
                    size="md"
                    checked={isCompleted}
                    loading={isCurrent}
                    disabled={isPending}
                  />
                  {/* Connector line */}
                  {i < STEPS.length - 1 && (
                    <div style={{
                      width:           "2px",
                      flex:            1,
                      minHeight:       "28px",
                      backgroundColor: isCompleted ? "#C22339" : "#E1E1EC",
                      margin:          "3px 0",
                      transition:      "background-color 300ms ease",
                    }} />
                  )}
                </div>

                {/* Right column: text */}
                <div style={{ paddingBottom: i < STEPS.length - 1 ? "24px" : 0, paddingTop:"2px" }}>
                  <p style={{
                    fontFamily: "'Poppins',sans-serif",
                    fontSize:   "14px",
                    fontWeight: isCurrent ? 600 : 400,
                    color:      isCompleted ? "#2A2A38" : isCurrent ? "#2A2A38" : "#A1A1B9",
                    margin:     "0 0 2px",
                    lineHeight: "1.4",
                    transition: "color 200ms ease",
                  }}>
                    {step.label}
                  </p>
                  <p style={{
                    fontFamily: "'Poppins',sans-serif",
                    fontSize:   "12px",
                    color:      isCurrent ? "#C22339" : "#A1A1B9",
                    margin:     0,
                    lineHeight: "1.4",
                  }}>
                    {isCompleted ? "✓ Completado" : step.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Step navigation */}
        <div style={{ display:"flex", gap:"10px", marginTop:"24px" }}>
          <button
            onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
            style={{
              fontFamily:"'Poppins',sans-serif", fontSize:"13px", fontWeight:600,
              color:"#55556C", backgroundColor:"#ECECF4",
              border:"none", borderRadius:"10px",
              padding:"8px 18px", cursor:"pointer",
            }}
          >← Anterior</button>
          <button
            onClick={() => setCurrentStep(s => Math.min(STEPS.length - 1, s + 1))}
            style={{
              fontFamily:"'Poppins',sans-serif", fontSize:"13px", fontWeight:600,
              color:"#FFFFFF", backgroundColor:"#C22339",
              border:"none", borderRadius:"10px",
              padding:"8px 18px", cursor:"pointer",
            }}
          >Siguiente →</button>
        </div>
      </Section>

      <Divider />

      {/* ── 6. Token reference ─────────────────────────────────────── */}
      <Section label="Tokens de color aplicados">
        <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
          {[
            { swatch:"#C22339",  label:"primary/600 — checked bg & arc" },
            { swatch:"#CF4758",  label:"primary/400 — checked hover" },
            { swatch:"#FBE1E1",  label:"primary/0 — unchecked hover bg" },
            { swatch:"#D2D2E1",  label:"neutral/400 — unchecked border & spinner track" },
            { swatch:"#ECECF4",  label:"neutral/200 — disabled bg" },
            { swatch:"#BDBDD1",  label:"neutral/500 — disabled-checked bg" },
            { swatch:"#E22824",  label:"danger/600 — error border" },
          ].map(t => (
            <div key={t.swatch} style={{ display:"flex", alignItems:"center", gap:"8px", padding:"6px 12px", backgroundColor:"#F9F9FC", borderRadius:"8px", border:"1px solid #ECECF4" }}>
              <div style={{ width:"14px", height:"14px", borderRadius:"3px", backgroundColor:t.swatch, flexShrink:0 }} />
              <span style={{ fontFamily:"'Poppins',sans-serif", fontSize:"11px", color:"#55556C" }}>{t.label}</span>
            </div>
          ))}
        </div>
      </Section>

    </div>
  );
}

// ─── Demo interactiva de tags closable ───────────────────────────────────────

function ClosableDemoSection() {
  const ALL_FILTERS = [
    { label: "Frigorífico",   icon: <Package     size={14} strokeWidth={2} /> },
    { label: "Peligrosa",     icon: <Flame       size={14} strokeWidth={2} /> },
    { label: "Vehículos",     icon: <Truck       size={14} strokeWidth={2} /> },
    { label: "Groupage",      icon: <Repeat      size={14} strokeWidth={2} /> },
    { label: "Documentos",    icon: <FileText    size={14} strokeWidth={2} /> },
    { label: "Internacional", icon: <Globe       size={14} strokeWidth={2} /> },
    { label: "Verificado",    icon: <ShieldCheck size={14} strokeWidth={2} /> },
  ];

  const [active, setActive] = useState<string[]>(
    ALL_FILTERS.map(f => f.label)
  );

  const remove = (label: string) =>
    setActive(prev => prev.filter(l => l !== label));

  const reset = () => setActive(ALL_FILTERS.map(f => f.label));

  return (
    <div style={{
      backgroundColor: "#F9F9FC",
      border:          "1px solid #ECECF4",
      borderRadius:    "12px",
      padding:         "16px 20px",
      display:         "flex",
      flexDirection:   "column",
      gap:             "12px",
    }}>
      <p style={{
        fontFamily:    "'Poppins', sans-serif",
        fontSize:      "11px",
        fontWeight:    600,
        letterSpacing: "1px",
        textTransform: "uppercase",
        color:         "#A1A1B9",
        margin:        0,
      }}>Filtros activos</p>

      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", minHeight: "28px" }}>
        {active.length === 0 && (
          <span style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize:   "12px",
            color:      "#A1A1B9",
          }}>Sin filtros activos</span>
        )}
        {ALL_FILTERS.filter(f => active.includes(f.label)).map(({ label, icon }) => (
          <TagCategory
            key={label}
            label={label}
            variant="selected"
            showIcon
            icon={icon}
            closable
            rounded
            onClose={() => remove(label)}
          />
        ))}
      </div>

      {active.length < ALL_FILTERS.length && (
        <button
          onClick={reset}
          style={{
            alignSelf:      "flex-start",
            fontFamily:     "'Poppins', sans-serif",
            fontSize:       "11px",
            fontWeight:     500,
            color:          "#C22339",
            background:     "none",
            border:         "none",
            cursor:         "pointer",
            padding:        0,
            textDecoration: "underline",
          }}
        >
          Restablecer filtros
        </button>
      )}
    </div>
  );
}

// ─── Avatar image URLs ────────────────────────────────────────────────────────
const IMG_WOMAN = "https://images.unsplash.com/photo-1689600944138-da3b150d9cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0JTIwaGVhZHNob3R8ZW58MXx8fHwxNzc3OTYxNzY4fDA&ixlib=rb-4.1.0&q=80&w=400";
const IMG_MAN   = "https://images.unsplash.com/photo-1672685667592-0392f458f46f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdCUyMGhlYWRzaG90fGVufDF8fHx8MTc3ODAzODY3M3ww&ixlib=rb-4.1.0&q=80&w=400";