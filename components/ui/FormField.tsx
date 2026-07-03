import type { ComponentPropsWithoutRef } from "react";

type BaseFormFieldProps = {
    id: string;
    /** Label shown to the left of (tablet+) / above (mobile) the control. */
    label: string;
    /** Renders the brand-orange asterisk and sets the control as required. */
    required?: boolean;
    /** Render a multi-line `<textarea>` instead of an `<input>`. */
    multiline?: boolean;
};

type FormFieldProps = BaseFormFieldProps &
    Omit<ComponentPropsWithoutRef<"input"> & ComponentPropsWithoutRef<"textarea">, "id">;

/**
 * Underlined contact-form field: a fixed 350px label column and a free-text
 * control sharing a single bottom border, laid out as a label-left row at every
 * breakpoint to match the Figma "Get In Touch" inputs. The control keeps
 * `flex-1 min-w-0`, so on narrow screens it shrinks to the space left beside the
 * label rather than overflowing.
 */
export function FormField({
    id,
    label,
    required = false,
    multiline = false,
    className,
    ...props
}: FormFieldProps) {
    const controlClass =
        "flex-1 min-w-0 px-l bg-transparent outline-none text-H6 text-text-primary";

    return (
        <div className="flex w-full flex-row items-center border-b border-stroke-primary pb-l -mb-px">
            <label
                htmlFor={id}
                className="flex w-[350px] shrink-0 items-center gap-xxs px-l text-body-1 text-text-secondary"
            >
                {label}
                {required ? (
                    <span aria-hidden="true" className="text-text-tkh-primary">
                        *
                    </span>
                ) : null}
            </label>
            {multiline ? (
                <textarea
                    id={id}
                    required={required}
                    rows={1}
                    className={`${controlClass} resize-none ${className ?? ""}`.trim()}
                    {...(props as ComponentPropsWithoutRef<"textarea">)}
                />
            ) : (
                <input
                    id={id}
                    required={required}
                    className={`${controlClass} ${className ?? ""}`.trim()}
                    {...(props as ComponentPropsWithoutRef<"input">)}
                />
            )}
        </div>
    );
}
