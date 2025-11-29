import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { services } from "@/data/services";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { getDictionary, type Locale } from "@/i18n/config";

export default async function ServicesPage({
    params,
}: {
    params: Promise<{ locale: Locale }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    const t = dict.services;

    return (
        <div className="flex flex-col min-h-screen">
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto px-4 text-center">
                    <AnimatedSection>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.title}</h1>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                            {t.subtitle}
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => {
                            const serviceT = dict.services.items[service.id as keyof typeof dict.services.items];
                            return (
                                <AnimatedSection key={service.id} delay={index * 0.1}>
                                    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                                        <CardHeader>
                                            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                                                <service.icon className="w-6 h-6" />
                                            </div>
                                            <CardTitle className="text-2xl">{serviceT?.title || service.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-1">
                                            <CardDescription className="text-base mb-6">
                                                {serviceT?.description || service.description}
                                            </CardDescription>
                                            <ul className="space-y-2">
                                                {(serviceT?.features || service.features).map((feature: string, idx: number) => (
                                                    <li key={idx} className="flex items-center text-sm text-muted-foreground">
                                                        <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2" />
                                                        {feature}
                                                    </li>
                                                ))}
                                            </ul>
                                        </CardContent>
                                    <CardFooter>
                                        <Button variant="outline" className="w-full group" asChild>
                                            <Link href={`/${locale}/services/${service.id}`}>
                                                {t.learnMore}
                                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </Button>
                                    </CardFooter>
                                </Card>
                            </AnimatedSection>
                            );
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
}
