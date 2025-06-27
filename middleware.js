import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import path from 'path';

const PUBLIC_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password'
];

// locale-aware middleware for next-intl
const intlMiddleware = createMiddleware(routing);

export function middleware(request) {
  const token = request.cookies.get('auth-token')?.value;
  const pathname = request.nextUrl.pathname;
  // Strip locale using RegEx
  const cleanedPathname = pathname.replace(/^\/(en|ar)/, '');
  const isPublicRoute = PUBLIC_ROUTES.includes(cleanedPathname);

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/en/admin/dashboard', request.url));
  }

  // Run next-intl routing middleware
  return intlMiddleware(request);
}

// Match all non-static paths
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
  ]
};
