import { Module } from '@nestjs/common';
import { SlackAddCommand } from "@crosspublic/communication/src/list/slack/commands/slack.add.command";
import { DiscordAddCommand } from "@crosspublic/communication/src/list/discord/commands/discord.add.command";
import { SlackInviteCommand } from "@crosspublic/communication/src/list/slack/commands/slack.invite.command";
import { DiscordInviteCommand } from "@crosspublic/communication/src/list/discord/commands/discord.invite.command";

@Module({
  imports: [],
  controllers: [],
  providers: [SlackAddCommand, DiscordAddCommand, SlackInviteCommand, DiscordInviteCommand],
})
export class AppModule {}
