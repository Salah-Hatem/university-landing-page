import {Button} from "@/components/ui/Button";
import type {getAdmissionsData} from "@/components/landing/admission-steps/data";

type AdmissionStepsProps = {
    admissions: ReturnType<typeof getAdmissionsData>;
};

export function AdmissionSteps({admissions}: AdmissionStepsProps) {
    const {eyebrow, heading, description, cta, steps} = admissions;

    return (
        <section className="w-full bg-[linear-gradient(126deg,#F5F7FB_26.64%,#FDF1EE_76.11%)]">
            <div
                className="mx-auto flex w-full max-w-[1920px] flex-col gap-2xl px-m py-m mobile:gap-7xl mobile:px-8xl mobile:py-8xl tablet:flex-row tablet:items-center tablet:py-7xl">

                {/*  Title*/}
                <div
                    className="flex w-full flex-col items-start gap-2xl mobile:max-w-[669px] mobile:gap-3xl tablet:w-117.25 tablet:gap-xl">
                    <span
                        className="inline-flex items-center justify-center bg-surface-uni-secondary px-l py-s text-subtitle-2 text-text-invert mobile:text-subtitle-1 tablet:px-m">
                        {eyebrow}
                    </span>
                    <div className="flex w-full flex-col items-start gap-xl mobile:gap-2xl tablet:gap-m">
                        <h2 className="text-H2 text-text-primary">
                            {heading}
                        </h2>
                        <p className="text-body-1 text-text-secondary">
                            {description}
                        </p>
                    </div>
                    <Button
                        variant="primary"
                        className="hidden w-fit mobile:flex"
                        href={cta.href}
                        target={cta.openInNewTab ? "_blank" : undefined}
                        rel={cta.openInNewTab ? "noreferrer" : undefined}
                    >
                        {cta.label}
                    </Button>
                </div>

                {/*  Steps*/}
                <div className="flex w-full flex-col items-stretch gap-l mobile:gap-2xl tablet:flex-1 tablet:gap-l">
                    {steps.map((step, index) => (
                        <div key={step.number}
                             className="flex w-full flex-col items-start gap-l mobile:gap-2xl tablet:gap-l">
                            {/*Line*/}
                            <div className="h-px w-full bg-stroke-primary"/>

                            {/*Row*/}
                            <div
                                className="flex w-full flex-col items-start gap-m mobile:flex-row mobile:items-center mobile:gap-xl tablet:gap-2xl tablet:px-10">
                                <div
                                    className="flex size-10 items-center justify-center rounded-full bg-surface-uni-secondary mobile:size-14 tablet:size-12">
                                    <span
                                        className="font-title font-bold text-text-invert text-xs tablet:block tablet:text-lg">
                                        {step.number}
                                    </span>
                                </div>
                                <h3 className="font-title font-bold text-sm text-text-primary mobile:text-H5 tablet:w-75">{step.title}</h3>
                                <p className="w-full font-body text-sm text-text-secondary mobile:w-auto mobile:text-xl tablet:flex-1 tablet:text-base">{step.description}</p>
                            </div>

                            {/*    Last Line*/}
                            {
                                index === steps.length - 1 ? <div className="h-px w-full bg-stroke-primary"/> : null
                            }
                        </div>
                    ))}
                </div>

                {/*  CTA (mobile only — bottom, centered)*/}
                <div className="flex w-full justify-center mobile:hidden">
                    <Button
                        variant="primary"
                        className="w-fit"
                        href={cta.href}
                        target={cta.openInNewTab ? "_blank" : undefined}
                        rel={cta.openInNewTab ? "noreferrer" : undefined}
                    >
                        {cta.label}
                    </Button>
                </div>
            </div>
        </section>
    )
}
