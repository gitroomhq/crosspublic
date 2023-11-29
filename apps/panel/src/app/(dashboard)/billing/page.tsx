import {BillingComponent} from "@meetfaq/panel/src/components/billing/billing.component";
import {Metadata} from "next";
import {userToken} from "@meetfaq/panel/src/components/utils/user.token";
import {customFetchBackend} from "@meetfaq/helpers/src/fetchObject/custom.fetch.backend";
import {headers} from "next/dist/client/components/headers";
import {redirect} from "next/navigation";

export const metadata: Metadata = {
  title: 'Billing',
  description: '',
}

export default async function Billing({searchParams}: {searchParams?: {check?: string}}) {
  const {data: billing} = await customFetchBackend(userToken()).get('/billing');
  const pricing = Boolean(headers().get('pricing') === 'true');
  if (!pricing) {
    return redirect('/');
  }
  return (
    <BillingComponent metadata={metadata} billing={billing} check={searchParams?.check} />
  );
}
