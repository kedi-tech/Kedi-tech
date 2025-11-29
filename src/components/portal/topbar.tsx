"use client";

import { Bell, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { PortalSidebar } from "./sidebar";
import { type Locale } from "@/i18n/config";

interface PortalTopbarProps {
    locale: Locale;
    dict: any;
}

export function PortalTopbar({ locale, dict }: PortalTopbarProps) {
    const t = dict.common;

    return (
        <header className="h-16 border-b bg-card flex items-center justify-between px-6 sticky top-0 z-10">
            <div className="flex items-center gap-4 md:hidden">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="w-5 h-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64">
                        <PortalSidebar locale={locale} dict={dict} />
                    </SheetContent>
                </Sheet>
            </div>

            <div className="hidden md:flex items-center gap-4 w-96">
                <div className="relative w-full">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder={t.search}
                        className="w-full bg-background pl-8"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <LanguageSwitcher />
                <ThemeSwitcher />
                <Button variant="ghost" size="icon" className="relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
                </Button>
                <div className="flex items-center gap-3 pl-4 border-l">
                    <div className="text-right hidden sm:block">
                        <div className="text-sm font-medium">John Doe</div>
                        <div className="text-xs text-muted-foreground">{locale === "fr" ? "Client" : "Client"}</div>
                    </div>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                </div>
            </div>
        </header>
    );
}
