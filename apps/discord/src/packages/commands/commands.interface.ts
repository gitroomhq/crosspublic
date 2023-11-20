import {CacheType, Interaction} from "discord.js";
import {UserInterface} from "@meetqa/helpers/src/user/user.interface";
import {Axios} from "axios";

export interface CommandsInterface {
  name: string;
  description: string;
  run(axios: any, user: UserInterface, interactions: Interaction<CacheType>): Promise<any>;
  runButton?(axios: any, user: UserInterface, interactions: Interaction<CacheType>): Promise<any>;
}
