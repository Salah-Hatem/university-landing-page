import { DesktopNavItem } from "./DesktopNavItem";
import type { HeaderNavigationItem } from "./data";

type DesktopNavProps = {
  activeMenuId: string | null;
  items: HeaderNavigationItem[];
  menuPanelId: string;
  onClose: () => void;
  onCloseImmediately: () => void;
  onOpen: (item: HeaderNavigationItem) => void;
  onToggle: (item: HeaderNavigationItem) => void;
};

export function DesktopNav({
  activeMenuId,
  items,
  menuPanelId,
  onClose,
  onCloseImmediately,
  onOpen,
  onToggle,
}: DesktopNavProps) {
  return (
    <nav
      aria-label="Main navigation"
      className="hidden w-204.25 items-center gap-xl text-button-2 tablet:flex"
      onPointerLeave={onClose}
    >
      {items.map((item) => (
        <DesktopNavItem
          active={activeMenuId === item.id}
          item={item}
          key={item.id}
          menuPanelId={menuPanelId}
          onClose={onCloseImmediately}
          onOpen={onOpen}
          onToggle={onToggle}
        />
      ))}
    </nav>
  );
}
