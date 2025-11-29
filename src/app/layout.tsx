import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/components/providers/cart-provider";
import { i18n } from "@/i18n/config";

const inter = Inter({ subsets: ["latin"] });

// Default metadata (will be overridden by locale-specific metadata)
export const metadata: Metadata = {
  title: "Kedi Tech - Software Development Company",
  description: "We build apps, websites, software, and SaaS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
