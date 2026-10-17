"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { type Locale, type Dictionary } from "@/i18n/config";

interface PortfolioPreviewProps {
    locale: Locale;
    dict: Dictionary;
}

export function PortfolioPreview({ locale, dict }: PortfolioPreviewProps) {
    const t = dict.portfolio;
    const featuredProjects = portfolio.slice(0, 3);

    return (
        <section className="py-24">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
                    <AnimatedSection className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
                        <p className="text-lg text-muted-foreground">
                            {t.subtitle}
                        </p>
                    </AnimatedSection>
                    <AnimatedSection delay={0.2}>
                        <Button variant="outline" asChild>
                            <Link href={`/${locale}/portfolio`} className="group">
                                {t.viewAll}
                                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </Button>
                    </AnimatedSection>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProjects.map((project, index) => (
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
    );
}
