import { Module } from '@nestjs/common';
import { SlackModule } from "@crosspublic/slack/src/packages/slack/slack.module";
import { CommandsModule } from "@crosspublic/slack/src/packages/commands/commands.module";

@Module({
  imports: [SlackModule, CommandsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
