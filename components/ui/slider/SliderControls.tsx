"use client";

import {NextOutlineIcon, PrevOutlineIcon} from "@/components/landing/header/icons";

type SliderControlsProps = {
    onPrev: () => void;
    onNext: () => void;
    atStart: boolean;
    atEnd: boolean;
    /** Accessible label for the previous button (describe the content, e.g. "Previous majors"). */
    prevLabel: string;
    /** Accessible label for the next button. */
    nextLabel: string;
    className?: string;
};

/**
 * Prev/next icon controls for the landing sliders; pair with
 * {@link useEmblaSlider}.
 */
export function SliderControls({
                                   onPrev,
                                   onNext,
                                   atStart,
                                   atEnd,
                                   prevLabel,
                                   nextLabel,
                                   className = "",
                               }: SliderControlsProps) {
    return (
        <div className={`flex items-center gap-l ${className}`.trim()}>
            <SliderButton direction="prev" label={prevLabel} disabled={atStart} onClick={onPrev}/>
            <SliderButton direction="next" label={nextLabel} disabled={atEnd} onClick={onNext}/>
        </div>
    );
}

type SliderButtonProps = {
    direction: "prev" | "next";
    label: string;
    disabled: boolean;
    onClick: () => void;
};

function SliderButton({direction, label, disabled, onClick}: SliderButtonProps) {
    const Icon = direction === "prev" ? PrevOutlineIcon : NextOutlineIcon;

    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            aria-label={label}
            className={`flex size-14 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stroke-tkh-primary focus-visible:ring-offset-2 ${
                disabled ? "cursor-not-allowed text-icon-inactive" : "text-icon-tkh-primary"
            }`}
        >
            <Icon className="size-full"/>
        </button>
    );
}
