import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

// Simple in-memory rate limiting
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5; // Max 5 requests per hour per IP

interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  return 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return { allowed: true };
  }

  if (record.count >= MAX_REQUESTS) {
    const retryAfter = Math.ceil((record.resetTime - now) / 1000);
    return { allowed: false, retryAfter };
  }

  record.count++;
  return { allowed: true };
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string): string {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIP = getClientIP(request);
    const rateLimitResult = checkRateLimit(clientIP);

    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { error: `Too many requests. Please try again in ${rateLimitResult.retryAfter} seconds.` },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimitResult.retryAfter),
          },
        }
      );
    }

    // Parse request body
    const body: ContactFormData = await request.json();

    // Validation
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!validateEmail(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(body.name),
      email: sanitizeInput(body.email),
      subject: body.subject ? sanitizeInput(body.subject) : 'No subject',
      message: sanitizeInput(body.message),
    };

    // Length validation
    if (sanitizedData.name.length > 100) {
      return NextResponse.json(
        { error: 'Name is too long (max 100 characters)' },
        { status: 400 }
      );
    }

    if (sanitizedData.message.length > 5000) {
      return NextResponse.json(
        { error: 'Message is too long (max 5000 characters)' },
        { status: 400 }
      );
    }

    if (sanitizedData.message.length < 10) {
      return NextResponse.json(
        { error: 'Message is too short (min 10 characters)' },
        { status: 400 }
      );
    }

    // Store in Supabase (shared with AJ + Personal Dashboard)
    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        name: sanitizedData.name,
        email: sanitizedData.email,
        subject: sanitizedData.subject,
        message: sanitizedData.message,
        ip: clientIP,
        user_agent: request.headers.get('user-agent') || 'unknown',
      });

    if (dbError) {
      console.error('Supabase insert error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save message. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Message received successfully',
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);

    return NextResponse.json(
      { error: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
