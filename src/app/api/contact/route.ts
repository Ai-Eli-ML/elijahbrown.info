import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

// Simple in-memory rate limiting
// In production, you'd use Redis or a proper rate limiting service
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in milliseconds
const MAX_REQUESTS = 5; // Max 5 requests per hour per IP

interface ContactFormData {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

function getClientIP(request: NextRequest): string {
  // Try to get real IP from various headers (for production behind proxies)
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  if (realIP) {
    return realIP;
  }

  // Fallback to a default for development
  return 'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    // No record or expired, create new
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

  // Increment count
  record.count++;
  return { allowed: true };
}

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function sanitizeInput(input: string): string {
  // Basic sanitization - remove potential script tags
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

    // Validate email
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

    // Store message in filesystem (for now)
    // In production, you'd integrate with email service or database
    const timestamp = new Date().toISOString();
    const messageData = {
      ...sanitizedData,
      timestamp,
      ip: clientIP,
      userAgent: request.headers.get('user-agent') || 'unknown',
    };

    // Create submissions directory if it doesn't exist
    const submissionsDir = join(process.cwd(), 'contact-submissions');
    if (!existsSync(submissionsDir)) {
      await mkdir(submissionsDir, { recursive: true });
    }

    // Write to file
    const filename = `${timestamp.replace(/[:.]/g, '-')}-${sanitizedData.email.replace(/[^a-z0-9]/gi, '_')}.json`;
    const filepath = join(submissionsDir, filename);

    await writeFile(filepath, JSON.stringify(messageData, null, 2), 'utf-8');

    // TODO: Integrate with email service (Resend, SendGrid, etc.)
    // Example for Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'contact@elijahbrown.info',
    //   to: 'your-email@example.com',
    //   subject: `Contact Form: ${sanitizedData.subject}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>From:</strong> ${sanitizedData.name} (${sanitizedData.email})</p>
    //     <p><strong>Subject:</strong> ${sanitizedData.subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
    //   `,
    // });

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

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
