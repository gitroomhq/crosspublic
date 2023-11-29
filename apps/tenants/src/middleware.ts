import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const getOrg = (url: string) => {
  const frontEndUrl = new URL(process.env.TENANTS_URL!).host;
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

  const getCustomer = getOrg(realHost);
  return NextResponse.rewrite(new URL(`/${getCustomer}${path === "/" ? "" : path}`, request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)",
}

