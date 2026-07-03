"use client";

import { memo, useMemo } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type Transition,
} from "motion/react";

import type { MegaMenuLinkGroup, MegaMenuSubLink } from "./data";
import { cn } from "../utils";
import { INTERACTIVE_LINK } from "@/components/ui/interaction";

const LINK_TRANSITION: Transition = {
  duration: 0.3,
  ease: [0, 0, 0.58, 1],
};

const INSTANT_TRANSITION: Transition = { duration: 0 };
const VISIBLE_OPACITY = { opacity: 1 };
const HIDDEN_OPACITY = { opacity: 0 };

type Row =
  | { kind: "heading"; key: string; text: string }
  | { kind: "link"; key: string; link: MegaMenuSubLink };

type MegaMenuLinkColumnProps = {
  ariaLabel: string;
  groups?: MegaMenuLinkGroup[];
  keyPrefix: string;
  links: MegaMenuSubLink[];
  onLinkClick?: () => void;
};

export const MegaMenuLinkColumn = memo(function MegaMenuLinkColumn({
  ariaLabel,
  groups,
  keyPrefix,
  links,
  onLinkClick,
}: MegaMenuLinkColumnProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const transition = prefersReducedMotion ? INSTANT_TRANSITION : LINK_TRANSITION;

  const rows = useMemo<Row[]>(() => {
    // Render grouped links when the CMS provides them; otherwise a single
    const effectiveGroups: MegaMenuLinkGroup[] =
      groups && groups.length > 0 ? groups : [{ heading: undefined, id: "default", links }];

    return effectiveGroups.flatMap((group) => {
      const out: Row[] = [];
      if (group.heading) {
        out.push({
          kind: "heading",
          key: `${keyPrefix}:heading:${group.id}`,
          text: group.heading,
        });
      }
      for (const link of group.links) {
        out.push({ kind: "link", key: `${link.id}`, link });
      }
      return out;
    });
  }, [groups, keyPrefix, links]);

  return (
    <motion.nav
      aria-label={ariaLabel}
      className="relative flex flex-[1_0_0] flex-col gap-l py-m text-button-2"
      layout={prefersReducedMotion ? false : "position"}
    >
      <AnimatePresence initial={false} mode="popLayout">
        {rows.map((row) =>
          row.kind === "heading" ? (
            <motion.span
              animate={VISIBLE_OPACITY}
              className="text-body-2 text-text-secondary"
              exit={HIDDEN_OPACITY}
              initial={HIDDEN_OPACITY}
              key={row.key}
              layout={prefersReducedMotion ? false : "position"}
              transition={transition}
            >
              {row.text}
            </motion.span>
          ) : (
            <motion.a
              animate={VISIBLE_OPACITY}
              className={cn(
                "block",
                INTERACTIVE_LINK,
                row.link.highlighted && "text-text-tkh-primary underline",
              )}
              exit={HIDDEN_OPACITY}
              href={row.link.href}
              key={row.key}
              layout={prefersReducedMotion ? false : "position"}
              onClick={onLinkClick}
              rel={row.link.openInNewTab ? "noreferrer" : undefined}
              target={row.link.openInNewTab ? "_blank" : undefined}
              transition={transition}
            >
              {row.link.label}
            </motion.a>
          ),
        )}
      </AnimatePresence>
    </motion.nav>
  );
});
