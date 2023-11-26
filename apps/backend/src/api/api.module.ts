import {Global, MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {AuthController} from "@meetqa/backend/src/api/auth.controller";
import {UsersController} from "@meetqa/backend/src/api/users.controller";
import {AuthMiddleware} from "@meetqa/backend/src/services/auth.middleware";
import {FaqController} from "@meetqa/backend/src/api/faq.controller";
import {CategoriesController} from "@meetqa/backend/src/api/categories.controller";
import {SettingsController} from "@meetqa/backend/src/api/settings.controller";
import {StripeController} from "@meetqa/backend/src/api/stripe.controller";
import {BillingController} from "@meetqa/backend/src/api/billing.controller";
import {PublicMiddleware} from "@meetqa/backend/src/services/public.middleware";
import {PublicOrganizationController} from "@meetqa/backend/src/api/public/public.organization.controller";
import {PublicFaqController} from "@meetqa/backend/src/api/public/public.faq.controller";
import {PublicCategoriesController} from "@meetqa/backend/src/api/public/public.categories.controller";

const publicControllers = [
  PublicOrganizationController,
  PublicCategoriesController,
  PublicFaqController,
];

const authenticatedControllers = [...publicControllers, UsersController, FaqController, CategoriesController, SettingsController, BillingController];
@Global()
@Module({
  imports: [],
  controllers: [AuthController, StripeController, ...authenticatedControllers],
})
export class ApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware, PublicMiddleware).forRoutes(...authenticatedControllers);
  }
}
