import {Metadata} from "next";
import {StyleComponent} from "@crosspublic/panel/src/components/style/style.component";
import {customFetchBackend} from "@crosspublic/helpers/src/fetchObject/custom.fetch.backend";
import {userToken} from "@crosspublic/panel/src/components/utils/user.token";

export const metadata: Metadata = {
  title: 'Style',
  description: '',
}

export default async function Style() {
  const {data: styles} = await customFetchBackend(userToken()).get(`/styles`);
  return (
    <StyleComponent metadata={metadata} styles={styles} />
  );
}
