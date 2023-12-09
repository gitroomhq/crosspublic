import { Module } from '@nestjs/common';
import { DiscordService } from "@crosspublic/discord/src/packages/discord/discord.service";
import {CommandsModule} from "@crosspublic/discord/src/packages/commands/commands.module";
import {AuthService} from "@crosspublic/discord/src/packages/auth/auth.service";

@Module({
  imports: [CommandsModule],
  controllers: [],
  providers: [AuthService, DiscordService],
  exports: [AuthService, CommandsModule]
})
export class DiscordModule {}
