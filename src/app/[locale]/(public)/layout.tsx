import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { getDictionary, toLocale } from "@/i18n/config";

export default async function PublicLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const locale = toLocale((await params).locale);
    const dict = await getDictionary(locale);
    
    return (
        <div className="flex min-h-screen flex-col">
            <Navbar locale={locale} dict={dict} />
            <main className="flex-1 pt-16">{children}</main>
            <Footer locale={locale} dict={dict} />
        </div>
    );
}
