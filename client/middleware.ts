import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const session = request.cookies.get('session');

  if (!session || !session.value) {
    if (pathname.startsWith('/auth')) return NextResponse.next();
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Cookie: `session=${session?.value}`,
    },
  });

  if (response.status !== 200 && !pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  if (response.status === 200 && pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/',
};
