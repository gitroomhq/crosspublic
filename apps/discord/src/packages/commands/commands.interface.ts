import {CacheType, Interaction} from "discord.js";
import {UserInterface} from "@meetqa/helpers/src/user/user.interface";

export interface CommandsInterface {
  name: string;
  description: string;
  run(fetchObject: any, user: UserInterface, interactions: Interaction<CacheType>): Promise<any>;
  runButton?(fetchObject: any, user: UserInterface, interactions: Interaction<CacheType>): Promise<any>;
}
