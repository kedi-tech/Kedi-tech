import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/components/providers/cart-provider";
import { DictionaryProvider } from "@/components/providers/dictionary-provider";
import { i18n, getDictionary, isLocale, toLocale } from "@/i18n/config";

const inter = Inter({ subsets: ["latin"] });

// Only the locales in i18n.locales are valid; anything else is a 404
export const dynamicParams = false;

export async function generateStaticParams() {
    return i18n.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const locale = toLocale((await params).locale);
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
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    if (!isLocale(locale)) {
        notFound();
    }
    const dict = await getDictionary(locale);

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <DictionaryProvider dict={dict}>
                        <CartProvider>
                            {children}
                        </CartProvider>
                    </DictionaryProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
