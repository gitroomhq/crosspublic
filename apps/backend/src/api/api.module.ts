import {Global, MiddlewareConsumer, Module, NestModule} from "@nestjs/common";
import {AuthController} from "@crosspublic/backend/src/api/auth.controller";
import {UsersController} from "@crosspublic/backend/src/api/users.controller";
import {AuthMiddleware} from "@crosspublic/backend/src/services/auth.middleware";
import {FaqController} from "@crosspublic/backend/src/api/faq.controller";
import {CategoriesController} from "@crosspublic/backend/src/api/categories.controller";
import {SettingsController} from "@crosspublic/backend/src/api/settings.controller";
import {StripeController} from "@crosspublic/backend/src/api/stripe.controller";
import {BillingController} from "@crosspublic/backend/src/api/billing.controller";
import {PublicMiddleware} from "@crosspublic/backend/src/services/public.middleware";
import {PublicOrganizationController} from "@crosspublic/backend/src/api/public/public.organization.controller";
import {PublicFaqController} from "@crosspublic/backend/src/api/public/public.faq.controller";
import {PublicCategoriesController} from "@crosspublic/backend/src/api/public/public.categories.controller";
import {StylesController} from "@crosspublic/backend/src/api/styles.controller";
import {IntegrationsController} from "@crosspublic/backend/src/api/integrations.controller";
import {InviteController} from "@crosspublic/backend/src/api/invite.controller";
import {PublicStyleController} from "@crosspublic/backend/src/api/public/public.style.controller";

const publicControllers = [
  PublicOrganizationController,
  PublicCategoriesController,
  PublicFaqController,
  PublicStyleController
];

const authenticatedControllers = [
  ...publicControllers,
  UsersController,
  FaqController,
  CategoriesController,
  SettingsController,
  BillingController,
  StylesController,
  IntegrationsController,
  InviteController
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
