import {publicRequestFetch} from "@meetqa/website/src/helpers/get.api.key";
import {Category, Faq} from "@prisma/client";
import {textToMarkdown} from "@meetqa/website/src/helpers/text.to.markdown";
export default async function Page({params: {slug}}: {params: {slug: string}}) {
  const {request, tags} = await publicRequestFetch();
  const {data}: {data: Faq & {categories: [{category: Category}]}} = await request.get(`/public/faq/${slug}`, {cache: 'force-cache', next: {tags: [tags]}});
  return (
    <div className="flex flex-col gap-6">
      <div className="text-sm">
        {data.categories[0].category.name}
      </div>
      <div>
        <h1 className="text-xl font-bold">{data.title}</h1>
      </div>
        <div className="border border-gray rounded-container p-5 shadow-lg hover:shadow-xl transition-all">
          <div dangerouslySetInnerHTML={{__html: textToMarkdown(data.content)}} />
        </div>
    </div>
  )
}
