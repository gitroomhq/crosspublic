import {CommandsInterface} from "@meetqa/discord/src/packages/commands/commands.interface";
import {ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ChatInputCommandInteraction} from "discord.js";
import {Injectable} from "@nestjs/common";
import {UserInterface} from "@meetqa/helpers/src/user/user.interface";
import {Axios} from "axios";
import {uniqBy} from "lodash";
import EventEmitter from 'events';

const event = new EventEmitter();

const total = () => {
  const allEventNames = event.eventNames();
  let totalListeners = 0;

  for (const eventName of allEventNames) {
    totalListeners += event.listeners(eventName).length;
  }

  console.log('total events', totalListeners);
}
@Injectable()
export class AddCommand implements CommandsInterface {
  name = "add";
  description = "Add forum thread to the FAQ"
  async runButton(axios: Axios, user: UserInterface, interactions: ButtonInteraction) {
    total();
    const reply = await interactions.deferReply();
    event.emit(interactions.customId);
    await reply.delete();
  }
  async run(axios: Axios, user: UserInterface, interactions: ChatInputCommandInteraction) {
    if (!interactions.channel.isThread()) {
      await interactions.deleteReply('Not a thread');
      return ;
    }
    const reference = String(interactions.channelId);

    const {name} = await interactions.channel.fetch(true);
    const firstMessage = await interactions.channel.fetchStarterMessage();
    const loadMessages = await interactions.channel.messages.fetch({
      cache: false,
    });

    // await interactions.reply('Working on it');

    const all = (await Promise.all(
      loadMessages
        .filter(p => !p.author.bot)
        .map(async p => {
      return {
        name: p.author.globalName,
        message: p.content,
        type: p.author.bot
      }
    }))).reverse();

    const messages = uniqBy([
      {
        message: name,
        name: all[0].name
      },
      {
        message: firstMessage.content,
        name: all[0].name
      },
      ...all
    ], (o) => o.message)

    const allAuthors = Array.from(new Set(messages.map(p => p.name))).reduce((all, current, index) => {
      all[current] = "User " + (index + 1);
      return all;
    }, {});

    const mapper = messages.map(p => ({
      ...p,
      name: allAuthors[p.name]
    }));

    const {data} = await axios.post('/faq/job', {
      reference,
      messagesList: mapper.filter(f => f.message)
    });

    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder().setLabel('Click here').setURL(data.url).setStyle(ButtonStyle.Link)
    );

    await interactions.editReply({
      content: 'To start the job click on the button below',
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      components: [row]
    });
  }
}
