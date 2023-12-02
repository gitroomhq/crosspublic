import { Module } from '@nestjs/common';
import {AddCommand} from "@meetfaq/discord/src/packages/commands/add.command";
import {SignInCommand} from "@meetfaq/discord/src/packages/commands/sign.in.command";
import {InviteCommand} from "@meetfaq/discord/src/packages/commands/invite.command";

export const commands = [AddCommand, SignInCommand, InviteCommand];
@Module({
  imports: [],
  controllers: [],
  providers: commands,
  exports: commands
})
export class CommandsModule {}
