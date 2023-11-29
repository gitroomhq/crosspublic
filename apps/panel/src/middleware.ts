import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {removeSubdomain} from "@meetfaq/helpers/src/subdomain/subdomain.management";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl;
  const authCookie = request.cookies.get('auth');

  if (nextUrl.href.indexOf('/auth/logout') > -1) {
    const response = NextResponse.redirect(new URL('/auth/login', nextUrl.href));
    response.cookies.delete('auth');
    return response;
  }

  if (nextUrl.href.indexOf('/auth') > -1 && authCookie) {
    return NextResponse.redirect(new URL('/', nextUrl.href));
  }

  const auth = nextUrl.searchParams.get('auth')!;
  if (auth) {
    const response = NextResponse.next({
      headers: {
        auth,
        pricing: String(!!process.env.PAYMENT_PUBLIC_KEY)
      },
    });

    response.cookies.set('auth', auth, {
      path: '/',
      sameSite: false,
      // secure: true,
      httpOnly: true,
      domain: '.' + new URL(removeSubdomain(process.env.FRONTEND_URL!)).hostname
    });

    return response;
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
}

