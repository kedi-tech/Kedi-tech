"use client";

import { usePathname, useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const languages = {
    fr: { name: "Français", flag: "🇫🇷" },
    en: { name: "English", flag: "🇬🇧" },
};

export function LanguageSwitcher() {
    const pathname = usePathname();
    const router = useRouter();

    // Extract current language from pathname
    const currentLang = pathname.split('/')[1] as 'fr' | 'en';
    const validLang = currentLang === 'fr' || currentLang === 'en' ? currentLang : 'fr';

    const switchLanguage = (newLang: 'fr' | 'en') => {
        if (!pathname) return;

        // Replace the language segment in the path
        const segments = pathname.split('/');
        segments[1] = newLang;
        const newPath = segments.join('/');

        router.push(newPath);
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <Globe className="h-5 w-5" />
                    <span className="sr-only">Switch language</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {Object.entries(languages).map(([code, { name, flag }]) => (
                    <DropdownMenuItem
                        key={code}
                        onClick={() => switchLanguage(code as 'fr' | 'en')}
                        className={validLang === code ? "bg-accent" : ""}
                    >
                        <span className="mr-2">{flag}</span>
                        {name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
