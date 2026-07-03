import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { RATING_BADGES } from "@/components/landing/university-partners/data";
import { normalizeMedia } from "@/lib/cms/media";
import type { University } from "@/payload-types";

type UniversityCardProps = {
    university: University;
    /**
     * Show the three rating badges (desktop stage). The tablet/mobile grid passes
     * `false` — those frames show only the logo + CTA on a compact square card.
     */
    showBadges?: boolean;
};


export function UniversityCard({ university, showBadges = true }: UniversityCardProps) {
    const image = normalizeMedia(university.image);
    const logo = normalizeMedia(university.logo);
    const badges = university.highlights?.length ? university.highlights : RATING_BADGES;

    return (
        <div className="relative flex h-full w-full cursor-pointer items-end overflow-hidden rounded-[40px] bg-linear-119 from-black/0 to-black/60 p-6 tablet:px-12 tablet:pb-12">
            {/* Campus background */}
            <Image
                src={image?.url ?? ""}
                alt=""
                fill
                sizes="(min-width: 1281px) 1440px, (min-width: 687px) 517px, 360px"
                className="-z-10 rounded-[40px] object-cover"
            />

            {/* Content */}
            <div className="z-9 flex w-full flex-col justify-between gap-l">
                <Image
                    src={logo?.url ?? ""}
                    alt={university.name}
                    width={logo?.width ?? 200}
                    height={logo?.height ?? 100}
                    className="h-auto w-50 tablet:max-w-50"
                />

                <div className="z-9 flex w-full items-center justify-between">
                    <Button
                        variant="secondary"
                        size="xl"
                        className="w-fit"
                        href={university.cta?.href ?? "#"}
                        rel={university.cta?.openInNewTab ? "noreferrer" : undefined}
                        target={university.cta?.openInNewTab ? "_blank" : undefined}
                    >
                        {university.cta?.label}
                    </Button>

                    {showBadges && (
                        <div className="flex gap-l">
                            {badges.map((badge, index) => (
                                <div
                                    key={badge.id ?? badge.title ?? index}
                                    className="flex flex-col items-start justify-center gap-1 rounded-2xl border border-white/10 bg-black/50 px-6 py-5 text-white shadow-lg backdrop-blur-md"
                                >
                                    <p className="text-H6">{badge.title}</p>
                                    <p className="text-body-2 whitespace-pre-line">{badge.description}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
