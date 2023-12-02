"use client";

import algoliasearch from 'algoliasearch/lite';
import { createBrowserLocalStorageCache } from '@algolia/cache-browser-local-storage';
import {Highlight, InstantSearch, SearchBox, useHits, useSearchBox} from 'react-instantsearch';
import * as process from "process";
import {FC, useState} from "react";
import Link from "next/link";

const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!, process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!, {
  responsesCache: createBrowserLocalStorageCache({
    key: 'algolia-responses',
  }),
});

export const RenderComponent: FC<{focus: boolean}> = (props) => {
  const {focus} = props;
  const { hits, results } = useHits<{description: string, slug: string, title: string}>();
  const { clear } = useSearchBox();
  if (hits.length === 0 || (results?.query?.length || 0) <= 2) {
    return focus && <div className="z-[1] fixed bg-black/20 w-full h-full left-0 top-0 show-focus" onClick={clear} />;
  }
  return (
    <>
    <div className="z-[1] fixed bg-black/20 w-full h-full left-0 top-0" onClick={clear} />
    <div className="z-[2] gap-2 bg-white absolute p-5 w-full left-0 rounded-container flex flex-col drop-shadow-2xl">
      {hits.map((hit) => (
        <Link onClick={() => clear()} href={`/faq/` + hit.slug} key={hit.slug} className="rounded-container border border-gray flex flex-col p-3 group hover:border-primary">
          <div className="font-bold group-hover:text-primary"><Highlight hit={hit} attribute="title" /></div>
          <div className="text-sm"><Highlight hit={hit} attribute="description" /></div>
        </Link>
      ))}
    </div>
    </>
  )
}
export const SearchComponent: FC<{org: string}> = (props) => {
  const {org} = props;
  const [focus, setFocus] = useState(false);

  return (
    <div className="relative group text-black rounded-container w-full h-[60px] bg-white/20 outline-none px-5 transition-all border border-black/20">
      <InstantSearch searchClient={searchClient} indexName={org}>
          <SearchBox
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            placeholder="Search FAQ..."
            className="[&>form>input]:z-[2] [&>form>input]:rounded-container [&>form>input]:outline-none [&>form>button[type=reset]]:hidden [&>form>input]:px-5 h-full flex [&>form]:flex-1 [&>form>input]:w-full [&>form>input]:h-full [&>form]:flex [&>form]:flex-row-reverse"
          />
          <RenderComponent focus={focus} />
      </InstantSearch>
    </div>
  )
}
