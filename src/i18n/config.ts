export const i18n = {
    defaultLocale: 'fr',
    locales: ['fr', 'en'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

const dictionaries: Record<Locale, () => Promise<any>> = {
    fr: () => import('./dictionaries/fr.json').then((module) => module.default),
    en: () => import('./dictionaries/en.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<any> => {
    // Ensure locale is valid, fallback to default if not
    const validLocale: Locale = (i18n.locales.includes(locale as Locale) ? locale : i18n.defaultLocale) as Locale;
    
    const dictionaryLoader = dictionaries[validLocale];
    if (!dictionaryLoader || typeof dictionaryLoader !== 'function') {
        // Fallback to default locale
        return dictionaries[i18n.defaultLocale]();
    }
    
    return dictionaryLoader();
};
