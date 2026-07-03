"use client";

import type { FormEvent } from "react";

import { Button } from "@/components/ui/Button";
import { FormField } from "@/components/ui/FormField";
import { SubtitleTag } from "@/components/ui/SubtitleTag";
import type { getContactData } from "@/components/landing/contact-section/data";

type ContactSectionProps = {
    contact: ReturnType<typeof getContactData>;
};

/**
 * "Get In Touch!" contact section. Two-column on desktop (intro left, form right),
 * collapsing to a single stacked column on tablet and mobile. The form is real
 * and accessible; submit is a placeholder until a backend is wired up.
 */
export function ContactSection({ contact }: ContactSectionProps) {
    const [phoneField, emailField, messageField] = contact.fields;

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        // TODO: wire to backend / contact endpoint.
    }

    return (
        <section className="w-full bg-[linear-gradient(159deg,#F5F7FB_26.64%,#FDF1EE_76.11%)]">
            <div className="mx-auto flex w-full max-w-[1920px] flex-col items-start gap-7xl px-m pt-8xl pb-8xl mobile:px-8xl mobile:pb-[240px] tablet:flex-row tablet:justify-center tablet:pt-7xl tablet:pb-7xl">
                {/* Intro */}
                <div className="flex w-full flex-col gap-3xl tablet:w-[475px] tablet:gap-xl">
                    <SubtitleTag className="self-start">{contact.eyebrow}</SubtitleTag>
                    <div className="flex flex-col gap-2xl tablet:gap-m">
                        <h2 className="text-H2 text-text-primary">{contact.heading}</h2>
                        <p className="text-body-1 text-text-secondary">
                            {contact.description}
                        </p>
                    </div>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex w-full flex-col items-start gap-2xl mobile:gap-5xl tablet:flex-1 tablet:items-end tablet:gap-3xl"
                >
                    <FormField
                        id="phone"
                        label={phoneField.label}
                        placeholder={phoneField.placeholder}
                        type="tel"
                        autoComplete="tel"
                        required
                    />
                    <FormField
                        id="email"
                        label={emailField.label}
                        placeholder={emailField.placeholder}
                        type="email"
                        autoComplete="email"
                        required
                    />
                    <FormField
                        id="message"
                        label={messageField.label}
                        placeholder={messageField.placeholder}
                        multiline
                        required
                    />
                    <Button as="button" type="submit" variant="primary">
                        {contact.submitLabel}
                    </Button>
                </form>
            </div>
        </section>
    );
}
