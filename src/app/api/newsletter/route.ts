import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        
        // Get webhook URL from environment variable
        const webhookUrl = "https://hook.eu2.make.com/ey8viruxar2b44duz9u4ssbahl481wbx";
        


        // Prepare the payload to send to webhook
        const payload = {
            email: body.email,
            timestamp: new Date().toISOString(),
            source: 'kedi-tech-newsletter',
        };

        // Send to webhook
        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Webhook request failed: ${response.statusText}`);
        }

        return NextResponse.json(
            { success: true, message: 'Newsletter subscription successful' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error sending to webhook:', error);
        return NextResponse.json(
            { error: 'Failed to subscribe to newsletter' },
            { status: 500 }
        );
    }
}

