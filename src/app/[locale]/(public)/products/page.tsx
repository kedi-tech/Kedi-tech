"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { products } from "@/data/products";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useCart } from "@/components/providers/cart-provider";
import { type Locale } from "@/i18n/config";
import { useDictionary } from "@/components/providers/dictionary-provider";

export default function ProductsPage() {
    const params = useParams();
    const locale = (params.locale as Locale) || "fr";
    const dict = useDictionary();
    const { addItem } = useCart();

    const handleAddToCart = (product: (typeof products)[number]) => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
        });
        const message = dict?.products?.addToCart 
            ? `${dict.products.addToCart}: ${product.name}!`
            : `Added ${product.name} to cart!`;
        alert(message);
    };
    const t = dict.products;

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
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map((product, index) => (
                            <AnimatedSection key={product.id} delay={index * 0.1}>
                                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow bg-background">
                                    <Link href={`/${locale}/products/${product.id}`} className="block relative aspect-[4/3] overflow-hidden rounded-t-lg">
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            className="object-cover transition-transform hover:scale-105"
                                        />
                                        <Badge className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-foreground hover:bg-background/90">
                                            ${product.price}
                                        </Badge>
                                    </Link>
                                    <CardHeader className="p-4 pb-2">
                                        <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider font-semibold">
                                            {product.category}
                                        </div>
                                        <Link href={`/${locale}/products/${product.id}`} className="hover:underline">
                                            <CardTitle className="text-lg">{dict.products.items[product.id as keyof typeof dict.products.items]?.name || product.name}</CardTitle>
                                        </Link>
                                    </CardHeader>
                                    <CardContent className="p-4 pt-0 flex-1">
                                        <p className="text-sm text-muted-foreground line-clamp-2">
                                            {dict.products.items[product.id as keyof typeof dict.products.items]?.description || product.description}
                                        </p>
                                    </CardContent>
                                    <CardFooter className="p-4 pt-0">
                                        <Button className="w-full" size="sm" onClick={() => handleAddToCart(product)}>
                                            <ShoppingCart className="w-4 h-4 mr-2" />
                                            {t.addToCart}
                                        </Button>
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
