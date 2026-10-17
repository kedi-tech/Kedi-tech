"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FolderKanban,
    MessageSquare,
    FileText,
    CreditCard,
    Settings,
    LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AppLogo } from "@/components/ui/app-logo";
import { type Locale, type Dictionary } from "@/i18n/config";

interface PortalSidebarProps {
    locale: Locale;
    dict: Dictionary;
}

export function PortalSidebar({ locale, dict }: PortalSidebarProps) {
    const pathname = usePathname();
    const t = dict.portal.nav;

    const sidebarItems = [
        { name: t.dashboard, href: `/${locale}/portal`, icon: LayoutDashboard },
        { name: t.projects, href: `/${locale}/portal/projects`, icon: FolderKanban },
        { name: t.messages, href: `/${locale}/portal/messages`, icon: MessageSquare },
        { name: t.files, href: `/${locale}/portal/files`, icon: FileText },
        { name: t.payments, href: `/${locale}/portal/payments`, icon: CreditCard },
        { name: t.settings, href: `/${locale}/portal/settings`, icon: Settings },
    ];

    return (
        <div className="hidden md:flex flex-col w-64 border-r bg-card h-screen sticky top-0">
            <div className="p-6 border-b">
                <AppLogo locale={locale} />
            </div>

            <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
                {sidebarItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                        <Button
                            variant="ghost"
                            className={cn(
                                "w-full justify-start gap-3 mb-1",
                                pathname === item.href || (pathname.startsWith(item.href) && item.href !== `/${locale}/portal`)
                                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                                    : "text-muted-foreground hover:bg-muted"
                            )}
                        >
                            <item.icon className="w-5 h-5" />
                            {item.name}
                        </Button>
                    </Link>
                ))}
            </div>

            <div className="p-4 border-t">
                <Button variant="ghost" className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10" asChild>
                    <Link href={`/${locale}/login`}>
                        <LogOut className="w-5 h-5" />
                        {t.logout}
                    </Link>
                </Button>
            </div>
        </div>
    );
}
