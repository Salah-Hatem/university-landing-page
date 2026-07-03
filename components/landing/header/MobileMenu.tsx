"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "motion/react";

import { ArrowUpRightIcon, ChevronDownIcon, SearchIcon } from "./icons";
import type {
  HeaderLink,
  HeaderNavigationItem,
  HeaderTopLinks,
  MegaMenuTab,
} from "./data";
import { GLASS_PANEL, isSvgSource } from "../utils";
import { INTERACTIVE_BUTTON, INTERACTIVE_LINK } from "@/components/ui/interaction";

const TAP_ROW_FEEDBACK =
  "transition-colors hover:bg-white/40 focus-visible:bg-white/60 focus-visible:outline-none";

// Mirrors the desktop mega-menu so both surfaces share one motion language.
const MENU_EASE = [0.3, 0, 0, 1] as const;


const outerPanelClass = `absolute inset-x-0 z-[98] tablet:top-18 w-full origin-top overflow-hidden rounded-b-[40px] border border-white/35 ${GLASS_PANEL} text-text-primary shadow-2xl tablet:hidden`;

const innerClass =
  "flex max-h-[calc(100vh_-_120px)] flex-col overflow-y-auto";


const summaryClass =
  "flex w-full cursor-pointer list-none items-center justify-between gap-m font-cta text-xs font-medium text-text-primary";

const topLinkClass = `font-cta text-xs font-medium text-text-primary ${INTERACTIVE_LINK}`;

const panelVariants: Variants = {
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

// Pure orchestration node: staggers its children in as the panel expands.
const listVariants: Variants = {
  inactive: {},
  active: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } },
};

// Per-link reveal that rides on the stagger from the nearest list container.
const itemVariants: Variants = {
  inactive: (instant: boolean) => ({ opacity: 0, y: instant ? 0 : -6 }),
  active: (instant: boolean) => ({
    opacity: 1,
    y: 0,
    transition: instant ? { duration: 0 } : { duration: 0.25, ease: MENU_EASE },
  }),
};

// Nested accordion expand, driven by its own open state (not panel state).
const accordionVariants: Variants = {
  closed: (instant: boolean) => ({
    height: 0,
    opacity: 0,
    transition: instant ? { duration: 0 } : { duration: 0.25, ease: MENU_EASE },
  }),
  open: (instant: boolean) => ({
    height: "auto",
    opacity: 1,
    transition: instant ? { duration: 0 } : { duration: 0.3, ease: MENU_EASE },
  }),
};

type MobileMenuProps = {
  applyCta: HeaderLink;
  contactCta: HeaderLink;
  id: string;
  items: HeaderNavigationItem[];
  onNavigate: () => void;
  open: boolean;
  searchLink: HeaderLink;
  topLinks: HeaderTopLinks;
};

