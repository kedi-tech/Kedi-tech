"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/ui/animated-section";
import { type Locale, type Dictionary } from "@/i18n/config";

interface ProductsPreviewProps {
    locale: Locale;
    dict: Dictionary;
}

export function ProductsPreview({ locale, dict }: ProductsPreviewProps) {
    const t = dict.products;
    const featuredProducts = products.slice(0, 4);

    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4">
                <AnimatedSection className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">{t.title}</h2>
                    <p className="text-lg text-muted-foreground">
                        {t.subtitle}
                    </p>
                </AnimatedSection>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {featuredProducts.map((product, index) => (
                        <AnimatedSection key={product.id} delay={index * 0.1}>
                            <Card className="h-full flex flex-col hover:shadow-lg transition-shadow bg-background">
                                <div className="relative aspect-[4/3] overflow-hidden rounded-t-lg">
                                    <Image
                                        src={product.image}
                                        alt={product.name}
                                        fill
                                        className="object-cover transition-transform hover:scale-105"
                                    />
                                    <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/90">
                                        ${product.price}
                                    </Badge>
                                </div>
                                <CardHeader className="p-4 pb-2">
                                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">
                                        {product.category}
                                    </div>
                                    <CardTitle className="text-lg">{dict.products.items[product.id as keyof typeof dict.products.items]?.name || product.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0 flex-1">
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {dict.products.items[product.id as keyof typeof dict.products.items]?.description || product.description}
                                    </p>
                                </CardContent>
                                <CardFooter className="p-4 pt-0">
                                    <Button className="w-full" size="sm">
                                        <ShoppingCart className="w-4 h-4 mr-2" />
                                        {t.addToCart}
                                    </Button>
                                </CardFooter>
                            </Card>
                        </AnimatedSection>
                    ))}
                </div>

                <div className="text-center">
                    <Button variant="outline" size="lg" asChild>
                        <Link href={`/${locale}/products`} className="group">
                            {t.viewAll}
                            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    );
}
