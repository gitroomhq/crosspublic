import {customFetchBackend, CustomFetchBackendInterface} from "@crosspublic/helpers/src/fetchObject/custom.fetch.backend";
import * as process from "process";

export const publicRequestFetch = async (domain: string): Promise<{redirect?: false | string, id: string, tags: string, name: string, request: CustomFetchBackendInterface}> => {
  const getDomainSubdomain = domain.indexOf('.') ? {subdomain: domain.split('.')[0].replace('www', '')} : {domain};
  const {data: {apiKey, id, name}} = await customFetchBackend().get(
    `/public/organization?${new URLSearchParams(getDomainSubdomain as never).toString()}`,
    {cache: 'force-cache', next: {tags: [domain]}, headers: {serverkey: process.env.BACKEND_TOKEN_PROTECTOR!}}
  );

  if (!apiKey) {
    return {tags: false, request: false} as any;
  }

  const redirect = apiKey.indexOf('http') > -1 ? apiKey : false;

  return {redirect, id, name, tags: getDomainSubdomain?.domain || getDomainSubdomain?.subdomain || '', request: customFetchBackend(undefined, {apikey: apiKey, serverkey: process.env.BACKEND_TOKEN_PROTECTOR, tags: [getDomainSubdomain?.domain || getDomainSubdomain?.subdomain || '']})};
}
