import { Module } from '@nestjs/common';
import { AddCommand } from "@crosspublic/slack/src/packages/commands/add.command";

export const commands = [AddCommand];
@Module({
  imports: [],
  controllers: [],
  providers: commands,
  exports: commands
})
export class CommandsModule {}
