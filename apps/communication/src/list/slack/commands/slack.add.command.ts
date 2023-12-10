import { Injectable } from '@nestjs/common';
import { App, SlackShortcut, SlackShortcutMiddlewareArgs } from '@slack/bolt';
import { StringIndexed } from '@slack/bolt/dist/types/helpers';
import { WebClient } from '@slack/web-api';
import { ProviderAddInterface } from '@crosspublic/communication/src/create.provider';

@Injectable()
export class SlackAddCommand
  implements
    ProviderAddInterface<
      App<StringIndexed>,
      SlackShortcutMiddlewareArgs<SlackShortcut> & { client: WebClient }
    >
{
  async handle(
    setup: App<StringIndexed>,
    params: SlackShortcutMiddlewareArgs<SlackShortcut> & { client: WebClient }
  ): Promise<{
    reference: string;
    messages: Array<{ name: string; internalId: string; message: string }>;
  }> {
    const { payload, client } = params;
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (!payload?.message?.thread_ts) {
        await params.client.chat.postEphemeral({
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          channel: params.shortcut.channel.id,
          user: params.payload.user.id,
          text: 'Add command can work only on Threads',
        });
        return ;
      }
      const replies = await client.conversations.replies({
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        ts: payload.message.thread_ts, // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        channel: payload.channel.id,
      });

      const reference = payload.callback_id;
      const messages = replies.messages
        .map((p) => ({
          name: p.user,
          internalId: p.ts,
          message: p.text,
          type: p.display_as_bot,
        }))
        .filter((f) => !f.type);

      return { messages, reference };
    } catch (err) {
      if (err.data.error === 'not_in_channel') {
        await params.client.chat.postMessage({
          channel: payload.user.id,
          text: 'Please add the bot to the channel to use the add command',
        });
      }
    }
  }
}
