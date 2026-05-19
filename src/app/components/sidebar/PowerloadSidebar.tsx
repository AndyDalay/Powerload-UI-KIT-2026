import { useCallback, useMemo, useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import { PowerloadButton } from "../PowerloadButton";
import { PowerloadLogo } from "./PowerloadLogo";
import { SidebarNavGroup } from "./SidebarNavGroup";
import { SidebarNavLinkItem } from "./SidebarNavLink";
import { getSidebarNav } from "./sidebarNavConfig";
import type { PowerloadSidebarProps } from "./sidebarTypes";
import { buildInitialOpenGroups, findActiveInEntries, pathMatches } from "./sidebarUtils";
import "./sidebar.css";

export function PowerloadSidebar({
  userRole,
  operadorProfile = "transportista",
  activePath,
  onNavigate,
  collapsed: collapsedProp,
  onCollapsedChange,
  showPrimaryAction = false,
  primaryActionLabel = "Acción principal",
  onPrimaryAction,
  className = "",
}: PowerloadSidebarProps) {
  const [collapsedInternal, setCollapsedInternal] = useState(false);
  const collapsed = collapsedProp ?? collapsedInternal;

  const entries = useMemo(
    () => getSidebarNav(userRole, operadorProfile),
    [userRole, operadorProfile],
  );

  const [openGroups, setOpenGroups] = useState<Set<string>>(() =>
    buildInitialOpenGroups(entries, activePath),
  );

  const setCollapsed = useCallback(
    (next: boolean) => {
      if (collapsedProp === undefined) setCollapsedInternal(next);
      onCollapsedChange?.(next);
    },
    [collapsedProp, onCollapsedChange],
  );

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(groupId)) next.delete(groupId);
      else next.add(groupId);
      return next;
    });
  };

  const handleNavigate = (href: string) => {
    onNavigate(href);
    const { groupId } = findActiveInEntries(entries, href);
    if (groupId) {
      setOpenGroups((prev) => new Set(prev).add(groupId));
    }
  };

  return (
    <aside
      className={`pl-sidebar${collapsed ? " pl-sidebar--collapsed" : ""} ${className}`.trim()}
      aria-label="Navegación principal"
    >
      <div className="pl-sidebar__logo">
        <PowerloadLogo collapsed={collapsed} />
      </div>

      <nav className="pl-sidebar__nav">
        <div className="pl-sidebar__nav-inner">
          {entries.map((entry) => {
            if (entry.type === "link") {
              return (
                <SidebarNavLinkItem
                  key={entry.id}
                  item={entry}
                  active={pathMatches(activePath, entry.href)}
                  onNavigate={handleNavigate}
                />
              );
            }

            const hasActiveChild = entry.children.some((c) =>
              pathMatches(activePath, c.href),
            );
            const expanded = collapsed ? false : openGroups.has(entry.id);

            return (
              <SidebarNavGroup
                key={entry.id}
                group={entry}
                expanded={expanded}
                activePath={activePath}
                hasActiveChild={hasActiveChild}
                onToggle={() => toggleGroup(entry.id)}
                onNavigate={handleNavigate}
              />
            );
          })}
        </div>
      </nav>

      <div className="pl-sidebar__footer">
        {showPrimaryAction ? (
          <div className="pl-sidebar-primary-action">
            <PowerloadButton
              variant="primary"
              size="m"
              label={collapsed ? undefined : primaryActionLabel}
              glow
              onClick={onPrimaryAction}
              style={{ width: "100%", borderRadius: 9999 }}
            />
          </div>
        ) : null}

        <button
          type="button"
          className="pl-sidebar-close"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Abrir menú" : "Cerrar menú"}
        >
          <span className="pl-sidebar-close__icon" aria-hidden>
            {collapsed ? (
              <PanelLeftOpen size={24} strokeWidth={1.5} />
            ) : (
              <PanelLeftClose size={24} strokeWidth={1.5} />
            )}
          </span>
          <span className="pl-sidebar-close__label">
            {collapsed ? "" : "Cerrar Menú"}
          </span>
        </button>
      </div>
    </aside>
  );
}
