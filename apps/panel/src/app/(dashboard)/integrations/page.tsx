import {Metadata} from "next";
import {IntegrationComponent} from "@meetfaq/panel/src/components/integrations/integration.component";
import {customFetchBackend} from "@meetfaq/helpers/src/fetchObject/custom.fetch.backend";
import {userToken} from "@meetfaq/panel/src/components/utils/user.token";

export const metadata: Metadata = {
  title: 'Integrations',
  description: '',
}

export default async function Style() {
  const {data: integrations} = await customFetchBackend(userToken()).get(`/integrations`);
  return (
    <IntegrationComponent metadata={metadata} integrations={integrations}  />
  );
}
