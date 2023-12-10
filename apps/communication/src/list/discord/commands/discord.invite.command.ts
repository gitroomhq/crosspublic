import { Injectable } from "@nestjs/common";
import { ProviderInviteInterface } from "@crosspublic/communication/src/create.provider";
import { CacheType, ChatInputCommandInteraction, Client } from "discord.js";

@Injectable()
export class DiscordInviteCommand implements ProviderInviteInterface<Client<boolean>, ChatInputCommandInteraction<CacheType>> {
  async handle(setup: Client<boolean>, payload: ChatInputCommandInteraction<CacheType>): Promise<{ internalId: string; role: string; guild: string }> {
    const userInput = payload.options.get('user').user;
    const role = payload.options.get('role').value as string;

    return {
      internalId: userInput.id,
      role,
      guild: payload.guildId
    }
  }
}
