import { Module } from '@nestjs/common';
import {SubscriptionService} from "@meetfaq/database/src/subscription/subscription.service";
import {SubscriptionRepository} from "@meetfaq/database/src/subscription/subscription.repository";

@Module({
  imports: [],
  controllers: [],
  providers: [SubscriptionService, SubscriptionRepository],
  get exports() {
    return this.providers;
  }
})
export class SubscriptionModule {}
