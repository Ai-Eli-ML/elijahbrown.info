import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Twilio sends form-encoded POST when SMS arrives
export async function POST(request: NextRequest) {
  let body: Record<string, string>;
  try {
    const formData = await request.formData();
    body = Object.fromEntries(formData.entries()) as Record<string, string>;
  } catch {
    return new NextResponse('Invalid request', { status: 400 });
  }

  const from = body.From || '';
  const text = body.Body || '';
  const messageSid = body.MessageSid || '';

  if (!from || !text) {
    return twimlResponse('');
  }

  // Store the bug report in Supabase
  const { error } = await supabase.from('ai_voicelab_feedback').insert({
    phone: from,
    message: text,
    twilio_sid: messageSid,
    source: 'sms',
    status: 'new',
  });

  if (error) {
    console.error('Failed to store feedback:', error);
  }

  // Post to Discord task channel for visibility
  try {
    const discordWebhook = process.env.DISCORD_TASK_WEBHOOK;
    if (discordWebhook) {
      await fetch(discordWebhook, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          embeds: [{
            title: 'AI Voice Lab — Bug Report via SMS',
            description: text,
            color: 0xff6b6b,
            fields: [
              { name: 'From', value: maskPhone(from), inline: true },
              { name: 'Twilio SID', value: messageSid.slice(0, 12) + '...', inline: true },
            ],
            timestamp: new Date().toISOString(),
          }],
        }),
      });
    }
  } catch {
    // Discord notification is best-effort
  }

  // Auto-reply thanking them
  return twimlResponse(
    "Thanks for the feedback! Eli will check it out. If you want to try again, go to elijahbrown.info/ai"
  );
}

// Twilio expects TwiML XML response
function twimlResponse(message: string) {
  const xml = message
    ? `<?xml version="1.0" encoding="UTF-8"?><Response><Message>${escapeXml(message)}</Message></Response>`
    : `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'text/xml' },
  });
}

function escapeXml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function maskPhone(phone: string) {
  // Show last 4 digits only for privacy in Discord
  const digits = phone.replace(/\D/g, '');
  return `***${digits.slice(-4)}`;
}
