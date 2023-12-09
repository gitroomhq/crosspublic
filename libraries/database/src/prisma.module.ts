import {Global, Module} from '@nestjs/common';
import {OrganizationModule} from "@crosspublic/database/src/organization/organization.module";
import {PrismaRepository, PrismaService} from "@crosspublic/database/src/prisma.service";
import {UserModule} from "@crosspublic/database/src/users/user.module";
import {JobsModule} from "@crosspublic/database/src/jobs/jobs.module";
import {SubscriptionModule} from "@crosspublic/database/src/subscription/subscription.module";
import {CategoryModule} from "@crosspublic/database/src/categories/category.module";
import {FaqModule} from "@crosspublic/database/src/faq/faq.module";
import {DomainModule} from "@crosspublic/database/src/domains/domain.module";
import {SettingsModule} from "@crosspublic/database/src/settings/settings.module";
import {IntegrationsModule} from "@crosspublic/database/src/integrations/integrations.module";

@Global()
@Module({
  imports: [
    OrganizationModule,
    UserModule,
    SubscriptionModule,
    FaqModule,
    DomainModule,
    CategoryModule,
    SettingsModule,
    IntegrationsModule,
    JobsModule
  ],
  controllers: [],
  providers: [PrismaService, PrismaRepository],
  get exports() {
    return [...this.imports, ...this.providers];
  }
})
export class PrismaModule {}
