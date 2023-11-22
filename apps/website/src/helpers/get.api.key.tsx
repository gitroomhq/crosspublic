import {customFetchBackend} from "@meetqa/helpers/src/fetchObject/custom.fetch.backend";
import * as process from "process";

function isSubdomain(url: string) {
  // Remove protocols, paths, queries, and fragments
  const domain = url.replace(/(https?:\/\/)?(www\.)?/, '').split(/[/?#]/)[0];

  // Split the domain by dots and check if there are at least 3 parts (e.g., sub.domain.com)
  const parts = domain.split('.');
  return parts.length > 2;
}

export const publicRequestFetch = async (domain: string) => {
  const getDomainSubdomain = isSubdomain(domain) ? {subdomain: domain.split('.')[0].replace('www', '')} : {domain};
  const {data: {apiKey}} = await customFetchBackend().get(
    `/public/organization?${new URLSearchParams(getDomainSubdomain as never).toString()}`,
    {cache: 'force-cache'}
  );

  return {request: customFetchBackend(undefined, {apikey: apiKey, serverkey: process.env.BACKEND_TOKEN_PROTECTOR})};
}
