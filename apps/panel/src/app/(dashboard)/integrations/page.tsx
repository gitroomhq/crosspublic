import {Metadata} from "next";
import {IntegrationComponent} from "@crosspublic/panel/src/components/integrations/integration.component";
import {customFetchBackend} from "@crosspublic/helpers/src/fetchObject/custom.fetch.backend";
import {userToken} from "@crosspublic/panel/src/components/utils/user.token";

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
