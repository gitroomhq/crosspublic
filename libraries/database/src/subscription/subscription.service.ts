import {Injectable} from "@nestjs/common";
import {SubscriptionRepository} from "@meetfaq/database/src/subscription/subscription.repository";
import { pricing } from "@meetfaq/helpers/src/pricing/pricing";
import { FaqRepository } from "@meetfaq/database/src/faq/faq.repository";
import { CategoryRepository } from "@meetfaq/database/src/categories/category.repository";
import { IntegrationsRepository } from "@meetfaq/database/src/integrations/integrations.repository";
import { OrganizationRepository } from "@meetfaq/database/src/organization/organization.repository";
import { SettingsService } from "@meetfaq/database/src/settings/settings.service";

@Injectable()
export class SubscriptionService {
  constructor(
    private readonly _subscriptionRepository: SubscriptionRepository,
    private readonly _faqRepository: FaqRepository,
    private readonly _categoriesRepository: CategoryRepository,
    private readonly _integrationsRepository: IntegrationsRepository,
    private readonly _settingsService: SettingsService,
    private readonly _organizationRepository: OrganizationRepository,
  ) {}

  getSubscriptionByOrganizationId(organizationId: string) {
    return this._subscriptionRepository.getSubscriptionByOrganizationId(organizationId);
  }

  async deleteSubscription(customerId: string) {
    await this.modifySubscription(customerId, 'FREE');
    return this._subscriptionRepository.deleteSubscriptionByCustomerId(customerId);
  }

  updateCustomerId(organizationId: string, customerId: string) {
    return this._subscriptionRepository.updateCustomerId(organizationId, customerId);
  }

  checkSubscription(organizationId: string, subscriptionId: string) {
    return this._subscriptionRepository.checkSubscription(organizationId, subscriptionId);
  }

  async modifySubscription(customerId: string, billing: 'FREE' | 'BASIC' | 'PRO') {
    const getCurrentSubscription = (await this._subscriptionRepository.getSubscriptionByCustomerId(customerId))!;
    const from = pricing[getCurrentSubscription?.subscriptionTier || 'FREE'];
    const to   = pricing[billing];

    if (to.faq < from.faq) {
      await this._faqRepository.deleteFAQs(getCurrentSubscription?.organizationId, from.faq - to.faq);
    }
    if (to.categories < from.categories) {
      await this._categoriesRepository.deleteCategories(getCurrentSubscription?.organizationId, from.categories - to.categories);
    }
    if (to.integrations < from.integrations) {
      await this._integrationsRepository.deleteIntegrations(getCurrentSubscription?.organizationId, from.integrations - to.integrations);
    }
    if (to.user < from.user) {
      await this._integrationsRepository.deleteUsers(getCurrentSubscription?.organizationId, from.user - to.user);
    }
    if (to.domains < from.domains) {
      await this._settingsService.deleteDomainByOrg(getCurrentSubscription?.organizationId);
      await this._organizationRepository.changePowered(getCurrentSubscription?.organizationId);
    }
  }

  async createOrUpdateSubscription(identifier: string, customerId: string, billing: 'BASIC' | 'PRO', period: 'MONTHLY' | 'YEARLY', cancelAt: number | null) {
    await this.modifySubscription(customerId, billing);
    return this._subscriptionRepository.createOrUpdateSubscription(identifier, customerId, billing, period, cancelAt);
  }
}
