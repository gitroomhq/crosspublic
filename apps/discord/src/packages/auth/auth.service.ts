import {ChatInputCommandInteraction} from "discord.js";
import {customFetchBackend} from "@meetqa/helpers/src/axios/custom.fetch.backend";

export class AuthService {
  async check(interaction: ChatInputCommandInteraction) {
    // create org
    return (await customFetchBackend().post('/auth', {
      guildId: interaction.guildId,
      serverName: (await interaction.guild.fetch()).name,
      name: interaction.user.globalName,
      internalId: interaction.user.id,
      isOwner: interaction.user.id === (await interaction.guild.fetch()).ownerId
    })).data;
  }
}
