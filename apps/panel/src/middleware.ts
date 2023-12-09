import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {removeSubdomain} from "@crosspublic/helpers/src/subdomain/subdomain.management";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl;
  const authCookie = request.cookies.get('auth');

  // If the URL is logout, delete the cookie and redirect to login
  if (nextUrl.href.indexOf('/auth/logout') > -1) {
    const response = NextResponse.redirect(new URL('/auth/login', nextUrl.href));
    response.cookies.set('auth', '', {
      path: '/',
      sameSite: false,
      httpOnly: true,
      maxAge: -1,
      domain: '.' + new URL(removeSubdomain(process.env.FRONTEND_URL!)).hostname
    });
    return response;
  }

  // If the url is /auth and the cookie exists, redirect to /
  if (nextUrl.href.indexOf('/auth') > -1 && authCookie) {
    return NextResponse.redirect(new URL('/', nextUrl.href));
  }

  // if there an auth searchParam, set the cookie
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

  return NextResponse.next({
    headers: {
      pricing: String(!!process.env.PAYMENT_PUBLIC_KEY)
    }
  });
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
}

