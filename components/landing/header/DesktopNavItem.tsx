import { ChevronDownIcon } from "./icons";
import type { HeaderNavigationItem } from "./data";
import { cn } from "../utils";
import { INTERACTIVE_LINK } from "@/components/ui/interaction";

const navButtonClass =
  "flex h-[19px] items-center gap-xs whitespace-nowrap border-0 bg-transparent p-0 text-text-primary [font:inherit] [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:ease-out " +
  INTERACTIVE_LINK;

type DesktopNavItemProps = {
  active: boolean;
  item: HeaderNavigationItem;
  menuPanelId: string;
  onClose: () => void;
  onOpen: (item: HeaderNavigationItem) => void;
  onToggle: (item: HeaderNavigationItem) => void;
};

export function DesktopNavItem({
  active,
  item,
  menuPanelId,
  onClose,
  onOpen,
  onToggle,
}: DesktopNavItemProps) {
  if (!item.megaMenu) {
    return (
      <a
        className={navButtonClass}
        href={item.href}
        onFocus={onClose}
        onPointerEnter={onClose}
        rel={item.openInNewTab ? "noreferrer" : undefined}
        target={item.openInNewTab ? "_blank" : undefined}
      >
        {item.label}
      </a>
    );
  }

  return (
    <button
      aria-controls={menuPanelId}
      aria-expanded={active}
      className={cn(navButtonClass, active && "[&_svg]:rotate-180")}
      id={`header-trigger-${item.id}`}
      type="button"
      onClick={() => onToggle(item)}
      onFocus={() => onOpen(item)}
      onPointerEnter={() => onOpen(item)}
    >
      <span>{item.label}</span>
      <ChevronDownIcon />
    </button>
  );
}
