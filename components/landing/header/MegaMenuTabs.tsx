import Image from "next/image";

import { MegaMenuCard } from "./MegaMenuCard";
import { MegaMenuLinkColumn } from "./MegaMenuLinkColumn";
import type { HeaderMegaMenu } from "./data";
import { isSvgSource } from "../utils";

type MegaMenuTabsProps = {
  activeTabId: string | null;
  menu: HeaderMegaMenu;
  onLinkClick: () => void;
  onTabChange: (tabId: string) => void;
};

export function MegaMenuTabs({
  activeTabId,
  menu,
  onLinkClick,
  onTabChange,
}: MegaMenuTabsProps) {
  if (!menu.tabs.length) {
    return null;
  }

  const activeTab =
    menu.tabs.find((tab) => tab.id === activeTabId) ?? menu.tabs[0];
  const activeTabLabel =
    activeTab.title.trim() || activeTab.image?.alt.trim() || menu.ariaLabel;

  return (
    <>
      {/*  Left column */}
      <div className="flex w-150 flex-col gap-m">
        {menu.tabs.map((tab) => (
          <MegaMenuCard
            active={tab.id === activeTab.id}
            key={tab.id}
            onActivate={() => onTabChange(tab.id)}
            tab={tab}
          />
        ))}
      </div>
      {/*  Line separator */}
      <div
        aria-hidden="true"
        className="w-px shrink-0 self-stretch bg-stroke-primary"
      />

      {/* Mid Column — stays mounted so its rows cross-fade per slot on tab change. */}
      <MegaMenuLinkColumn
        ariaLabel={`${activeTabLabel} links`}
        groups={activeTab.groups}
        keyPrefix={activeTab.id}
        links={activeTab.links}
        onLinkClick={onLinkClick}
      />

      {activeTab.previewImage ? (
        <div
          className="relative h-[290px] w-[436px] shrink-0"
          style={{
            // Parallelogram clip: top-left + bottom-right corners chamfered (matches Figma node 1-5683).
            clipPath: "polygon(10% 0%, 100% 0%, 100% 50%, 90% 100%, 0% 100%, 0% 50%)",
          }}
        >
          <Image
            alt={activeTab.previewImage.alt}
            className="object-cover"
            fill
            sizes="436px"
            src={activeTab.previewImage.url}
            unoptimized={isSvgSource(activeTab.previewImage.url)}
            loading="eager"
          />
        </div>
      ) : null}
    </>
  );
}
