import {Global, Module} from '@nestjs/common';
import {GeneratorService} from "@meetfaq/backend/src/services/generator.service";
import {AuthorizationService} from "@meetfaq/backend/src/services/authorization/authorization.service";
import {PoliciesGuard} from "@meetfaq/backend/src/services/authorization/authorization.guard";
import {StripeService} from "@meetfaq/helpers/src/stripe/stripe.service";
import {PublicMiddleware} from "@meetfaq/backend/src/services/public.middleware";
import {ResponseInterceptor} from "@meetfaq/backend/src/services/response.interceptor";
import {OrganizationService} from "@meetfaq/database/src/organization/organization.service";
import {RevalidateService} from "@meetfaq/helpers/src/revalidate/revalidate.service";

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
