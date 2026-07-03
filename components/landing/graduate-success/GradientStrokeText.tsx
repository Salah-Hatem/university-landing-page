import type {CSSProperties, ReactNode} from "react";

type GradientStrokeTextProps = {
    children: ReactNode;
    strokeWidth?: string; gradient?: string;
    fill?: string;
    className?: string;
};

export function GradientStrokeText({
    children,
    strokeWidth = "40px",
    gradient = "linear-gradient(102deg, #1E2749 18.07%, #101828 49.29%, #27202F 80.51%)",
    fill = "#FFFFFF",
    className = "",
}: GradientStrokeTextProps) {
    const style: CSSProperties = {
        padding: "var(--gradient-stroke-text-padding, 40px)",
        fontFamily: "var(--font-family-number)",
        // gradient lives on the background, clipped to the glyph shape
        background: gradient,
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        // solid center fill
        WebkitTextFillColor: fill,
        // transparent stroke ring reveals the gradient behind it
        WebkitTextStroke: `${strokeWidth} transparent`,
        // paint stroke first so the fill stays crisp on top
        paintOrder: "stroke fill",
    };

    return (
        <p
            className={`text-center text-number ${className}`}
            style={style}
        >
            {children}
        </p>
    );
}
