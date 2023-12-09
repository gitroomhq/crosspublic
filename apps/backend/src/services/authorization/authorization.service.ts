import {SubscriptionService} from "@crosspublic/database/src/subscription/subscription.service";
import {Ability, AbilityBuilder, AbilityClass} from "@casl/ability";
import {FaqService} from "@crosspublic/database/src/faq/faq.service";
import {CategoryService} from "@crosspublic/database/src/categories/category.service";
import {DomainService} from "@crosspublic/database/src/domains/domain.service";
import {Injectable} from "@nestjs/common";
import {pricing} from "@crosspublic/helpers/src/pricing/pricing";
import {IntegrationsService} from "@crosspublic/database/src/integrations/integrations.service";
import {UserService} from "@crosspublic/database/src/users/user.service";

export enum Sections {
    FAQ = 'faq',
    CATEGORY = 'category',
    INTEGRATIONS = 'integrations',
    DOMAIN = 'domain',
    EMBEDDING = 'embedding',
    USERS = 'users',
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
    private _integrationsService: IntegrationsService,
    private _userService: UserService
  ) {
  }
    async getPackageOptions(orgId: string) {
        const subscription = await this._subscriptionService.getSubscriptionByOrganizationId(orgId);
        return pricing[subscription?.subscriptionTier || !process.env.PAYMENT_PUBLIC_KEY ? 'PRO' : 'FREE'];
    }

    async check(orgId: string) {
      const { can, build } = new AbilityBuilder<Ability<[AuthorizationActions, Sections]>>(Ability as AbilityClass<AppAbility>);

      const options  = await this.getPackageOptions(orgId);
      const totalFaqs                   = await this._faqService.totalFaqByOrganizationId(orgId);
      const totalCategories             = await this._categoryService.totalCategoriesByOrganizationId(orgId);
      const totalDomains                = await this._domainService.totalDomainsByOrganizationId(orgId);
      const totalIntegrations           = await this._integrationsService.totalIntegrationsByOrganizationId(orgId);
      const totalUsers                  = await this._userService.totalUsersByOrganizationId(orgId);

      can(AuthorizationActions.Update, Sections.FAQ);
      can(AuthorizationActions.Delete, Sections.FAQ);
      can(AuthorizationActions.Delete, Sections.INTEGRATIONS);
      can(AuthorizationActions.Read, Sections.FAQ);
      can(AuthorizationActions.Read, Sections.CATEGORY);
      can(AuthorizationActions.Update, Sections.CATEGORY);
      can(AuthorizationActions.Delete, Sections.CATEGORY);

      if (!process.env.PAYMENT_PUBLIC_KEY || totalUsers < options.user) {
        can(AuthorizationActions.Create, Sections.USERS);
      }

      if (!process.env.PAYMENT_PUBLIC_KEY || totalFaqs < options.faq) {
        can(AuthorizationActions.Create, Sections.FAQ);
      }

      if (!process.env.PAYMENT_PUBLIC_KEY || totalIntegrations < options.integrations) {
        can(AuthorizationActions.Create, Sections.INTEGRATIONS);
      }

      if (!process.env.PAYMENT_PUBLIC_KEY || totalCategories < options.categories) {
        can(AuthorizationActions.Create, Sections.CATEGORY);
      }

      if (!process.env.PAYMENT_PUBLIC_KEY || totalDomains < options.domains) {
        can(AuthorizationActions.Create, Sections.DOMAIN);
      }

      if (!process.env.PAYMENT_PUBLIC_KEY || options.api) {
        can(AuthorizationActions.Read, Sections.API);
      }

      if (!process.env.PAYMENT_PUBLIC_KEY || options.embed) {
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
