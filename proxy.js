export function proxy(request) {
  const session = request.cookies.get('session_user_id')?.value;
  const { pathname } = request.nextUrl;

  if (!session && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  return NextResponse.next();
}