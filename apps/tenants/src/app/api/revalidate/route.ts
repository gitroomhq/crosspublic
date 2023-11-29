// import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server'
import {revalidateTag} from "next/cache";

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (request.headers.get('serverkey') === process.env.BACKEND_TOKEN_PROTECTOR && body.name) {
    revalidateTag(body.name);
  }
  return Response.json({ revalidated: true, now: Date.now() });
}
