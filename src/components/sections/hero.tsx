"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Code, Rocket, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "@/components/ui/animated-button";
import { type Locale, type Dictionary } from "@/i18n/config";

interface HeroProps {
    locale: Locale;
    dict: Dictionary;
}

export function Hero({ locale, dict }: HeroProps) {
    const t = dict.hero;
    
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background pt-16">
            {/* Background Gradients */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[100px] animate-pulse" />
            </div>

            <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="space-y-6 text-center lg:text-left"
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        {t.badge}
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                        {t.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">{t.titleHighlight}</span>
                    </h1>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                        {t.subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Link href={`/${locale}/contact`}>
                            <AnimatedButton size="lg" className="text-lg px-8 w-full sm:w-auto">
                                {t.ctaPrimary}
                            </AnimatedButton>
                        </Link>
                        <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                            <Link href={`/${locale}/portfolio`}>{t.ctaSecondary}</Link>
                        </Button>
                    </div>

                    <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Code className="w-5 h-5 text-primary" />
                            <span>{t.features.cleanCode}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-accent" />
                            <span>{t.features.fastPerformance}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Rocket className="w-5 h-5 text-blue-500" />
                            <span>{t.features.scalable}</span>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="relative hidden lg:block"
                >
                    <div className="relative w-full aspect-square max-w-md mx-auto">
                        {/* Abstract 3D-like Composition */}
                        <motion.div
                            animate={{ y: [0, -20, 0] }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                            className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary to-blue-600 rounded-3xl shadow-2xl z-10 flex items-center justify-center"
                        >
                            <Code className="w-32 h-32 text-white/20" />
                        </motion.div>

                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 1 }}
                            className="absolute bottom-10 left-10 w-56 h-56 bg-gradient-to-tr from-accent to-green-600 rounded-full shadow-2xl z-20 flex items-center justify-center backdrop-blur-sm opacity-90"
                        >
                            <Rocket className="w-24 h-24 text-white/20" />
                        </motion.div>

                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl -z-10" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
