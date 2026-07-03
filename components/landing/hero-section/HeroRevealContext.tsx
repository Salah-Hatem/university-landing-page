"use client";

import {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import { useReducedMotion } from "motion/react";

type HeroRevealContextValue = {
    /** True once the hero frame has settled (or immediately under reduced motion). */
    revealed: boolean;
    prefersReducedMotion: boolean;
    /** Flip the entrance on — called once the frame finishes expanding. */
    reveal: () => void;
};

const HeroRevealContext = createContext<HeroRevealContextValue | null>(null);

/**
 * Shares the hero entrance signal across subtrees so the header reveals in lockstep
 * with the hero content (both sit under the server `page.tsx`). The signal originates
 * from the video-ready → frame-expand chain in `HeroStage`/`HeroBackgroundVideo`.
 */
export function HeroRevealProvider({ children }: { children: ReactNode }) {
    const prefersReducedMotion = useReducedMotion() ?? false;
    const [revealed, setRevealed] = useState(false);
    const reveal = useCallback(() => setRevealed(true), []);

    const value = useMemo<HeroRevealContextValue>(
        () => ({
            revealed: prefersReducedMotion || revealed,
            prefersReducedMotion,
            reveal,
        }),
        [prefersReducedMotion, revealed, reveal],
    );

    return (
        <HeroRevealContext.Provider value={value}>
            {children}
        </HeroRevealContext.Provider>
    );
}

export function useHeroReveal() {
    const context = useContext(HeroRevealContext);

    if (!context) {
        throw new Error("useHeroReveal must be used within HeroRevealProvider");
    }

    return context;
}
