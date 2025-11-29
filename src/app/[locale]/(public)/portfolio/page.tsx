"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { portfolio } from "@/data/portfolio";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { type Locale } from "@/i18n/config";

export default function PortfolioPage() {
    const params = useParams();
    const locale = (params.locale as Locale) || "fr";
    const [dict, setDict] = useState<any>(null);
    const [activeCategory, setActiveCategory] = useState("all");

    useEffect(() => {
        const loadDictionary = async () => {
            try {
                if (locale === 'fr') {
                    const module = await import('@/i18n/dictionaries/fr.json');
                    setDict(module.default);
                } else if (locale === 'en') {
                    const module = await import('@/i18n/dictionaries/en.json');
                    setDict(module.default);
                } else {
                    // Fallback to French
                    const module = await import('@/i18n/dictionaries/fr.json');
                    setDict(module.default);
                }
            } catch (error) {
                console.error('Error loading dictionary:', error);
                // Fallback to French
                import('@/i18n/dictionaries/fr.json').then((module) => {
                    setDict(module.default);
                });
            }
        };
        loadDictionary();
    }, [locale]);

    if (!dict) return <div>Loading...</div>;

    const t = dict.portfolio;
    const categories = [
        { key: "all", label: t.categories.all },
        { key: "Web App", label: t.categories.webApp },
        { key: "Mobile App", label: t.categories.mobileApp },
        { key: "SaaS", label: t.categories.saas },
        { key: "E-commerce", label: t.categories.ecommerce },
    ];

    const filteredProjects = activeCategory === "all"
        ? portfolio
        : portfolio.filter((project) => project.category === activeCategory);

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

            <section className="py-12 border-b">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categories.map((category) => (
                            <Button
                                key={category.key}
                                variant={activeCategory === category.key ? "default" : "outline"}
                                onClick={() => setActiveCategory(category.key)}
                                className="rounded-full"
                            >
                                {category.label}
                            </Button>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredProjects.map((project, index) => (
                            <AnimatedSection key={project.id} delay={index * 0.1}>
                                <Card className="overflow-hidden h-full flex flex-col hover:shadow-xl transition-all duration-300 group">
                                    <div className="relative aspect-video overflow-hidden">
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <Button variant="secondary" size="sm" asChild>
                                                <Link href={`/${locale}/portfolio/${project.id}`}>{t.viewCase}</Link>
                                            </Button>
                                        </div>
                                    </div>
                                    <CardHeader>
                                        <div className="flex justify-between items-start mb-2">
                                            <Badge variant="secondary">{project.category}</Badge>
                                        </div>
                                        <CardTitle className="text-xl group-hover:text-primary transition-colors">
                                            {dict.portfolio.items[project.id as keyof typeof dict.portfolio.items]?.title || project.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-1">
                                        <p className="text-muted-foreground line-clamp-2">
                                            {dict.portfolio.items[project.id as keyof typeof dict.portfolio.items]?.description || project.description}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="flex flex-wrap gap-2 pt-0">
                                        {project.techStack.slice(0, 3).map((tech) => (
                                            <Badge key={tech} variant="outline" className="text-xs">
                                                {tech}
                                            </Badge>
                                        ))}
                                        {project.techStack.length > 3 && (
                                            <Badge variant="outline" className="text-xs">
                                                +{project.techStack.length - 3}
                                            </Badge>
                                        )}
                                    </CardFooter>
                                </Card>
                            </AnimatedSection>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
