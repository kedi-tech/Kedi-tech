import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, ExternalLink, Layers } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/ui/animated-section";
import { getDictionary, toLocale } from "@/i18n/config";

export async function generateMetadata({ params }: { params: Promise<{ id: string; locale: string }> }) {
    const { id, locale: rawLocale } = await params;
    const locale = toLocale(rawLocale);
    const dict = await getDictionary(locale);
    const project = portfolio.find((p) => p.id === id);

    if (!project) {
        return {
            title: "Project Not Found",
        };
    }

    // Not every project has challenge/solution copy, so widen to the optional shape
    const projectT = dict.portfolio.items[id as keyof typeof dict.portfolio.items] as PortfolioItemCopy | undefined;
    const title = projectT?.title || project.title;
    const description = projectT?.description || project.description;

    return {
        title: `${title} - Kedi Tech`,
        description: description,
    };
}

type PortfolioItemCopy = {
    title?: string;
    description?: string;
    challenge?: { title: string; content: string };
    solution?: { title: string; content: string; points: string[] };
};

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string; locale: string }> }) {
    const { id, locale: rawLocale } = await params;
    const locale = toLocale(rawLocale);
    const dict = await getDictionary(locale);
    const project = portfolio.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    // Not every project has challenge/solution copy, so widen to the optional shape
    const projectT = dict.portfolio.items[id as keyof typeof dict.portfolio.items] as PortfolioItemCopy | undefined;
    const t = dict.portfolio.detail;
    const projectTitle = projectT?.title || project.title;
    const projectDescription = projectT?.description || project.description;

    return (
        <div className="flex flex-col min-h-screen">
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto px-4">
                    <AnimatedSection>
                        <Button variant="ghost" className="mb-8" asChild>
                            <Link href={`/${locale}/portfolio`}>
                                <ArrowLeft className="mr-2 w-4 h-4" />
                                {t.backToPortfolio}
                            </Link>
                        </Button>
                        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
                            <div>
                                <Badge className="mb-4">{project.category}</Badge>
                                <h1 className="text-4xl md:text-5xl font-bold mb-4">{projectTitle}</h1>
                                <p className="text-xl text-muted-foreground max-w-2xl">
                                    {projectDescription}
                                </p>
                            </div>
                            <Button size="lg" asChild>
                                <a href={project.link} target="_blank" rel="noopener noreferrer">
                                    {t.visitLiveSite}
                                    <ExternalLink className="ml-2 w-4 h-4" />
                                </a>
                            </Button>
                        </div>
                    </AnimatedSection>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4">
                    <div className="relative aspect-video w-full overflow-hidden rounded-xl shadow-2xl mb-16">
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    <div className="grid lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 space-y-12">
                            {projectT?.challenge && (
                                <AnimatedSection>
                                    <h2 className="text-3xl font-bold mb-6">{projectT.challenge.title}</h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed">
                                        {projectT.challenge.content}
                                    </p>
                                </AnimatedSection>
                            )}

                            {projectT?.solution && (
                                <AnimatedSection delay={0.2}>
                                    <h2 className="text-3xl font-bold mb-6">{projectT.solution.title}</h2>
                                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                        {projectT.solution.content}
                                    </p>
                                    {projectT.solution.points && (
                                        <ul className="space-y-4">
                                            {projectT.solution.points.map((point: string, index: number) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <div className="w-2 h-2 mt-2 bg-primary rounded-full" />
                                                    <p className="text-muted-foreground">{point}</p>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </AnimatedSection>
                            )}

                            {!projectT?.challenge && !projectT?.solution && (
                                <>
                                    <AnimatedSection>
                                        <h2 className="text-3xl font-bold mb-6">{t.theChallenge}</h2>
                                        <p className="text-lg text-muted-foreground leading-relaxed">
                                            Every project starts with a problem. For {projectTitle}, the main challenge was to create a scalable and user-friendly solution that could handle high traffic loads while maintaining optimal performance. We needed to ensure seamless integration with existing systems and provide a modern user experience.
                                        </p>
                                    </AnimatedSection>

                                    <AnimatedSection delay={0.2}>
                                        <h2 className="text-3xl font-bold mb-6">{t.theSolution}</h2>
                                        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                            We approached this project with a mobile-first mindset, utilizing the latest technologies to build a robust application. By leveraging {project.techStack[0]} and {project.techStack[1]}, we were able to create a responsive and fast-loading interface.
                                        </p>
                                        <ul className="space-y-4">
                                            <li className="flex items-start gap-3">
                                                <div className="w-2 h-2 mt-2 bg-primary rounded-full" />
                                                <p className="text-muted-foreground">Implemented a custom design system for consistent UI.</p>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="w-2 h-2 mt-2 bg-primary rounded-full" />
                                                <p className="text-muted-foreground">Optimized database queries for faster data retrieval.</p>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="w-2 h-2 mt-2 bg-primary rounded-full" />
                                                <p className="text-muted-foreground">Integrated secure payment gateways and authentication.</p>
                                            </li>
                                        </ul>
                                    </AnimatedSection>
                                </>
                            )}
                        </div>

                        <div className="space-y-8">
                            <AnimatedSection delay={0.3}>
                                <div className="bg-card border rounded-xl p-6 shadow-sm">
                                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                                        <Layers className="w-5 h-5 text-primary" />
                                        {t.techStack}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.techStack.map((tech) => (
                                            <Badge key={tech} variant="secondary">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </AnimatedSection>

                            <AnimatedSection delay={0.4}>
                                <div className="bg-card border rounded-xl p-6 shadow-sm">
                                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-primary" />
                                        {t.timeline}
                                    </h3>
                                    <div className="space-y-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">{t.kickoff}</span>
                                            <span className="font-medium">{project.Startdate}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">{t.launch}</span>
                                            <span className="font-medium">{project.Enddate}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">{t.duration}</span>
                                            <span className="font-medium">{project.duration}</span>
                                        </div>
                                    </div>
                                </div>
                            </AnimatedSection>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
