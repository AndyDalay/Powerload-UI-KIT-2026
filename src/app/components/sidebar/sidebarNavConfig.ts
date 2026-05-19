// ─── Navegación por tipo de usuario (según Figma Sidebar Component) ─────────

import type {
  OperadorProfile,
  SidebarNavEntry,
  SidebarUserRole,
} from "./sidebarTypes";

const INICIO: SidebarNavEntry = {
  type: "group",
  id: "inicio",
  label: "Inicio",
  icon: "inicio",
  defaultOpen: true,
  children: [
    { id: "dashboard", label: "Dashboard", icon: "dashboard", href: "/inicio/dashboard" },
    {
      id: "gestion-ecologica",
      label: "Gestión Ecológica",
      icon: "gestion-ecologica",
      href: "/inicio/gestion-ecologica",
    },
  ],
};

const POWERLOAD_IA: SidebarNavEntry = {
  type: "link",
  id: "powerload-ia",
  label: "Powerload IA",
  icon: "powerload-ia",
  href: "/powerload-ia",
};

/** Transportista + operador (perfil transportista) */
const NAV_TRANSPORTISTA: SidebarNavEntry[] = [
  INICIO,
  POWERLOAD_IA,
  {
    type: "group",
    id: "bolsa-cargas",
    label: "Bolsa de Cargas",
    icon: "bolsa-cargas",
    defaultOpen: true,
    children: [
      { id: "buscar-cargas", label: "Buscar Cargas", icon: "buscar-cargas", href: "/bolsa/buscar" },
      {
        id: "busqueda-automatizada",
        label: "Búsqueda Automatizada",
        icon: "busqueda-automatizada",
        href: "/bolsa/automatizada",
      },
      { id: "en-curso", label: "En Curso", icon: "en-curso", href: "/bolsa/en-curso" },
      { id: "finalizados", label: "Finalizados", icon: "finalizados", href: "/bolsa/finalizados" },
    ],
  },
  {
    type: "group",
    id: "ofertas-gestion",
    label: "Ofertas y Gestión",
    icon: "ofertas-gestion",
    defaultOpen: true,
    children: [
      {
        id: "ofertas-pendientes",
        label: "Ofertas Pendientes",
        icon: "ofertas-pendientes",
        href: "/ofertas/pendientes",
        badge: { count: 3, variant: "neutral" },
      },
      {
        id: "historial-ofertas",
        label: "Historial de Ofertas",
        icon: "historial-ofertas",
        href: "/ofertas/historial",
      },
    ],
  },
  {
    type: "group",
    id: "gasolineras",
    label: "Gasolineras",
    icon: "gasolineras",
    defaultOpen: true,
    children: [
      { id: "ver-gasolineras", label: "Ver Gasolineras", icon: "ver-gasolineras", href: "/gasolineras" },
      {
        id: "comprar-combustible",
        label: "Comprar Combustible",
        icon: "comprar-combustible",
        href: "/gasolineras/comprar",
      },
      {
        id: "asignar-combustible",
        label: "Asignar Combustible",
        icon: "asignar-combustible",
        href: "/gasolineras/asignar",
      },
      {
        id: "historial-repostajes",
        label: "Historial de Repostajes",
        icon: "historial-repostajes",
        href: "/gasolineras/historial",
      },
    ],
  },
  {
    type: "group",
    id: "contabilidad",
    label: "Contabilidad",
    icon: "contabilidad",
    defaultOpen: true,
    children: [
      { id: "facturacion", label: "Facturación", icon: "facturacion", href: "/contabilidad/facturacion" },
    ],
  },
  {
    type: "group",
    id: "administracion",
    label: "Administración",
    icon: "administracion",
    defaultOpen: true,
    children: [
      { id: "usuarios", label: "Usuarios", icon: "usuarios", href: "/admin/usuarios" },
      { id: "suscripciones", label: "Suscripciones", icon: "suscripciones", href: "/admin/suscripciones" },
    ],
  },
  {
    type: "group",
    id: "herramientas",
    label: "Herramientas",
    icon: "herramientas",
    defaultOpen: true,
    children: [
      {
        id: "costes-viajes",
        label: "Costes de Viajes",
        icon: "costes-viajes",
        href: "/herramientas/costes",
        premium: true,
      },
    ],
  },
];

