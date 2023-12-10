import { Injectable } from "@nestjs/common";
import { ProviderAddInterface } from "@crosspublic/communication/src/create.provider";
import { CacheType, ChatInputCommandInteraction, Client } from "discord.js";
import { uniqBy } from "lodash";

@Injectable()
export class DiscordAddCommand implements ProviderAddInterface<Client<boolean>, ChatInputCommandInteraction<CacheType>> {
  async handle(setup: Client<boolean>, payload: ChatInputCommandInteraction<CacheType>): Promise<{ reference: string; messages: Array<{ name: string; internalId: string; message: string }> }> {
    if (!payload.channel.isThread()) {
      await payload.reply('Not a thread');
      return ;
    }
    const reference = String(payload.channelId);

    const {name} = await payload.channel.fetch(true);
    const firstMessage = await payload.channel.fetchStarterMessage();
    const loadMessages = await payload.channel.messages.fetch({
      cache: false,
    });

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

    return {
      reference,
      messages
    }
  }
}
