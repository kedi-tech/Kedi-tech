import { NextRequest } from 'next/server';
import * as z from 'zod';
import { forwardToWebhook } from '@/lib/webhook';

const contactSchema = z.object({
    name: z.string().trim().min(2).max(100),
    email: z.email().max(200),
    whatsapp: z.string().trim().min(10).max(30),
    projectType: z.string().trim().min(1).max(100),
    budget: z.string().trim().min(1).max(100),
    message: z.string().trim().min(10).max(5000),
});

export async function POST(request: NextRequest) {
    return forwardToWebhook(request, contactSchema, 'kedi-tech-website', 'Failed to submit contact form');
}
