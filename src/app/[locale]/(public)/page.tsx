import { Hero } from "@/components/sections/hero";
import { ServicesPreview } from "@/components/sections/services-preview";
import { PortfolioPreview } from "@/components/sections/portfolio-preview";
// import { ProductsPreview } from "@/components/sections/products-preview";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CTASection } from "@/components/sections/cta-section";
import { getDictionary, toLocale } from "@/i18n/config";

export default async function Home({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const locale = toLocale((await params).locale);
    const dict = await getDictionary(locale);

    return (
        <div className="flex flex-col min-h-screen">
            <Hero locale={locale} dict={dict} />
            <ServicesPreview locale={locale} dict={dict} />
            <PortfolioPreview locale={locale} dict={dict} />
            {/* <ProductsPreview locale={locale} dict={dict} /> */}
            <TestimonialsSection dict={dict} />
            <CTASection locale={locale} dict={dict} />
        </div>
    );
}
