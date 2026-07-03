import type { ContactSection } from "@/payload-types";

/** One contact-form field: the CMS field props the form renders. */
type ContactField = Pick<
    NonNullable<ContactSection["fields"]>[number],
    "label" | "placeholder"
>;

/**
 * Bundled form fields — phone, email, message — rendered when the CMS section
 * has none. Each supplies a per-slot fallback for empty CMS fields; the form
 * always renders exactly these three.
 */
const FALLBACK_FIELDS: ContactField[] = [
    { label: "Your Phone Number" },
    { label: "Your Email" },
    { label: "Your Message" },
];

/** Design-fixed section copy used when the CMS leaves a field blank. */
const DEFAULT_TEXT = {
    eyebrow: "Take Action",
    heading: "Get In Touch!",
    description:
        "Have a question on mind? Leave us a message and we will contact you shortly.",
    submitLabel: "Send Message",
} as const;

function textOrDefault(value: unknown, fallback: string | null | undefined): string {
    if (typeof value === "string" && value.trim()) return value.trim();
    return typeof fallback === "string" ? fallback : "";
}

function placeholderOrDefault(
    value: unknown,
    fallback: string | null | undefined,
): string | undefined {
    if (typeof value === "string" && value.trim()) return value.trim();
    return typeof fallback === "string" ? fallback : undefined;
}

/**
 * Resolve the contact section from Payload: each of the three fixed form fields
 * takes its label/placeholder from the matching CMS slot, falling back to the
 * bundled copy when a slot is empty or absent.
 */
export function getContactData(section?: ContactSection | null) {
    const sectionFields = section?.fields ?? [];
    const fields = FALLBACK_FIELDS.map((fallback, index) => {
        const field = sectionFields[index];
        return {
            label: textOrDefault(field?.label, fallback.label),
            placeholder: placeholderOrDefault(field?.placeholder, fallback.placeholder),
        };
    });

    return {
        eyebrow: textOrDefault(section?.eyebrow, DEFAULT_TEXT.eyebrow),
        heading: textOrDefault(section?.heading, DEFAULT_TEXT.heading),
        description: textOrDefault(section?.description, DEFAULT_TEXT.description),
        submitLabel: textOrDefault(section?.submitCta?.label, DEFAULT_TEXT.submitLabel),
        fields,
    };
}
