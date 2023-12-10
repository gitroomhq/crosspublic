import { createProvider } from '@crosspublic/communication/src/create.provider';
import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  CacheType,
  ChatInputCommandInteraction,
  Client,
  GatewayIntentBits,
  Partials,
  REST,
  Routes,
  SlashCommandBuilder,
} from 'discord.js';
import { DiscordAddCommand } from '@crosspublic/communication/src/list/discord/commands/discord.add.command';
import { DiscordInviteCommand } from '@crosspublic/communication/src/list/discord/commands/discord.invite.command';

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

export const discordProvider = createProvider({
  type: 'DISCORD',
  setup: async () => {
    const commands = [
      new SlashCommandBuilder().setName('add').setDescription('Add new a FAQ'),
      new SlashCommandBuilder()
        .setName('invite')
        .setDescription('invite a user to crosspublic')
        .addUserOption((option) =>
          option.setName('user').setDescription('The user').setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName('role')
            .setDescription('user role')
            .setChoices(
              {
                name: 'User',
                value: 'USER',
              },
              {
                name: 'Admin',
                value: 'ADMIN',
              }
            )
            .setRequired(true)
        ),
    ];

    await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT), {
      body: commands,
    });

    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
      partials: [Partials.Channel],
    });

    client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
    });

    return client;
  },
  start: async (client) => {
    return client.login(process.env.DISCORD_TOKEN);
  },
  ping: async () => {
    return '';
  },
  showButton: async (app, arg, button) => {
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setLabel(button.btnText)
        .setURL(button.url)
        .setStyle(ButtonStyle.Link)
    );

    return arg.editReply({
      content: button.text,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      components: [row],
    });
  },
  sendMessage: (app, arg, text) => {
    return arg.editReply({
      content: text,
    });
  },
  run: async (client, name: string[], finalCallback) => {
    client.on(
      'interactionCreate',
      async (interaction: ChatInputCommandInteraction<CacheType>) => {
        await interaction.reply({ content: 'Working...', ephemeral: true });
        const findName = name.find((n) => n === interaction.commandName);
        if (findName) {
          finalCallback(findName, interaction);
        }
      }
    );
  },
  validation: (app, args) => {
    return {
      guild: args.guild.id,
      user: args.user.id,
    };
  },
  dmUser: async (app, arg, userId, text, btnText, btnUrl) => {
    const row =
      btnText && btnUrl
        ? {
            components: [
              new ActionRowBuilder().addComponents(
                new ButtonBuilder()
                  .setURL(btnUrl)
                  .setLabel(btnText)
                  .setStyle(ButtonStyle.Link)
              ),
            ],
          }
        : {};

    const getUser = await app.users.fetch(userId);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    (await getUser.createDM(true)).send({
      content: text,
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      ...row,
    });
  },
  add: () => DiscordAddCommand,
  invite: () => DiscordInviteCommand,
});
