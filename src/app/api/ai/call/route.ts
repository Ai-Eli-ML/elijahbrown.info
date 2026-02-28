import { NextRequest, NextResponse } from 'next/server';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;

// AT phone number — used for all outbound calls from elijahbrown.info
const AT_PHONE_NUMBER_ID = 'phnum_7301kjg4cfzrevt9hs8ap4kfhcag';

// Brooklyn voice — confident, conversational, natural
const VOICE_ID = 'zWoalRDt5TZrmW4ROIA7';

// Simple in-memory rate limiter: max 3 calls per phone per hour
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(phone: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(phone);

  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(phone, { count: 1, resetAt: now + 3600_000 });
    return true;
  }

  if (entry.count >= 3) {
    return false;
  }

  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  if (!ELEVENLABS_API_KEY || !TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN) {
    return NextResponse.json(
      { error: 'Voice service not configured' },
      { status: 503 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  const { name, phone, preset, prompt, firstMessage } = body;

  if (!name || !phone || !preset || !prompt) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    );
  }

  // Validate phone — must be 10 digits
  const digits = phone.replace(/\D/g, '');
  if (digits.length !== 10) {
    return NextResponse.json(
      { error: 'Invalid phone number' },
      { status: 400 }
    );
  }

  // Rate limit
  if (!checkRateLimit(digits)) {
    return NextResponse.json(
      { error: 'Too many calls. Try again in an hour.' },
      { status: 429 }
    );
  }

  try {
    // Step 1: Create a temporary agent with the chosen personality
    const agentRes = await fetch('https://api.elevenlabs.io/v1/convai/agents/create', {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        conversation_config: {
          agent: {
            prompt: {
              prompt: `Your name is ${name}'s AI. ${prompt}\n\nIMPORTANT: You are talking to ${name}. Use their name naturally in conversation. Keep responses concise for phone conversation — 2-3 sentences max per turn. Be warm and engaging.`,
            },
            first_message: firstMessage,
            language: 'en',
          },
          tts: {
            voice_id: VOICE_ID,
            model_id: 'eleven_flash_v2',
          },
          conversation: {
            model_id: 'gpt-4.1',
          },
          turn: {
            turn_timeout: 15,
            mode: {
              type: 'turn_based',
              eagerness: 'eager',
            },
          },
          client_events: ['agent_response', 'user_transcript'],
        },
        platform_settings: {
          end_call: { enabled: true },
        },
        name: `${name}'s ${preset} AI`,
      }),
    });

    if (!agentRes.ok) {
      const errText = await agentRes.text();
      console.error('ElevenLabs agent create error:', errText);
      return NextResponse.json(
        { error: 'Failed to create AI personality' },
        { status: 500 }
      );
    }

    const agent = await agentRes.json();
    const agentId = agent.agent_id;

    // Step 2: Assign the AT phone number to this agent
    const assignRes = await fetch(
      `https://api.elevenlabs.io/v1/convai/phone-numbers/${AT_PHONE_NUMBER_ID}`,
      {
        method: 'PATCH',
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ agent_id: agentId }),
      }
    );

    if (!assignRes.ok) {
      const errText = await assignRes.text();
      console.error('Phone assign error:', errText);
      // Clean up — delete the agent
      await fetch(`https://api.elevenlabs.io/v1/convai/agents/${agentId}`, {
        method: 'DELETE',
        headers: { 'xi-api-key': ELEVENLABS_API_KEY },
      });
      return NextResponse.json(
        { error: 'Phone line busy. Try again in a moment.' },
        { status: 503 }
      );
    }

    // Step 3: Make the outbound call
    const callRes = await fetch('https://api.elevenlabs.io/v1/convai/twilio/outbound-call', {
      method: 'POST',
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        agent_id: agentId,
        agent_phone_number_id: AT_PHONE_NUMBER_ID,
        to_number: `+1${digits}`,
        first_message: firstMessage,
      }),
    });

    if (!callRes.ok) {
      const errText = await callRes.text();
      console.error('Outbound call error:', errText);
      return NextResponse.json(
        { error: 'Failed to start call. Try again.' },
        { status: 500 }
      );
    }

    const callData = await callRes.json();

    // Schedule agent cleanup after 10 minutes (call will be over by then)
    setTimeout(async () => {
      try {
        await fetch(`https://api.elevenlabs.io/v1/convai/agents/${agentId}`, {
          method: 'DELETE',
          headers: { 'xi-api-key': ELEVENLABS_API_KEY! },
        });
      } catch {
        // Agent cleanup is best-effort
      }
    }, 600_000);

    return NextResponse.json({
      success: true,
      agentId,
      callId: callData.call_id || callData.id,
    });
  } catch (err) {
    console.error('AI call error:', err);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
