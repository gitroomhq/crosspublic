import {publicRequestFetch} from "@meetqa/website/src/helpers/get.api.key";
import {Category} from "@prisma/client";
import {textToMarkdown} from "@meetqa/website/src/helpers/text.to.markdown";
import Link from "next/link";
import {Suspense} from "react";

export const dynamic = 'force-static';

export default async function Page({params: {customer}} : {params: {customer: string}}) {
  const {tags, request} = await publicRequestFetch(customer);
  const {data} = await request.get(`/public/categories?c=${customer}`, {cache: 'force-cache', next: {tags: [tags]}});

  return (
    <Suspense>
      <div className="flex flex-col gap-6">
          {data.map((category: Category & {slug: string}) => (
            <Link href={`/categories/${category.slug}`}
                 key={category.id}
                 className="min-h-[126px] border border-gray rounded-container p-5 shadow-lg hover:shadow-xl transition-all">
                  <div className="font-bold mb-2">
                    {category.name}
                  </div>
                  <div dangerouslySetInnerHTML={{__html: textToMarkdown(category.description)}} />
            </Link>
          ))}
      </div>
    </Suspense>
  )
}
