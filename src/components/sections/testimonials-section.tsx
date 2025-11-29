"use client";

import { Quote } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimatedSection } from "@/components/ui/animated-section";
import { type Locale } from "@/i18n/config";

interface TestimonialsSectionProps {
    locale: Locale;
    dict: any;
}

export function TestimonialsSection({ locale, dict }: TestimonialsSectionProps) {
    const t = dict.testimonials;
    const testimonials = t.items || [];
    
    return (
        <section className="py-24">
            <div className="container mx-auto px-4">
                <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
                    <p className="text-lg text-muted-foreground">
                        {t.subtitle}
                    </p>
                </AnimatedSection>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial: any, index: number) => (
                        <AnimatedSection key={testimonial.id} delay={index * 0.1}>
                            <Card className="h-full border-none shadow-lg bg-background relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-6 opacity-10">
                                    <Quote className="w-24 h-24 text-primary" />
                                </div>
                                <CardHeader className="flex flex-row items-center gap-4 pb-4">
                                    <Avatar className="w-12 h-12">
                                        <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                                        <AvatarFallback>{testimonial.name.slice(0, 2)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <div className="font-semibold">{testimonial.name}</div>
                                        <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground italic relative z-10">
                                        "{testimonial.content}"
                                    </p>
                                </CardContent>
                            </Card>
                        </AnimatedSection>
                    ))}
                </div>
            </div>
        </section>
    );
}
