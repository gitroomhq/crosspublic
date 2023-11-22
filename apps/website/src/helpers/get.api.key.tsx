import {customFetchBackend} from "@meetqa/helpers/src/fetchObject/custom.fetch.backend";
import * as process from "process";

export const publicRequestFetch = async (domain: string) => {
  const getDomainSubdomain = domain.indexOf('.') ? {subdomain: domain.split('.')[0].replace('www', '')} : {domain};
  const {data: {apiKey}} = await customFetchBackend().get(
    `/public/organization?${new URLSearchParams(getDomainSubdomain as never).toString()}`,
    {cache: 'force-cache'}
  );

  return {request: customFetchBackend(undefined, {apikey: apiKey, serverkey: process.env.BACKEND_TOKEN_PROTECTOR})};
}
