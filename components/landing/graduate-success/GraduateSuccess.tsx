import {SubtitleTag} from "@/components/ui/SubtitleTag";
import {Button} from "@/components/ui/Button";
import GraduatesSlider from "@/components/landing/graduate-success/GraduatesSlider";
import type {getGraduateSuccessData} from "@/components/landing/graduate-success/data";

type GraduateSuccessProps = {
    graduates: ReturnType<typeof getGraduateSuccessData>;
};

export function GraduateSuccess({graduates}: GraduateSuccessProps) {

    return (


        <section
            className="w-full flex flex-col items-center bg-[linear-gradient(233deg,#FDF1EE_11.13%,#F5F7FB_85.19%)] gap-7xl px-m py-8xl mobile:gap-7xl mobile:p-8xl tablet:gap-2xl tablet:px-8xl tablet:py-7xl"
        >
            {/*  Title */}
            <div className="flex w-full flex-col items-center gap-3xl mobile:max-w-[922px] mobile:gap-3xl tablet:max-w-[695px] tablet:gap-xl">
                <SubtitleTag>{graduates.eyebrow}</SubtitleTag>
                <div className="flex flex-col items-center gap-2xl mobile:gap-2xl tablet:gap-m">
                    <h2
                        id="upcoming-events-heading"
                        className="text-H2 text-center text-text-primary"
                    >
                        {graduates.heading}
                    </h2>
                    <p className="text-body-1 text-center text-text-secondary max-w-[540px]">
                        {graduates.description}
                    </p>
                </div>
            </div>

            <GraduatesSlider
                items={graduates.testimonials}
                cta={
                    <Button
                        href={graduates.cta.href}
                        variant="primary"
                        target={graduates.cta.openInNewTab ? "_blank" : undefined}
                        rel={graduates.cta.openInNewTab ? "noreferrer" : undefined}
                    >
                        {graduates.cta.label}
                    </Button>
                }
            />
        </section>
    )
}
