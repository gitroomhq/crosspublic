/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import {AppModule} from "./app.module";
import { SlackModule } from "@crosspublic/slack/src/packages/slack/slack.module";
import { SlackService } from "@crosspublic/slack/src/packages/slack/slack.service";
import { commands, CommandsModule } from "@crosspublic/slack/src/packages/commands/commands.module";

async function bootstrap() {
  const app     = await NestFactory.createApplicationContext(AppModule);
  const slackService = app.select(SlackModule).get(SlackService);
  const commandsList  = commands.map(c => app.select(CommandsModule).get(c));
  await slackService.run(commandsList);
}

bootstrap();
