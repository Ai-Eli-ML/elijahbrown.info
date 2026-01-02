import { NextResponse } from 'next/server';
import { verifyWebhookSignature } from '@/lib/fathom';

export async function POST(request: Request) {
  try {
    const payload = await request.text();
    const signature = request.headers.get('x-fathom-signature') || '';

    // Verify webhook signature
    if (process.env.FATHOM_WEBHOOK_SECRET && !verifyWebhookSignature(payload, signature)) {
      console.warn('Invalid Fathom webhook signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const data = JSON.parse(payload);
    console.log('Fathom webhook received:', data.event_type);

    // Handle different event types
    switch (data.event_type) {
      case 'meeting.ready':
        // New meeting content is ready
        console.log('New meeting ready:', data.meeting?.title);
        // TODO: Send notification, update cache, etc.
        break;
      default:
        console.log('Unknown event type:', data.event_type);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
