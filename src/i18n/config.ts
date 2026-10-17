import type en from './dictionaries/en.json';

export const i18n = {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

export type Dictionary = typeof en;

const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
    fr: () => import('./dictionaries/fr.json').then((module) => module.default),
    en: () => import('./dictionaries/en.json').then((module) => module.default),
};

export function isLocale(value: string): value is Locale {
    return (i18n.locales as readonly string[]).includes(value);
}

/** Narrows a route param to a supported locale, falling back to the default. */
export function toLocale(value: string): Locale {
    return isLocale(value) ? value : i18n.defaultLocale;
}

export const getDictionary = async (locale: string): Promise<Dictionary> => {
    return dictionaries[toLocale(locale)]();
};
