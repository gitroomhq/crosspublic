import {SubscriptionService} from "@meetqa/database/src/subscription/subscription.service";
import {Ability, AbilityBuilder, AbilityClass} from "@casl/ability";
import {FaqService} from "@meetqa/database/src/faq/faq.service";
import {CategoryService} from "@meetqa/database/src/categories/category.service";
import {DomainService} from "@meetqa/database/src/domains/domain.service";
import {Injectable} from "@nestjs/common";
import {pricing} from "@meetqa/helpers/src/pricing/pricing";

export enum Sections {
    FAQ = 'faq',
    CATEGORY = 'category',
    DOMAIN = 'domain',
    EMBEDDING = 'embedding',
    API = 'api'
}

export enum AuthorizationActions {
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}

export type AppAbility = Ability<[AuthorizationActions, Sections]>;

@Injectable()
export class AuthorizationService {
  constructor(
    private _subscriptionService: SubscriptionService,
    private _faqService: FaqService,
    private _categoryService: CategoryService,
    private _domainService: DomainService,
  ) {
  }
    async getPackageOptions(orgId: string) {
        const subscription = await this._subscriptionService.getSubscriptionByOrganizationId(orgId);
        return pricing[subscription?.subscriptionTier || 'FREE'];
    }

    async check(orgId: string) {
      const { can, build } = new AbilityBuilder<Ability<[AuthorizationActions, Sections]>>(Ability as AbilityClass<AppAbility>);

      const options = await this.getPackageOptions(orgId);
      const totalFaqs                   = await this._faqService.totalFaqByOrganizationId(orgId);
      const totalCategories             = await this._categoryService.totalCategoriesByOrganizationId(orgId);
      const totalDomains                = await this._domainService.totalDomainsByOrganizationId(orgId);

      can(AuthorizationActions.Update, Sections.FAQ);
      can(AuthorizationActions.Delete, Sections.FAQ);
      can(AuthorizationActions.Read, Sections.FAQ);
      can(AuthorizationActions.Read, Sections.CATEGORY);
      can(AuthorizationActions.Update, Sections.CATEGORY);
      can(AuthorizationActions.Delete, Sections.CATEGORY);

      if (totalFaqs < options.faq) {
        can(AuthorizationActions.Create, Sections.FAQ);
      }

      if (totalCategories < options.categories) {
        can(AuthorizationActions.Create, Sections.CATEGORY);
      }

      if (totalDomains < options.domains) {
        can(AuthorizationActions.Create, Sections.DOMAIN);
      }

      if (options.api) {
        can(AuthorizationActions.Read, Sections.API);
      }

      if (options.embed) {
        can(AuthorizationActions.Read, Sections.EMBEDDING);
      }

      return build({
        detectSubjectType: (item) =>
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          item.constructor
      });
    }
}
