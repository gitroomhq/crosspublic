import { App, SlackShortcut, SlackShortcutMiddlewareArgs } from "@slack/bolt";
import { slackProps } from "@crosspublic/helpers/src/slack/slack.props";
import { fetchBackend } from "@crosspublic/helpers/src/fetchObject/custom.fetch.backend";
import { SlackAddCommand } from "@crosspublic/communication/src/list/slack/commands/slack.add.command";
import { createProvider } from "@crosspublic/communication/src/create.provider";
import { WebClient } from "@slack/web-api";
import { SlackInviteCommand } from "@crosspublic/communication/src/list/slack/commands/slack.invite.command";

export const slackProvider = createProvider({
  type: 'SLACK',
  setup: () => {
    return new App({
      ...slackProps,
      ...!process.env.NODE_ENV || process.env.NODE_ENV ? {port: +(process.env.PORT || 4203)} : {},
      signingSecret: process.env.SLACK_SIGNING_SECRET,
      appToken: process.env.SLACK_SOCKET_TOKEN,
      socketMode: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
      installerOptions: {
        authVersion: 'v2',
        directInstall: true,
      },
      installationStore: {
        storeInstallation: async () => {
          return;
        },
        fetchInstallation: async (installQuery) => {
          const data = await (
            await fetchBackend('/auth/integration', {
              method: 'POST',
              body: JSON.stringify({
                guild: installQuery.teamId,
                user: installQuery.userId,
                type: 'SLACK',
              }),
              headers: {
                'Content-Type': 'application/json',
                serverkey: process.env.BACKEND_TOKEN_PROTECTOR,
              },
            })
          ).json();

          if (!data) {
            throw new Error('Failed fetching installation');
          }

          const format = JSON.parse(data.user.token);

          return {
            team: { id: data.team.id },
            enterprise: undefined,
            user: { token: undefined, scopes: undefined, id: data.user.id },
            tokenType: 'bot',
            isEnterpriseInstall: false,
            appId: process.env.SLACK_APP_ID,
            authVersion: 'v2',
            bot: {
              scopes: slackProps.scopes,
              ...format,
            },
          };
        },
        deleteInstallation: async () => {
          return {} as any;
        },
      },
    });
  },
  start: (app) => {
    return app.start(process.env.PORT);
  },
  ping: (app, arg) => {
    return arg.ack();
  },
  sendMessage: (app, arg, text) => {
    return arg.client.chat.postEphemeral({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      channel: arg.shortcut.channel.id,
      user: arg.payload.user.id,
      text: text,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      thread_ts: arg.shortcut.message.ts,
    });
  },
  showButton: async (app, arg, button) => {
    await arg.client.chat.postEphemeral({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      channel:  arg.payload.channel.id, // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      thread_ts:  arg.payload.message.thread_ts,
      user:  arg.payload.user.id,
      text: button.text
    });

    return arg.client.chat.postEphemeral({
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      channel:  arg.payload.channel.id, // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      thread_ts:  arg.payload.message.thread_ts,
      user:  arg.payload.user.id,
      blocks: [
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: button.btnText,
                emoji: false,
              },
              style: 'primary',
              url: button.url
            },
          ],
        },
      ],
    });
  },
  run: (app, name, finalCallback: (name: string, param: SlackShortcutMiddlewareArgs<SlackShortcut>  & {client: WebClient}) => any) => {
    return name.map(current => app.shortcut(current, (value) => finalCallback(current, value)));
  },
  validation: (app, args) => {
    return {
      guild: args.payload.team.id,
      user: args.payload.user.id,
    };
  },
  dmUser: async (app, arg, userId, text, btnText, btnUrl) => {
    await arg.client.chat.postMessage({
      channel: userId,
      text
    });

    return arg.client.chat.postMessage({
      channel: userId,
      blocks: [
        {
          type: 'actions',
          elements: [
            {
              type: 'button',
              text: {
                type: 'plain_text',
                text: btnText,
                emoji: false,
              },
              style: 'primary',
              url: btnUrl
            },
          ],
        },
      ],
    });
  },
  add: () => SlackAddCommand,
  invite: () => SlackInviteCommand
});
