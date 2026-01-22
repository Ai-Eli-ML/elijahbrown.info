import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Protected page configurations
const PROTECTED_PAGES = {
  colleen: {
    password: 'Berkeley',
    cookieName: 'colleen-auth',
    loginPath: '/colleen/login',
  },
  jermaine: {
    password: 'Dessalines1804',
    cookieName: 'jermaine-auth',
    loginPath: '/jermaine/login',
  },
  private: {
    password: 'Sxilent2026',
    cookieName: 'private-auth',
    loginPath: '/private/login',
  },
  working: {
    password: 'sxilent',
    cookieName: 'working-auth',
    loginPath: '/working/login',
  },
  clubhopper: {
    password: 'TheMemberz',
    cookieName: 'clubhopper-auth',
    loginPath: '/clubhopper/login',
  },
  // Team member pages
  shiriru: {
    password: 'ProjectManager2026',
    cookieName: 'shiriru-auth',
    loginPath: '/shiriru/login',
  },
  marika: {
    password: 'COOAccess2026',
    cookieName: 'marika-auth',
    loginPath: '/marika/login',
  },
  ziva: {
    password: 'ZivaTeam2026',
    cookieName: 'ziva-auth',
    loginPath: '/ziva/login',
  },
  intern: {
    password: 'InternAccess2026',
    cookieName: 'intern-auth',
    loginPath: '/intern/login',
  },
  cfo: {
    password: 'CFOFinance2026',
    cookieName: 'cfo-auth',
    loginPath: '/cfo/login',
  },
  shirene: {
    password: 'AccountManager2026',
    cookieName: 'shirene-auth',
    loginPath: '/shirene/login',
  },
};

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const hostname = request.headers.get('host') || '';

  // Determine which protected page we're accessing
  let pageConfig = null;
  let pageName = '';

  if (pathname.startsWith('/colleen') || hostname.startsWith('berkeley.')) {
    pageConfig = PROTECTED_PAGES.colleen;
    pageName = 'colleen';
  } else if (pathname.startsWith('/jermaine')) {
    pageConfig = PROTECTED_PAGES.jermaine;
    pageName = 'jermaine';
  } else if (pathname.startsWith('/private')) {
    pageConfig = PROTECTED_PAGES.private;
    pageName = 'private';
  } else if (pathname.startsWith('/working')) {
    pageConfig = PROTECTED_PAGES.working;
    pageName = 'working';
  } else if (pathname.startsWith('/clubhopper')) {
    pageConfig = PROTECTED_PAGES.clubhopper;
    pageName = 'clubhopper';
  } else if (pathname.startsWith('/shiriru')) {
    pageConfig = PROTECTED_PAGES.shiriru;
    pageName = 'shiriru';
  } else if (pathname.startsWith('/marika')) {
    pageConfig = PROTECTED_PAGES.marika;
    pageName = 'marika';
  } else if (pathname.startsWith('/ziva')) {
    pageConfig = PROTECTED_PAGES.ziva;
    pageName = 'ziva';
  } else if (pathname.startsWith('/intern')) {
    pageConfig = PROTECTED_PAGES.intern;
    pageName = 'intern';
  } else if (pathname.startsWith('/cfo')) {
    pageConfig = PROTECTED_PAGES.cfo;
    pageName = 'cfo';
  } else if (pathname.startsWith('/shirene')) {
    pageConfig = PROTECTED_PAGES.shirene;
    pageName = 'shirene';
  }

  // Not a protected route
  if (!pageConfig) {
    return NextResponse.next();
  }

  // Check if user is already authenticated via cookie
  const authCookie = request.cookies.get(pageConfig.cookieName);
  if (authCookie?.value === 'authenticated') {
    return NextResponse.next();
  }

  // Check if password is being submitted
  const submittedPassword = searchParams.get('password');
  if (submittedPassword === pageConfig.password) {
    // Set authentication cookie and redirect to clean URL
    const cleanUrl = new URL(pathname, request.url);
    const response = NextResponse.redirect(cleanUrl);

    // Set cookie with domain that works for both www and non-www
    response.cookies.set(pageConfig.cookieName, 'authenticated', {
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
  const loginUrl = new URL(pageConfig.loginPath, request.url);
  if (pathname !== pageConfig.loginPath) {
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/colleen/:path*',
    '/jermaine/:path*',
    '/private/:path*',
    '/working/:path*',
    '/clubhopper/:path*',
    '/shiriru/:path*',
    '/marika/:path*',
    '/ziva/:path*',
    '/intern/:path*',
    '/cfo/:path*',
    '/shirene/:path*',
  ],
};
