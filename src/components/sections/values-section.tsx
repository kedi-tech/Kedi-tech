"use client";

import { Heart, Shield, Zap, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { type Locale } from "@/i18n/config";

interface ValuesSectionProps {
    locale: Locale;
    dict: any;
}

export function ValuesSection({ locale, dict }: ValuesSectionProps) {
    const t = dict.about.values;
    const values = [
        {
            title: t.passion.title,
            description: t.passion.description,
            icon: Heart,
        },
        {
            title: t.integrity.title,
            description: t.integrity.description,
            icon: Shield,
        },
        {
            title: t.innovation.title,
            description: t.innovation.description,
            icon: Zap,
        },
        {
            title: t.collaboration.title,
            description: t.collaboration.description,
            icon: Users,
        },
    ];

    return (
        <section className="py-24 bg-primary text-primary-foreground">
            <div className="container mx-auto px-4">
                <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
                    <p className="text-lg text-primary-foreground/80">
                        {t.subtitle}
                    </p>
                </AnimatedSection>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {values.map((value, index) => (
                        <AnimatedSection key={value.title} delay={index * 0.1}>
                            <Card className="bg-primary-foreground/10 border-none text-primary-foreground hover:bg-primary-foreground/20 transition-colors">
                                <CardHeader>
                                    <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                                        <value.icon className="w-6 h-6" />
                                    </div>
                                    <CardTitle className="text-xl">{value.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-primary-foreground/80">{value.description}</p>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