export function MobileMenu({
  applyCta,
  contactCta,
  id,
  items,
  onNavigate,
  open,
  searchLink,
  topLinks,
}: MobileMenuProps) {
  const instant = useReducedMotion() ?? false;

  return (
    <motion.div
      animate={open ? "active" : "inactive"}
      aria-hidden={!open}
      className={outerPanelClass}
      custom={instant}
      id={id}
      // Keeps the collapsed menu's links out of the tab order / a11y tree and
      // disables pointer interaction without manual pointer-events juggling.
      inert={!open}
      initial={false}
      variants={panelVariants}
    >
      <motion.div className={innerClass} variants={listVariants}>
        <motion.div
          className="border-b border-stroke-primary px-l pt-m pb-[17px]"
          custom={instant}
          variants={itemVariants}
        >
          <a
            className={`inline-flex items-center gap-xs font-cta text-xs font-medium text-text-primary ${INTERACTIVE_LINK}`}
            href={searchLink.href}
            onClick={onNavigate}
            rel={searchLink.openInNewTab ? "noreferrer" : undefined}
            target={searchLink.openInNewTab ? "_blank" : undefined}
          >
            <SearchIcon />
            <span>{searchLink.label}</span>
          </a>
        </motion.div>

        <motion.div className="flex flex-col gap-m p-l" variants={listVariants}>
          <motion.nav
            aria-label="Mobile navigation"
            className="flex flex-col gap-xs"
            variants={listVariants}
          >
            {items.map((item) =>
              item.megaMenu ? (
                <MobileMenuGroup
                  instant={instant}
                  item={item}
                  key={item.id}
                  onNavigate={onNavigate}
                />
              ) : (
                <motion.a
                  className={`flex items-center rounded-3xl p-m font-cta text-xs font-medium text-text-primary ${INTERACTIVE_LINK}`}
                  custom={instant}
                  href={item.href}
                  key={item.id}
                  onClick={onNavigate}
                  rel={item.openInNewTab ? "noreferrer" : undefined}
                  target={item.openInNewTab ? "_blank" : undefined}
                  variants={itemVariants}
                >
                  {item.label}
                </motion.a>
              ),
            )}
          </motion.nav>

          <motion.div
            aria-hidden="true"
            className="h-px w-full bg-stroke-primary"
            custom={instant}
            variants={itemVariants}
          />

          <motion.nav
            aria-label="University and resource links"
            className="flex flex-col gap-l px-m"
            variants={listVariants}
          >
            {topLinks.universities.map((link) => (
              <motion.a
                className={topLinkClass}
                custom={instant}
                href={link.href}
                key={link.id}
                onClick={onNavigate}
                rel={link.openInNewTab ? "noreferrer" : undefined}
                target={link.openInNewTab ? "_blank" : undefined}
                variants={itemVariants}
              >
                {link.label}
              </motion.a>
            ))}

            <motion.div className="flex flex-wrap gap-m" variants={listVariants}>
              {topLinks.resources.map((link) => (
                <motion.a
                  className={topLinkClass}
                  custom={instant}
                  href={link.href}
                  key={link.id}
                  onClick={onNavigate}
                  rel={link.openInNewTab ? "noreferrer" : undefined}
                  target={link.openInNewTab ? "_blank" : undefined}
                  variants={itemVariants}
                >
                  {link.label}
                </motion.a>
              ))}
            </motion.div>

            <motion.a
              className={topLinkClass}
              custom={instant}
              href={contactCta.href}
              onClick={onNavigate}
              rel={contactCta.openInNewTab ? "noreferrer" : undefined}
              target={contactCta.openInNewTab ? "_blank" : undefined}
              variants={itemVariants}
            >
              {contactCta.label}
            </motion.a>
          </motion.nav>

          <motion.a
            className={`flex w-fit items-center gap-1.5 self-start rounded-full bg-surface-tkh-primary py-xs pl-l pr-xs ${INTERACTIVE_BUTTON}`}
            custom={instant}
            href={applyCta.href}
            onClick={onNavigate}
            rel={applyCta.openInNewTab ? "noreferrer" : undefined}
            target={applyCta.openInNewTab ? "_blank" : undefined}
            variants={itemVariants}
          >
            <span className="font-cta text-sm font-medium text-white">
              {applyCta.label}
            </span>
            <span
              aria-hidden="true"
              className="flex size-8 items-center justify-center rounded-full bg-white text-icon-tkh-primary"
            >
              <ArrowUpRightIcon />
            </span>
          </motion.a>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

function MobileMenuGroup({
  instant,
  item,
  onNavigate,
}: {
  instant: boolean;
  item: HeaderNavigationItem;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  if (!item.megaMenu) {
    return null;
  }

  return (
    <motion.div
      className={`overflow-hidden rounded-3xl ${expanded ? "bg-[rgb(239_241_244/70%)] p-m" : ""}`}
      custom={instant}
      variants={itemVariants}
    >
      <button
        aria-expanded={expanded}
        className={`${summaryClass} ${TAP_ROW_FEEDBACK} ${expanded ? "" : "p-m"}`}
        onClick={() => setExpanded((value) => !value)}
        type="button"
      >
        <span>{item.label}</span>
        <motion.span
          animate={{ rotate: expanded ? 180 : 0 }}
          className="shrink-0"
          transition={instant ? { duration: 0 } : { duration: 0.3, ease: MENU_EASE }}
        >
          <ChevronDownIcon />
        </motion.span>
      </button>

      <motion.div
        animate={expanded ? "open" : "closed"}
        className="overflow-hidden"
        custom={instant}
        initial={false}
        variants={accordionVariants}
      >
        <div className="flex flex-col gap-xs pt-xs">
          {item.megaMenu.tabs.map((tab) => (
            <MobileMenuTabCard
              instant={instant}
              key={tab.id}
              onNavigate={onNavigate}
              tab={tab}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function MobileMenuTabCard({
  instant,
  onNavigate,
  tab,
}: {
  instant: boolean;
  onNavigate: () => void;
  tab: MegaMenuTab;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="overflow-hidden rounded-3xl bg-[rgb(239_241_244/70%)]">
      <button
        aria-expanded={expanded}
        className={`flex w-full cursor-pointer flex-col gap-xs p-m text-left ${TAP_ROW_FEEDBACK}`}
        onClick={() => setExpanded((value) => !value)}
        type="button"
      >
        <div className="flex items-center justify-between gap-m">
          {tab.image ? (
            <Image
              alt={tab.image.alt}
              className="h-8 w-auto"
              height={tab.image.height}
              // The mobile menu is always mounted; lazy-load so these don't compete
              // with the hero LCP on initial load behind the collapsed panel.
              loading="lazy"
              src={tab.image.url}
              unoptimized={isSvgSource(tab.image.url)}
              width={tab.image.width}
            />
          ) : (
            <span className="font-cta text-xs font-medium text-text-primary">
              {tab.title}
            </span>
          )}
          <motion.span
            animate={{ rotate: expanded ? 0 : -90 }}
            className="shrink-0 text-text-primary"
            transition={instant ? { duration: 0 } : { duration: 0.3, ease: MENU_EASE }}
          >
            <ChevronDownIcon />
          </motion.span>
        </div>
        <p className="font-body text-xs leading-[1.2] text-text-secondary">
          {tab.description}
        </p>
      </button>

      <motion.div
        animate={expanded ? "open" : "closed"}
        className="overflow-hidden"
        custom={instant}
        initial={false}
        variants={accordionVariants}
      >
        <div className="flex flex-col px-m pb-m">
          {tab.links.map((link) => (
            <a
              className={`py-xs font-cta text-xs font-medium text-text-secondary ${INTERACTIVE_LINK}`}
              href={link.href}
              key={link.id}
              onClick={onNavigate}
              rel={link.openInNewTab ? "noreferrer" : undefined}
              target={link.openInNewTab ? "_blank" : undefined}
            >
              {link.label}
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
