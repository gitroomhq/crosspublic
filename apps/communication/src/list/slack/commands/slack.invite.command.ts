import { Injectable } from "@nestjs/common";
import { App, SlackShortcut, SlackShortcutMiddlewareArgs } from "@slack/bolt";
import { StringIndexed } from "@slack/bolt/dist/types/helpers";
import { WebClient } from "@slack/web-api";
import { ProviderInviteInterface } from "@crosspublic/communication/src/create.provider";

@Injectable()
export class SlackInviteCommand implements ProviderInviteInterface<App<StringIndexed>, SlackShortcutMiddlewareArgs<SlackShortcut> & {client: WebClient}> {
  async handle(setup: App<StringIndexed>, payload: SlackShortcutMiddlewareArgs<SlackShortcut> & { client: WebClient }): Promise<{ internalId: string; role: string; guild: string }> {
    const team = await payload.client.team.info();
    return {
      guild: team.team.id, internalId: payload.payload.user.id, role: "user"
    }
  }
}
