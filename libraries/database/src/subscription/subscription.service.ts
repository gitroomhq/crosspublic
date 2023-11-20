import {Injectable} from "@nestjs/common";
import {SubscriptionRepository} from "@meetqa/database/src/subscription/subscription.repository";

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly _subscriptionRepository: SubscriptionRepository
  ) {}

  getSubscriptionByOrganizationId(organizationId: string) {
    return this._subscriptionRepository.getSubscriptionByOrganizationId(organizationId);
  }

  deleteSubscription(customerId: string) {
    return this._subscriptionRepository.deleteSubscriptionByCustomerId(customerId);
  }

  updateCustomerId(organizationId: string, customerId: string) {
    return this._subscriptionRepository.updateCustomerId(organizationId, customerId);
  }

  checkSubscription(organizationId: string, subscriptionId: string) {
    return this._subscriptionRepository.checkSubscription(organizationId, subscriptionId);
  }

  createOrUpdateSubscription(identifier: string, customerId: string, billing: 'BASIC' | 'PRO', period: 'MONTHLY' | 'YEARLY', cancelAt: number | null) {
    return this._subscriptionRepository.createOrUpdateSubscription(identifier, customerId, billing, period, cancelAt);
  }
}
