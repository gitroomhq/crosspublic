"use client";

import {wrapMeta} from "@meetfaq/panel/src/helpers/wrap.meta";
import {Block} from "@meetfaq/panel/src/components/utils/block";
import {Integrations} from '@prisma/client';
import { Button } from "../utils/button";
import {CreateIntegration} from "@meetfaq/panel/src/components/integrations/create.integration";
import {useCallback} from "react";
import {deleteDialog} from "@meetfaq/panel/src/helpers/delete.dialog";
import {useFetch} from "@meetfaq/panel/src/helpers/fetch.context";
import {useRouter} from "next/navigation";

export const IntegrationComponent = wrapMeta<{integrations: Array<Integrations & {_count: {users: number}}>}>((props) => {
  const {integrations} = props;
  const customFetch = useFetch();
  const router = useRouter();
  const deleteServer = useCallback((integration: Integrations) => async () => {
    try {
      await deleteDialog('All users will be removed from this server. Are you sure you want to delete this server?');
      await customFetch.delete(`/integrations/${integration.id}`);
      router.refresh();
    }
    catch (err) {
      return;
    }
  }, []);
  return (
    <>
      <div className="flex justify-end mb-3">
        <Button modal={{
          component: CreateIntegration
        }}>Add Integration</Button>
      </div>
      <Block>
        <div className="flex">
        {!integrations.length ? (
          <div className="text-center text-gray-500">No integrations</div>
        ): integrations.map((integration) => (
          <div
            key={integration.id}
            className="pointer relative flex flex-col items-center border-gray border p-2 rounded-2xl gap-3"
          >
            <img
              src="/integrations/discord.png"
              alt="Discord"
              className="w-[100px] h-[100px] rounded-2xl"
            />
            <div className="font-bold">
              {integration.notes}
            </div>
            <div className="text-sm">
              Total users: {integration._count.users}
            </div>
            <div>
              <Button onClick={deleteServer(integration)} size="small">Delete Server</Button>
            </div>
          </div>
        ))}
        </div>
      </Block>
    </>
  )
});
