import type { ReactNode } from "react";

type SubtitleTagProps = {
    children: ReactNode;
    /** Extra classes for alignment overrides. */
    className?: string;
};

/**
 * Small label "tag" used as an eyebrow above section headings.
 */
export function SubtitleTag({ children, className = "" }: SubtitleTagProps) {
    return (
        <span
            className={`inline-flex items-center justify-center bg-surface-uni-secondary min-h-11.5 px-m py-s text-subtitle-1 text-text-invert ${className}`.trim()}
        >
            {children}
        </span>
    );
}
