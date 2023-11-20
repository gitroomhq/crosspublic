import {BillingComponent} from "@meetqa/website/src/components/billing/billing.component";
import {Metadata} from "next";
import {userToken} from "@meetqa/website/src/components/utils/user.token";
import {customFetchBackend} from "@meetqa/helpers/src/axios/custom.fetch.backend";

export const metadata: Metadata = {
  title: 'Billing',
  description: '',
}

export default async function Billing({searchParams}: {searchParams?: {check?: string}}) {
  const {data: billing} = await customFetchBackend(userToken()).get('/billing');

  return (
    <BillingComponent metadata={metadata} billing={billing} check={searchParams?.check} />
  );
}
