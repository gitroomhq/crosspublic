import { CustomFetchBackendInterface } from '@crosspublic/helpers/src/fetchObject/custom.fetch.backend';
import { SlackShortcut } from "@slack/bolt";
import { WebClient } from "@slack/web-api";

export interface CallBackInterface {
  request: CustomFetchBackendInterface;
  payload: SlackShortcut;
  respond: (test: string, messageId?: string) => Promise<void>;
  client: WebClient;
}

export interface CommandInterface {
  name: string;
  callback: (props: CallBackInterface) => Promise<void>;
}
