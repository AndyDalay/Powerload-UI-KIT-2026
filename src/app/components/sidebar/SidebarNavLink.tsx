import { SidebarCustomIcon } from "./SidebarCustomIcon";
import type { SidebarNavLink as SidebarNavLinkType } from "./sidebarTypes";

interface SidebarNavLinkProps {
  item: SidebarNavLinkType;
  active: boolean;
  onNavigate: (href: string) => void;
}

export function SidebarNavLinkItem({ item, active, onNavigate }: SidebarNavLinkProps) {
  return (
    <div className="pl-sidebar-menu">
      <button
        type="button"
        className={`pl-sidebar-menu__trigger${active ? " pl-sidebar-menu__trigger--active" : ""}`}
        onClick={() => onNavigate(item.href)}
        aria-current={active ? "page" : undefined}
      >
        <span className="pl-sidebar-menu__left">
          <span className="pl-sidebar-menu__icon-wrap pl-sidebar-menu__icon-wrap--padded">
            <SidebarCustomIcon name={item.icon} size="menu" />
          </span>
          <span className="pl-sidebar-menu__label">{item.label}</span>
        </span>
      </button>
    </div>
  );
}
