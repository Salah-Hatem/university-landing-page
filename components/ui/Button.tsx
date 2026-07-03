import Image from "next/image";
import type {ComponentPropsWithoutRef, ReactNode} from "react";
import {cn} from "@/components/landing/utils";
import {BRAND_HOVER, FOCUS_RING} from "@/components/ui/interaction";

export type ButtonVariant = "primary" | "outline" | "secondary";
export type ButtonSize = "sm" | "md" | "lg" | "xl" | "L";

type CommonButtonProps = {
    icon?: ReactNode;
    iconPosition?: "start" | "end";
    variant?: ButtonVariant;
    size?: ButtonSize;
};

export type ButtonProps =
    | (CommonButtonProps & ComponentPropsWithoutRef<"a"> & { as?: "a" })
    | (CommonButtonProps & ComponentPropsWithoutRef<"button"> & { as: "button" });

const BUTTON_BASE_CLASS =
    "flex flex-row items-center justify-center mobile:gap-l rounded-full text-button-1 " +
    "transition-colors duration-200 ease-out mobile:min-w-[317px] " +
    FOCUS_RING;

// Each variant carries its own explicit hover colour (no brightness, no
// movement): the orange primary brightens to a lighter orange, the white
// secondary picks up a warm tint, and the transparent outline gets a light fill.
const BUTTON_VARIANT_CLASSES: Record<ButtonVariant, string> = {
    primary: `bg-surface-tkh-primary gap-6 p-xs pl-xl text-text-invert ${BRAND_HOVER}`,
    secondary: "bg-surface-primary p-1 mobile:p-xs mobile:pl-xl text-text-tkh-primary hover:bg-[#fff1ec]",
    outline:
        "mobile:h-14 py-3.5 mobile:py-4 mobile:px-8 text-text-invert shadow-[inset_0_0_0_2px_rgba(255,255,255,1)] hover:bg-white/10",
};

const BUTTON_ICON_SIZE: Record<ButtonSize, number> = {
    sm: 32,
    md: 40,
    lg: 48,
    xl: 56,
    L: 56,
};

// Extra layout overrides for sizes that change more than the icon. "L" matches
// the Experience CTA in Figma (node 1:6287) on phones only: a 56px icon circle
// with a 24px gap. At the `mobile` breakpoint (>=687px) and up it collapses back
// to the default size, so it stays large on mobile and normal elsewhere.
const BUTTON_SIZE_CLASSES: Partial<Record<ButtonSize, string>> = {
    L: "gap-l",
};

// Icon dimension overrides applied via CSS so a size can be responsive. "L"
// renders the 56px icon on phones and shrinks it to 40px (the default) at the
// `mobile` breakpoint and up.
const BUTTON_ICON_CLASSES: Partial<Record<ButtonSize, string>> = {
    L: "size-14 mobile:size-10",

};

const BUTTON_VARIANT_ICON_SRC: Partial<Record<ButtonVariant, string>> = {
    primary: "/svg/arrow-up-invet.svg",
    secondary: "/svg/arrow-up-icon.svg",
};

function getVariantIcon(
    variant: ButtonVariant,
    iconSize: number,
    iconClassName?: string,
): ReactNode {
    const src = BUTTON_VARIANT_ICON_SRC[variant];
    if (!src) return null;

    return (
        <Image src={src} alt="" width={iconSize} height={iconSize} className={iconClassName}/>
    );
}

export function Button({
                           children,
                           className,
                           icon,
                           iconPosition = "end",
                           variant = "primary",
                           size = "md",
                           as = "a",
                           ...props
                       }: ButtonProps) {
    const buttonIcon =
        icon ?? getVariantIcon(variant, BUTTON_ICON_SIZE[size], BUTTON_ICON_CLASSES[size]);
    const classes = cn(
        BUTTON_BASE_CLASS,
        BUTTON_VARIANT_CLASSES[variant],
        BUTTON_SIZE_CLASSES[size],
        className,
    );

    const content = (
        <>
            {buttonIcon && iconPosition === "start" ? (
                <span aria-hidden="true" className="shrink-0">
                    {buttonIcon}
                </span>
            ) : null}
            <span className="grow text-center">{children}</span>
            {buttonIcon && iconPosition === "end" ? (
                <span aria-hidden="true" className="shrink-0 mobile:ml-auto">
                    {buttonIcon}
                </span>
            ) : null}
        </>
    );

    if (as === "button") {
        return (
            <button className={classes} {...(props as ComponentPropsWithoutRef<"button">)}>
                {content}
            </button>
        );
    }

    return (
        <a className={classes} {...(props as ComponentPropsWithoutRef<"a">)}>
            {content}
        </a>
    );
}


