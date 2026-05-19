// ─── MyLoadsPage Component ────────────────────────────────────────────────────
//
// Página principal de gestión de cargas logísticas.
// Integra todos los componentes previos en un flujo coherente:
// - Barra lateral con navegación
// - Barra superior con buscador y perfil
// - Navegación por pestañas con filtros
// - Tabla de datos con registros de logística
// - Paginación y estados de carga/vacío
//
// Features:
//   - Layout estándar con sidebar y topbar
//   - Tabs con badges de conteo dinámico
//   - Tabla responsive con DataTable
//   - Estados de carga con skeletons
//   - Estado vacío con mensaje claro
//   - Responsive: tabla → tarjetas en móvil
//   - Gestión de estado entre pestañas y filtros
//

import React, { useState, useMemo } from "react";
import { PowerloadSidebar } from "../components/sidebar/PowerloadSidebar";
import { PowerloadTopbar } from "../components/topbar/PowerloadTopbar";
import { TabsPill } from "../components/tabs/TabsPill";
import { DataTable } from "../components/data-table/DataTable";
import type { ColumnConfig } from "../components/data-table/DataTable";
import { RouteDisplay } from "../components/route/RouteDisplay";
import type { RoutePointData } from "../components/route/RouteDisplay";
import { PriceDisplay } from "../components/price/PriceDisplay";
import { StatusProgress } from "../components/status/StatusProgress";
import { ContactActions } from "../components/contact/ContactActions";
import type { ContactItem } from "../components/contact/ContactActions";
import { KPICard } from "../components/KPICard";
import type { TrendData } from "../components/KPICard";
import { MoreHorizontal, Plus } from "lucide-react";
import { PowerloadButton } from "../components/PowerloadButton";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LoadData {
  id: string;
  route: {
    origin: string;
    destination: string;
    originDateTime: string;
    destinationDateTime: string;
  };
  company: string;
  price: number;
  pricePerKm: number;
  status: number;
  statusLabel: string;
  statusVariant: "success" | "warning" | "danger" | "info" | "neutral";
  contacts: ContactItem[];
  actions: string[];
}

