import Image from "next/image";

import { ArrowUpRightIcon, SearchIcon } from "./icons";
import { HeaderNavClient } from "./HeaderNavClient";
import { HeaderReveal } from "./HeaderReveal";
import type {
  HeaderImage,
  HeaderLink,
  HeaderTopLinks,
  HeaderViewData,
} from "./data";
import { cn, GLASS_PANEL, isSvgSource } from "../utils";
import { INTERACTIVE_BUTTON, INTERACTIVE_LINK } from "@/components/ui/interaction";

const utilityLinkGroupIds = ["universities", "resources"] as const satisfies Array<
  keyof HeaderTopLinks
>;

export function Header({ header }: { header: HeaderViewData }) {
  return (
    <HeaderReveal className="fixed left-0 top-0 z-99 flex w-full justify-center px-xl desktop:px-3xl pt-2xl tablet:pt-xl">
      <div className="w-full rounded-4xl">
        <UtilityBar
          contactCta={header.contactCta}
          searchLink={header.searchLink}
          topLinks={header.topLinks}
        />
        <HeaderNavClient
          applyCta={header.applyCta}
          brand={<HeaderLogo logo={header.logo} />}
          contactCta={header.contactCta}
          desktopApplyCta={<DesktopApplyCta link={header.applyCta} />}
          items={header.primaryNavigation}
          searchLink={header.searchLink}
          topLinks={header.topLinks}
        />
      </div>
    </HeaderReveal>
  );
}

function HeaderLogo({ logo }: { logo: HeaderImage }) {
  return (
    <Image
      alt={logo.alt}
      className="h-auto w-47.5 tablet:w-63 mobile:w-78.75"
      height={logo.height}
      priority
      src={logo.url}
      unoptimized={isSvgSource(logo.url)}
      width={logo.width}
    />
  );
}

function DesktopApplyCta({ link }: { link: HeaderLink }) {
  return (
    <a
      className={cn(
        "hidden items-center justify-between gap-s whitespace-nowrap rounded-full bg-surface-tkh-primary py-xs pl-l pr-xs text-button-2 text-white tablet:flex",
        INTERACTIVE_BUTTON,
      )}
      href={link.href}
      rel={link.openInNewTab ? "noreferrer" : undefined}
      target={link.openInNewTab ? "_blank" : undefined}
    >
      <span>{link.label}</span>
      <span
        aria-hidden="true"
        className="flex items-center justify-center rounded-full bg-surface-primary p-1 text-icon-tkh-primary"
      >
        <ArrowUpRightIcon />
      </span>
    </a>
  );
}

function UtilityBar({
  contactCta,
  searchLink,
  topLinks,
}: {
  contactCta: HeaderLink;
  searchLink: HeaderLink;
  topLinks: HeaderTopLinks;
}) {
  return (
    <div
      className={`${GLASS_PANEL} hidden mobile:flex max-h-11.75 w-full justify-between mobile:rounded-t-[40px] border border-x-white/35 border-b-stroke-primary border-t-white/35 px-5xl py-m`}
    >
      <nav
        aria-label="University links"
        className="flex items-center justify-center gap-xl text-button-2"
      >
        {utilityLinkGroupIds.map((groupId) => (
          <div
            className={cn(
              "flex items-center gap-xl",
              groupId === "resources" && "border-l border-stroke-primary pl-xl",
            )}
            key={groupId}
          >
            {topLinks[groupId].map((link) => (
              <a
                className={cn("inline-flex items-center whitespace-nowrap", INTERACTIVE_LINK)}
                href={link.href}
                key={link.id}
                rel={link.openInNewTab ? "noreferrer" : undefined}
                target={link.openInNewTab ? "_blank" : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </nav>

      <div className="flex items-center justify-center gap-xl text-body-2">
        <a
          className={cn("inline-flex items-center gap-xs", INTERACTIVE_LINK)}
          href={searchLink.href}
          rel={searchLink.openInNewTab ? "noreferrer" : undefined}
          target={searchLink.openInNewTab ? "_blank" : undefined}
        >
          <SearchIcon />
          <span>{searchLink.label}</span>
        </a>
        <a
          className={cn("whitespace-nowrap", INTERACTIVE_LINK)}
          href={contactCta.href}
          rel={contactCta.openInNewTab ? "noreferrer" : undefined}
          target={contactCta.openInNewTab ? "_blank" : undefined}
        >
          {contactCta.label}
        </a>
      </div>
    </div>
  );
}
