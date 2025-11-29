import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { i18n } from './src/i18n/config';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;

    // Skip middleware for static files and API routes
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.') ||
        pathname === '/favicon.ico'
    ) {
        return;
    }

    // Check if pathname is exactly a locale (e.g., /fr or /en)
    const isExactLocale = i18n.locales.some(
        (locale) => pathname === `/${locale}`
    );

    // Redirect /fr to /fr/ for consistency
    if (isExactLocale) {
        return NextResponse.redirect(
            new URL(`${pathname}/`, request.url)
        );
    }

    // Check if there is any supported locale in the pathname
    const pathnameIsMissingLocale = i18n.locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`)
    );

    // Redirect if there is no locale
    if (pathnameIsMissingLocale) {
        const locale = i18n.defaultLocale;

        // Handle root path and other paths
        const newPath = pathname === '/' 
            ? `/${locale}/` 
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