interface TabData {
  id: string;
  label: string;
  count: number;
  badgeColor?: "primary" | "neutral" | "dark";
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_LOADS: LoadData[] = [
  {
    id: "PL-2405-00125",
    route: {
      origin: "Algeciras",
      destination: "Madrid",
      originDateTime: "05/05 - 08:00",
      destinationDateTime: "06/05 - 14:00",
    },
    company: "Powerload SL",
    price: 650,
    pricePerKm: 1.32,
    status: 60,
    statusLabel: "En tránsito",
    statusVariant: "info",
    contacts: [
      { role: "Chofer", type: "phone", value: "+34 600 123 456" },
      { role: "Transportista", type: "whatsapp", value: "+34 600 987 654" },
    ],
    actions: ["ver", "editar"],
  },
  {
    id: "PL-2405-00126",
    route: {
      origin: "Barcelona",
      destination: "Valencia",
      originDateTime: "05/05 - 09:00",
      destinationDateTime: "05/05 - 13:00",
    },
    company: "Transports BCN",
    price: 420,
    pricePerKm: 1.15,
    status: 85,
    statusLabel: "Casi completada",
    statusVariant: "success",
    contacts: [
      { role: "Chofer", type: "phone", value: "+34 610 234 567" },
    ],
    actions: ["ver"],
  },
  {
    id: "PL-2405-00127",
    route: {
      origin: "Sevilla",
      destination: "Bilbao",
      originDateTime: "04/05 - 07:00",
      destinationDateTime: "05/05 - 18:00",
    },
    company: "Andalucía Express",
    price: 890,
    pricePerKm: 1.45,
    status: 30,
    statusLabel: "Recogida realizada",
    statusVariant: "warning",
    contacts: [
      { role: "Cargador", type: "phone", value: "+34 620 345 678" },
      { role: "Chofer", type: "email", value: "chofer@andalucia.es" },
    ],
    actions: ["ver", "editar"],
  },
  {
    id: "PL-2405-00128",
    route: {
      origin: "Zaragoza",
      destination: "A Coruña",
      originDateTime: "05/05 - 06:00",
      destinationDateTime: "05/05 - 16:00",
    },
    company: "Norte Logística",
    price: 720,
    pricePerKm: 1.28,
    status: 100,
    statusLabel: "Completada",
    statusVariant: "success",
    contacts: [
      { role: "Chofer", type: "whatsapp", value: "+34 630 456 789" },
    ],
    actions: ["ver", "facturar"],
  },
  {
    id: "PL-2405-00129",
    route: {
      origin: "Málaga",
      destination: "San Sebastián",
      originDateTime: "06/05 - 08:00",
      destinationDateTime: "07/05 - 12:00",
    },
    company: "Costa Sur Transportes",
    price: 950,
    pricePerKm: 1.52,
    status: 0,
    statusLabel: "Pendiente",
    statusVariant: "neutral",
    contacts: [],
    actions: ["ver", "editar", "cancelar"],
  },
];

const TABS_DATA: TabData[] = [
  { id: "en_curso", label: "En curso", count: 12, badgeColor: "primary" },
  { id: "completadas", label: "Completadas", count: 48, badgeColor: "neutral" },
  { id: "canceladas", label: "Canceladas", count: 3, badgeColor: "dark" },
  { id: "borradores", label: "Borradores", count: 5, badgeColor: "neutral" },
];

// ─── Main Component: MyLoadsPage ──────────────────────────────────────────────

export function MyLoadsPage() {
  const [activeTab, setActiveTab] = useState("en_curso");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Filtrar datos según la pestaña activa (simulado)
  const filteredData = useMemo(() => {
    // En producción, esto vendría de una API o store
    switch (activeTab) {
      case "completadas":
        return MOCK_LOADS.filter(l => l.status === 100);
      case "canceladas":
        return MOCK_LOADS.filter(l => l.statusVariant === "danger");
      case "borradores":
        return MOCK_LOADS.filter(l => l.status === 0);
      default:
        return MOCK_LOADS;
    }
  }, [activeTab]);

  // Paginación
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, currentPage]);

  const totalPages = Math.ceil(filteredData.length / pageSize);

  // Configuración de columnas para DataTable
  const columns: ColumnConfig<LoadData>[] = [
    {
      key: "id",
      label: "ID Carga",
      width: "120px",
      align: "left",
      render: (data) => (
        <span style={{ 
          fontFamily: "'Poppins', sans-serif", 
          fontSize: "13px", 
          fontWeight: 500,
          color: "var(--color/neutral/900)"
        }}>
          {data.id}
        </span>
      ),
    },
    {
      key: "route",
      label: "Ruta",
      width: "minmax(200px, 1fr)",
      align: "left",
      render: (data) => (
        <RouteDisplay
          origin={{
            city: data.route.origin,
            country: "ES",
            dateTime: data.route.originDateTime,
          }}
          destination={{
            city: data.route.destination,
            country: "ES",
            dateTime: data.route.destinationDateTime,
          }}
          size="sm"
          showConnector={true}
        />
      ),
    },
    {
      key: "company",
      label: "Empresa",
      width: "150px",
      align: "left",
      hideOnMobile: true,
      render: (data) => (
        <span style={{ 
          fontFamily: "'Poppins', sans-serif", 
          fontSize: "13px", 
          fontWeight: 400,
          color: "var(--color/neutral/700)"
        }}>
          {data.company}
        </span>
      ),
    },
    {
      key: "price",
      label: "Precio",
      width: "120px",
      align: "right",
      render: (data) => (
        <PriceDisplay
          total={data.price}
          perKm={data.pricePerKm}
          currency="EUR"
          size="sm"
          layout="vertical"
        />
      ),
    },
    {
      key: "status",
      label: "Estado",
      width: "140px",
      align: "center",
      render: (data) => (
        <StatusProgress
          label={data.statusLabel}
          progress={data.status}
          variant={data.statusVariant}
          size="sm"
          showPercentage={false}
          layout="horizontal"
        />
      ),
    },
    {
      key: "contacts",
      label: "Contactos",
      width: "120px",
      align: "left",
      hideOnMobile: true,
      render: (data) => (
        <ContactActions contacts={data.contacts} />
      ),
    },
    {
      key: "actions",
      label: "",
      width: "50px",
      align: "center",
      render: () => (
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "4px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "4px",
            transition: "background-color 150ms ease-in-out",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color/neutral/100)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "transparent";
          }}
          aria-label="Más acciones"
        >
          <MoreHorizontal 
            size={18} 
            style={{ color: "var(--color/neutral/600)" }} 
          />
        </button>
      ),
    },
  ];

  // KPIs para mostrar arriba
  const kpiData = [
    {
      label: "Total facturado",
      value: 12450.00,
      currency: "EUR" as const,
      trend: { value: 18, direction: "up" as const, period: "vs. mes anterior" },
      subtitle: "74% del total facturado este trimestre",
    },
    {
      label: "Cargas activas",
      value: 24,
      currency: "EUR" as const,
      trend: { value: 5, direction: "up" as const, period: "vs. semana anterior" },
      subtitle: "12 en curso, 12 pendientes",
    },
    {
      label: "Ticket medio",
      value: 687.50,
      currency: "EUR" as const,
      trend: { value: -3, direction: "down" as const, period: "vs. mes anterior" },
      subtitle: "Por carga completada",
    },
    {
      label: "Kilómetros totales",
      value: 8450,
      currency: "EUR" as const,
      trend: { value: 0, direction: "neutral" as const, period: "vs. mes anterior" },
      subtitle: "Este mes",
    },
  ];

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "var(--color/neutral/50)" }}>
      {/* Sidebar */}
      <PowerloadSidebar />

      {/* Contenedor principal */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Topbar */}
        <PowerloadTopbar />

        {/* Área de contenido principal */}
        <main style={{ 
          flex: 1, 
          padding: "24px 32px", 
          overflowY: "auto" 
        }}>
          {/* Encabezado de sección */}
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ 
              fontFamily: "'Poppins', sans-serif", 
              fontSize: "24px", 
              fontWeight: 600,
              color: "var(--color/neutral/900)",
              margin: "0 0 8px 0"
            }}>
              Mis Cargas
            </h1>
            <p style={{ 
              fontFamily: "'Poppins', sans-serif", 
              fontSize: "14px", 
              fontWeight: 400,
              color: "var(--color/neutral/600)",
              margin: 0
            }}>
              Gestiona y da seguimiento a todas tus operaciones logísticas
            </p>
          </div>

          {/* KPI Cards */}
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", 
            gap: "16px", 
            marginBottom: "24px" 
          }}>
            {kpiData.map((kpi, index) => (
              <KPICard
                key={index}
                label={kpi.label}
                value={kpi.value}
                currency={kpi.currency}
                trend={kpi.trend}
                subtitle={kpi.subtitle}
              />
            ))}
          </div>

          {/* Navegación por pestañas */}
          <div style={{ marginBottom: "20px" }}>
            <TabsPill
              tabs={TABS_DATA}
              activeTab={activeTab}
              onTabChange={setActiveTab}
              size="md"
              align="left"
            />
          </div>

          {/* Botón de nueva carga */}
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "center",
            marginBottom: "16px" 
          }}>
            <span style={{ 
              fontFamily: "'Poppins', sans-serif", 
              fontSize: "13px", 
              fontWeight: 500,
              color: "var(--color/neutral/700)"
            }}>
              {filteredData.length} cargas encontradas
            </span>
            <PowerloadButton
              variant="primary"
              size="md"
              icon={<Plus size={18} />}
              onClick={() => console.log("Nueva carga")}
            >
              Publicar nueva carga
            </PowerloadButton>
          </div>

          {/* Tabla de datos */}
          <DataTable
            data={paginatedData}
            columns={columns}
            pageSize={pageSize}
            loading={isLoading}
            skeletonRows={5}
            emptyMessage="No hay cargas en esta categoría. ¡Publica tu primera carga!"
            onPageChange={setCurrentPage}
            selectable={false}
          />
        </main>
      </div>
    </div>
  );
}

export default MyLoadsPage;
