import type { ReactNode } from "react";

import Image from "next/image";

import { SearchIcon } from "@/components/landing/header/icons";
import {
    EnvelopeIcon,
    FacebookIcon,
    InstagramIcon,
    LinkedinIcon,
    MapPinIcon,
    PhoneIcon,
} from "@/components/landing/footer/icons";
import type { SocialPlatform, getFooterData } from "@/components/landing/footer/data";
import { FOCUS_RING, INTERACTIVE_BUTTON } from "@/components/ui/interaction";

/** Contact glyphs stay in code, matched positionally to phone / address / email. */
const CONTACT_ICONS: {
    icon: ReactNode;
    field: "phone" | "address" | "email";
    alignTop?: boolean;
}[] = [
    { icon: <PhoneIcon />, field: "phone" },
    { icon: <MapPinIcon />, field: "address", alignTop: true },
    { icon: <EnvelopeIcon />, field: "email" },
];

/** Social brand icons stay in code, keyed by the CMS `platform` value. */
const SOCIAL_ICONS: Record<SocialPlatform, ReactNode> = {
    facebook: <FacebookIcon />,
    instagram: <InstagramIcon />,
    linkedin: <LinkedinIcon />,
};

const footerBodyClass = "text-xs font-body text-surface-primary mobile:text-base";

const footerLinkClass = `${footerBodyClass} transition-colors hover:text-text-tkh-primary ${FOCUS_RING}`;

