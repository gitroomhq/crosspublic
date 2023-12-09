import { App } from '@slack/bolt';
import { CommandInterface } from '@crosspublic/slack/src/packages/commands/command.interface';
import {
  customFetchBackend,
  fetchBackend,
} from '@crosspublic/helpers/src/fetchObject/custom.fetch.backend';
import { slackProps } from '@crosspublic/helpers/src/slack/slack.props';

export class SlackService {
  async run(commandList: CommandInterface[]) {
    const app = new App({
      ...slackProps,
      port: +(process.env.PORT || 4203),
      signingSecret: process.env.SLACK_SIGNING_SECRET,
      appToken: process.env.SLACK_SOCKET_TOKEN,
      socketMode: true,
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

    await this.load(app, commandList);

    await app.start();
    console.log(`Slack bot is ready`);
  }

  async load(app: App, commandList: CommandInterface[]) {
    await Promise.all(
      commandList.map((cmd) =>
        app.shortcut(cmd.name, async ({ shortcut, payload, ack, client }) => {
          const respond = async (text: string) => {
            await client.chat.postEphemeral({
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              channel: shortcut.channel.id,
              user: shortcut.user.id,
              text: text,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              thread_ts: shortcut.message.ts,
            });
          }

          await respond('Working...');

          await ack();
          const { data } = await customFetchBackend().post(
            '/auth',
            {
              guildId: payload.team.id,
              internalId: payload.user.id,
            },
            {
              headers: {
                serverkey: process.env.BACKEND_TOKEN_PROTECTOR,
              },
            }
          );

          if (!data) {
            // await respond(`No access to use this command`);
            return;
          }

          await cmd.callback({
            request: customFetchBackend(data),
            payload,
            respond,
            client,
          });
        })
      )
    );
    // return commandList.map((command) => {
    //   console.log(command.name);
    //   return app.command(`/${command.name}`, value => {
    //     console.log('running command', command.name);
    //     return command.callback(value);
    //   });
    // });
  }
}
