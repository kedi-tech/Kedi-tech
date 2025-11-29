"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type Locale } from "@/i18n/config";

export default function LoginPage() {
    const router = useRouter();
    const params = useParams();
    const locale = (params.locale as Locale) || "fr";
    const [dict, setDict] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        import(`@/i18n/dictionaries/${locale}.json`).then((module) => {
            setDict(module.default);
        });
    }, [locale]);

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            router.push(`/${locale}/portal`); // Redirect to portal after login
        }, 1000);
    }

    if (!dict) return <div>Loading...</div>;
    const t = dict.auth.login;

    return (
        <Card className="border-none shadow-xl">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">{t.title}</CardTitle>
                <CardDescription className="text-center">
                    {t.subtitle}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">{t.email}</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">{t.password}</Label>
                            <Link
                                href={`/${locale}/auth/forgot-password`}
                                className="text-sm font-medium text-primary hover:underline"
                            >
                                {t.forgotPassword}
                            </Link>
                        </div>
                        <Input id="password" type="password" required />
                    </div>
                    <Button className="w-full" type="submit" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                {t.signingIn}
                            </>
                        ) : (
                            t.signIn
                        )}
                    </Button>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
                <div className="relative w-full">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            {t.orContinue}
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4 w-full">
                    <Button variant="outline" disabled={isLoading}>
                        Github
                    </Button>
                    <Button variant="outline" disabled={isLoading}>
                        Google
                    </Button>
                </div>
                <div className="text-center text-sm">
                    {t.noAccount}{" "}
                    <Link href={`/${locale}/auth/signup`} className="text-primary font-medium hover:underline">
                        {t.signUp}
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
