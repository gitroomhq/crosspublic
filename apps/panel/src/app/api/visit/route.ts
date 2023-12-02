// import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server'
import { fetchBackend } from "@meetfaq/helpers/src/fetchObject/custom.fetch.backend";

export async function GET(request: NextRequest) {
  const auth = request.cookies.get('auth')?.value;
  const data = await (await fetchBackend('/settings', {
    headers: {
      auth,
      'Content-Type': 'application/json',
    },
    cache: 'no-cache'
  })).json();

  if (data.domains.length) {
    return Response.redirect('https://' + data.domains[0].domain);
  }

  const url = new URL(process.env.TENANTS_URL!);

  const newURL = url.protocol + '//' + data.subDomain + '.' + new URL(process.env.TENANTS_URL!).host;
  return Response.redirect(new URL('/', newURL));
}
