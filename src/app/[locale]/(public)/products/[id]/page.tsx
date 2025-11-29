"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound, useParams } from "next/navigation";
import { ArrowLeft, Check, ShoppingCart, Star } from "lucide-react";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useCart } from "@/components/providers/cart-provider";
import { type Locale } from "@/i18n/config";

export default function ProductDetailPage() {
    const params = useParams();
    const locale = (params.locale as Locale) || "fr";
    const id = params.id as string;
    const [dict, setDict] = useState<any>(null);
    const product = products.find((p) => p.id === id);
    const { addItem } = useCart();

    useEffect(() => {
        import(`@/i18n/dictionaries/${locale}.json`).then((module) => {
            setDict(module.default);
        });
    }, [locale]);

    if (!product) {
        notFound();
    }

    if (!dict) return <div>Loading...</div>;

    const productT = dict.products.items[id as keyof typeof dict.products.items];
    const t = dict.products.detail;
    const productName = productT?.name || product.name;
    const productDescription = productT?.description || product.description;
    const categoryMap: Record<string, string> = {
        "Template": dict.products.categories?.template || "Template",
        "UI Kit": dict.products.categories?.uiKit || "UI Kit",
    };
    const categoryLabel = categoryMap[product.category] || product.category;

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: productName,
            price: product.price,
            image: product.image,
        });
        alert(t.addedToCart.replace("{product}", productName));
    };

    return (
        <div className="flex flex-col min-h-screen">
            <section className="py-24 bg-muted/30">
                <div className="container mx-auto px-4">
                    <AnimatedSection>
                        <Button variant="ghost" className="mb-8" asChild>
                            <Link href={`/${locale}/products`}>
                                <ArrowLeft className="mr-2 w-4 h-4" />
                                {t.backToStore}
                            </Link>
                        </Button>
                        <div className="grid md:grid-cols-2 gap-12 items-center">
                            <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl">
                                <Image
                                    src={product.image}
                                    alt={productName}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <div className="space-y-6">
                                <Badge>{categoryLabel}</Badge>
                                <h1 className="text-4xl md:text-5xl font-bold">{productName}</h1>
                                <div className="flex items-center gap-2">
                                    <div className="flex text-yellow-500">
                                        <Star className="w-5 h-5 fill-current" />
                                        <Star className="w-5 h-5 fill-current" />
                                        <Star className="w-5 h-5 fill-current" />
                                        <Star className="w-5 h-5 fill-current" />
                                        <Star className="w-5 h-5 fill-current" />
                                    </div>
                                    <span className="text-muted-foreground">(24 {t.reviews})</span>
                                </div>
                                <div className="text-3xl font-bold text-primary">${product.price}</div>
                                <p className="text-lg text-muted-foreground">
                                    {productDescription}
                                </p>
                                <div className="flex gap-4">
                                    <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                                        <ShoppingCart className="w-5 h-5 mr-2" />
                                        {dict.products.addToCart}
                                    </Button>
                                    <Button size="lg" variant="outline" asChild>
                                        <Link href={`/${locale}/contact`}>{t.askQuestion}</Link>
                                    </Button>
                                </div>
                                <div className="space-y-2 pt-6 border-t">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Check className="w-4 h-4 text-green-500" />
                                        {t.instantDownload}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Check className="w-4 h-4 text-green-500" />
                                        {t.lifetimeUpdates}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <Check className="w-4 h-4 text-green-500" />
                                        {t.premiumSupport}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
}
