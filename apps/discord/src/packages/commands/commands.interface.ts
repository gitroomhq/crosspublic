import {CacheType, Interaction, SlashCommandBuilder} from "discord.js";
import {UserInterface} from "@meetfaq/helpers/src/user/user.interface";

export interface CommandsInterface {
  name: string;
  description: string;
  params?: (command: SlashCommandBuilder) => void;
  run(fetchObject: any, user: UserInterface, interactions: Interaction<CacheType>): Promise<any>;
  runButton?(fetchObject: any, user: UserInterface, interactions: Interaction<CacheType>): Promise<any>;
}
