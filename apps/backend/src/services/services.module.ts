import {Global, Module} from '@nestjs/common';
import {GeneratorService} from "@meetqa/backend/src/services/generator.service";
import {AuthorizationService} from "@meetqa/backend/src/services/authorization/authorization.service";
import {PoliciesGuard} from "@meetqa/backend/src/services/authorization/authorization.guard";
import {StripeService} from "@meetqa/helpers/src/stripe/stripe.service";
import {PublicMiddleware} from "@meetqa/backend/src/services/public.middleware";
import {ResponseInterceptor} from "@meetqa/backend/src/services/response.interceptor";
import {OrganizationService} from "@meetqa/database/src/organization/organization.service";
import {RevalidateService} from "@meetqa/helpers/src/revalidate/revalidate.service";

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
    RevalidateService
  ],
  get exports() {
    return this.providers;
  }
})
export class ServicesModule {}
