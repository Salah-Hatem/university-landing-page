"use client";

import { useCallback, useState, type ReactNode } from "react";

import { DesktopNav } from "./DesktopNav";
import { MegaMenuViewport } from "./MegaMenuViewport";
import { MobileMenu } from "./MobileMenu";
import { useMegaMenu } from "./useMegaMenu";
import { cn, GLASS_PANEL } from "../utils";
import type { HeaderLink, HeaderNavigationItem, HeaderTopLinks } from "./data";
import Image from "next/image";
import { INTERACTIVE_ICON_BUTTON } from "@/components/ui/interaction";
const navBarBaseClass = `${GLASS_PANEL} flex py-m px-l tablet:min-h-18 w-full items-center justify-between gap-l rounded-t-[40px] border border-white/35 tablet:py-3 transition-[border-radius] ease-[cubic-bezier(0.3,0,0,1)] motion-reduce:transition-none mobile:rounded-t-none mobile:pl-10 mobile:pr-6`;
const navBarInactiveRadius = "rounded-b-[40px] duration-200 tablet:rounded-b-[40px]";
const navBarActiveRadius = "rounded-t-[40px] rounded-b-none duration-300";

const MENU_PANEL_ID = "header-mega-menu";
const MOBILE_PANEL_ID = "mobile-navigation";

type HeaderNavClientProps = {
  applyCta: HeaderLink;
  brand: ReactNode;
  contactCta: HeaderLink;
  desktopApplyCta: ReactNode;
  items: HeaderNavigationItem[];
  searchLink: HeaderLink;
  topLinks: HeaderTopLinks;
};

export function HeaderNavClient({
  applyCta,
  brand,
  contactCta,
  desktopApplyCta,
  items,
  searchLink,
  topLinks,
}: HeaderNavClientProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeMobileMenu = useCallback(() => setMobileOpen(false), []);

  const {
    activeItem,
    activeMenuId,
    activeTabId,
    clearCloseTimer,
    closeImmediately,
    closeMenu,
    handleBlur,
    openMenu,
    setActiveTabId,
    toggleMenu,
  } = useMegaMenu({ items, onEscape: closeMobileMenu });

  const menuOpen = Boolean(activeItem?.megaMenu);

  return (
    <div className="relative w-full" onBlur={handleBlur}>
      <div
        className={cn(
          navBarBaseClass,
          menuOpen || mobileOpen ? navBarActiveRadius : navBarInactiveRadius,
        )}
      >
        {brand}

        <DesktopNav
          activeMenuId={activeMenuId}
          items={items}
          menuPanelId={MENU_PANEL_ID}
          onClose={closeMenu}
          onCloseImmediately={closeImmediately}
          onOpen={openMenu}
          onToggle={toggleMenu}
        />

        <button
          aria-controls={MOBILE_PANEL_ID}
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation"
          className={cn("ml-auto rounded-full tablet:hidden", INTERACTIVE_ICON_BUTTON)}
          type="button"
          onClick={() => setMobileOpen((isOpen) => !isOpen)}
        >
          {mobileOpen ? (
            <Image src="/svg/Close.svg" alt="" width={24} height={24} />
          ) : (
            <Image src="/svg/MobileMenu.svg" alt="" width={24} height={24} />
          )}
        </button>

        {desktopApplyCta}
      </div>

      <MegaMenuViewport
        activeItem={activeItem}
        activeTabId={activeTabId}
        id={MENU_PANEL_ID}
        onClose={closeMenu}
        onLinkClick={closeImmediately}
        onOpen={clearCloseTimer}
        onTabChange={setActiveTabId}
      />

      <MobileMenu
        applyCta={applyCta}
        contactCta={contactCta}
        id={MOBILE_PANEL_ID}
        items={items}
        onNavigate={closeMobileMenu}
        open={mobileOpen}
        searchLink={searchLink}
        topLinks={topLinks}
      />
    </div>
  );
}
