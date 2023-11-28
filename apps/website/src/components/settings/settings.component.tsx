import {Block} from "@meetfaq/website/src/components/utils/block";
import Domains from "@meetfaq/website/src/components/settings/domains/domains";
import {SubdomainComponent} from "@meetfaq/website/src/components/settings/subdomain.component";
import {Metadata} from "next";
import {wrapMeta} from "@meetfaq/website/src/helpers/wrap.meta";
import {ApiComponent} from "@meetfaq/website/src/components/settings/api.component";

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
