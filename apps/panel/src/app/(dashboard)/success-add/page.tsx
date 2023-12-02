import {Metadata} from "next";
import {Block} from "@meetfaq/panel/src/components/utils/block";
import {wrapMeta} from "@meetfaq/panel/src/helpers/wrap.meta";

export const metadata: Metadata = {
  title: 'You are in',
  description: '',
}

const YouAreIn = wrapMeta(() => {
  return (
    <Block>
      You have successfully added to the organization.
    </Block>
  )
})

export default async function Settings() {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
      <YouAreIn metadata={metadata} />
  );
}
