import { getDictionary, type Locale } from '@/i18n/config';

// Cache for dictionaries to avoid re-fetching
const dictionaries: Record<Locale, any> = {} as any;

export async function getDictionaryForLocale(locale: Locale) {
    if (!dictionaries[locale]) {
        dictionaries[locale] = await getDictionary(locale);
    }
    return dictionaries[locale];
}

