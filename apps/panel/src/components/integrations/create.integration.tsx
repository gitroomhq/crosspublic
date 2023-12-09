"use client";

import {wrapModal} from "@crosspublic/panel/src/helpers/wrap.modal";
import {useCallback} from "react";
import {useFetch} from "@crosspublic/panel/src/helpers/fetch.context";
import {useRouter} from "next/navigation";

export const CreateIntegration = wrapModal(() => {
  const customFetch = useFetch();
  const router = useRouter();

  const addIntegration = useCallback((integration: {type: string}) => async () => {
    try {
      const {data} = await customFetch.get(`/integrations/${integration.type}/add`);
      router.push(data.url);
    }
    catch (err) {

    }
  }, []);

  return (
    <div className="w-[500px]">
      <h2 className="text-center text-2xl mb-3">Select an integration to add</h2>
      <div className="flex justify-center gap-3">
        <div
          onClick={addIntegration({type: 'discord'})}
          className="pointer hover:before:absolute hover:before:rounded-2xl hover:before:bg-pink/20 hover:before:left-0 hover:before:top-0 hover:before:h-full hover:before:w-full relative flex flex-col items-center border-gray border p-2 rounded-2xl gap-3"
        >
          <img
            src="/integrations/discord.png"
            alt="Discord"
            className="w-[100px] h-[100px] rounded-2xl"
          />
          <div className="font-bold">Discord</div>
        </div>

        <div
          onClick={addIntegration({type: 'slack'})}
          className="pointer hover:before:absolute hover:before:rounded-2xl hover:before:bg-pink/20 hover:before:left-0 hover:before:top-0 hover:before:h-full hover:before:w-full relative flex flex-col items-center border-gray border p-2 rounded-2xl gap-3"
        >
          <img
            src="/integrations/slack.png"
            alt="Slack"
            className="w-[100px] h-[100px] rounded-2xl"
          />
          <div className="font-bold">Slack</div>
        </div>
      </div>
    </div>
  );
});
