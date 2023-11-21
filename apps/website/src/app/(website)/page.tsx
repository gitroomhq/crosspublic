import {publicRequestFetch} from "@meetqa/website/src/helpers/get.api.key";
import {Category} from "@prisma/client";
import {textToMarkdown} from "@meetqa/website/src/helpers/text.to.markdown";
import Link from "next/link";
export default async function Page() {
  const {request, tags} = await publicRequestFetch();
  const {data} = await request.get('/public/categories', {cache: 'force-cache', next: {tags: [tags]}});
    return (
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
    )
}
