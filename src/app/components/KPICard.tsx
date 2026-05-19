// ─── KPICard Component ────────────────────────────────────────────────────────
//
// Tarjeta de métricas para dashboards de facturación y operaciones.
// Contenedor blanco con bordes redondeados, borde perimetral fino y padding interno.
// Muestra etiqueta descriptiva, valor principal formateado con moneda,
// indicador de tendencia con flecha direccional y subtexto opcional.
//
// Features:
//   - Borde redondeado de 12px
//   - Padding interno de 20px
//   - Tipografía Poppins en todos los niveles
//   - Formateo automático de miles (separador europeo) y símbolo de moneda
//   - Indicador de tendencia con colores semánticos (verde/rojo/gris)
//   - Tooltip en hover del indicador de tendencia
//   - Estado hover con elevación de sombra
//   - Flexible para grids responsivos
//   - Manejo de valores cero, negativos o pendientes
//
// Design tokens: exclusivamente variables CSS
//   --color/neutral/50    → Fondo de la tarjeta
//   --color/neutral/200   → Borde perimetral
//   --color/neutral/400   → Etiqueta descriptiva
//   --color/neutral/600   → Subtexto
//   --color/neutral/900   → Valor principal
//   --color/success/600   → Tendencia positiva
//   --color/danger/600    → Tendencia negativa
//   --color/neutral/500   → Tendencia neutra
//   --shadow/sm           → Sombra base
//   --shadow/md           → Sombra hover
//

import React, { useState } from "react";
import { ArrowUp, ArrowDown, Minus } from "lucide-react";
import { Tooltip } from "../Tooltip";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface TrendData {
  /** Porcentaje de variación (ej: 18 para +18%) */
  value: number;
  /** Dirección de la tendencia: "up", "down" o "neutral" */
  direction: "up" | "down" | "neutral";
  /** Texto explicativo del periodo (ej: "vs. mes anterior") */
  period: string;
}

export interface KPICardProps {
  /** Etiqueta descriptiva en la parte superior (12px gris) */
  label: string;
  /** Valor principal numérico a mostrar */
  value: number;
  /** Código de moneda: EUR, USD, GBP, CUP */
  currency?: "EUR" | "USD" | "GBP" | "CUP";
  /** Datos de tendencia opcional */
  trend?: TrendData;
  /** Subtexto opcional para contextualizar el dato (11px) */
  subtitle?: string;
  /** Clase CSS adicional opcional */
  className?: string;
  /** Ancho personalizado (ej: "100%", "auto", "250px") */
  width?: string;
}

// ─── Símbolos de moneda ───────────────────────────────────────────────────────

const CURRENCY_SYMBOLS: Record<"EUR" | "USD" | "GBP" | "CUP", string> = {
  EUR: "€",
  USD: "$",
  GBP: "£",
  CUP: "$",
};

// ─── Utilidad de formateo ─────────────────────────────────────────────────────
/**
 * Formatea un número con separadores de miles europeos y símbolo de moneda.
 * Ej: 12450.00 → "12.450,00 €"
 */
function formatCurrency(value: number, currency: "EUR" | "USD" | "GBP" | "CUP"): string {
  const locale = currency === "CUP" ? "es-CU" : "es-ES";
  
  const formatted = new Intl.NumberFormat(locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
  
  return `${formatted} ${CURRENCY_SYMBOLS[currency]}`;
}

// ─── Main Component: KPICard ──────────────────────────────────────────────────

export function KPICard({
  label,
  value,
  currency = "EUR",
  trend,
  subtitle,
  className,
  width,
}: KPICardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Determinar color y icono de la tendencia
  const getTrendStyles = () => {
    if (!trend) return null;

    const { direction, value: trendValue } = trend;

    let color: string;
    let Icon: React.ComponentType<{ style?: React.CSSProperties }>;

    if (direction === "up") {
      color = "var(--color/success/600)";
      Icon = ArrowUp;
    } else if (direction === "down") {
      color = "var(--color/danger/600)";
      Icon = ArrowDown;
    } else {
      color = "var(--color/neutral/500)";
      Icon = Minus;
    }

    return { color, Icon, trendValue };
  };

  const trendStyles = getTrendStyles();

  // Estilos del contenedor principal
  const containerStyles: React.CSSProperties = {
    backgroundColor: "var(--color/neutral/50)",
    borderRadius: "12px",
    border: "1px solid var(--color/neutral/200)",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: width || "100%",
    boxSizing: "border-box",
    transition: "box-shadow 200ms ease-in-out, transform 200ms ease-in-out",
    boxShadow: isHovered 
      ? "0 4px 12px rgba(0, 0, 0, 0.08)" 
      : "0 2px 4px rgba(0, 0, 0, 0.04)",
    transform: isHovered ? "translateY(-2px)" : "translateY(0)",
    cursor: "default",
  };

  // Estilos de la etiqueta descriptiva
  const labelStyles: React.CSSProperties = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "12px",
    fontWeight: 400,
    color: "var(--color/neutral/400)",
    lineHeight: 1.4,
    margin: 0,
  };

  // Contenedor del valor principal y tendencia
  const valueContainerStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  };

  // Estilos del valor principal
  const valueStyles: React.CSSProperties = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "24px",
    fontWeight: 600,
    color: "var(--color/neutral/900)",
    lineHeight: 1.2,
    whiteSpace: "nowrap",
    margin: 0,
  };

  // Estilos del indicador de tendencia
  const trendIndicatorStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "2px",
    padding: "2px 6px",
    borderRadius: "4px",
    backgroundColor: trendStyles 
      ? `${trendStyles.color}10` // 10% de opacidad
      : "transparent",
  };

  // Estilos del icono de tendencia
  const trendIconStyles: React.CSSProperties = {
    width: "14px",
    height: "14px",
    color: trendStyles?.color,
  };

  // Estilos del texto de tendencia
  const trendTextStyles: React.CSSProperties = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "12px",
    fontWeight: 600,
    color: trendStyles?.color,
    lineHeight: 1.2,
  };

  // Estilos del subtexto
  const subtitleStyles: React.CSSProperties = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "11px",
    fontWeight: 400,
    color: "var(--color/neutral/600)",
    lineHeight: 1.3,
    margin: 0,
  };

  // Handler para mouse enter/leave
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  // Formatear el valor
  const formattedValue = formatCurrency(value, currency);

  return (
    <div
      className={className}
      style={containerStyles}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Etiqueta descriptiva */}
      <span style={labelStyles}>{label}</span>

      {/* Valor principal + tendencia */}
      <div style={valueContainerStyles}>
        <span style={valueStyles}>{formattedValue}</span>
        
        {/* Indicador de tendencia (condicional) */}
        {trendStyles && trend && (
          <Tooltip content={trend.period} delay={300}>
            <div style={trendIndicatorStyles}>
              <trendStyles.Icon style={trendIconStyles} />
              <span style={trendTextStyles}>
                {trend.direction === "up" ? "+" : ""}{trendValue}%
              </span>
            </div>
          </Tooltip>
        )}
      </div>

      {/* Subtexto opcional */}
      {subtitle && (
        <span style={subtitleStyles}>{subtitle}</span>
      )}
    </div>
  );
}

export type { KPICardProps, TrendData };
