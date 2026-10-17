"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { AnimatedSection } from "@/components/ui/animated-section";
import { type Locale } from "@/i18n/config";
import { useDictionary } from "@/components/providers/dictionary-provider";

export default function ContactPage() {
    const params = useParams();
    const locale = (params.locale as Locale) || "fr";
    const dict = useDictionary();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Create form schema - use default messages that work for both languages
    const formSchema = z.object({
        name: z.string().min(2, locale === "fr" ? "Le nom doit contenir au moins 2 caractères" : "Name must be at least 2 characters"),
        email: z.string().email(locale === "fr" ? "Adresse email invalide" : "Invalid email address"),
        whatsapp: z.string().min(10, locale === "fr" ? "Numéro de téléphone invalide" : "Invalid phone number"),
        projectType: z.string().min(1, locale === "fr" ? "Veuillez sélectionner un type de projet" : "Please select a project type"),
        budget: z.string().min(1, locale === "fr" ? "Veuillez sélectionner une fourchette budgétaire" : "Please select a budget range"),
        message: z.string().min(10, locale === "fr" ? "Le message doit contenir au moins 10 caractères" : "Message must be at least 10 characters"),
    });

    // All hooks must be called before any conditional returns
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            whatsapp: "",
            projectType: "",
            budget: "",
            message: "",
        },
    });

    const t = dict.contact;

    async function onSubmit(values: z.infer<typeof formSchema>, event?: React.BaseSyntheticEvent) {
        setIsSubmitting(true);
        
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...values,
                    website: event ? new FormData(event.target as HTMLFormElement).get("website") : null,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to send message');
            }

            // Success
            alert(locale === "fr" ? "Message envoyé avec succès!" : "Message sent successfully!");
            form.reset();
        } catch (error) {
            console.error('Error submitting form:', error);
            alert(locale === "fr" ? "Erreur lors de l'envoi du message. Veuillez réessayer." : "Error sending message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

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
                <div className="container mx-auto px-4 max-w-2xl">
                    <AnimatedSection>
                        <div className="bg-card border rounded-xl p-8 shadow-lg">
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t.form.name}</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="John Doe" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t.form.email}</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="john@example.com" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="whatsapp"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t.form.phone}</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="+1 234 567 890" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="grid md:grid-cols-2 gap-6">
                                        <FormField
                                            control={form.control}
                                            name="projectType"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t.form.projectType}</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder={locale === "fr" ? "Sélectionner un type" : "Select type"} />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="web">{t.projectTypes.web}</SelectItem>
                                                            <SelectItem value="mobile">{t.projectTypes.mobile}</SelectItem>
                                                            <SelectItem value="saas">{t.projectTypes.saas}</SelectItem>
                                                            <SelectItem value="design">{t.projectTypes.design}</SelectItem>
                                                            <SelectItem value="other">{t.projectTypes.other}</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="budget"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{t.form.budget}</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                        <FormControl>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder={locale === "fr" ? "Sélectionner un budget" : "Select budget"} />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent>
                                                            <SelectItem value="small">{t.budgets.small}</SelectItem>
                                                            <SelectItem value="medium">{t.budgets.medium}</SelectItem>
                                                            <SelectItem value="large">{t.budgets.large}</SelectItem>
                                                            <SelectItem value="enterprise">{t.budgets.enterprise}</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>

                                    <FormField
                                        control={form.control}
                                        name="message"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t.form.message}</FormLabel>
                                                <FormControl>
                                                    <Textarea
                                                        placeholder={locale === "fr" ? "Parlez-nous de votre projet..." : "Tell us about your project..."}
                                                        className="min-h-[120px]"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                                        {isSubmitting ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                {t.form.sending}
                                            </>
                                        ) : (
                                            <>
                                                <Send className="mr-2 h-4 w-4" />
                                                {t.form.send}
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </Form>
                        </div>
                    </AnimatedSection>
                </div>
            </section>
        </div>
    );
}
