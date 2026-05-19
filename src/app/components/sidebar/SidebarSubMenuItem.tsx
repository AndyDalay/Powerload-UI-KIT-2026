import { SidebarBadge } from "./SidebarBadge";
import { SidebarCustomIcon, SidebarPremiumCrown } from "./SidebarCustomIcon";
import type { SidebarNavChild } from "./sidebarTypes";

interface SidebarSubMenuItemProps {
  item: SidebarNavChild;
  active: boolean;
  isLast: boolean;
  showTopConnector: boolean;
  onSelect: (href: string) => void;
}

export function SidebarSubMenuItem({
  item,
  active,
  isLast,
  showTopConnector,
  onSelect,
}: SidebarSubMenuItemProps) {
  const blockClass = isLast
    ? "pl-sidebar-subtree__block pl-sidebar-subtree__block--last relative"
    : "pl-sidebar-subtree__block relative";

  return (
    <div className={blockClass}>
      {showTopConnector ? <div className="pl-sidebar-subtree__branch-spacer" /> : null}
      
      {/* Añadimos 'flex items-center group h-9' para que toda la fila esté perfectamente centrada verticalmente */}
      <div className="pl-sidebar-subtree__row flex items-center group h-9 relative">
        
        {/* Forzamos a la columna de la rama a alinearse perfectamente con el eje del icono padre */}
        <div className="pl-sidebar-subtree__branch-col flex items-center justify-center w-[22px] h-full relative left-[11px]">
          {/* El 'elbow' o codo que dibuja la línea. Nos aseguramos de que mantenga su forma original */}
          <div className="pl-sidebar-subtree__branch-elbow w-full h-full" />
          
          {/* Añadimos un puntito conector que se ilumina con tu rojo corporativo al hacer hover en la fila */}
          <div className="absolute right-0 w-1.5 h-1.5 rounded-full bg-neutral-600 group-hover:bg-[#c22339] transition-colors top-1/2 -translate-y-1/2 z-10" />
        </div>

        {/* Ajustamos el botón con un padding e interlineado exacto */}
        <button
          type="button"
          className={`pl-sidebar-sub-item flex items-center ml-4 pl-2 pr-4 py-1.5 rounded-md transition-colors w-full ${
            active ? " pl-sidebar-sub-item--active text-white" : "text-gray-400 hover:text-white"
          }`}
          onClick={() => onSelect(item.href)}
          aria-current={active ? "page" : undefined}
        >
          {/* Contenedor del icono del submenú */}
          <span className="pl-sidebar-sub-item__icon flex items-center justify-center mr-2 text-current">
            <SidebarCustomIcon name={item.icon} size="sub" />
          </span>
          
          {/* Texto del submenú con una ligera transición hacia la derecha en hover */}
          <span className="pl-sidebar-sub-item__label font-medium text-sm transition-transform duration-200 group-hover:translate-x-0.5">
            {item.label}
          </span>
          
          <span className="pl-sidebar-sub-item__meta ml-auto">
            {item.badge ? <SidebarBadge {...item.badge} /> : null}
            {item.premium ? <SidebarPremiumCrown /> : null}
          </span>
        </button>
      </div>
    </div>
  );
}