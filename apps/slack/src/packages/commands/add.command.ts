import { CallBackInterface, CommandInterface } from "@crosspublic/slack/src/packages/commands/command.interface";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AddCommand implements CommandInterface {
  name = 'add';

  async callback(props: CallBackInterface): Promise<void> {

    const replies = await props.client.conversations.replies({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      ts: props.payload.message.thread_ts,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      channel: props.payload.channel.id,
    });

    console.log(JSON.stringify(replies, null, 2));
  }
}
