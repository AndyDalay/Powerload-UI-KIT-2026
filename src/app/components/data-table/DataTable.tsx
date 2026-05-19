// ─── DataTable Component ──────────────────────────────────────────────────────
//
// Central organism for operational listings like "Mis Cargas" or "Facturación".
// Renders a responsive table with sticky header, pagination, empty states,
// and loading skeletons. Integrates molecular components (RouteDisplay, PriceDisplay,
// StatusProgress, ContactActions, etc.) via flexible column configuration.
//
// Features:
//   - Sticky header with uppercase 11px semibold labels
//   - Row min-height with bottom border separator
//   - Hover state with subtle background change
//   - Custom cell alignment per column
//   - Pagination with compact square buttons (active: primary red, inactive: ghost)
//   - Empty state with illustration + contextual message
//   - Loading state with skeleton cells matching column shapes
//   - Responsive without fixed widths
//
// Design tokens: exclusively CSS variables
//   --color/neutral/50    → Header background
//   --color/neutral/100   → Row hover background
//   --color/neutral/200   → Row border separator
//   --color/neutral/400   → Inactive pagination text
//   --color/neutral/600   → Empty state message
//   --color/neutral/900   → Header label text
//   --color/primary/600   → Active pagination button background
//   --color/primary/700   → Active pagination button hover
//   --color/primary/400   → Focus outline
//

import React, { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * Column configuration for the DataTable.
 * Each column maps a data key to a label and an optional component renderer.
 */
export interface ColumnConfig<T = any> {
  /** Unique key matching the data object property */
  key: keyof T | string;
  /** Label displayed in the header (uppercase, 11px semibold) */
  label: string;
  /** Optional molecular component to render cell content */
  component?: React.ComponentType<any>;
  /** Custom cell width (e.g., "150px", "20%", "minmax(100px, 1fr)") */
  width?: string;
  /** Horizontal alignment of cell content */
  align?: "left" | "center" | "right";
  /** Custom cell renderer (overrides component prop) */
  render?: (data: T, rowIndex: number) => React.ReactNode;
  /** Hide this column on mobile */
  hideOnMobile?: boolean;
}

/**
 * Data row shape - flexible to accommodate any dataset.
 */
export type DataRow = Record<string, any>;

export interface DataTableProps<T extends DataRow = DataRow> {
  /** Array of data objects to display */
  data: T[];
  /** Column configuration array */
  columns: ColumnConfig<T>[];
  /** Number of rows per page (default: 10) */
  pageSize?: number;
  /** Callback when page changes */
  onPageChange?: (page: number) => void;
  /** Custom empty state message */
  emptyMessage?: string;
  /** Show loading skeleton state */
  loading?: boolean;
  /** Number of skeleton rows to show when loading */
  skeletonRows?: number;
  /** Optional className for custom styling */
  className?: string;
  /** Enable row selection (adds checkbox column) */
  selectable?: boolean;
  /** Callback when row is clicked */
  onRowClick?: (row: T, rowIndex: number) => void;
  /** Disable hover effect on rows */
  disableHover?: boolean;
  /** Custom row height in pixels (default: 56) */
  rowHeight?: number;
}

// ─── Size tokens ──────────────────────────────────────────────────────────────

const HEADER_HEIGHT = 48;
const DEFAULT_ROW_HEIGHT = 56;
const CELL_PADDING_Y = 12;
const CELL_PADDING_X = 16;
const PAGINATION_BUTTON_SIZE = 32;

// ─── Micro-component: SkeletonCell ────────────────────────────────────────────
// Placeholder cell for loading state

interface SkeletonCellProps {
  width?: string;
  height?: number;
  align?: "left" | "center" | "right";
}

function SkeletonCell({ width = "100%", height = 16, align = "left" }: SkeletonCellProps) {
  const containerStyles: React.CSSProperties = {
    display: "flex",
    justifyContent: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
    alignItems: "center",
    width: "100%",
    height: "100%",
    padding: `${CELL_PADDING_Y}px ${CELL_PADDING_X}px`,
  };

  const skeletonStyles: React.CSSProperties = {
    width,
    height: `${height}px`,
    backgroundColor: "var(--color/neutral/200)",
    borderRadius: "4px",
    animation: "pulse 1.5s ease-in-out infinite",
  };

  return (
    <div style={containerStyles}>
      <div style={skeletonStyles} />
    </div>
  );
}

// ─── Micro-component: PaginationButton ────────────────────────────────────────
// Compact square button for pagination navigation

interface PaginationButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  active?: boolean;
  children: React.ReactNode;
  ariaLabel: string;
}

