import { Module } from '@nestjs/common';
import {AddCommand} from "@meetqa/discord/src/packages/commands/add.command";
import {SignInCommand} from "@meetqa/discord/src/packages/commands/sign.in.command";

export const commands = [AddCommand, SignInCommand];
@Module({
  imports: [],
  controllers: [],
  providers: commands,
  exports: commands
})
export class CommandsModule {}
