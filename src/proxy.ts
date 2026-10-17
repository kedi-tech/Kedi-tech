import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from '@/i18n/config';

export function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip proxy for static files and API routes
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.') ||
        pathname === '/favicon.ico'
    ) {
        return;
    }

    // Check if there is any supported locale in the pathname (/fr or /fr/...)
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => pathname !== `/${locale}` && !pathname.startsWith(`/${locale}/`)
    );

    // The portal has no real authentication yet: keep it locked unless explicitly enabled
    const portalMatch = pathname.match(/^\/([a-z]{2})\/portal(\/|$)/);
    if (portalMatch && process.env.NEXT_PUBLIC_PORTAL_ENABLED !== 'true') {
        return NextResponse.redirect(new URL(`/${portalMatch[1]}/login`, request.url));
    }

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = i18n.defaultLocale;

        // Handle root path and other paths
        const newPath = pathname === '/' 
            ? `/${locale}` 
            : `/${locale}${pathname}`;

        return NextResponse.redirect(
            new URL(newPath, request.url)
        );
    }
}

export const config = {
    // Matcher for all routes except static files and API routes
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - files with extensions (e.g., .png, .jpg, etc.)
         */
        '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
    ],
};
