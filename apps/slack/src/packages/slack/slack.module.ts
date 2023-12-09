import { Module } from '@nestjs/common';
import { SlackService } from "@crosspublic/slack/src/packages/slack/slack.service";

@Module({
  imports: [],
  controllers: [],
  providers: [SlackService],
  exports: [SlackService]
})
export class SlackModule {}
