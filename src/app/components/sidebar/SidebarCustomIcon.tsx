// ─── Icono SVG personalizado (16px / 22px) con color vía currentColor ───────
//
// FIX: Anteriormente usaba ?url + CSS mask-image. El problema es que los SVGs
// tienen referencias internas clip-path="url(#id)" que el navegador NO puede
// resolver cuando el SVG se carga como imagen externa en mask-image. Resultado:
// máscara fallida → background-color: currentColor → bloque sólido oscuro.
//
// SOLUCIÓN: Importar con ?raw para obtener el string SVG completo y renderizarlo
// inline en el DOM. Las referencias internas (clip-path, defs) se resuelven
// correctamente, y fill="currentColor" hereda el color del CSS parent.
 
import { useMemo } from "react";
import {
  Box,
  Briefcase,
  Calculator,
  Crown,
  FileText,
  Fuel,
  Home,
  LayoutDashboard,
  Leaf,
  Package,
  Sparkles,
  Truck,
  Users,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SIDEBAR_ICON_FILES } from "./sidebarIconMap";
 
// ─── Carga los SVG como strings en tiempo de build ───────────────────────────
// ?raw devuelve el contenido completo del SVG como string (no URL).
// eager:true los incluye en el bundle sin lazy loading.
const SVG_RAW = import.meta.glob<string>(
  "/src/assets/iconos-personalizados/*.svg",
  { eager: true, query: "?raw", import: "default" },
);
 
// ─── Fallbacks Lucide (cuando no existe archivo SVG en assets) ───────────────
const LUCIDE_FALLBACK: Record<string, LucideIcon> = {
  inicio: Home,
  dashboard: LayoutDashboard,
  "gestion-ecologica": Leaf,
  "powerload-ia": Sparkles,
  "gestion-operaciones": Truck,
  "bolsa-cargas": Package,
  "ofertas-gestion": Truck,
  "ofertas-negociaciones": Truck,
  gasolineras: Fuel,
  contabilidad: Calculator,
  administracion: Users,
  herramientas: Briefcase,
  cargas: Package,
  contactos: Users,
  default: Box,
  facturacion: Wallet,
  usuarios: Users,
  suscripciones: Users,
};
 
/**
 * Prepara el string SVG para inyección inline:
 *
 * 1. Fuerza width/height en el elemento <svg> raíz al tamaño deseado.
 * 2. Reemplaza todos los fill="<color>" (excepto fill="none") con
 *    fill="currentColor" para que el ícono herede el color CSS del padre.
 *
 * fill="none" se preserva siempre (son paths stroke-only / transparentes).
 */
function toInlineSvg(raw: string, px: number): string {
  return (
    raw
      // ── 1. Sobrescribir dimensiones en la etiqueta <svg> ──────────────────
      .replace(/<svg([^>]*)>/, (_, attrs: string) => {
        const clean = attrs
          .replace(/\s+width="[^"]*"/g, "")
          .replace(/\s+height="[^"]*"/g, "");
        return `<svg${clean} width="${px}" height="${px}" style="display:block;flex-shrink:0;">`;
      })
      // ── 2. Reemplazar colores explícitos con currentColor ─────────────────
      // Negative lookahead (?!none) preserva fill="none"
      .replace(/fill="(?!none)([^"]*)"/g, 'fill="currentColor"')
  );
}
 
/** Resuelve el nombre lógico a su string SVG raw, o undefined si no existe. */
function resolveRawSvg(name: string): string | undefined {
  const file = SIDEBAR_ICON_FILES[name] ?? name;
  const key = `/src/assets/iconos-personalizados/${file}.svg`;
  return SVG_RAW[key];
}
 
// ─── Tipos ───────────────────────────────────────────────────────────────────
 
export interface SidebarCustomIconProps {
  name: string;
  /** `menu` → 22px  ·  `sub` → 16px */
  size?: "menu" | "sub";
  className?: string;
}
 
// ─── Componente principal ────────────────────────────────────────────────────
 
export function SidebarCustomIcon({
  name,
  size = "sub",
  className = "",
}: SidebarCustomIconProps) {
  const px = size === "menu" ? 22 : 16;
 
  const rawSvg = useMemo(() => resolveRawSvg(name), [name]);
 
  // Procesa el SVG solo cuando cambia el nombre o tamaño (memoizado)
  const processedSvg = useMemo(
    () => (rawSvg != null ? toInlineSvg(rawSvg, px) : null),
    [rawSvg, px],
  );
 
  // ── Rama SVG inline ───────────────────────────────────────────────────────
  if (processedSvg != null) {
    return (
      <span
        className={[
          "pl-sidebar-custom-icon",
          size === "menu" ? "pl-sidebar-custom-icon--menu" : "",
          className,
        ]
          .filter(Boolean)
          .join(" ")}
        // SVG inline: las referencias clip-path/defs se resuelven en el DOM,
        // y fill="currentColor" hereda el color CSS del contenedor padre.
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: processedSvg }}
        aria-hidden
      />
    );
  }
 
  // ── Rama fallback Lucide ──────────────────────────────────────────────────
  const Fallback = LUCIDE_FALLBACK[name] ?? LUCIDE_FALLBACK.default;
  return (
    <Fallback
      size={px}
      strokeWidth={size === "menu" ? 1.75 : 1.5}
      className={className}
      aria-hidden
    />
  );
}
 
// ─── Iconos auxiliares (sin cambios) ─────────────────────────────────────────
 
export function SidebarPremiumCrown() {
  return (
    <Crown
      size={14}
      fill="#FBC02D"
      stroke="#AE7D03"
      strokeWidth={1.25}
      aria-label="Premium"
    />
  );
}
 
/** Ícono decorativo cuando no hay SVG en assets (solo guía) */
export function SidebarDocIcon({ name }: { name: string }) {
  const Icon = LUCIDE_FALLBACK[name] ?? FileText;
  return <Icon size={16} strokeWidth={1.5} aria-hidden />;
}
 