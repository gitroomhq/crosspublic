import {Global, Module} from '@nestjs/common';
import {GeneratorService} from "@crosspublic/backend/src/services/generator.service";
import {AuthorizationService} from "@crosspublic/backend/src/services/authorization/authorization.service";
import {PoliciesGuard} from "@crosspublic/backend/src/services/authorization/authorization.guard";
import {StripeService} from "@crosspublic/helpers/src/stripe/stripe.service";
import {PublicMiddleware} from "@crosspublic/backend/src/services/public.middleware";
import {ResponseInterceptor} from "@crosspublic/backend/src/services/response.interceptor";
import {OrganizationService} from "@crosspublic/database/src/organization/organization.service";
import {RevalidateService} from "@crosspublic/helpers/src/revalidate/revalidate.service";
import {AlgoliaService} from "@crosspublic/helpers/src/algolia/algolia.service";

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    GeneratorService,
    AuthorizationService,
    PublicMiddleware,
    ResponseInterceptor,
    PoliciesGuard,
    StripeService,
    OrganizationService,
    RevalidateService,
    AlgoliaService
  ],
  get exports() {
    return this.providers;
  }
})
export class ServicesModule {}