function PaginationButton({ onClick, disabled, active, children, ariaLabel }: PaginationButtonProps) {
  const baseStyles: React.CSSProperties = {
    width: `${PAGINATION_BUTTON_SIZE}px`,
    height: `${PAGINATION_BUTTON_SIZE}px`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Poppins', sans-serif",
    fontSize: "14px",
    fontWeight: 500,
    border: "1px solid var(--color/neutral/200)",
    borderRadius: "6px",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 150ms ease-in-out",
    backgroundColor: active ? "var(--color/primary/600)" : "transparent",
    color: active ? "#FFFFFF" : "var(--color/neutral/600)",
    opacity: disabled ? 0.5 : 1,
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !active) {
      e.currentTarget.style.backgroundColor = "var(--color/neutral/50)";
      e.currentTarget.style.color = "var(--color/neutral/900)";
    } else if (!disabled && active) {
      e.currentTarget.style.backgroundColor = "var(--color/primary/700)";
    }
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      e.currentTarget.style.backgroundColor = active ? "var(--color/primary/600)" : "transparent";
      e.currentTarget.style.color = active ? "#FFFFFF" : "var(--color/neutral/600)";
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLButtonElement>) => {
    if (!disabled) {
      e.currentTarget.style.outline = "2px solid var(--color/primary/400)";
      e.currentTarget.style.outlineOffset = "2px";
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLButtonElement>) => {
    e.currentTarget.style.outline = "none";
  };

  return (
    <button
      style={baseStyles}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-label={ariaLabel}
      tabIndex={disabled ? -1 : 0}
    >
      {children}
    </button>
  );
}

// ─── Micro-component: PageNumberButton ────────────────────────────────────────
// Square button displaying a page number

interface PageNumberButtonProps {
  pageNumber: number;
  currentPage: number;
  onClick: (page: number) => void;
}

function PageNumberButton({ pageNumber, currentPage, onClick }: PageNumberButtonProps) {
  return (
    <PaginationButton
      onClick={() => onClick(pageNumber)}
      active={pageNumber === currentPage}
      ariaLabel={`Página ${pageNumber}`}
    >
      {pageNumber}
    </PaginationButton>
  );
}

// ─── Micro-component: Pagination ──────────────────────────────────────────────
// Full pagination control with navigation buttons and page numbers

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  // Generate page numbers to display (max 5 visible)
  const pages = useMemo(() => {
    const delta = 2;
    const range: (number | "...")[] = [];
    
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift("...");
    }
    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }

    range.unshift(1);
    if (totalPages > 1) {
      range.push(totalPages);
    }

    return range;
  }, [currentPage, totalPages]);

  const containerStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: "8px",
    paddingTop: "16px",
    paddingBottom: "16px",
    borderTop: "1px solid var(--color/neutral/200)",
  };

  return (
    <div style={containerStyles}>
      {/* First page */}
      <PageNumberButton pageNumber={1} currentPage={currentPage} onClick={onPageChange} />

      {/* Ellipsis before current range */}
      {pages[1] === "..." && (
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "14px",
            color: "var(--color/neutral/400)",
            width: PAGINATION_BUTTON_SIZE,
            textAlign: "center",
          }}
        >
          ...
        </span>
      )}

      {/* Middle pages */}
      {pages.filter((p) => p !== 1 && p !== totalPages && p !== "...").map((page) => (
        typeof page === "number" && (
          <PageNumberButton
            key={page}
            pageNumber={page}
            currentPage={currentPage}
            onClick={onPageChange}
          />
        )
      ))}

      {/* Ellipsis after current range */}
      {pages[pages.length - 2] === "..." && (
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontSize: "14px",
            color: "var(--color/neutral/400)",
            width: PAGINATION_BUTTON_SIZE,
            textAlign: "center",
          }}
        >
          ...
        </span>
      )}

      {/* Last page */}
      {totalPages > 1 && (
        <PageNumberButton pageNumber={totalPages} currentPage={currentPage} onClick={onPageChange} />
      )}

      {/* Divider */}
      <div
        style={{
          width: "1px",
          height: "24px",
          backgroundColor: "var(--color/neutral/200)",
          margin: "0 4px",
        }}
      />

      {/* Previous page */}
      <PaginationButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        ariaLabel="Página anterior"
      >
        <ChevronLeft size={18} strokeWidth={2} />
      </PaginationButton>

      {/* Next page */}
      <PaginationButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        ariaLabel="Página siguiente"
      >
        <ChevronRight size={18} strokeWidth={2} />
      </PaginationButton>
    </div>
  );
}

