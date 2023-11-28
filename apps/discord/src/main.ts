/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import {AppModule} from "@meetfaq/discord/src/app.module";
import {DiscordModule} from "@meetfaq/discord/src/packages/discord/discord.module";
import {DiscordService} from "@meetfaq/discord/src/packages/discord/discord.service";
import {commands, CommandsModule} from "@meetfaq/discord/src/packages/commands/commands.module";

async function bootstrap() {
  const app     = await NestFactory.createApplicationContext(AppModule);
  const discordService = app.select(DiscordModule).get(DiscordService);
  const commandsList  = commands.map(c => app.select(CommandsModule).get(c));
  await discordService.run(commandsList);
  await discordService.client(commandsList);
}

bootstrap();
