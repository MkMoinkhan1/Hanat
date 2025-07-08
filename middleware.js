import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// Routes without locale prefix
const PUBLIC_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/check-email'
];
const intlMiddleware = createMiddleware(routing);

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  const locale = pathname.split('/')[1] 


  const pathWithoutLocale = pathname.replace(/^\/(en|ar)/, '');
  const token = request.cookies.get('auth-token')?.value;
  const isPublicRoute = PUBLIC_ROUTES.includes(pathWithoutLocale);

  if (!token && !isPublicRoute) {
      return NextResponse.redirect(new URL(`/${locale || 'en'}/auth/login`, request.url));

  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL(`/${locale}/admin/dashboard`, request.url));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
