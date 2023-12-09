import {Block} from "@crosspublic/panel/src/components/utils/block";
import Domains from "@crosspublic/panel/src/components/settings/domains/domains";
import {SubdomainComponent} from "@crosspublic/panel/src/components/settings/subdomain.component";
import {Metadata} from "next";
import {wrapMeta} from "@crosspublic/panel/src/helpers/wrap.meta";
import {ApiComponent} from "@crosspublic/panel/src/components/settings/api.component";

export const metadata: Metadata = {
    title: 'Settings',
    description: '',
}

export const SettingsComponent = wrapMeta<{subDomain: string, domains: any[], apiKey: string}>((props) => {
  const {subDomain, domains, apiKey} = props;
  return (
    <Block>
      <SubdomainComponent subDomain={subDomain} />
      <Domains domains={domains} />
      {!!apiKey && <ApiComponent apiKey={apiKey} />}
    </Block>
  )
});
