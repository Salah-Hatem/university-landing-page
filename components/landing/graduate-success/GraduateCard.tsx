import Image from "next/image";
import { CARD_CLIP_PATH } from "@/components/landing/core-majors/data";
import { GradientStrokeText } from "@/components/landing/graduate-success/GradientStrokeText";
import type { getGraduateSuccessData } from "@/components/landing/graduate-success/data";

/** One resolved testimonial from the CMS adapter. */
type Testimonial = ReturnType<typeof getGraduateSuccessData>["testimonials"][number];

type GraduateCardProps = {
    testimonial: Testimonial;
};

export default function GraduateCard({ testimonial }: GraduateCardProps) {
    return (
        <div className="flex flex-col justify-start w-full tablet:w-172 p-2.5 mobile:p-4.75 h-116 mobile:h-245.75 tablet:h-165
                border-12 mobil:border-16 border-surface-primary gap-3 mobile:gap-8.5 tablet:gap-6
                 bg-[linear-gradient(102deg,#1E2749_18.07%,#101828_49.29%,#27202F_80.51%)]
                ">
            {/* Photo */}
            <div className="relative overflow-hidden ">
                <Image
                    style={{ clipPath: CARD_CLIP_PATH }}
                    src={testimonial.image.url}
                    alt={
                        testimonial.image.alt ||
                        `${testimonial.graduateName}, ${testimonial.graduationYear} graduate`
                    }
                    width={616}
                    height={412}
                    className=" object-cover h-54.5 mobile:h-153.5 tablet:max-h-103 w-82 mobile:w-full tablet:min-w-154 tablet:w-full "
                />
                {/* Date */}
                <GradientStrokeText
                    className="absolute right-0 top-0 mobile:-right-4.75 mobile:-top-4.75 z-9 [--graduate-card-date-stroke:16px] [--gradient-stroke-text-padding:18px] mobile:[--graduate-card-date-stroke:32px] mobile:[--gradient-stroke-text-padding:40px]"
                    strokeWidth="var(--graduate-card-date-stroke)"
                    gradient="linear-gradient(102deg, #1E2749 18.07%, #101828 49.29%, #27202F 80.51%)"
                    fill="#fff"
                >
                    {testimonial.graduationYear}<br />Grad
                </GradientStrokeText>
                <span className="mobile:absolute w-50 bottom-2 tablet:w-33.5 left-4.5 hidden mobile:block">
                <Image
                    className=""
                    src="/svg/Nova-stroke.svg"
                    alt={`${testimonial.school} logo`}
                    width={134}
                    height={60}
                />
                    </span>
            </div>
            {/* Description */}
            <div className="flex gap-4 tablet:gap-2.5 mobile:mx-16 tablet:mx-0">
                {/* Avatar */}
                <Image
                    className="h-[37px] w-[37px] mobile:w-26 mobile:h-26 tablet:w-17.5 tablet:h-17.5 rounded-full"
                    src={testimonial.avatar.url}
                    alt={testimonial.avatar.alt || testimonial.graduateName}
                    width={100}
                    height={100}
                />
                {/* Text */}
                <div className="flex flex-col mobile:mt-3 tablet:mt-0 gap-1.5 mobile:gap-4 tablet:gap-2">
                    <h4 className="text-H4 mobile:mt-3 tablet:mt-0 text-text-invert">{testimonial.graduateName}</h4>
                    <p className="text-subtitle-2 text-text-invert">{testimonial.role}</p>
                    <p className="text-body-2 text-text-invert">{testimonial.quote}</p>
                </div>
            </div>
        </div>
    );
}