// ─── Micro-component: EmptyState ──────────────────────────────────────────────
// Illustration and message when no data is available

interface EmptyStateProps {
  message: string;
}

function EmptyState({ message }: EmptyStateProps) {
  const containerStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "64px 16px",
    textAlign: "center",
  };

  const illustrationStyles: React.CSSProperties = {
    width: "80px",
    height: "80px",
    marginBottom: "16px",
    opacity: 0.6,
  };

  const messageStyles: React.CSSProperties = {
    fontFamily: "'Poppins', sans-serif",
    fontSize: "14px",
    fontWeight: 500,
    color: "var(--color/neutral/600)",
    lineHeight: 1.4,
    margin: 0,
  };

  // Simple empty state illustration (abstract table icon)
  const EmptyIllustration = () => (
    <svg
      style={illustrationStyles}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="8" y="16" width="64" height="48" rx="4" fill="var(--color/neutral/200)" />
      <rect x="16" y="24" width="48" height="4" rx="2" fill="var(--color/neutral/300)" />
      <rect x="16" y="34" width="32" height="4" rx="2" fill="var(--color/neutral/300)" />
      <rect x="16" y="44" width="40" height="4" rx="2" fill="var(--color/neutral/300)" />
      <rect x="16" y="54" width="28" height="4" rx="2" fill="var(--color/neutral/300)" />
    </svg>
  );

  return (
    <div style={containerStyles}>
      <EmptyIllustration />
      <p style={messageStyles}>{message}</p>
    </div>
  );
}

// ─── Main Component: DataTable ────────────────────────────────────────────────

