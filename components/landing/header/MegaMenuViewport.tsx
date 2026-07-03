"use client";

import { useState } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { MegaMenuTabs } from "./MegaMenuTabs";
import type { HeaderNavigationItem } from "./data";
import { GLASS_PANEL } from "../utils";

const panelClass = `absolute inset-x-0 top-full z-98 hidden w-full origin-top overflow-hidden rounded-b-[40px] border border-white/35 ${GLASS_PANEL} shadow-2xl tablet:block`;

const MENU_EASE = [0.3, 0, 0, 1] as const;

const menuVariants: Variants = {
  inactive: (instant: boolean) => ({
    height: 0,
    opacity: 0,
    transition: instant ? { duration: 0 } : { duration: 0.2, ease: MENU_EASE },
  }),
  active: (instant: boolean) => ({
    height: "auto",
    opacity: 1,
    transition: instant ? { duration: 0 } : { duration: 0.3, ease: MENU_EASE },
  }),
};

type MegaMenuViewportProps = {
  activeItem: HeaderNavigationItem | null;
  activeTabId: string | null;
  id: string;
  onClose: () => void;
  onLinkClick: () => void;
  onOpen: () => void;
  onTabChange: (tabId: string) => void;
};

export function MegaMenuViewport({
  activeItem,
  activeTabId,
  id,
  onClose,
  onLinkClick,
  onOpen,
  onTabChange,
}: MegaMenuViewportProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const open = Boolean(activeItem?.megaMenu);

  const [displayedItem, setDisplayedItem] = useState(activeItem);
  if (activeItem?.megaMenu && activeItem.id !== displayedItem?.id) {
    setDisplayedItem(activeItem);
  }

  const menu = displayedItem?.megaMenu;

  return (
    <motion.div
      aria-hidden={!open}
      aria-label={menu?.ariaLabel}
      aria-labelledby={displayedItem ? `header-trigger-${displayedItem.id}` : undefined}
      className={panelClass}
      custom={prefersReducedMotion}
      id={id}
      // `inert` (not just aria-hidden) keeps the collapsed panel's links out of the
      // tab order and the accessibility tree, and disables pointer interaction.
      inert={!open}
      initial={false}
      animate={open ? "active" : "inactive"}
      role="region"
      variants={menuVariants}
      onPointerEnter={onOpen}
      onPointerLeave={onClose}
    >
      {/* Padding/flex sit on the inner wrapper so `height: 0` collapses cleanly. */}
      {menu ? (
        <div className="flex flex-row gap-4xl p-2xl">
          <MegaMenuTabs
            activeTabId={activeTabId}
            menu={menu}
            onLinkClick={onLinkClick}
            onTabChange={onTabChange}
          />
        </div>
      ) : null}
    </motion.div>
  );
}
