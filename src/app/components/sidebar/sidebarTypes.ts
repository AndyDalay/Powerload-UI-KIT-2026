// ─── Powerload Sidebar — types ───────────────────────────────────────────────

export type SidebarUserRole =
  | "transportista"
  | "cargador"
  | "admin"
  | "operador";

/** Perfil activo cuando el usuario es operador logístico */
export type OperadorProfile = "transportista" | "cargador" | "admin";

export type SidebarBadgeVariant = "neutral" | "primary" | "dark";

export interface SidebarBadge {
  count: number | string;
  variant?: SidebarBadgeVariant;
}

export interface SidebarNavChild {
  id: string;
  label: string;
  /** Nombre del archivo en `src/assets/iconos-personalizados/{icon}.svg` */
  icon: string;
  href: string;
  badge?: SidebarBadge;
  /** Muestra indicador premium (corona) */
  premium?: boolean;
}

export interface SidebarNavGroup {
  type: "group";
  id: string;
  label: string;
  icon: string;
  /** Abierto por defecto al montar */
  defaultOpen?: boolean;
  children: SidebarNavChild[];
}

export interface SidebarNavLink {
  type: "link";
  id: string;
  label: string;
  icon: string;
  href: string;
}

export type SidebarNavEntry = SidebarNavGroup | SidebarNavLink;

export interface PowerloadSidebarProps {
  userRole: SidebarUserRole;
  /** Requerido si `userRole === "operador"` */
  operadorProfile?: OperadorProfile;
  /** Ruta activa (ej. `/inicio/gestion-ecologica`) */
  activePath: string;
  onNavigate: (href: string) => void;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;

  // ── Mobile drawer ─────────────────────────────────────────────────────────
  /**
   * Controla si el drawer mobile está abierto.
   * En mobile/tablet (<1024px) el sidebar es un overlay drawer.
   * El padre gestiona este estado junto con el topbar hamburgesa.
   */
  mobileOpen?: boolean;
  onMobileOpenChange?: (open: boolean) => void;

  // ── Acción primaria ───────────────────────────────────────────────────────
  /** Botón primario inferior (oculto por defecto) */
  showPrimaryAction?: boolean;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  className?: string;
}