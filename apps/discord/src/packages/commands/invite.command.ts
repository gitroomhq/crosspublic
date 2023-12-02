import {CommandsInterface} from "@meetfaq/discord/src/packages/commands/commands.interface";
import {ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";
import {Injectable} from "@nestjs/common";
import {UserInterface} from "@meetfaq/helpers/src/user/user.interface";
import {HttpStatusCode} from "axios";

@Injectable()
export class InviteCommand implements CommandsInterface {
  name = "invite";
  description = "Invite a user to MeetFAQ"
  params = (command: SlashCommandBuilder) => {
    command.addUserOption(option => option.setName('user').setDescription('The user').setRequired(true));
    command.addStringOption(option => option.setName('role').setDescription('user role').setChoices(
      {
        name: 'User', value: 'USER'
      },
      {
        name: 'Admin', value: 'ADMIN'
      },
    ).setRequired(true))
  }
  async run(fetchObject: any, user: UserInterface, interactions: ChatInputCommandInteraction) {
    const userInput = interactions.options.get('user').user;
    const role = interactions.options.get('role').value;

    // if (userId === interactions.user.id) {
    //   await interactions.editReply({
    //     content: `You can't invite yourself`,
    //   });
    //   return ;
    // }

    await interactions.editReply({
      content: `Preparing invitation...`,
    });

    const {data, status} = await fetchObject.post('/invite', {
      type: 'discord', information: {
        __type: 'discord',
        internalId: userInput.id,
        role,
        guild: interactions.guildId
      }
    });
    if (status === HttpStatusCode.PaymentRequired) {
      const button = new ButtonBuilder().setURL(data.url).setLabel('Click here').setStyle(ButtonStyle.Link);
      const row = new ActionRowBuilder().addComponents(button);

      await interactions.editReply({
        content: `You have reached the maximum number of users for your plan, please update your plan`,
        ephemeral: true,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        components: [row]
      });
      return ;
    }

    await interactions.editReply({
      content: `We have DMed ${userInput.displayName} with the invitation link`
    });

    const button = new ButtonBuilder().setURL(data.url).setLabel('Click here').setStyle(ButtonStyle.Link);
    const row = new ActionRowBuilder().addComponents(button);

    await (await userInput.createDM(true)).send({
      content: `You have been invited to MeetFAQ please follow the link to continue`,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      components: [row]
    })
  }
}
