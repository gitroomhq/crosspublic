import {PrismaRepository} from "../../src/prisma.service";
import {Injectable} from "@nestjs/common";

@Injectable()
export class SubscriptionRepository {
  constructor(
    private readonly _subscription: PrismaRepository<'subscription'>,
    private readonly _organization: PrismaRepository<'organization'>,
  ) {
  }

  getSubscriptionByOrganizationId(organizationId: string) {
    return this._subscription.model.subscription.findFirst({
      where: {
        organizationId,
        subscriptionState: 'ACTIVE'
      },
    });
  }

  checkSubscription(organizationId: string, subscriptionId: string) {
    return this._subscription.model.subscription.findFirst({
      where: {
        organizationId,
        identifier: subscriptionId,
        subscriptionState: 'ACTIVE'
      },
    });
  }

  deleteSubscriptionByCustomerId(customerId: string) {
    return this._subscription.model.subscription.deleteMany({
      where: {
        organization: {
          stripeCustomerId: customerId
        }
      }
    });
  }

  updateCustomerId(organizationId: string, customerId: string) {
    return this._organization.model.organization.update({
      where: {
        id: organizationId
      },
      data: {
        stripeCustomerId: customerId
      }
    });
  }

  async createOrUpdateSubscription(identifier: string, customerId: string, billing: 'BASIC' | 'PRO', period: 'MONTHLY' | 'YEARLY', cancelAt: number | null) {
    const findOrg = (await this._organization.model.organization.findFirst({
      where: {
        stripeCustomerId: customerId
      }
    }))!;

    await this._subscription.model.subscription.upsert({
      where: {
        organizationId: findOrg.id,
        organization: {
          stripeCustomerId: customerId,
        }
      },
      update: {
        subscriptionTier: billing,
        period,
        subscriptionState: 'ACTIVE',
        identifier,
        cancelAt: cancelAt ? new Date(cancelAt * 1000) : null,
      },
      create: {
        organizationId: findOrg.id,
        subscriptionTier: billing,
        period,
        subscriptionState: 'ACTIVE',
        cancelAt: cancelAt ? new Date(cancelAt * 1000) : null,
        identifier
      }
    });
  }
}
