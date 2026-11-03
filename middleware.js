import { NextResponse } from 'next/server';

export function middleware(request) {
  const session = request.cookies.get('session_user_id')?.value;
  const { pathname } = request.nextUrl;

  // 1. Jika belum login tapi mencoba akses /admin atau /profil -> arahkan ke /login
  if (!session && (pathname.startsWith('/admin') || pathname.startsWith('/profil'))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. Jika sudah login tapi membuka /login atau /register -> arahkan ke Home (/)
  if (session && (pathname === '/login' || pathname === '/register')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/profil/:path*', '/login', '/register'],
};

