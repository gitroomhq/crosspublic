import {Block} from "@meetfaq/panel/src/components/utils/block";
import Domains from "@meetfaq/panel/src/components/settings/domains/domains";
import {SubdomainComponent} from "@meetfaq/panel/src/components/settings/subdomain.component";
import {Metadata} from "next";
import {wrapMeta} from "@meetfaq/panel/src/helpers/wrap.meta";
import {ApiComponent} from "@meetfaq/panel/src/components/settings/api.component";

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
