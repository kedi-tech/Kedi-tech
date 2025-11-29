"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { type Locale } from "@/i18n/config";

interface TimelineSectionProps {
    locale: Locale;
    dict: any;
}

export function TimelineSection({ locale, dict }: TimelineSectionProps) {
    const t = dict.about.timeline;
    // For now, keeping timeline events in English/French based on locale
    // You can add these to the dictionary if needed
    const timelineEvents = [
        {
            year: "2018",
            title: locale === "fr" ? "Fondation" : "Founded",
            description: locale === "fr" 
                ? "Kedi Tech a été créée avec une vision de révolutionner le développement logiciel."
                : "Kedi Tech was established with a vision to revolutionize software development.",
        },
        {
            year: "2019",
            title: locale === "fr" ? "Premier Grand Client" : "First Major Client",
            description: locale === "fr"
                ? "Sécurisé notre premier client entreprise et élargi notre équipe à 10 membres."
                : "Secured our first enterprise client and expanded our team to 10 members.",
        },
        {
            year: "2021",
            title: locale === "fr" ? "Expansion Mondiale" : "Global Expansion",
            description: locale === "fr"
                ? "Ouvert des bureaux à Londres et Singapour pour servir notre base de clients internationale croissante."
                : "Opened offices in London and Singapore to serve our growing international client base.",
        },
        {
            year: "2023",
            title: locale === "fr" ? "Prix Gagnant" : "Award Winning",
            description: locale === "fr"
                ? "Reconnu comme la 'Meilleure Entreprise de Développement Logiciel' par TechReview."
                : "Recognized as the 'Top Software Development Company' by TechReview.",
        },
    ];

    return (
        <section className="py-24">
            <div className="container mx-auto px-4">
                <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
                    <p className="text-lg text-muted-foreground">
                        {t.subtitle}
                    </p>
                </AnimatedSection>

                <div className="relative max-w-4xl mx-auto">
                    {/* Vertical Line */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border hidden md:block" />

                    <div className="space-y-12">
                        {timelineEvents.map((event, index) => (
                            <AnimatedSection key={event.year} delay={index * 0.1}>
                                <div className={`flex flex-col md:flex-row items-center justify-between gap-8 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                                    <div className="w-full md:w-5/12" />

                                    <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold shadow-lg shrink-0">
                                        {event.year.slice(2)}
                                    </div>

                                    <div className="w-full md:w-5/12 bg-card p-6 rounded-lg shadow-md border">
                                        <div className="text-sm font-semibold text-primary mb-1 md:hidden">{event.year}</div>
                                        <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                        <p className="text-muted-foreground">{event.description}</p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
