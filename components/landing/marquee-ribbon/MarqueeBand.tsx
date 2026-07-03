import Image from "next/image";
import { type ReactNode } from "react";

import { Marquee } from "./Marquee";
import { FALLBACK_LABEL, LOGO_REPEAT, MARQUEE_SPEED, type getMarqueeData } from "./data";

/** One resolved band from the CMS adapter: fixed geometry plus its logo (or `null`). */
type MarqueeBandConfig = ReturnType<typeof getMarqueeData>["bands"][number];

/** Fixed tilt magnitude. */
const ROTATE_DEG = 4;

/** Vertical centre of each strip as a share of the section height. */
const POSITION_TOP: Record<MarqueeBandConfig["position"], string> = {
    top: "25%",
    center: "50%",
    bottom: "75%",
};

type MarqueeBandProps = {
    band: MarqueeBandConfig;
};

/**
 * A single diagonal ribbon: a full-bleed coloured strip, rotated and clipped,
 * whose logos (or fallback text) scroll horizontally via {@link Marquee}.
 */
export function MarqueeBand({ band }: MarqueeBandProps) {
    const { logo } = band;

    let cells: ReactNode;
    if (logo) {
        cells = Array.from({ length: LOGO_REPEAT }, (_, i) => (
            <div
                key={i}
                className="relative shrink-0"
                style={{
                    width: "var(--mq-logo-w)",
                    height: "var(--mq-logo-h)",
                    marginRight: "var(--mq-gap)",
                }}
            >
                <Image
                    src={logo.url}
                    // Announce the partner once; the repeats are decorative.
                    alt={i === 0 ? logo.alt : ""}
                    fill
                    sizes="525px"
                    className="object-contain object-center"
                />
            </div>
        ));
    } else {
        cells = Array.from({ length: LOGO_REPEAT }, (_, i) => (
            <span
                key={i}
                className="shrink-0 whitespace-nowrap font-title font-bold uppercase leading-none tracking-[2px] text-text-invert"
                style={{ fontSize: "var(--mq-fallback)", marginRight: "var(--mq-gap)" }}
                // Read the message once; the repeats are decorative.
                aria-hidden={i === 0 ? undefined : true}
            >
                {FALLBACK_LABEL}
            </span>
        ));
    }

    return (
        <div
            className={`absolute left-1/2 flex items-center overflow-hidden ${band.backgroundClassName}`}
            style={{
                top: POSITION_TOP[band.position],
                height: "var(--mq-thickness)",
                // Bleed well past the viewport so the rotated strip always reaches both edges.
                width: "calc(100vw + 400px)",
                transform: `translate(-50%, -50%) rotate(${band.rotateSign * ROTATE_DEG}deg)`,
            }}
        >
            <Marquee speed={MARQUEE_SPEED} direction={band.direction}>
                {cells}
            </Marquee>
        </div>
    );
}
