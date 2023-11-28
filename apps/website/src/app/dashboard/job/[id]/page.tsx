import {customFetchBackend} from "@meetfaq/helpers/src/fetchObject/custom.fetch.backend";
import {userToken} from "@meetfaq/website/src/components/utils/user.token";
import {JobComponent} from "@meetfaq/website/src/components/jobs/job.component";
import {Metadata} from "next";
import {Suspense} from "react";

export const metadata: Metadata = {
  title: 'Process a new job',
  description: '',
}

export default async function Job({ params }: { params: { id: string } }) {
  const {data: messages}   = await customFetchBackend(userToken()).get(`/faq/jobs/${params?.id}`);
  const {data: categories} = await customFetchBackend(userToken()).get(`/categories`);

    return (
      <Suspense>
        <JobComponent messages={messages} categories={categories} id={params.id} metadata={metadata} />
      </Suspense>
    );
}
