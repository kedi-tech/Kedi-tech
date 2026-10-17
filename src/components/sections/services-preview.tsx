"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { type Locale, type Dictionary } from "@/i18n/config";

interface ServicesPreviewProps {
    locale: Locale;
    dict: Dictionary;
}

export function ServicesPreview({ locale, dict }: ServicesPreviewProps) {
    const t = dict.services;
    const featuredServices = services.slice(0, 3);

    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4">
                <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
                    <p className="text-lg text-muted-foreground">
                        {t.subtitle}
                    </p>
                </AnimatedSection>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {featuredServices.map((service, index) => {
                        const serviceT = dict.services.items[service.id as keyof typeof dict.services.items];
                        return (
                            <AnimatedSection key={service.id} delay={index * 0.1}>
                                <Card className="h-full hover:shadow-lg transition-shadow border-none shadow-md bg-background/50 backdrop-blur-sm">
                                    <CardHeader>
                                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                                            <service.icon className="w-6 h-6" />
                                        </div>
                                        <CardTitle className="text-xl">{serviceT?.title || service.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <CardDescription className="text-base mb-6">
                                            {serviceT?.description || service.description}
                                        </CardDescription>
                                        <ul className="space-y-2 mb-6">
                                            {(serviceT?.features || service.features).slice(0, 3).map((feature: string, idx: number) => (
                                                <li key={idx} className="flex items-center text-sm text-muted-foreground">
                                                    <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </AnimatedSection>
                        );
                    })}
                </div>

                <div className="text-center">
                    <Button variant="outline" size="lg" asChild>
                        <Link href={`/${locale}/services`} className="group">
                            {t.viewAll}
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
