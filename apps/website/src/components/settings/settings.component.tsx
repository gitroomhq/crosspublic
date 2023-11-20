import {Block} from "@meetqa/website/src/components/utils/block";
import {FC} from "react";
import Domains from "@meetqa/website/src/components/settings/domains/domains";
import {SubdomainComponent} from "@meetqa/website/src/components/settings/subdomain.component";
import {Metadata} from "next";
import {wrapMeta} from "@meetqa/website/src/helpers/wrap.meta";

export const metadata: Metadata = {
    title: 'Settings',
    description: '',
}

export const SettingsComponent = wrapMeta<{subDomain: string, domains: any[]}>((props) => {
  const {subDomain, domains} = props;
  return (
    <Block>
      <SubdomainComponent subDomain={subDomain} />
      <Domains domains={domains} />
    </Block>
  )
});
