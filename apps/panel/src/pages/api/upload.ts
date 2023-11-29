import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import {NextApiRequest} from "next";

export const runtime = "edge";

export default async function handler(req: NextApiRequest) {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
        return new Response(
            "Missing BLOB_READ_WRITE_TOKEN. Don't forget to add that to your .env file.",
            {
                status: 401,
            },
        );
    }

    const file = req.body || "";
    // @ts-ignore
    const filename = req?.headers?.get("x-vercel-filename") || "file.txt";

    // @ts-ignore
    const contentType = req?.headers?.get("content-type") || "text/plain";
    const fileType = `.${contentType.split("/")[1]}`;

    // construct final filename based on content-type if not provided
    const finalName = filename.includes(fileType)
        ? filename
        : `${filename}${fileType}`;
    const blob = await put(finalName, file, {
        contentType,
        access: "public",
    });

    return NextResponse.json(blob);
}
