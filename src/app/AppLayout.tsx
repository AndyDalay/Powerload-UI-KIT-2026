// ─── Ejemplo de integración: Layout principal con Sidebar + Topbar ────────────
//
// Copia este patrón en tu componente de layout raíz (p.ej. src/app/AppLayout.tsx
// o como wrapper en tu router). El estado compartido vive aquí y se pasa como
// props a ambos componentes.

import { useState, useCallback } from "react";
import { PowerloadSidebar, getSidebarNav } from "./components/sidebar";
import { PowerloadTopbar } from "./components/topbar";

// ─── Tipos de ejemplo (ajusta a tu router/auth) ────────────────────────────────
interface AppLayoutProps {
  activePath: string;
  onNavigate: (href: string) => void;
  children: React.ReactNode;
}

export function AppLayout({ activePath, onNavigate, children }: AppLayoutProps) {
  // ── Estado compartido sidebar ─────────────────────────────────────────────
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleToggleCollapsed = useCallback(
    () => setCollapsed((c) => !c),
    [],
  );
  const handleToggleMobile = useCallback(
    () => setMobileOpen((o) => !o),
    [],
  );

  // ── Nav entries (mismo config que usa el sidebar) ─────────────────────────
  // Pasa el rol real del usuario desde tu contexto de auth.
  const entries = getSidebarNav("transportista");

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* ── Sidebar ────────────────────────────────────────────────────────── */}
      <PowerloadSidebar
        userRole="transportista"
        activePath={activePath}
        onNavigate={onNavigate}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        mobileOpen={mobileOpen}
        onMobileOpenChange={setMobileOpen}
      />

      {/* ── Área de contenido (topbar + página) ────────────────────────────── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <PowerloadTopbar
          entries={entries}
          activePath={activePath}
          collapsed={collapsed}
          onToggleCollapsed={handleToggleCollapsed}
          mobileOpen={mobileOpen}
          onToggleMobile={handleToggleMobile}
          notificationCount={3} // ← de tu estado de notificaciones real
          // rightSlot={<MyUserAvatar />}  // ← slot personalizable
        />

        {/* Contenido de la página */}
        <main style={{ flex: 1, overflow: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}

/*
  ── Notas de uso ──────────────────────────────────────────────────────────────

  1. ROUTER
     Con React Router v6:
       const location = useLocation();
       const navigate = useNavigate();
       <AppLayout activePath={location.pathname} onNavigate={navigate}>
         <Outlet />
       </AppLayout>

  2. TOPBAR entries
     `getSidebarNav(userRole, operadorProfile)` devuelve el mismo array que
     usa el sidebar. Pasa el rol real del usuario autenticado.

  3. RESPONSIVE
     • Desktop (≥1024px): sidebar visible como columna fija, topbar muestra
       breadcrumb (expandido = título, colapsado = ruta completa).
     • Mobile/Tablet (<1024px): sidebar oculto (drawer), topbar muestra
       hamburgesa + logo. El hamburgesa llama a `onToggleMobile`.

  4. AVATAR / PERFIL
     Usa el prop `rightSlot` del topbar para inyectar tu componente de avatar:
       <PowerloadTopbar
         ...
         rightSlot={
           <button className="pl-topbar__avatar-btn" onClick={openProfile}>
             <img src={user.avatarUrl} alt={user.name} />
           </button>
         }
       />
*/
