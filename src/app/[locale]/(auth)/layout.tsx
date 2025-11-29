import Link from "next/link";
import { Terminal } from "lucide-react";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 p-4">
            <div className="mb-8">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Terminal className="w-6 h-6 text-primary" />
                    </div>
                    <span className="font-bold text-xl tracking-tight">Kedi<span className="text-primary">Tech</span></span>
                </Link>
            </div>
            <div className="w-full max-w-md">
                {children}
            </div>
        </div>
    );
}
