"use client";

import { createContext, useContext } from "react";
import type { Dictionary } from "@/i18n/config";

const DictionaryContext = createContext<Dictionary | null>(null);

export function DictionaryProvider({
    dict,
    children,
}: {
    dict: Dictionary;
    children: React.ReactNode;
}) {
    return <DictionaryContext.Provider value={dict}>{children}</DictionaryContext.Provider>;
}

/** Dictionary for the current locale, loaded on the server by the [locale] layout. */
export function useDictionary(): Dictionary {
    const dict = useContext(DictionaryContext);
    if (!dict) {
        throw new Error("useDictionary must be used inside DictionaryProvider");
    }
    return dict;
}
