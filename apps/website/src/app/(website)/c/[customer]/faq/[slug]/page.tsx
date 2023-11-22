import {publicRequestFetch} from "@meetqa/website/src/helpers/get.api.key";
import {Category, Faq} from "@prisma/client";
import {textToMarkdown} from "@meetqa/website/src/helpers/text.to.markdown";
import {AfterHighlight} from "@meetqa/website/src/components/utils/after.highlight";
import Link from "next/link";
import {Suspense} from "react";
export const dynamic = 'force-static';

export default async function Page({params: {slug, customer}}: {params: {slug: string, customer: string}}) {
  const {tags, request} = await publicRequestFetch(customer);
  const {data}: {data: Faq & {categories: [{category: Category & {slug: string}}]}} = await request.get(`/public/faq/${slug}?c=${customer}`, {cache: 'force-cache', next: {tags: [tags]}});
  return (
    <Suspense>
      <div className="flex flex-col gap-6">
        <div className="text-sm flex gap-2">
          <Link href="/">Home</Link>
          <div>»</div>
          <Link href={`/categories/${data.categories[0].category.slug}`}>{data.categories[0].category.name}</Link>
        </div>
        <div>
          <h1 className="text-xl font-bold">{data.title}</h1>
        </div>
          <div className="border border-gray rounded-container p-5 shadow-lg">
            <div id="content" className="gap-4 flex flex-col" dangerouslySetInnerHTML={{__html: textToMarkdown(data.content)}} />
            <AfterHighlight id="content" />
          </div>
      </div>
    </Suspense>
  )
}
