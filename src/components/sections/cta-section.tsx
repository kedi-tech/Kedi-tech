"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { type Locale } from "@/i18n/config";

interface CTASectionProps {
    locale: Locale;
    dict: any;
}

export function CTASection({ locale, dict }: CTASectionProps) {
    const t = dict.cta;
    
    return (
        <section className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-[50%] -left-[20%] w-[100%] h-[200%] bg-white/20 rotate-12 transform origin-center" />
            </div>

            <div className="container mx-auto px-4 relative z-10 text-center">
                <AnimatedSection>
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">{t.title}</h2>
                    <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10">
                        {t.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                            <Link href={`/${locale}/contact`}>
                                {t.button}
                                <ArrowRight className="ml-2 w-5 h-5" />
                            </Link>
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                            <Link href={`/${locale}/portfolio`}>{dict.portfolio?.viewAll || "View Portfolio"}</Link>
                        </Button>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}
