import { PowerloadButton, ButtonSize } from "./components/PowerloadButton";
import { Tooltip } from "./components/Tooltip";
import { TagStatus, TagVariant } from "./components/TagStatus";
import { ReactNode } from "react";

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

// ─── App ─────────────────────────────────────────────────────────────────────

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
          <Section label="Variantes">
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
                { id: "PL-001", desc: "Madrid → Barcelona",    kg: "24 000 kg", variant: "success" as TagVariant, status: "Activo"       },
                { id: "PL-002", desc: "Valencia → Sevilla",    kg: "18 500 kg", variant: "info"    as TagVariant, status: "En tránsito" },
                { id: "PL-003", desc: "Bilbao → Zaragoza",     kg: "9 200 kg",  variant: "warning" as TagVariant, status: "Pendiente"   },
                { id: "PL-004", desc: "Málaga → Granada",      kg: "5 800 kg",  variant: "danger"  as TagVariant, status: "Rechazado"   },
                { id: "PL-005", desc: "A Coruña → Vigo",       kg: "3 100 kg",  variant: "neutral" as TagVariant, status: "Borrador"    },
                { id: "PL-006", desc: "Madrid → Lisboa",       kg: "41 000 kg", variant: "primary" as TagVariant, status: "Prioritario" },
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
                  <TagStatus variant={row.variant} label={row.status} />
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

      </div>
    </div>
  );
}