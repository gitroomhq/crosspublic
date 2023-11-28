import { Module } from '@nestjs/common';
import {DiscordModule} from "@meetfaq/discord/src/packages/discord/discord.module";

@Module({
  imports: [DiscordModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
