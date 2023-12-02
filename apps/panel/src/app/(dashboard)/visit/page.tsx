// import { revalidatePath } from 'next/cache';
import { customFetchBackend } from "@meetfaq/helpers/src/fetchObject/custom.fetch.backend";
import { userToken } from "@meetfaq/panel/src/components/utils/user.token";
import { redirect } from "next/navigation";

export default async function Page() {
  const auth = userToken()
  if (!auth) {
    return <></>
  }

  const {data} = await customFetchBackend(auth).get('/settings');

  if (data?.domains?.length) {
    return redirect('https://' + data.domains[0].domain);
  }

  const url = new URL(process.env.TENANTS_URL!);

  const newURL = url.protocol + '//' + data.subDomain + '.' + new URL(process.env.TENANTS_URL!).host;
  return redirect(new URL('/', newURL).toString());
}
