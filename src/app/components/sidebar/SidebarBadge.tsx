import type { SidebarBadge as SidebarBadgeType } from "./sidebarTypes";

export function SidebarBadge({ count, variant = "neutral" }: SidebarBadgeType) {
  const display = typeof count === "number" && count > 99 ? "99+" : String(count);

  return (
    <span className={`pl-sidebar-badge pl-sidebar-badge--${variant}`} aria-label={`${display} pendientes`}>
      {display}
    </span>
  );
}
