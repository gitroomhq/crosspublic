import {Injectable} from "@nestjs/common";
import {Client, GatewayIntentBits, Partials, REST, Routes, SlashCommandBuilder} from 'discord.js';
import {CommandsInterface} from "@crosspublic/discord/src/packages/commands/commands.interface";
import {customFetchBackend} from "@crosspublic/helpers/src/fetchObject/custom.fetch.backend";
import {AuthService} from "@crosspublic/discord/src/packages/auth/auth.service";
import {UserInterface} from "@crosspublic/helpers/src/user/user.interface";

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

@Injectable()
export class DiscordService {
  constructor(
    private _authService: AuthService
  ) {
  }
  async run(commands: CommandsInterface[]) {
    try {
      console.log('Started refreshing application (/) commands.');

      const commandLoad = commands.map(p => {
        const slash = new SlashCommandBuilder();
        slash.setName(p.name);
        slash.setDescription(p.description);
        if (p.params) {
          p.params(slash);
        }
        return slash;
      });
      console.log('loaded command: ', commandLoad.map(p => `/${p.name}`))
      await rest.put(Routes.applicationCommands(process.env.DISCORD_CLIENT), { body: commandLoad });

      console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      console.error(error);
    }
  }

  async client(commands: CommandsInterface[]) {
    const client = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
      ],
      partials: [Partials.Channel]
    });

    client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
    });

    client.on('interactionCreate', async ( interaction: any) => {
      if (interaction.commandName) {
        // @ts-ig
        await interaction.reply({content: 'Working please wait...', ephemeral: true});
      }
      const user: UserInterface|false = await this._authService.check(interaction);
      if (!user) {
        if (interaction.commandName) {
          await interaction.editReply({
            content: 'You don\'t have permissions to do it, please contact the server owner'
          });
        }

        return ;
      }

      const findCommand = commands.find(p =>  (interaction.commandName || interaction.customId).indexOf(p.name) > -1);
      if (findCommand) {
        try {
          if (findCommand.name === interaction.commandName) {
            await findCommand.run(customFetchBackend(user), user, interaction);
          }
          else if (interaction.customId.indexOf('button') > -1) {
            await findCommand.runButton(customFetchBackend(user), user, interaction);
          }
        }
        catch (err) {
          console.log(err);
          interaction.editReply('Error occurred');
        }
      }
      else {
        return ;
      }

      // await interaction.deleteReply();
    });

    return client.login(process.env.DISCORD_TOKEN);
  }
}
