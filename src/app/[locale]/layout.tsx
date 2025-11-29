import { i18n, type Locale, getDictionary } from '@/i18n/config';
import type { Metadata } from 'next';

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    
    return {
        title: dict.metadata?.title || "Kedi Tech - Software Development Company",
        description: dict.metadata?.description || "We build apps, websites, software, and SaaS.",
    };
}

export default async function LocaleLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;

    return children;
}