export function DataTable<T extends DataRow = DataRow>({
  data,
  columns,
  pageSize = 10,
  onPageChange,
  emptyMessage = "No hay datos disponibles",
  loading = false,
  skeletonRows = 5,
  className,
  selectable = false,
  onRowClick,
  disableHover = false,
  rowHeight = DEFAULT_ROW_HEIGHT,
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate pagination
  const totalPages = Math.ceil(data.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = data.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onPageChange?.(page);
  };

  // Container styles
  const containerStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    fontFamily: "'Poppins', sans-serif",
    backgroundColor: "#FFFFFF",
    borderRadius: "8px",
    border: "1px solid var(--color/neutral/200)",
    overflow: "hidden",
  };

  // Table wrapper for horizontal scroll on mobile
  const tableWrapperStyles: React.CSSProperties = {
    width: "100%",
    overflowX: "auto",
    WebkitOverflowScrolling: "touch",
  };

  // Table styles
  const tableStyles: React.CSSProperties = {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "600px", // Minimum width to prevent crushing
  };

  // Header styles
  const headerStyles: React.CSSProperties = {
    position: "sticky",
    top: 0,
    zIndex: 10,
    backgroundColor: "var(--color/neutral/50)",
    borderBottom: "1px solid var(--color/neutral/200)",
  };

  // Header row styles
  const headerRowStyles: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: selectable
      ? `48px ${columns.map((c) => c.width || "1fr").join(" ")}`
      : columns.map((c) => c.width || "1fr").join(" "),
    minHeight: `${HEADER_HEIGHT}px`,
  };

  // Header cell styles
  const headerCellStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    padding: `${CELL_PADDING_Y}px ${CELL_PADDING_X}px`,
    fontFamily: "'Poppins', sans-serif",
    fontSize: "11px",
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    color: "var(--color/neutral/900)",
    lineHeight: 1.2,
  };

  // Body styles
  const bodyStyles: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
  };

  // Row styles
  const getRowStyles = (isHoverable: boolean) => {
    const base: React.CSSProperties = {
      display: "grid",
      gridTemplateColumns: selectable
        ? `48px ${columns.map((c) => c.width || "1fr").join(" ")}`
        : columns.map((c) => c.width || "1fr").join(" "),
      minHeight: `${rowHeight}px`,
      borderBottom: "1px solid var(--color/neutral/200)",
      alignItems: "center",
      transition: "background-color 150ms ease-in-out",
      cursor: onRowClick ? "pointer" : "default",
    };

    if (isHoverable && !disableHover && !loading) {
      base["&:hover"] = {
        backgroundColor: "var(--color/neutral/50)",
      };
    }

    return base;
  };

  // Cell styles
  const getCellStyles = (align: "left" | "center" | "right" = "left", hideOnMobile = false) => {
    const base: React.CSSProperties = {
      display: "flex",
      alignItems: "center",
      padding: `${CELL_PADDING_Y}px ${CELL_PADDING_X}px`,
      fontFamily: "'Poppins', sans-serif",
      fontSize: "13px",
      fontWeight: 400,
      color: "var(--color/neutral/900)",
      lineHeight: 1.4,
      justifyContent: align === "center" ? "center" : align === "right" ? "flex-end" : "flex-start",
      ...(hideOnMobile && {
        "@media (max-width: 768px)": {
          display: "none",
        },
      }),
    };

    return base;
  };

  // Checkbox cell (for selectable tables)
  const checkboxCellStyles: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: `${CELL_PADDING_Y}px ${CELL_PADDING_X}px`,
  };

  // Render header
  const renderHeader = () => (
    <thead style={headerStyles}>
      <tr style={headerRowStyles}>
        {selectable && (
          <th style={headerCellStyles}>
            <input
              type="checkbox"
              style={{
                width: "16px",
                height: "16px",
                cursor: "pointer",
              }}
              aria-label="Seleccionar todas las filas"
            />
          </th>
        )}
        {columns.map((column) => (
          <th
            key={String(column.key)}
            style={{
              ...headerCellStyles,
              ...(column.hideOnMobile && {
                "@media (max-width: 768px)": {
                  display: "none",
                },
              }),
            }}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );

  // Render a single row
  const renderRow = (row: T, rowIndex: number, isSkeleton = false) => {
    const actualRowIndex = startIndex + rowIndex;
    const isHoverable = !!onRowClick && !isSkeleton;

    return (
      <tr
        key={isSkeleton ? `skeleton-${rowIndex}` : `row-${actualRowIndex}`}
        style={getRowStyles(isHoverable)}
        onClick={() => !isSkeleton && onRowClick?.(row, actualRowIndex)}
        onMouseEnter={(e) => {
          if (isHoverable && !disableHover) {
            e.currentTarget.style.backgroundColor = "var(--color/neutral/50)";
          }
        }}
        onMouseLeave={(e) => {
          if (isHoverable) {
            e.currentTarget.style.backgroundColor = "transparent";
          }
        }}
      >
        {selectable && (
          <td style={checkboxCellStyles}>
            <input
              type="checkbox"
              style={{
                width: "16px",
                height: "16px",
                cursor: "pointer",
              }}
              aria-label={`Seleccionar fila ${actualRowIndex + 1}`}
              onClick={(e) => e.stopPropagation()}
            />
          </td>
        )}
        {columns.map((column) => {
          const cellAlign = column.align || "left";
          
          if (isSkeleton) {
            return (
              <td key={String(column.key)}>
                <SkeletonCell
                  width={column.width || "100%"}
                  height={16}
                  align={cellAlign}
                />
              </td>
            );
          }

          // Get cell content
          let cellContent: React.ReactNode = null;

          if (column.render) {
            cellContent = column.render(row, actualRowIndex);
          } else if (column.component) {
            const Component = column.component;
            // Pass the entire row as props, or extract specific key
            const propValue = row[column.key];
            cellContent = <Component {...row} data={propValue} />;
          } else {
            cellContent = row[column.key];
          }

          return (
            <td
              key={String(column.key)}
              style={{
                ...getCellStyles(cellAlign, column.hideOnMobile),
              }}
            >
              {cellContent}
            </td>
          );
        })}
      </tr>
    );
  };

  return (
    <div className={className} style={containerStyles}>
      {/* Table wrapper for horizontal scroll */}
      <div style={tableWrapperStyles}>
        <table style={tableStyles}>
          {renderHeader()}
          <tbody style={bodyStyles}>
            {/* Loading state */}
            {loading &&
              Array.from({ length: skeletonRows }).map((_, index) => renderRow({} as T, index, true))}

            {/* Empty state */}
            {!loading && data.length === 0 && (
              <tr>
                <td colSpan={selectable ? columns.length + 1 : columns.length}>
                  <EmptyState message={emptyMessage} />
                </td>
              </tr>
            )}

            {/* Data rows */}
            {!loading &&
              paginatedData.map((row, index) => renderRow(row, index, false))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {!loading && data.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}

      {/* Add pulse animation keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}

export type { ColumnConfig, DataRow };
