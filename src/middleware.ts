import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Password for the protected /colleen page
const COLLEEN_PASSWORD = 'Berkely';
const AUTH_COOKIE_NAME = 'colleen-auth';

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Check if this is the berkeley subdomain or /colleen path
  const isBerkeleySubdomain = hostname.startsWith('berkeley.');
  const isColleenPath = pathname.startsWith('/colleen');

  // Only protect /colleen route (or any route on berkeley subdomain)
  if (!isColleenPath && !isBerkeleySubdomain) {
    return NextResponse.next();
  }

  // Check if user is already authenticated via cookie
  const authCookie = request.cookies.get(AUTH_COOKIE_NAME);
  if (authCookie?.value === 'authenticated') {
    return NextResponse.next();
  }

  // Check if password is being submitted
  const submittedPassword = searchParams.get('password');
  if (submittedPassword === COLLEEN_PASSWORD) {
    // Set authentication cookie and redirect to clean URL
    const cleanUrl = new URL(pathname, request.url);
    const response = NextResponse.redirect(cleanUrl);

    // Set cookie with domain that works for both www and non-www
    response.cookies.set(AUTH_COOKIE_NAME, 'authenticated', {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
      domain: '.elijahbrown.info', // Works for www and non-www
    });
    return response;
  }

  // Show login page if not authenticated
  const loginUrl = new URL('/colleen/login', request.url);
  if (pathname !== '/colleen/login') {
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/colleen/:path*'],
};
