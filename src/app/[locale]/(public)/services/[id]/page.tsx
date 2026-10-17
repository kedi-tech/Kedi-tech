import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { services } from "@/data/services";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { getDictionary, toLocale } from "@/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }) {
    const { id, locale: rawLocale } = await params;
    const locale = toLocale(rawLocale);
    const dict = await getDictionary(locale);
    const service = services.find((s) => s.id === id);

    if (!service) {
        return {
            title: dict.services.detail.serviceNotFound,
        };
    }

    const serviceT = dict.services.items[service.id as keyof typeof dict.services.items];
    const title = serviceT?.title || service.title;
    const description = serviceT?.description || service.description;

    return {
        title: `${title} - Kedi Tech`,
        description: description,
    };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
    const { id, locale: rawLocale } = await params;
    const locale = toLocale(rawLocale);
    const dict = await getDictionary(locale);
    const service = services.find((s) => s.id === id);

    if (!service) {
        notFound();
    }

    const serviceT = dict.services.items[service.id as keyof typeof dict.services.items];
    const t = dict.services.detail;

    const features = serviceT?.features || service.features;
    const title = serviceT?.title || service.title;
    const description = serviceT?.description || service.description;

    return (
        <div className="flex flex-col min-h-screen">
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto px-4">
                    <AnimatedSection>
                        <Button variant="ghost" className="mb-8" asChild>
                            <Link href={`/${locale}/services`}>
                                <ArrowLeft className="mr-2 w-4 h-4" />
                                {t.backToServices}
                            </Link>
                        </Button>
                        <div className="flex items-center gap-6 mb-6">
                            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <service.icon className="w-8 h-8" />
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
                        </div>
                        <p className="text-xl text-muted-foreground max-w-3xl">
                            {description}
                        </p>
                    </AnimatedSection>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12">
                        <AnimatedSection>
                            <h2 className="text-3xl font-bold mb-6">{t.whatWeOffer}</h2>
                            <div className="space-y-4">
                                {features.map((feature: string, index: number) => (
                                    <div key={index} className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                                        <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                                        <div>
                                            <h3 className="font-semibold mb-1">{feature}</h3>
                                            <p className="text-muted-foreground text-sm">
                                                {t.featureDescription}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </AnimatedSection>

                        <AnimatedSection delay={0.2}>
                            <div className="bg-muted p-8 rounded-xl">
                                <h2 className="text-2xl font-bold mb-4">{t.whyChooseUs}</h2>
                                <p className="text-muted-foreground mb-6">
                                    {t.whyChooseUsDescription}
                                </p>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-primary rounded-full" />
                                        <span>{t.expertTeam}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-primary rounded-full" />
                                        <span>{t.provenTrackRecord}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-primary rounded-full" />
                                        <span>{t.agileMethodology}</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-primary rounded-full" />
                                        <span>{t.support24_7}</span>
                                    </li>
                                </ul>
                                <Button size="lg" className="w-full" asChild>
                                    <Link href={`/${locale}/contact`}>{t.getStarted} {title}</Link>
                                </Button>
                            </div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>
        </div>
    );
}
