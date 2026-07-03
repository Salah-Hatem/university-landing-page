"use client";

import { useEffect } from "react";

/**
 * Last-resort boundary for the landing route. The CMS fetchers already degrade
 * a Vercel/Postgres outage to bundled fallback content (see lib/cms/landing.ts),
 * so this only fires on genuinely unexpected render-time errors — showing a
 * graceful retry instead of a raw 500.
 */
export default function FrontendError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[frontend] Unhandled landing-page error.", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-surface-primary px-6 text-center">
      <h1 className="font-title text-3xl text-text-tkh-primary">
        Something went wrong
      </h1>
      <p className="max-w-md font-body text-base text-text-secondary">
        We hit an unexpected problem loading this page. Please try again in a
        moment.
      </p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-surface-tkh-primary px-8 py-3 font-cta text-text-invert transition-opacity hover:opacity-90"
      >
        Try again
      </button>
    </main>
  );
}
