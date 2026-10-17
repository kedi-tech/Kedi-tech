import { PortalSidebar } from "@/components/portal/sidebar";
import { PortalTopbar } from "@/components/portal/topbar";
import { getDictionary, toLocale } from "@/i18n/config";

export default async function PortalLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const locale = toLocale((await params).locale);
    const dict = await getDictionary(locale);

    return (
        <div className="flex min-h-screen bg-muted/30">
            <PortalSidebar locale={locale} dict={dict} />
            <div className="flex-1 flex flex-col min-w-0">
                <PortalTopbar locale={locale} dict={dict} />
                <main className="flex-1 p-6 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
