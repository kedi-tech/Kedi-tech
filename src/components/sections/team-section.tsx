"use client";

import Image from "next/image";
import { team } from "@/data/team";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AnimatedSection } from "@/components/ui/animated-section";
import { type Locale } from "@/i18n/config";

interface TeamSectionProps {
    locale: Locale;
    dict: any;
}

export function TeamSection({ locale, dict }: TeamSectionProps) {
    const t = dict.about.team;

    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4">
                <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
                    <p className="text-lg text-muted-foreground">
                        {t.subtitle}
                    </p>
                </AnimatedSection>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {team.map((member, index) => (
                        <AnimatedSection key={member.id} delay={index * 0.1}>
                            <Card className="overflow-hidden h-full border-none shadow-md hover:shadow-xl transition-shadow bg-background">
                                <div className="relative aspect-square overflow-hidden">
                                    <Image
                                        src={member.image}
                                        alt={member.name}
                                        fill
                                        className="object-cover transition-transform hover:scale-105"
                                    />
                                </div>
                                <CardHeader className="text-center pb-2">
                                    <CardTitle className="text-xl">{member.name}</CardTitle>
                                    <div className="text-sm font-medium text-primary">{member.role}</div>
                                </CardHeader>
                                <CardContent className="text-center text-muted-foreground text-sm">
                                    <p>{member.bio}</p>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
