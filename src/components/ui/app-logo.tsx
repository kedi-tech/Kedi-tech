import Link from "next/link";
import Image from "next/image";
import { type Locale } from "@/i18n/config";

interface AppLogoProps {
    locale?: Locale;
}

export function AppLogo({ locale = "fr" }: AppLogoProps) {
    return (
        <Link href={`/${locale}`} className="flex items-center gap-2 group">
            <div className="transition-colors">
                <Image src="/logo.png" alt="KediTech" width={140} height={140} className="h-auto" />
            </div>
            {/* <span className="font-bold text-xl tracking-tight">Kedi<span classNa    me="text-primary">Tech</span></span> */}
        </Link>
    );
}
