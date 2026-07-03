import Image from "next/image";

import { ChevronRightIcon } from "./icons";
import type { MegaMenuTab } from "./data";
import { isSvgSource } from "../utils";


const cardClass =
  "relative flex items-center justify-between rounded-3xl border-0 px-xl py-l transition-colors duration-300 ease-out focus-visible:bg-[rgb(239_241_244/70%)]";

type MegaMenuCardProps = {
  active: boolean;
  onActivate: () => void;
  tab: MegaMenuTab;
};

export function MegaMenuCard({ active, onActivate, tab }: MegaMenuCardProps) {
  return (
    <button
      aria-pressed={active}
      className={`${cardClass} ${active ? "bg-[rgb(239_241_244/70%)]" : ""}`}
      type="button"
      onFocus={onActivate}
      onPointerEnter={onActivate}
    >
      {tab.image ? (
        <span className="flex w-full items-center justify-between gap-l">
          <span className="flex w-50 shrink-0 items-center justify-start">
            <Image
              alt={tab.image.alt}
              className="h-14"
              height={tab.image.height}
              loading="eager"
              src={tab.image.url}
              unoptimized={isSvgSource(tab.image.url)}
              width={tab.image.width}
            />
          </span>
          <span className="block text-start font-body text-sm font-normal text-text-secondary">
            {tab.description}
          </span>
        </span>
      ) : (
        <span className="flex flex-col items-start justify-center gap-2">
          <strong className="block text-text-button-1">{tab.title}</strong>
          <span className="block text-start font-body text-sm font-normal leading-[normal] text-text-secondary">
            {tab.description}
          </span>
        </span>
      )}

      <ChevronRightIcon />
    </button>
  );
}
