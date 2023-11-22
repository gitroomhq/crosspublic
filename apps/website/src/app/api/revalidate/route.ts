// import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server'
import {revalidatePath} from "next/cache";

export async function POST(request: NextRequest) {
  const body = await request.json();
  if (request.headers.get('serverkey') !== process.env.SERVER_KEY && body.name) {
    // @ts-ignore
    revalidatePath(`/c/${body.name}`, 'layout');
  }
  return Response.json({ revalidated: true, now: Date.now() });
}
