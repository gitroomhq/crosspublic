import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {fetchBackend} from "@meetfaq/helpers/src/fetchObject/custom.fetch.backend";
import {removeSubdomain} from "@meetfaq/helpers/src/subdomain/subdomain.management";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl;

  if (nextUrl.href.indexOf('/auth') > -1) {
    return NextResponse.next();
  }

  const cookies = request.cookies.get('auth')?.value!;
  const auth = nextUrl.searchParams.get('auth')!;
  if (auth || cookies) {
    const fetch = await (await fetchBackend('/users/self', {
      headers: {
        auth: auth || cookies,
        ContentType: 'application/json',
        Accept: 'application/json'
      }
    })).json();

    if (fetch?.message === 'Unauthorized') {
      return NextResponse.redirect(`${process.env.FRONTEND_URL}/login`);
    }

    const response = NextResponse.next({
      headers: {
        token:  auth || cookies,
        pricing: String(!!process.env.PAYMENT_PUBLIC_KEY),
        user: JSON.stringify(fetch)
      }
    });

    response.cookies.set('auth', auth || cookies, {
      path: '/',
      sameSite: false,
      // secure: true,
      httpOnly: true,
      domain: '.' + new URL(removeSubdomain(process.env.FRONTEND_URL!)).hostname
    });

    return response;
  }

  return NextResponse.redirect(`${process.env.FRONTEND_URL}/login`);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
}

