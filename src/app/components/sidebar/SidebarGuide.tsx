import { useMemo, useState } from "react";
import { PowerloadSidebar } from "./PowerloadSidebar";
import { collectSidebarHrefs, getSidebarNav } from "./sidebarNavConfig";
import type { OperadorProfile, SidebarUserRole } from "./sidebarTypes";

const FONT = "'Poppins', sans-serif";

const ROLES: { id: SidebarUserRole; label: string }[] = [
  { id: "transportista", label: "Transportista" },
  { id: "cargador", label: "Cargador" },
  { id: "admin", label: "Admin" },
  { id: "operador", label: "Operador logístico" },
];

const OPERADOR_PROFILES: { id: OperadorProfile; label: string }[] = [
  { id: "transportista", label: "Perfil transportista" },
  { id: "cargador", label: "Perfil cargador" },
  { id: "admin", label: "Perfil admin" },
];

export function SidebarGuide() {
  const [role, setRole] = useState<SidebarUserRole>("transportista");
  const [operadorProfile, setOperadorProfile] = useState<OperadorProfile>("transportista");
  const [activePath, setActivePath] = useState("/inicio/gestion-ecologica");
  const [collapsed, setCollapsed] = useState(false);

  const hrefs = useMemo(
    () => collectSidebarHrefs(getSidebarNav(role, operadorProfile)),
    [role, operadorProfile],
  );

  return (
    <div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
        {ROLES.map((r) => (
          <button
            key={r.id}
            type="button"
            onClick={() => {
              setRole(r.id);
              const nav = getSidebarNav(r.id, operadorProfile);
              const first = collectSidebarHrefs(nav)[0];
              if (first) setActivePath(first);
            }}
            style={chipStyle(role === r.id)}
          >
            {r.label}
          </button>
        ))}
      </div>

      {role === "operador" ? (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          {OPERADOR_PROFILES.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => {
                setOperadorProfile(p.id);
                const nav = getSidebarNav("operador", p.id);
                const first = collectSidebarHrefs(nav)[0];
                if (first) setActivePath(first);
              }}
              style={chipStyle(operadorProfile === p.id, true)}
            >
              {p.label}
            </button>
          ))}
        </div>
      ) : null}

      <div
        style={{
          display: "flex",
          minHeight: 720,
          borderRadius: 16,
          overflow: "hidden",
          border: "1px solid #ECECF4",
          background: "#F9F9FC",
        }}
      >
        <PowerloadSidebar
          userRole={role}
          operadorProfile={operadorProfile}
          activePath={activePath}
          onNavigate={setActivePath}
          collapsed={collapsed}
          onCollapsedChange={setCollapsed}
        />

        <div style={{ flex: 1, padding: 32, minWidth: 0 }}>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 12,
              color: "#A1A1B9",
              margin: "0 0 8px",
              textTransform: "uppercase",
              letterSpacing: "1px",
            }}
          >
            Vista de contenido (demo)
          </p>
          <h3
            style={{
              fontFamily: FONT,
              fontSize: 22,
              fontWeight: 600,
              color: "#2A2A38",
              margin: "0 0 12px",
            }}
          >
            {activePath}
          </h3>
          <p style={{ fontFamily: FONT, fontSize: 14, color: "#7E7E97", lineHeight: 1.5, margin: 0 }}>
            Navegación según Figma — menús desplegables, ramificación con esquinas redondeadas,
            estados default / hover / activo, badges numéricos e iconos en{" "}
            <code style={{ fontSize: 13 }}>src/assets/iconos-personalizados/</code> (16px, relleno
            #000, color vía CSS mask).
          </p>

          <div style={{ marginTop: 24 }}>
            <p style={{ fontFamily: FONT, fontSize: 12, color: "#A1A1B9", margin: "0 0 8px" }}>
              Rutas en este menú
            </p>
            <ul style={{ fontFamily: FONT, fontSize: 13, color: "#55556C", margin: 0, paddingLeft: 18 }}>
              {hrefs.map((h) => (
                <li key={h} style={{ marginBottom: 4 }}>
                  <button
                    type="button"
                    onClick={() => setActivePath(h)}
                    style={{
                      border: "none",
                      background: "none",
                      padding: 0,
                      cursor: "pointer",
                      color: h === activePath ? "#C22339" : "#55556C",
                      fontWeight: h === activePath ? 600 : 400,
                      fontFamily: FONT,
                      fontSize: 13,
                    }}
                  >
                    {h}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function chipStyle(active: boolean, subtle = false) {
  return {
    fontFamily: FONT,
    fontSize: 13,
    fontWeight: 600,
    padding: "8px 14px",
    borderRadius: 9999,
    border: active ? "1.5px solid #C22339" : "1.5px solid #D2D2E1",
    background: active ? "#FBE1E1" : subtle ? "#FFFFFF" : "#F3F3F9",
    color: active ? "#C22339" : "#55556C",
    cursor: "pointer",
  } as const;
}
