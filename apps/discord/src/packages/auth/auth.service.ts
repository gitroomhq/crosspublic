import {ChatInputCommandInteraction} from "discord.js";
import {customFetchBackend} from "@crosspublic/helpers/src/fetchObject/custom.fetch.backend";

export class AuthService {
  async check(interaction: ChatInputCommandInteraction) {
    // create org
    return (await customFetchBackend().post('/auth', {
      guildId: interaction.guildId,
      internalId: interaction.user.id,
    }, {
      headers: {
        serverkey: process.env.BACKEND_TOKEN_PROTECTOR
      }
    })).data;
  }
}
