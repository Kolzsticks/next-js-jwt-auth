// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Exclude API routes, Next.js internals, and static file requests
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next/') ||
    pathname.match(/\.(png|jpg|jpeg|gif)$/)
  ) {
    return NextResponse.next();
  }

  const currentUser = request.cookies.get('currentUser')?.value;

  // If the user is logged in and not on the dashboard, force redirect to /dashboard
  if (currentUser && !pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // If the user is not logged in and not on the login page, redirect to /login
  if (!currentUser && !pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Run middleware on every route
  matcher: ['/:path*'],
};
