import { Module } from '@nestjs/common';
import {DiscordModule} from "@meetqa/discord/src/packages/discord/discord.module";

@Module({
  imports: [DiscordModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
