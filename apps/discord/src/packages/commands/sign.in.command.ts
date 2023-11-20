import {CommandsInterface} from "@meetqa/discord/src/packages/commands/commands.interface";
import {ActionRowBuilder, ButtonBuilder, ChatInputCommandInteraction, ButtonStyle} from "discord.js";
import {Injectable} from "@nestjs/common";
import {UserInterface} from "@meetqa/helpers/src/user/user.interface";

@Injectable()
export class SignInCommand implements CommandsInterface {
  name = "signin";
  description = "Move to docubot dashboard"
  async run(fetchObject: any, user: UserInterface, interactions: ChatInputCommandInteraction) {
    const {data} = await fetchObject.get('/users/sign-in');

    const button = new ButtonBuilder().setURL(data.url).setLabel('Click here').setStyle(ButtonStyle.Link);
    const row = new ActionRowBuilder().addComponents(button);
    await interactions.editReply({
      content: 'Move to dashboard',
      ephemeral: true,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      components: [row]
    })
  }
}
