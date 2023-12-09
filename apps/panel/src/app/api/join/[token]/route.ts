// import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server'
import {customFetchBackend} from "@crosspublic/helpers/src/fetchObject/custom.fetch.backend";

export async function GET(request: NextRequest, context: {params: {token: string}}) {
  const cookie = request.cookies.get('auth')?.value;
  const {params: {token}} = context;

  if (cookie) {
    try {
      await customFetchBackend(cookie).post('/invite/add', {
        token
      });
    }
    catch (err) {}

    // member logged in
    return Response.redirect(new URL('/success-add', request.url));
  }

  return Response.redirect(new URL(`/auth/register/` + token, request.url));
}
