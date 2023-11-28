import { Module } from '@nestjs/common';
import { DiscordService } from "@meetfaq/discord/src/packages/discord/discord.service";
import {CommandsModule} from "@meetfaq/discord/src/packages/commands/commands.module";
import {AuthService} from "@meetfaq/discord/src/packages/auth/auth.service";

@Module({
  imports: [CommandsModule],
  controllers: [],
  providers: [AuthService, DiscordService],
  exports: [AuthService, CommandsModule]
})
export class DiscordModule {}
