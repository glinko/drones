import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

// Define protected routes
const protectedRoutes = ['/dashboard', '/admin']
const authRoutes = ['/auth/login', '/auth/register']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('auth-token')?.value

  // Check if the route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route))

  // If accessing protected route without token, redirect to login
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If accessing auth routes with valid token, redirect to dashboard
  if (isAuthRoute && token) {
    const payload = verifyToken(token)
    if (payload) {
      const redirectUrl = new URL('/dashboard', request.url)
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Verify token for protected routes
  if (isProtectedRoute && token) {
    const payload = verifyToken(token)
    if (!payload) {
      const loginUrl = new URL('/auth/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Check admin routes
    if (pathname.startsWith('/admin') && payload.role !== 'ADMIN' && payload.role !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // Check super admin routes
    if (pathname.startsWith('/admin/super') && payload.role !== 'SUPER_ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
