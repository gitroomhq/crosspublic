import {Global, MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {AuthController} from "@meetfaq/backend/src/api/auth.controller";
import {UsersController} from "@meetfaq/backend/src/api/users.controller";
import {AuthMiddleware} from "@meetfaq/backend/src/services/auth.middleware";
import {FaqController} from "@meetfaq/backend/src/api/faq.controller";
import {CategoriesController} from "@meetfaq/backend/src/api/categories.controller";
import {SettingsController} from "@meetfaq/backend/src/api/settings.controller";
import {StripeController} from "@meetfaq/backend/src/api/stripe.controller";
import {BillingController} from "@meetfaq/backend/src/api/billing.controller";
import {PublicMiddleware} from "@meetfaq/backend/src/services/public.middleware";
import {PublicOrganizationController} from "@meetfaq/backend/src/api/public/public.organization.controller";
import {PublicFaqController} from "@meetfaq/backend/src/api/public/public.faq.controller";
import {PublicCategoriesController} from "@meetfaq/backend/src/api/public/public.categories.controller";
import {StylesController} from "@meetfaq/backend/src/api/styles.controller";
import {IntegrationsController} from "@meetfaq/backend/src/api/integrations.controller";

const publicControllers = [
  PublicOrganizationController,
  PublicCategoriesController,
  PublicFaqController,
];

const authenticatedControllers = [
  ...publicControllers,
  UsersController,
  FaqController,
  CategoriesController,
  SettingsController,
  BillingController,
  StylesController,
  IntegrationsController
];
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
