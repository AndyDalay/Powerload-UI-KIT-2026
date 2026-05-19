import { ChevronDown } from "lucide-react";
import { SidebarCustomIcon } from "./SidebarCustomIcon";
import { SidebarSubMenuItem } from "./SidebarSubMenuItem";
import type { SidebarNavGroup as SidebarNavGroupType } from "./sidebarTypes";
import { pathMatches } from "./sidebarUtils";

interface SidebarNavGroupProps {
  group: SidebarNavGroupType;
  expanded: boolean;
  activePath: string;
  hasActiveChild: boolean;
  /** Necesario para el estado activo-colapsado (icono rojo) */
  collapsed?: boolean;
  onToggle: () => void;
  onNavigate: (href: string) => void;
}

export function SidebarNavGroup({
  group,
  expanded,
  activePath,
  hasActiveChild,
  collapsed = false,
  onToggle,
  onNavigate,
}: SidebarNavGroupProps) {
  const isInicio = group.id === "inicio";

  // En modo colapsado + hijo activo → icono rojo (--has-active-child)
  // En modo expandido + hijo activo → sólo indica que tiene hijos activos
  const triggerClass = [
    "pl-sidebar-menu__trigger",
    hasActiveChild ? "pl-sidebar-menu__trigger--has-active-child" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="pl-sidebar-menu">
      <button
        type="button"
        className={triggerClass}
        onClick={onToggle}
        aria-expanded={expanded}
      >
        <span
          className={`pl-sidebar-menu__left${isInicio ? " pl-sidebar-menu__left--inicio" : ""}`}
        >
          <span
            className={`pl-sidebar-menu__icon-wrap${!isInicio ? " pl-sidebar-menu__icon-wrap--padded" : ""}`}
          >
            <SidebarCustomIcon name={group.icon} size="menu" />
          </span>
          <span className="pl-sidebar-menu__label">{group.label}</span>
        </span>

        {/* El chevron se oculta vía CSS cuando está colapsado */}
        <span className="pl-sidebar-menu__right">
          <span
            className={`pl-sidebar-menu__chevron${expanded ? " pl-sidebar-menu__chevron--open" : ""}`}
            aria-hidden
          >
            <ChevronDown size={13} strokeWidth={2.5} />
          </span>
        </span>
      </button>

      {expanded && !collapsed ? (
        <div className="pl-sidebar-subtree">
          <div className="pl-sidebar-subtree__list">
            {group.children.map((child, index) => (
              <SidebarSubMenuItem
                key={child.id}
                item={child}
                active={pathMatches(activePath, child.href)}
                isLast={index === group.children.length - 1}
                showTopConnector={index > 0}
                onSelect={onNavigate}
              />
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}