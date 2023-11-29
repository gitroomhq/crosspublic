import {customFetchBackend} from "@meetfaq/helpers/src/fetchObject/custom.fetch.backend";
import dynamic from "next/dynamic";
import {userToken} from "@meetfaq/panel/src/components/utils/user.token";
import {Metadata} from "next";
const FaqComponent = dynamic(() => import('@meetfaq/panel/src/components/faqs/faq.component'), {ssr: false});

export const metadata: Metadata = {
  title: 'FAQ',
  description: '',
}

export default async function FAQs(props: any) {
  const {data} = await customFetchBackend(userToken()).get('/categories/faq');
  return (
      <FaqComponent metadata={metadata} categories={data} />
  );
}
