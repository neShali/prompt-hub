import { NextResponse, type NextRequest } from 'next/server';

const AUTH_COOKIE_KEY = 'prompt-hub-user';
const PROFILE_PREFIX = '/profile';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(PROFILE_PREFIX)) {
    return NextResponse.next();
  }

  const hasAuthCookie = Boolean(request.cookies.get(AUTH_COOKIE_KEY)?.value);

  if (hasAuthCookie) {
    return NextResponse.next();
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = '/login';
  loginUrl.searchParams.set('next', pathname);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/profile/:path*'],
};
