import {Global, Module} from '@nestjs/common';
import {GeneratorService} from "@meetqa/backend/src/services/generator.service";
import {AuthorizationService} from "@meetqa/backend/src/services/authorization/authorization.service";
import {PoliciesGuard} from "@meetqa/backend/src/services/authorization/authorization.guard";
import {StripeService} from "@meetqa/helpers/src/stripe/stripe.service";
import {PublicMiddleware} from "@meetqa/backend/src/services/public.middleware";

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [GeneratorService, AuthorizationService, PublicMiddleware, PoliciesGuard, StripeService],
  get exports() {
    return this.providers;
  }
})
export class ServicesModule {}
