import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {fetchBackend} from "@meetqa/helpers/src/fetchObject/custom.fetch.backend";
import {removeSubdomain} from "@meetqa/helpers/src/subdomain/subdomain.management";

export const getOrg = (url: string) => {
  const frontEndUrl = new URL(process.env.MARKETING_WEBSITE_URL!).host;
  if (url.indexOf(frontEndUrl) > -1) {
    const host = new URL(url).hostname;
    return host?.split('.')?.[0] || 'testserver';
  }

  return new URL(url).host.split(':')[0];
}

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const nextUrl = request.nextUrl;
  const protocol = nextUrl.protocol;
  const searchParams = nextUrl.searchParams.toString();
  const path = `${nextUrl.pathname}${
    searchParams.length > 0 ? `?${searchParams}` : ""
  }`;

  // The real host address
  const realHost = `${protocol}//` + (request.headers.get('x-forwarded-host') || request.headers.get('host')!);

  // if it's the dashboard, but it's on the root, redirect it to the dashboard
  if (nextUrl.href.indexOf('/dashboard') == -1 && realHost.indexOf(process.env.FRONTEND_URL!) > -1) {
    return NextResponse.redirect(new URL('/dashboard', nextUrl.href));
  }

  // if it's not the dashboard, then it's the customer website
  if (nextUrl.href.indexOf('/dashboard') == -1) {
    const getCustomer = getOrg(realHost);
    return NextResponse.rewrite(new URL(`/customers/${getCustomer}${path === "/" ? "" : path}`, request.url));
  }

  // if it's the dashboard, but the wrong domain, get a redirect
  if (realHost.indexOf(process.env.FRONTEND_URL!) == -1) {
    return NextResponse.redirect(new URL('/', nextUrl.href));
  }

  // if it's the dashboard, authenticate the user
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