export function Footer({ footer }: { footer: ReturnType<typeof getFooterData> }) {
    const { contact, search } = footer;

    return (
        <footer className="w-full bg-[linear-gradient(93.219deg,#1e2749_18.073%,#101828_49.291%,#27202f_80.509%)] mobile:bg-[linear-gradient(101.94deg,#1e2749_18.073%,#101828_49.291%,#27202f_80.509%)] tablet:bg-[linear-gradient(116.841deg,#1e2749_18.073%,#101828_49.291%,#27202f_80.509%)]">
            <div className="mx-auto flex max-w-[1920px] flex-col gap-2xl px-m pt-2xl pb-2xl mobile:gap-7xl mobile:px-7xl mobile:pt-7xl mobile:pb-3xl tablet:gap-2xl">
                {/* 1. Top row */}
                <div className="flex w-full flex-col items-start gap-3xl mobile:flex-row mobile:flex-wrap mobile:justify-center mobile:gap-4xl tablet:justify-between tablet:gap-y-4xl">
                    {/* Logo + tagline */}
                    <div className="flex w-full flex-col gap-xl mobile:min-w-[359px] mobile:max-w-[360px] mobile:flex-1 mobile:gap-2xl">
                        <Image
                            src={footer.logo.url}
                            alt={footer.logo.alt}
                            width={360}
                            height={46}
                            className="h-auto w-[300px] mobile:w-full mobile:max-w-[360px]"
                        />
                        <p className={footerBodyClass}>
                            {footer.description}
                        </p>
                    </div>

                    {/* Contact */}
                    <div className="flex w-full flex-col gap-m mobile:min-w-[361px] mobile:max-w-[500px] mobile:flex-1 mobile:gap-l">
                        <h2 className="text-H6 text-surface-primary">{contact.heading}</h2>
                        <ul className="flex flex-col gap-m">
                            {CONTACT_ICONS.map((item) => (
                                <li
                                    key={item.field}
                                    className={`flex gap-s ${item.alignTop ? "items-start" : "items-center"}`}
                                >
                                    <span
                                        aria-hidden="true"
                                        className="shrink-0 text-surface-primary"
                                    >
                                        {item.icon}
                                    </span>
                                    <span className={footerBodyClass}>
                                        {contact[item.field]}
                                    </span>
                                </li>
                            ))}
                        </ul>
                        <a
                            href={contact.cta.href}
                            target={contact.cta.openInNewTab ? "_blank" : undefined}
                            rel={contact.cta.openInNewTab ? "noreferrer" : undefined}
                            className={`inline-flex items-center gap-s self-start rounded-full bg-surface-tkh-primary py-xs pr-xs pl-l text-button-2 text-text-invert ${INTERACTIVE_BUTTON}`}
                        >
                            {contact.cta.label}
                            <Image
                                src="/svg/arrow-up-invet.svg"
                                alt=""
                                width={32}
                                height={32}
                            />
                        </a>
                    </div>

                    {/* Search + socials */}
                    <div className="flex w-full flex-col gap-m mobile:min-w-[359px] mobile:max-w-[680px] mobile:flex-1 mobile:gap-l">
                        <h2 className="text-H6 text-surface-primary">
                            {search.heading}
                        </h2>
                        <div className="flex h-12 w-full items-center gap-xs mobile:h-16 mobile:gap-m">
                            <div className="flex h-full min-w-0 flex-1 items-center gap-m rounded-full bg-surface-primary pr-xl pl-m py-m mobile:pl-l">
                                <span
                                    aria-hidden="true"
                                    className="shrink-0 text-stroke-inactive"
                                >
                                    <SearchIcon />
                                </span>
                                <input
                                    type="search"
                                    placeholder={search.placeholder}
                                    aria-label="Search"
                                    className="min-w-0 flex-1 bg-transparent text-xs font-body text-text-primary outline-none placeholder:text-text-secondary mobile:text-base"
                                />
                            </div>
                            <button
                                type="button"
                                className={`h-full shrink-0 rounded-full bg-surface-tkh-primary px-l text-button-2 text-text-invert ${INTERACTIVE_BUTTON}`}
                            >
                                {search.buttonLabel}
                            </button>
                        </div>
                        <ul className="flex gap-m mobile:gap-l">
                            {footer.socials.map((social) => (
                                <li key={social.platform}>
                                    <a
                                        href={social.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={social.label}
                                        className={`flex size-[50px] items-center justify-center rounded-full bg-[rgba(44,42,97,0.3)] text-surface-primary transition-colors hover:bg-surface-tkh-primary ${FOCUS_RING}`}
                                    >
                                        {SOCIAL_ICONS[social.platform]}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* 2. Link lists */}
                <nav className="grid w-full grid-cols-2 gap-x-l gap-y-3xl border-t border-stroke-uni-secondary pt-xl mobile:flex mobile:flex-wrap mobile:justify-between mobile:gap-y-4xl mobile:pt-2xl">
                    {footer.linkColumns.map((column, index) => (
                        <div
                            key={column.title}
                            className={`flex flex-col gap-m mobile:gap-l ${index === 0 ? "col-span-2" : ""}`}
                        >
                            <h3 className="text-H6 text-surface-primary">{column.title}</h3>
                            <ul className="flex flex-col gap-xs mobile:gap-s">
                                {column.links.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            target={link.openInNewTab ? "_blank" : undefined}
                                            rel={link.openInNewTab ? "noreferrer" : undefined}
                                            className={footerLinkClass}
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    {/* Mobile-only divider above the extra links */}
                    <div
                        aria-hidden="true"
                        className="col-span-2 h-px w-[360px] max-w-full bg-stroke-uni-secondary mobile:hidden"
                    />

                    {/* Decorative vertical divider (desktop only) */}
                    <div
                        aria-hidden="true"
                        className="hidden h-[222px] w-px bg-stroke-uni-secondary tablet:block"
                    />

                    <ul className="col-span-2 flex w-full flex-wrap gap-l mobile:justify-center tablet:w-auto tablet:flex-col tablet:justify-start">
                        {footer.moreLinks.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    target={link.openInNewTab ? "_blank" : undefined}
                                    rel={link.openInNewTab ? "noreferrer" : undefined}
                                    className={footerLinkClass}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* 3. Bottom bar */}
                <div className="flex w-full flex-col items-start gap-l border-t border-stroke-uni-secondary pt-xl mobile:items-center mobile:gap-2xl mobile:pt-2xl tablet:flex-row tablet:items-center tablet:justify-between">
                    <p className={`${footerBodyClass} mobile:text-center tablet:text-left tablet:min-w-[361px] tablet:flex-1`}>
                        {footer.copyright}
                    </p>
                    <ul className="flex flex-wrap gap-x-xl gap-y-xs mobile:gap-2xl">
                        {footer.legalLinks.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    target={link.openInNewTab ? "_blank" : undefined}
                                    rel={link.openInNewTab ? "noreferrer" : undefined}
                                    className={footerLinkClass}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}
