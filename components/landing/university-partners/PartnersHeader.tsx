import type { UniversitiesSection } from "@/payload-types";

type PartnersHeaderProps = Pick<UniversitiesSection, "eyebrow" | "heading" | "description">;


export function PartnersHeader({ eyebrow, heading, description }: PartnersHeaderProps) {
    return (
        <div className="flex w-full flex-col items-center gap-2xl text-center tablet:gap-3xl">
            <div className="flex items-center justify-center bg-surface-uni-secondary px-m py-s tablet:px-l tablet:py-[13px]">
                <p className="text-subtitle-2 text-text-invert mobile:text-subtitle-1">
                    {eyebrow}
                </p>
            </div>

            <div className="flex w-full flex-col items-center gap-m text-center">
                <h2 className="text-H2 text-black">{heading}</h2>
                <p className="text-body-1 w-full max-w-[540px] text-text-secondary">
                    {description}
                </p>
            </div>
        </div>
    );
}
