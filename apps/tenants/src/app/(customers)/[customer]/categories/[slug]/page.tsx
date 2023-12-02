import {publicRequestFetch} from "@meetfaq/tenants/src/helpers/get.api.key";
import {Faq} from "@prisma/client";
import Link from "next/link";
import {Suspense} from "react";
import {ClaimThisPageComponent} from "@meetfaq/tenants/src/components/claim/claim.this.page.component";
import { Metadata, ResolvingMetadata } from "next";
export const dynamic = 'force-static';

type Props = {
  params: { customer: string, slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const {customer, slug} = params;
  const {name, request, tags} = await publicRequestFetch(customer);
  const {data} = await request.get(`/public/categories/${slug}/faqs?c=${customer}`, {cache: 'force-cache', next: {tags: [tags]}});

  return {
    title: name + ' FAQ - ' + data.category.name,
  }
}

export default async function Page({params: {slug, customer}}: {params: {slug: string, customer: string}}) {
  const {tags, request} = await publicRequestFetch(customer);
  const {data} = await request.get(`/public/categories/${slug}/faqs?c=${customer}`, {cache: 'force-cache', next: {tags: [tags]}});

  if (!data) {
    return <ClaimThisPageComponent />
  }
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
                className="border border-gray rounded-container p-5 shadow-lg hover:shadow-xl transition-all secondaryColor">
            <div className="font-bold">
              {faq.title}
            </div>
          </Link>
        ))}
      </div>
    </Suspense>
  )
}

