import {publicRequestFetch} from "@meetqa/website/src/helpers/get.api.key";
import {Faq} from "@prisma/client";
import Link from "next/link";
import {Suspense} from "react";
export const dynamic = 'force-static';

export default async function Page({params: {slug, customer}}: {params: {slug: string, customer: string}}) {
  const {request} = await publicRequestFetch(customer);
  const {data} = await request.get(`/public/categories/${slug}/faqs`);
  return (
    <Suspense>
      <div className="flex flex-col gap-6">
        <div className="text-sm flex gap-2">
          <Link href="/">Home</Link>
        </div>
        <h1 className="text-xl font-bold">{data.category.name}</h1>
        {data.faq.map((faq: Faq & {slug: string}) => (
          <Link href={`/faq/${faq.slug}`}
                key={faq.id}
                className="border border-gray rounded-container p-5 shadow-lg hover:shadow-xl transition-all">
            <div className="font-bold">
              {faq.title}
            </div>
          </Link>
        ))}
      </div>
    </Suspense>
  )
}

