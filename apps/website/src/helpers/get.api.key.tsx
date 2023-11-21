import {headers} from "next/headers";
import {customFetchBackend} from "@meetqa/helpers/src/fetchObject/custom.fetch.backend";
import * as process from "process";

export const getOrg = (url: string) => {
  const frontEndUrl = new URL(process.env.FRONTEND_URL!).host;
  if (url.indexOf(frontEndUrl) > -1) {
    const subDomain = url.match(/(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/i);
    if (subDomain) {
      return {subdomain: subDomain[1]};
    }
    return {subdomain: 'testserver'};
  }

  return {domain: new URL(url).host};
}

export const publicRequestFetch = async () => {
  const url = headers().get('url');
  const getDomainSubdomain = getOrg(url as string);
  const {data: {apiKey}} = await customFetchBackend().get(
    `/public/organization?${new URLSearchParams(getDomainSubdomain as any).toString()}`,
    {cache: 'force-cache', next: {tags: [getDomainSubdomain.domain || getDomainSubdomain.subdomain || '']}}
  );

  return {request: customFetchBackend(undefined, {apikey: apiKey, serverkey: process.env.BACKEND_TOKEN_PROTECTOR}), tags: getDomainSubdomain.domain || getDomainSubdomain.subdomain || ''};
}
