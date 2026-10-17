import { TeamSection } from "@/components/sections/team-section";
import { TimelineSection } from "@/components/sections/timeline-section";
import { ValuesSection } from "@/components/sections/values-section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { getDictionary, toLocale } from "@/i18n/config";

export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const locale = toLocale((await params).locale);
    const dict = await getDictionary(locale);
    const t = dict.about;

    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
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

            <ValuesSection dict={dict} />
            <TimelineSection locale={locale} dict={dict} />
            <TeamSection dict={dict} />
        </div>
    );
}
