import type { ReactNode } from "react";

import type { University } from "@/payload-types";

import { UniversityCard } from "./UniversityCard";

type PartnersGridProps = {
    /** Server-rendered header block, stacked above the cards. */
    header: ReactNode;
    /** The four partner cards. */
    cards: University[];
};


const CARD_TILT = [
    "-rotate-2",
    "rotate-2",
    "-rotate-2 mobile:rotate-2",
    "rotate-2 mobile:-rotate-2",
];

export function PartnersGrid({ header, cards }: PartnersGridProps) {
    return (
        <div className="flex flex-col items-center gap-7xl px-m py-7xl tablet:hidden mobile:gap-8xl mobile:px-2xl mobile:py-8xl">
            <div className="w-full max-w-[572px]">{header}</div>

            <div className="mx-auto flex w-full flex-col items-center gap-2xl mobile:grid mobile:max-w-[1095px] mobile:grid-cols-2 mobile:justify-items-center mobile:gap-l">
                {cards.map((card, index) => (
                    <div
                        key={index}
                        className={`aspect-square w-full max-w-[340px] transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] mobile:max-w-[517px] motion-safe:hover:rotate-0 motion-safe:focus-within:rotate-0 ${CARD_TILT[index]}`}
                    >
                        <UniversityCard university={card} showBadges={false} />
                    </div>
                ))}
            </div>
        </div>
    );
}
