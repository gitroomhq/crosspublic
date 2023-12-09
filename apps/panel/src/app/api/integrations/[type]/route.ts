import { NextRequest } from 'next/server'
import {fetchBackend} from "@crosspublic/helpers/src/fetchObject/custom.fetch.backend";

export async function GET(request: NextRequest, context: {params: {type: string}}) {
  const auth = request.cookies.get('auth')?.value;
  const information = Object.fromEntries(new URLSearchParams(request.nextUrl.searchParams));

  await fetchBackend('/integrations', {
    method: 'POST',
    headers: {
      auth,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: context.params.type,
      information: {
        ...information,
        __type: context.params.type
      }
    }),
    cache: 'no-cache'
  });

  return Response.redirect(new URL('/integrations', request.url));
}
