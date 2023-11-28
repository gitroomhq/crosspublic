import { Module } from '@nestjs/common';
import {AddCommand} from "@meetfaq/discord/src/packages/commands/add.command";
import {SignInCommand} from "@meetfaq/discord/src/packages/commands/sign.in.command";

export const commands = [AddCommand, SignInCommand];
@Module({
  imports: [],
  controllers: [],
  providers: commands,
  exports: commands
})
export class CommandsModule {}
