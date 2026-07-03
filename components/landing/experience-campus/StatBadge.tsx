import {type getExperienceData} from "./data";

type ExperienceStat = ReturnType<typeof getExperienceData>["tabs"][number]["stat"];

type StatBadgeProps = {
    stat: ExperienceStat;
};

/**
 * Angled blue stat badge anchored to the bottom-left of each campus image.
 * Sizing/position are expressed as percentages of the 806×796 frame so it
 * scales with the responsive image.
 */
export function StatBadge({stat}: StatBadgeProps) {
    return (
        <div
            className="absolute bottom-0 left-[8.7%] flex aspect-[205.35/202.783] w-[90px] flex-col bg-surface-uni-secondary pt-[20px] text-text-invert mobile:w-[224px] mobile:pt-12 tablet:w-[205.35px] tablet:pt-11 [clip-path:polygon(0_0,87.974682%_0,100%_37.836109%,100%_100%,11.772152%_100%,0_61.523691%)]"
        >
            <div className="mx-auto flex flex-col">
                <span className="font-cta font-medium leading-none tracking-[1px] text-[10px] mobile:text-[16px] tablet:text-[18px]">
                    {stat.label}
                </span>
                <span className="font-mdcn text-[28px] mobile:text-[76px] tablet:text-[72px]">
                    {stat.value}
                </span>
            </div>
        </div>
    );
}
