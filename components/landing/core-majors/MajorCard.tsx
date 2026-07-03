import Image from "next/image";

import { INTERACTIVE_CARD } from "@/components/ui/interaction";

import { CARD_CLIP_PATH, type getCoreMajorsData } from "./data";

/** One resolved major card from the CMS adapter. */
type Major = ReturnType<typeof getCoreMajorsData>["majors"][number];

type MajorCardProps = {
    major: Major;
};

/**
 * A single slide: full-bleed campus image clipped to the brand bevel, with the
 * major name and program count anchored in the bottom-left (padded to clear the
 * angled corner).
 */
export function MajorCard({ major }: MajorCardProps) {
    return (
        <div
            className={`relative aspect-[548/542] w-[85vw] shrink-0 select-none overflow-hidden w-[318px] mobile:w-[652px] tablet:w-[548px] ${INTERACTIVE_CARD} `}
            style={{ clipPath: CARD_CLIP_PATH }}
        >
            <Image
                src={major.image.url}
                alt={major.image.alt}
                fill
                sizes="(max-width: 1280px) 85vw, 548px"
                className="pointer-events-none object-cover "
                draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_60%,#000_100%)]" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex flex-col gap-xs pb-m pl-[18%] pr-l mobile:gap-2xl mobile:pb-4xl tablet:gap-m tablet:pb-l">
                <span className="text-H3 text-text-invert">{major.name}</span>
                <span className="text-body-1 text-text-invert">
                    {major.programCount} Programs
                </span>
            </div>
        </div>
    );
}