/** Cargador + operador (perfil cargador) */
const NAV_CARGADOR: SidebarNavEntry[] = [
  INICIO,
  POWERLOAD_IA,
  {
    type: "group",
    id: "bolsa-cargas",
    label: "Bolsa de Cargas",
    icon: "bolsa-cargas",
    defaultOpen: true,
    children: [
      { id: "publicar-carga", label: "Publicar Carga", icon: "publicar-carga", href: "/bolsa/publicar" },
      {
        id: "mis-publicaciones",
        label: "Mis Publicaciones",
        icon: "mis-publicaciones",
        href: "/bolsa/publicaciones",
      },
    ],
  },
  {
    type: "group",
    id: "ofertas-gestion",
    label: "Ofertas y Gestión",
    icon: "ofertas-gestion",
    defaultOpen: true,
    children: [
      {
        id: "ofertas-pendientes",
        label: "Ofertas Pendientes",
        icon: "ofertas-pendientes",
        href: "/ofertas/pendientes",
        badge: { count: 3, variant: "neutral" },
      },
      {
        id: "historial-ofertas",
        label: "Historial de Ofertas",
        icon: "historial-ofertas",
        href: "/ofertas/historial",
      },
    ],
  },
  {
    type: "group",
    id: "contabilidad",
    label: "Contabilidad",
    icon: "contabilidad",
    defaultOpen: true,
    children: [
      { id: "facturacion", label: "Facturación", icon: "facturacion", href: "/contabilidad/facturacion" },
    ],
  },
  {
    type: "group",
    id: "administracion",
    label: "Administración",
    icon: "administracion",
    defaultOpen: true,
    children: [
      { id: "usuarios", label: "Usuarios", icon: "usuarios", href: "/admin/usuarios" },
      { id: "suscripciones", label: "Suscripciones", icon: "suscripciones", href: "/admin/suscripciones" },
    ],
  },
  {
    type: "group",
    id: "herramientas",
    label: "Herramientas",
    icon: "herramientas",
    defaultOpen: true,
    children: [
      { id: "facturacion-herramientas", label: "Facturación", icon: "facturacion", href: "/herramientas/facturacion" },
      {
        id: "cotizador-cargas",
        label: "Cotizador de cargas",
        icon: "cotizador-cargas",
        href: "/herramientas/cotizador",
        premium: true,
      },
    ],
  },
];

/** Operador logístico — perfil transportista (gestión para terceros) */
const NAV_OPERADOR_TRANSPORTISTA: SidebarNavEntry[] = [
  INICIO,
  POWERLOAD_IA,
  {
    type: "group",
    id: "bolsa-cargas",
    label: "Bolsa de Cargas",
    icon: "bolsa-cargas",
    defaultOpen: true,
    children: [
      { id: "buscar-cargas", label: "Buscar Cargas", icon: "buscar-cargas", href: "/bolsa/buscar" },
      {
        id: "busqueda-automatizada",
        label: "Búsqueda Automatizada",
        icon: "busqueda-automatizada",
        href: "/bolsa/automatizada",
      },
      { id: "en-curso", label: "En Curso", icon: "en-curso", href: "/bolsa/en-curso" },
      { id: "cancelados", label: "Cancelados", icon: "cancelados", href: "/bolsa/cancelados" },
      { id: "finalizados", label: "Finalizados", icon: "finalizados", href: "/bolsa/finalizados" },
    ],
  },
  {
    type: "group",
    id: "ofertas-negociaciones",
    label: "Ofertas y Negociaciones",
    icon: "ofertas-gestion",
    defaultOpen: true,
    children: [
      {
        id: "ofertas-pendientes",
        label: "Ofertas Pendientes",
        icon: "ofertas-pendientes",
        href: "/ofertas/pendientes",
        badge: { count: 3, variant: "primary" },
      },
      {
        id: "historial-ofertas",
        label: "Historial de Ofertas",
        icon: "historial-ofertas",
        href: "/ofertas/historial",
      },
    ],
  },
  {
    type: "group",
    id: "gasolineras",
    label: "Gasolineras",
    icon: "gasolineras",
    defaultOpen: true,
    children: [
      { id: "ver-gasolineras", label: "Ver Gasolineras", icon: "ver-gasolineras", href: "/gasolineras" },
      {
        id: "comprar-combustible",
        label: "Comprar Combustible",
        icon: "comprar-combustible",
        href: "/gasolineras/comprar",
      },
      {
        id: "asignar-combustible",
        label: "Asignar Combustible",
        icon: "asignar-combustible",
        href: "/gasolineras/asignar",
      },
      {
        id: "historial-repostajes",
        label: "Historial de Repostajes",
        icon: "historial-repostajes",
        href: "/gasolineras/historial",
      },
    ],
  },
  {
    type: "group",
    id: "contabilidad",
    label: "Contabilidad",
    icon: "contabilidad",
    defaultOpen: true,
    children: [
      { id: "datos-bancarios", label: "Datos Bancarios", icon: "datos-bancarios", href: "/contabilidad/datos-bancarios" },
      {
        id: "facturacion-ingresos",
        label: "Facturación Ingresos",
        icon: "facturacion-ingresos",
        href: "/contabilidad/ingresos",
      },
      {
        id: "facturacion-combustibles",
        label: "Facturación Combustibles",
        icon: "facturacion-combustibles",
        href: "/contabilidad/combustibles",
      },
    ],
  },
  {
    type: "group",
    id: "herramientas",
    label: "Herramientas",
    icon: "herramientas",
    defaultOpen: true,
    children: [
      {
        id: "costes-viajes",
        label: "Costes de Viajes",
        icon: "costes-viajes",
        href: "/herramientas/costes",
        premium: true,
      },
    ],
  },
];

