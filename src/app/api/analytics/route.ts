import { NextResponse } from 'next/server';

// Handle Vercel Analytics POST requests
export async function POST() {
  // Silently accept analytics data
  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
