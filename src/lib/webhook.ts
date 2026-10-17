import { NextRequest, NextResponse } from 'next/server';
import type { z } from 'zod';

// Simple in-memory rate limiter: RATE_LIMIT requests per IP per window.
// Resets on server restart and is per-instance; swap for Redis/Upstash if you scale out.
const RATE_LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_BODY_BYTES = 10_000;
const hits = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
    const now = Date.now();
    const entry = hits.get(ip);

    if (!entry || entry.resetAt < now) {
        hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
        return false;
    }

    entry.count += 1;
    return entry.count > RATE_LIMIT;
}

function getClientIp(request: NextRequest): string {
    return request.headers.get('x-forwarded-for')?.split(',')[0].trim()
        || request.headers.get('x-real-ip')
        || 'unknown';
}

/**
 * Validates the request body against `schema` and forwards it to the webhook.
 * The `website` field is a honeypot: bots fill it, humans never see it.
 */
export async function forwardToWebhook<T extends z.ZodType>(
    request: NextRequest,
    schema: T,
    source: string,
    errorMessage: string,
): Promise<NextResponse> {
    const webhookUrl = process.env.WEBHOOK_URL;
    if (!webhookUrl) {
        console.error('WEBHOOK_URL is not set');
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }

    if (isRateLimited(getClientIp(request))) {
        return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) {
        return NextResponse.json({ error: 'Payload too large' }, { status: 413 });
    }

    let body: unknown;
    try {
        body = JSON.parse(raw);
    } catch {
        return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
    }

    // Honeypot filled: pretend success so bots don't retry
    if (body && typeof body === 'object' && 'website' in body && (body as { website?: unknown }).website) {
        return NextResponse.json({ success: true }, { status: 200 });
    }

    const parsed = schema.safeParse(body);
    if (!parsed.success) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    try {
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...(parsed.data as object),
                timestamp: new Date().toISOString(),
                source,
            }),
        });

        if (!response.ok) {
            throw new Error(`Webhook request failed: ${response.statusText}`);
        }

        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
        console.error('Error sending to webhook:', error);
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
