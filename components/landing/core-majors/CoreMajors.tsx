import { SubtitleTag } from "@/components/ui/SubtitleTag";

import { type getCoreMajorsData } from "./data";
import { MajorsSlider } from "./MajorsSlider";

type CoreMajorsProps = {
    majors: ReturnType<typeof getCoreMajorsData>;
};

export function CoreMajors({ majors }: CoreMajorsProps) {
    return (
        <section
            aria-labelledby="core-majors-heading"
            className="w-full bg-[linear-gradient(214.9deg,#FDF1EE_11.13%,#F5F7FB_85.19%)]"
        >
            <div className="mx-auto flex max-w-[1920px] flex-col items-center px-2xl py-m gap-2xl mobile:px-3xl mobile:py-8xl mobile:gap-7xl tablet:py-7xl tablet:gap-2xl">
                <div className="flex w-full flex-col items-center gap-2xl mobile:max-w-[922px] mobile:gap-3xl tablet:max-w-135 tablet:gap-xl">
                    <SubtitleTag>{majors.eyebrow}</SubtitleTag>
                    <h2
                        id="core-majors-heading"
                        className="text-H2 text-center text-text-primary"
                    >
                        {majors.heading}
                    </h2>
                </div>
                <MajorsSlider
                    majors={majors.majors}
                />
            </div>
        </section>
    );
}