/** Operador logístico — perfil cargador */
const NAV_OPERADOR_CARGADOR: SidebarNavEntry[] = [
  INICIO,
  POWERLOAD_IA,
  {
    type: "group",
    id: "gestion-operaciones",
    label: "Gestión de Operaciones",
    icon: "gestion-operaciones",
    defaultOpen: true,
    children: [
      {
        id: "registrar-cargas",
        label: "Registrar Cargas",
        icon: "registrar-cargas",
        href: "/operaciones/registrar",
      },
      {
        id: "mis-cargas-activas",
        label: "Mis Cargas Activas",
        icon: "mis-cargas-activas",
        href: "/operaciones/activas",
      },
      {
        id: "estado-pagos",
        label: "Estado de Pagos",
        icon: "estado-pagos",
        href: "/operaciones/pagos",
      },
      {
        id: "transportistas-proveedores",
        label: "Transportistas/Proveedores",
        icon: "transportistas-proveedores",
        href: "/operaciones/transportistas",
      },
    ],
  },
  {
    type: "group",
    id: "bolsa-cargas",
    label: "Bolsa de Cargas",
    icon: "bolsa-cargas",
    defaultOpen: true,
    children: [
      { id: "publicar-carga", label: "Publicar Carga", icon: "publicar-carga", href: "/bolsa/publicar" },
      {
        id: "mis-publicaciones",
        label: "Mis Publicaciones",
        icon: "mis-publicaciones",
        href: "/bolsa/publicaciones",
      },
      { id: "importar-cargas", label: "Importar cargas", icon: "importar-cargas", href: "/bolsa/importar" },
    ],
  },
  {
    type: "group",
    id: "contabilidad",
    label: "Contabilidad",
    icon: "contabilidad",
    defaultOpen: true,
    children: [
      { id: "facturacion", label: "Facturación", icon: "facturacion", href: "/contabilidad/facturacion" },
    ],
  },
  {
    type: "group",
    id: "herramientas",
    label: "Herramientas",
    icon: "herramientas",
    defaultOpen: true,
    children: [
      {
        id: "cotizador-cargas",
        label: "Cotizador de cargas",
        icon: "cotizador-cargas",
        href: "/herramientas/cotizador",
        premium: true,
      },
    ],
  },
];

/** Operador logístico — perfil admin (vista reducida) */
const NAV_OPERADOR_ADMIN: SidebarNavEntry[] = [
  INICIO,
  POWERLOAD_IA,
  {
    type: "group",
    id: "administracion",
    label: "Administración",
    icon: "administracion",
    defaultOpen: true,
    children: [
      { id: "usuarios", label: "Usuarios", icon: "usuarios", href: "/admin/usuarios" },
      { id: "suscripciones", label: "Suscripciones", icon: "suscripciones", href: "/admin/suscripciones" },
    ],
  },
];

