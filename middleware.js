import { NextResponse } from 'next/server'

const PUBLIC_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password'
]

export function middleware(request) {
  const token = request.cookies.get('auth-token')?.value
  const isPublicRoute = PUBLIC_ROUTES.includes(request.nextUrl.pathname)

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}