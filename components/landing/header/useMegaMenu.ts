"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type FocusEvent,
} from "react";

import type { HeaderNavigationItem } from "./data";

/** Delay before a hover-close fires, bridging the gap between trigger and panel. */
const CLOSE_DELAY_MS = 120;

type UseMegaMenuOptions = {
  items: HeaderNavigationItem[];
  /** Run alongside the menu close when Escape is pressed (e.g. close the mobile menu). */
  onEscape?: () => void;
};

/**
 * Owns the desktop mega-menu state machine: which menu/tab is active, the
 * hover-intent close timer, and the Escape / focus-leave handlers. Kept out of
 * the markup so `HeaderNavClient` stays declarative.
 */
export function useMegaMenu({ items, onEscape }: UseMegaMenuOptions) {
  const [activeMenuId, setActiveMenuId] = useState<string | null>(null);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeItem = useMemo(
    () => items.find((item) => item.id === activeMenuId && item.megaMenu) ?? null,
    [activeMenuId, items],
  );

  const clearCloseTimer = useCallback(() => {
    if (!closeTimerRef.current) {
      return;
    }

    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  }, []);

  const closeImmediately = useCallback(() => {
    clearCloseTimer();
    setActiveMenuId(null);
    setActiveTabId(null);
  }, [clearCloseTimer]);

  const openMenu = useCallback(
    (item: HeaderNavigationItem) => {
      const menu = item.megaMenu;

      if (!menu?.tabs.length) {
        closeImmediately();
        return;
      }

      clearCloseTimer();
      setActiveMenuId(item.id);
      setActiveTabId((currentTabId) => {
        const tabExists = menu.tabs.some((tab) => tab.id === currentTabId);

        return tabExists ? currentTabId : menu.tabs[0].id;
      });
    },
    [clearCloseTimer, closeImmediately],
  );

  const closeMenu = useCallback(() => {
    clearCloseTimer();
    closeTimerRef.current = setTimeout(closeImmediately, CLOSE_DELAY_MS);
  }, [clearCloseTimer, closeImmediately]);

  const toggleMenu = useCallback(
    (item: HeaderNavigationItem) => {
      if (activeMenuId === item.id) {
        closeImmediately();
        return;
      }

      openMenu(item);
    },
    [activeMenuId, closeImmediately, openMenu],
  );

  const handleBlur = useCallback(
    (event: FocusEvent<HTMLElement>) => {
      const nextTarget = event.relatedTarget as Node | null;

      if (!nextTarget || !event.currentTarget.contains(nextTarget)) {
        closeImmediately();
      }
    },
    [closeImmediately],
  );

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeImmediately();
        onEscape?.();
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearCloseTimer();
    };
  }, [clearCloseTimer, closeImmediately, onEscape]);

  return {
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
  };
}
