import {CommandsInterface} from "@meetfaq/discord/src/packages/commands/commands.interface";
import {ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ChatInputCommandInteraction} from "discord.js";
import {Injectable} from "@nestjs/common";
import {UserInterface} from "@meetfaq/helpers/src/user/user.interface";
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
  async runButton(fetchObject: any, user: UserInterface, interactions: ButtonInteraction) {
    total();
    const reply = await interactions.deferReply();
    event.emit(interactions.customId);
    await reply.delete();
  }
  async run(fetchObject: any, user: UserInterface, interactions: ChatInputCommandInteraction) {
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
          const attachment = p.attachments.first()?.url || p.embeds[0]?.url || p.embeds[0]?.description || p.embeds[0]?.title || p.embeds[0]?.author?.name || p.embeds[0]?.fields?.map(f => f.name + ' ' + f.value).join(' ');
      return {
        name: p.author.globalName,
        internalId: p.author.id,
        message: p.content + (attachment ? `${p.content ? '\n ' : ''}${attachment}` : ''),
        type: p.author.bot
      }
    }))).reverse();

    const messages = uniqBy([
      {
        message: name,
        name: all[0].name,
        internalId: all[0].internalId,
      },
      {
        message: firstMessage.content,
        name: all[0].name,
        internalId: all[0].internalId,
      },
      ...all
    ], (o) => o.message);

    const allAuthors = Array.from(new Set(messages.map(p => p.name))).reduce((all, current, index) => {
      const internalId = messages.find(f => f.name === current)?.internalId;
      all.internals[internalId] = "User " + (index + 1);
      all.users[current] = "User " + (index + 1);
      return all;
    }, {internals: {}, users: {}});

    const mapper = messages.map(p => ({
      ...p,
      message: Object.keys(allAuthors.internals).reduce((all, current) => {
        return all
          .replace(new RegExp(`<@${current}>`, 'g'), '[' + allAuthors.internals[current] + ']')
      }, p.message).replace(new RegExp(/<@\d+>/, 'g'), '[Unknown User]'),
      name: allAuthors.users[p.name]
    }));

    console.log(mapper);

    const {data} = await fetchObject.post('/faq/job', {
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
