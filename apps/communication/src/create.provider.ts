import { IntegrationType } from '@prisma/client';
import {
  customFetchBackend,
  CustomFetchBackendInterface,
} from '@crosspublic/helpers/src/fetchObject/custom.fetch.backend';
import { uniqBy } from 'lodash';
import { INestApplicationContext } from '@nestjs/common';
import { AppModule } from '@crosspublic/communication/src/app.module';
import { HttpStatusCode } from "axios";

export interface HandlerInterface<T, X, Y> {
  handle: (
    setup: T,
    payload: X,
    request: CustomFetchBackendInterface
  ) => Promise<Y>
}

export interface ProviderAddInterface<T, X> extends HandlerInterface<T, X, {
  reference: string;
  messages: Array<{
    name: string;
    internalId: string;
    message: string;
  }>;
}> {}

export interface ProviderInviteInterface<T, X> extends HandlerInterface<T, X, {
  internalId: string;
  role: string;
  guild: string;
}> {}

export function createProvider<T, X, Y extends IntegrationType>(params: {
  type: Y;
  setup: () => T | Promise<T>;
  start: (app: T) => Promise<any>;
  ping: (app: T, arg: X) => Promise<any>;
  sendMessage: (app: T, arg: X, text: string) => Promise<any>;
  dmUser: (app: T, arg: X, userId: any, text: string, btnText?: string, btnUrl?: string) => Promise<any>;
  showButton: (
    app: T,
    arg: X,
    buttons: { text: string; btnText: string; url: string }
  ) => Promise<any>;
  run: (
    app: T,
    name: string[],
    finalCallback: (name: string, arg: X) => any
  ) => any;
  add: () => new () => ProviderAddInterface<T, X>;
  invite: () => new () => ProviderInviteInterface<T, X>;
  validation: (app: T, args: X) => { guild: string | number; user: string };
}) {
  return {
    type: params.type,
    run: async (app: INestApplicationContext) => {
      const setup = await params.setup();
      const addClass = app.select(AppModule).get(params.add());
      const inviteClass = app.select(AppModule).get(params.invite());
      await params.run(setup, ['add', 'invite'], async (name, arg) => {
        await params.ping(setup, arg);

        await params.sendMessage(setup, arg, 'Working...');

        const validation = params.validation(setup, arg);
        const customFetch = customFetchBackend();

        const { data } = await customFetch.post(
          '/auth',
          {
            guildId: validation.guild,
            internalId: validation.user,
            type: params.type,
          },
          {
            headers: {
              serverkey: process.env.BACKEND_TOKEN_PROTECTOR!,
            },
          }
        );

        if (!data) {
          return;
        }

        switch (name) {
          default:
            await params.sendMessage(setup, arg, 'Not found');
          break;
          case 'invite':
            const { internalId, role, guild } = (await inviteClass.handle(
              setup,
              arg,
              data
            )) || {internalId: undefined, role: undefined, guild: undefined};

            if (!internalId) {
              return ;
            }

            const {data: newData2, status} = await customFetchBackend(data).post('/invite', {
              type: params.type.toLowerCase(),
              information: {
                __type: params.type.toLowerCase(),
                internalId: internalId,
                role,
                guild: guild
              }
            });

            if (status === HttpStatusCode.PaymentRequired) {
              await params.showButton(setup, arg, {
                text: 'You have reached the maximum number of users for your plan, please update your plan',
                btnText: 'Click here',
                url: newData2.url,
              });
              return ;
            }

            if (!newData2) {
              return ;
            }

            await params.sendMessage(setup, arg, `We have DMed the user with the invitation link`);
            await params.dmUser(setup, arg, internalId, 'You have been invited to crosspublic please follow the link to continue', 'Click here', newData2.url);
          break;
          case 'add':
            const { messages, reference } = (await addClass.handle(
              setup,
              arg,
              data
            )) || {messages: undefined};

            if (!messages) {
              return ;
            }

            const allPossibleNames = uniqBy(messages, (o) => o.name)
              .map((p) => p.name)
              .reduce((all, current, index) => {
                all[current] = 'User ' + (index + 1);
                return all;
              }, {} as { [key: string]: string });

            const messagesList = messages.map((p) => ({
              ...p,
              name: allPossibleNames[p.name],
              message: Object.keys(allPossibleNames)
                .reduce((all, current) => {
                  return all.replace(
                    new RegExp(`<@${current}>`, 'g'),
                    '[' + allPossibleNames[current] + ']'
                  );
                }, p.message)
                .replace(new RegExp(/<@\S+>/, 'g'), '[Unknown User]'),
            }));

            const { data: newData } = await customFetchBackend(data).post(
              '/faq/job',
              {
                reference,
                messagesList,
              },
              {
                headers: {
                  serverkey: process.env.BACKEND_TOKEN_PROTECTOR!,
                },
              }
            );

            await params.showButton(setup, arg, {
              text: 'To start the job click here',
              btnText: 'Start',
              url: newData.url,
            });
        }
      });

      return params.start(setup);
    },
  };
}
