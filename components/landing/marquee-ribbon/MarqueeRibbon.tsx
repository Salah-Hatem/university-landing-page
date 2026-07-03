import type { getMarqueeData } from "./data";
import { MarqueeBand } from "./MarqueeBand";


const MARQUEE_VARS = [
    "[--mq-h:318px] mobile:[--mq-h:908px] tablet:[--mq-h:720px]",
    "[--mq-thickness:95px] mobile:[--mq-thickness:285px] tablet:[--mq-thickness:200px]",
    "[--mq-logo-w:166px] mobile:[--mq-logo-w:525px] tablet:[--mq-logo-w:404px]",
    "[--mq-logo-h:48px] mobile:[--mq-logo-h:178px] tablet:[--mq-logo-h:111px]",
    "[--mq-gap:40px] mobile:[--mq-gap:140px] tablet:[--mq-gap:100px]",
    "[--mq-fallback:40px] mobile:[--mq-fallback:110px] tablet:[--mq-fallback:76px]",
].join(" ");


type MarqueeRibbonProps = {
    marquee: ReturnType<typeof getMarqueeData>;
};

export function MarqueeRibbon({ marquee }: MarqueeRibbonProps) {
    return (
        <section
            aria-label="Our university partners"
            className={`relative w-full overflow-hidden ${MARQUEE_VARS}`}
            style={{
                height: "var(--mq-h)",
                background:
                    "linear-gradient(152.4deg, #F5F7FB 26.64%, #FDF1EE 76.11%)",
            }}
        >
            {marquee.bands.map((band) => (
                <MarqueeBand key={band.id} band={band} />
            ))}
        </section>
    );
}
