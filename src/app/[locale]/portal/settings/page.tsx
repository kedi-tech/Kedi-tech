"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2 } from "lucide-react";
import { type Locale } from "@/i18n/config";

export default function PortalSettingsPage() {
    const params = useParams();
    const locale = (params.locale as Locale) || "fr";
    const [dict, setDict] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        import(`@/i18n/dictionaries/${locale}.json`).then((module) => {
            setDict(module.default);
        });
    }, [locale]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            alert(locale === "fr" ? "Paramètres enregistrés avec succès!" : "Settings saved successfully!");
        }, 1000);
    };

    if (!dict) return <div>Loading...</div>;
    const t = dict.portal.settings;

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
                <p className="text-muted-foreground">{t.subtitle}</p>
            </div>

            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>{t.profile}</CardTitle>
                        <CardDescription>{t.profileSubtitle}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="flex items-center gap-6">
                                <Avatar className="w-20 h-20">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <div>
                                    <Button variant="outline" size="sm">{t.changePhoto}</Button>
                                    <p className="text-xs text-muted-foreground mt-2">{locale === "fr" ? "JPG, PNG ou GIF. Taille max 2MB." : "JPG, PNG or GIF. Max size 2MB."}</p>
                                </div>
                            </div>

                            <Separator />

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">{t.firstName}</Label>
                                    <Input id="firstName" defaultValue="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">{t.lastName}</Label>
                                    <Input id="lastName" defaultValue="Doe" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">{t.email}</Label>
                                <Input id="email" type="email" defaultValue="john@example.com" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone">{t.phone}</Label>
                                <Input id="phone" type="tel" defaultValue="+1 234 567 890" />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="company">{t.company}</Label>
                                <Input id="company" defaultValue="Acme Corp" />
                            </div>

                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {t.saving}
                                    </>
                                ) : (
                                    t.saveChanges
                                )}
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>{t.password}</CardTitle>
                        <CardDescription>{t.passwordSubtitle}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">{t.currentPassword}</Label>
                                <Input id="currentPassword" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="newPassword">{t.newPassword}</Label>
                                <Input id="newPassword" type="password" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword">{t.confirmPassword}</Label>
                                <Input id="confirmPassword" type="password" />
                            </div>
                            <Button type="submit">{t.updatePassword}</Button>
                        </form>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>{t.notifications}</CardTitle>
                        <CardDescription>{t.notificationsSubtitle}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">{t.emailNotifications}</p>
                                <p className="text-sm text-muted-foreground">{t.emailNotificationsDesc}</p>
                            </div>
                            <Button variant="outline" size="sm">{t.configure}</Button>
                        </div>
                        <Separator />
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium">{t.projectUpdates}</p>
                                <p className="text-sm text-muted-foreground">{t.projectUpdatesDesc}</p>
                            </div>
                            <Button variant="outline" size="sm">{t.configure}</Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