/** Admin Powerload (trabajadores internos) */
const NAV_ADMIN: SidebarNavEntry[] = [
  INICIO,
  POWERLOAD_IA,
  { type: "link", id: "cargas", label: "Cargas", icon: "cargas", href: "/cargas" },
  {
    type: "group",
    id: "contactos",
    label: "Contactos",
    icon: "contactos",
    defaultOpen: true,
    children: [
      { id: "agenda", label: "Agenda", icon: "agenda", href: "/contactos/agenda" },
      { id: "captacion-ia", label: "Captación (IA)", icon: "captacion-ia", href: "/contactos/captacion" },
      { id: "campanas", label: "Campañas", icon: "campanas", href: "/contactos/campanas" },
    ],
  },
  {
    type: "group",
    id: "contabilidad",
    label: "Contabilidad",
    icon: "contabilidad",
    defaultOpen: true,
    children: [
      {
        id: "pagos-transportistas",
        label: "Pagos a transportistas",
        icon: "pagos-transportistas",
        href: "/contabilidad/pagos-transportistas",
      },
      {
        id: "ingresos-cargadores",
        label: "Ingresos de cargadores",
        icon: "ingresos-cargadores",
        href: "/contabilidad/ingresos-cargadores",
      },
      {
        id: "facturacion-combustibles",
        label: "Facturación combustibles",
        icon: "facturacion-combustibles",
        href: "/contabilidad/combustibles",
      },
      {
        id: "facturacion-personalizada",
        label: "Facturación personalizada",
        icon: "facturacion-personalizada",
        href: "/contabilidad/personalizada",
      },
      {
        id: "facturas-suscripcion",
        label: "Facturas suscripción",
        icon: "facturas-suscripcion",
        href: "/contabilidad/suscripcion",
      },
    ],
  },
  {
    type: "group",
    id: "gasolineras",
    label: "Gasolineras",
    icon: "gasolineras",
    defaultOpen: true,
    children: [
      {
        id: "ventas-combustible",
        label: "Ventas de combustible",
        icon: "ventas-combustible",
        href: "/gasolineras/ventas",
      },
      {
        id: "admin-gasolineras",
        label: "Administración",
        icon: "admin-gasolineras",
        href: "/gasolineras/admin",
      },
    ],
  },
  {
    type: "group",
    id: "administracion",
    label: "Administración",
    icon: "administracion",
    defaultOpen: true,
    children: [
      { id: "documentos", label: "Documentos", icon: "documentos", href: "/admin/documentos" },
      { id: "financiacion", label: "FInanciación", icon: "financiacion", href: "/admin/financiacion" },
      { id: "suscripciones", label: "Suscripciones", icon: "suscripciones", href: "/admin/suscripciones" },
    ],
  },
  {
    type: "group",
    id: "herramientas",
    label: "Herramientas",
    icon: "herramientas",
    defaultOpen: true,
    children: [
      {
        id: "solicitudes-excel",
        label: "Solicitudes Excel",
        icon: "solicitudes-excel",
        href: "/herramientas/excel",
      },
      {
        id: "calculadora-fletes",
        label: "Calculadora de Fletes (IA)",
        icon: "calculadora-fletes",
        href: "/herramientas/calculadora",
        premium: true,
      },
    ],
  },
];

export function getSidebarNav(
  userRole: SidebarUserRole,
  operadorProfile?: OperadorProfile,
): SidebarNavEntry[] {
  if (userRole === "transportista") return NAV_TRANSPORTISTA;
  if (userRole === "cargador") return NAV_CARGADOR;
  if (userRole === "admin") return NAV_ADMIN;
  if (userRole === "operador") {
    if (operadorProfile === "cargador") return NAV_OPERADOR_CARGADOR;
    if (operadorProfile === "admin") return NAV_OPERADOR_ADMIN;
    return NAV_OPERADOR_TRANSPORTISTA;
  }
  return NAV_TRANSPORTISTA;
}

/** Recoge todos los href de un árbol de navegación */
export function collectSidebarHrefs(entries: SidebarNavEntry[]): string[] {
  const hrefs: string[] = [];
  for (const entry of entries) {
    if (entry.type === "link") {
      hrefs.push(entry.href);
    } else {
      for (const child of entry.children) hrefs.push(child.href);
    }
  }
  return hrefs;
}
