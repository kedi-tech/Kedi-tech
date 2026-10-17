import { NextRequest } from 'next/server';
import * as z from 'zod';
import { forwardToWebhook } from '@/lib/webhook';

const newsletterSchema = z.object({
    email: z.email().max(200),
});

export async function POST(request: NextRequest) {
    return forwardToWebhook(request, newsletterSchema, 'kedi-tech-newsletter', 'Failed to subscribe to newsletter');
}
