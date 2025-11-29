"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { AppLogo } from "@/components/ui/app-logo";
import { ThemeSwitcher } from "@/components/ui/theme-switcher";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { type Locale } from "@/i18n/config";

interface NavbarProps {
    locale: Locale;
    dict: any;
}

export function Navbar({ locale, dict }: NavbarProps) {
    const t = dict.nav;
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navItems = [
        { label: t.home, href: `/${locale}` },
        { label: t.services, href: `/${locale}/services` },
        { label: t.portfolio, href: `/${locale}/portfolio` },
        // { label: t.products, href: `/${locale}/products` },
        { label: t.about, href: `/${locale}/about` },
        { label: t.contact, href: `/${locale}/contact` },
    ];

    return (
        <header
            className={cn(
                "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
                isScrolled ? "bg-background/80 backdrop-blur-md border-border shadow-sm" : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <AppLogo locale={locale} />

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === item.href || (item.href === `/${locale}` && pathname === `/${locale}`) ? "text-primary" : "text-muted-foreground"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                <div className="hidden md:flex items-center gap-4">
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                    {/* <Button asChild>
                        <Link href={`/${locale}/contact`}>
                            {dict.cta?.button || (locale === "fr" ? "Commencer" : "Get Started")}
                        </Link>
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href={`/${locale}/login`}>
                            {t.login}
                        </Link>
                    </Button> */}
                </div>

                {/* Mobile Nav */}
                <div className="md:hidden flex items-center gap-4">
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                            <div className="flex flex-col gap-6 mt-8">
                                <nav className="flex flex-col gap-4">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            className={cn(
                                                "text-lg font-medium transition-colors hover:text-primary",
                                                pathname === item.href || (item.href === `/${locale}` && pathname === `/${locale}`) ? "text-primary" : "text-muted-foreground"
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    ))}
                                </nav>
                                {/* <div className="flex flex-col gap-4">
                                    <Button asChild className="w-full">
                                        <Link href={`/${locale}/contact`}>
                                            {dict.cta?.button || (locale === "fr" ? "Commencer" : "Get Started")}
                                        </Link>
                                    </Button>
                                    <Button variant="outline" asChild className="w-full">
                                        <Link href={`/${locale}/login`}>
                                            {t.login}
                                        </Link>
                                    </Button>
                                </div> */}
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}
