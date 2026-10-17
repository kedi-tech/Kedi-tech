"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { type Locale } from "@/i18n/config";
import { useDictionary } from "@/components/providers/dictionary-provider";

// The portal has no real authentication yet, so it stays locked unless this is set (local demo only)
const portalEnabled = process.env.NEXT_PUBLIC_PORTAL_ENABLED === "true";

export default function LoginPage() {
    const router = useRouter();
    const params = useParams();
    const locale = (params.locale as Locale) || "fr";
    const dict = useDictionary();
    const [isLoading, setIsLoading] = useState(false);

    async function onSubmit(event: React.FormEvent) {
        event.preventDefault();
        if (!portalEnabled) return;
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            router.push(`/${locale}/portal`); // Demo only: no real authentication yet
        }, 1000);
    }
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
                {!portalEnabled && (
                    <p role="status" className="mb-4 rounded-md bg-muted p-3 text-sm text-muted-foreground">
                        {t.portalComingSoon}
                    </p>
                )}
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">{t.email}</Label>
                        <Input id="email" type="email" placeholder="m@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">{t.password}</Label>
                            <Link
                                href={`/${locale}/forgot-password`}
                                className="text-sm font-medium text-primary hover:underline"
                            >
                                {t.forgotPassword}
                            </Link>
                        </div>
                        <Input id="password" type="password" required />
                    </div>
                    <Button className="w-full" type="submit" disabled={isLoading || !portalEnabled}>
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
                    <Button variant="outline" disabled>
                        Github
                    </Button>
                    <Button variant="outline" disabled>
                        Google
                    </Button>
                </div>
                <div className="text-center text-sm">
                    {t.noAccount}{" "}
                    <Link href={`/${locale}/signup`} className="text-primary font-medium hover:underline">
                        {t.signUp}
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}
