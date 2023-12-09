import {SettingsComponent} from "@crosspublic/panel/src/components/settings/settings.component";
import {customFetchBackend} from "@crosspublic/helpers/src/fetchObject/custom.fetch.backend";
import {userToken} from "@crosspublic/panel/src/components/utils/user.token";
import {Metadata} from "next";
import {Suspense} from "react";

export const metadata: Metadata = {
  title: 'Settings',
  description: '',
}

export default async function Settings() {
  const {data: settings} = await customFetchBackend(userToken()).get(`/settings`);
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
      <Suspense>
        <SettingsComponent
          apiKey={settings.apiKey}
          metadata={metadata}
          subDomain={settings.subDomain}
          domains={settings.domains}
        />
      </Suspense>
  );
}
