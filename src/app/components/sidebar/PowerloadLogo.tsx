import logoFull from "@/assets/logo/Powerload-logo.svg";
import logoReduced from "@/assets/logo/Powerload-logo-reduced.svg" ;

export function PowerloadLogo({ collapsed = false }: { collapsed?: boolean }) {
  if (collapsed) {
    return (
      <img
        src={logoReduced}
        alt="Powerload"
        className="pl-sidebar__logo-img pl-sidebar__logo-img--collapsed"
        draggable={false}
      />
    );
  }

  return (
    <img
      src={logoFull}
      alt="Powerload"
      className="pl-sidebar__logo-img"
      draggable={false}
    />
  );
}
