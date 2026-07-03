import { type getHeroData } from "./data";
import { HeroStage } from "./HeroStage";

type HeroSectionProps = {
    hero: ReturnType<typeof getHeroData>;
};

export function HeroSection({ hero }: HeroSectionProps) {
    return (
        <section
            aria-labelledby="hero-heading"
            className="w-full bg-surface-primary bg-linear-217 from-red-50 to-slate-50 p-m pb-0"
        >
            <HeroStage hero={hero} />
        </section>
    );
}
