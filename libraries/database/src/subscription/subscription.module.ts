import { Module } from '@nestjs/common';
import {SubscriptionService} from "@meetqa/database/src/subscription/subscription.service";
import {SubscriptionRepository} from "@meetqa/database/src/subscription/subscription.repository";

@Module({
  imports: [],
  controllers: [],
  providers: [SubscriptionService, SubscriptionRepository],
  get exports() {
    return this.providers;
  }
})
export class SubscriptionModule {}
