"use client";

import { useState } from "react";
import Link from "next/link";
import { AppLogo } from "@/components/ui/app-logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Twitter, Linkedin, Instagram, Facebook } from "lucide-react";
import { type Locale, type Dictionary } from "@/i18n/config";

interface FooterProps {
    locale: Locale;
    dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
    const t = dict.footer;
    const [newsletterEmail, setNewsletterEmail] = useState("");
    const [isSubscribing, setIsSubscribing] = useState(false);

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!newsletterEmail || !newsletterEmail.includes("@")) {
            alert(locale === "fr" ? "Veuillez entrer une adresse email valide" : "Please enter a valid email address");
            return;
        }

        setIsSubscribing(true);

        try {
            const response = await fetch('/api/newsletter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: newsletterEmail,
                    website: new FormData(e.currentTarget as HTMLFormElement).get("website"),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to subscribe');
            }

            alert(locale === "fr" ? "Inscription réussie!" : "Subscription successful!");
            setNewsletterEmail("");
        } catch (error) {
            console.error('Error subscribing to newsletter:', error);
            alert(locale === "fr" ? "Erreur lors de l'inscription. Veuillez réessayer." : "Error subscribing. Please try again.");
        } finally {
            setIsSubscribing(false);
        }
    };
    return (
        <footer className="bg-muted/30 border-t">
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="space-y-4">
                        <AppLogo locale={locale} />
                        <p className="text-sm text-muted-foreground">
                            {t.description}
                        </p>
                        <div className="flex gap-4">
                            <Link 
                                href="https://x.com/kedi_technology" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="X (Twitter)"
                            >
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link 
                                href="https://www.facebook.com/share/1Ci9XpF7ik/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-5 w-5" />
                            </Link>
                            <Link 
                                href="https://www.instagram.com/kedi_technology" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-5 w-5" />
                            </Link>
                            <Link 
                                href="https://www.linkedin.com/in/kedi-tech-kedi-tech-056b10392/" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-muted-foreground hover:text-primary transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">{t.services}</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href={`/${locale}/services`} className="hover:text-primary transition-colors">{t.serviceLinks.webDev}</Link></li>
                            <li><Link href={`/${locale}/services`} className="hover:text-primary transition-colors">{t.serviceLinks.mobileApps}</Link></li>
                            <li><Link href={`/${locale}/services`} className="hover:text-primary transition-colors">{t.serviceLinks.saasSolutions}</Link></li>
                            <li><Link href={`/${locale}/services`} className="hover:text-primary transition-colors">{t.serviceLinks.uiUxDesign}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">{t.company}</h3>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            <li><Link href={`/${locale}/about`} className="hover:text-primary transition-colors">{t.companyLinks.aboutUs}</Link></li>
                            <li><Link href={`/${locale}/portfolio`} className="hover:text-primary transition-colors">{t.companyLinks.portfolio}</Link></li>
                            <li><Link href={`/${locale}/careers`} className="hover:text-primary transition-colors">{t.companyLinks.careers}</Link></li>
                            <li><Link href={`/${locale}/contact`} className="hover:text-primary transition-colors">{t.companyLinks.contact}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">{t.newsletter.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                            {t.newsletter.subtitle}
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                            <Input 
                                type="email"
                                placeholder={t.newsletter.placeholder} 
                                className="bg-background"
                                value={newsletterEmail}
                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                disabled={isSubscribing}
                                required
                            />
                            <Button type="submit" disabled={isSubscribing}>
                                {isSubscribing ? (locale === "fr" ? "..." : "...") : t.newsletter.button}
                            </Button>
                        </form>
                    </div>
                </div>

                <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
                    <p>&copy; {new Date().getFullYear()} Kedi Tech. {t.rights}</p>
                    <div className="flex gap-6">
                        <Link href={`/${locale}/privacy`} className="hover:text-primary transition-colors">{t.legal.privacyPolicy}</Link>
                        <Link href={`/${locale}/terms`} className="hover:text-primary transition-colors">{t.legal.termsOfService}</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
