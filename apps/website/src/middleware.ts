import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {fetchBackend} from "@meetqa/helpers/src/fetchObject/custom.fetch.backend";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (request.nextUrl.href.indexOf('/dashboard') == -1) {
    return NextResponse.next({
      headers: {
        url: request.headers.get('x-forwarded-host') || request.headers.get('host')!
      }
    });
  }
  const cookies = request.cookies.get('auth')?.value!;
  const auth = request.nextUrl.searchParams.get('auth')!;
  if (auth || cookies) {
    const fetch = await (await fetchBackend('/users/self', {
      headers: {
        auth: auth || cookies,
        ContentType: 'application/json',
        Accept: 'application/json'
      }
    })).json();

    const response = NextResponse.next({
      headers: {
        token:  auth || cookies,
        user: JSON.stringify(fetch)
      }
    });

    response.cookies.set('auth', auth || cookies, {
      path: '/',
      sameSite: false,
      // secure: true,
      httpOnly: true,
      domain: '.' + new URL(process.env.FRONTEND_URL!).hostname
    });

    return response;
  }

  return NextResponse.redirect(`${process.env.FRONTEND_URL}/not-logged`);

  // return NextResponse.redirect(new URL('/home', request.url))
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/((?!api|_next/static|_next/image|favicon.ico).*)',
}

