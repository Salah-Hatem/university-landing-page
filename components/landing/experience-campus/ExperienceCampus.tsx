import {Button} from "@/components/ui/Button";

import {ExperienceCarousel} from "./ExperienceCarousel";
import {type getExperienceData} from "./data";

type ExperienceCampusProps = {
    experience: ReturnType<typeof getExperienceData>;
};

export function ExperienceCampus({experience}: ExperienceCampusProps) {
    return (
        <section className="w-full bg-[linear-gradient(126deg,#F5F7FB_26.64%,#FDF1EE_76.11%)]">
            <ExperienceCarousel
                tabs={experience.tabs}
                heading={
                    <div className="flex flex-col gap-2xl mobile:gap-3xl ps-8 mobile:ps-14">
                        <span className="self-start bg-surface-uni-secondary px-m py-s text-subtitle-1 text-text-invert">
                            {experience.eyebrow}
                        </span>
                        <h2 className="text-H2 text-text-primary">
                            {experience.heading}
                        </h2>
                    </div>
                }
                cta={
                    <div className="ml-l mobile:ml-0 mobile:ps-14">
                        <Button
                            variant="primary"
                            size="L"
                            className="w-fit"
                            href={experience.cta.href}
                            rel={experience.cta.openInNewTab ? "noreferrer" : undefined}
                            target={experience.cta.openInNewTab ? "_blank" : undefined}
                        >
                            {experience.cta.label}
                        </Button>
                    </div>
                }
            />
        </section>
    );
}
