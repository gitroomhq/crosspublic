import {Global, Module} from '@nestjs/common';
import {OrganizationModule} from "@meetqa/database/src/organization/organization.module";
import {PrismaRepository, PrismaService} from "@meetqa/database/src/prisma.service";
import {UserModule} from "@meetqa/database/src/users/user.module";
import {JobsModule} from "@meetqa/database/src/jobs/jobs.module";
import {SubscriptionModule} from "@meetqa/database/src/subscription/subscription.module";
import {CategoryModule} from "@meetqa/database/src/categories/category.module";
import {FaqModule} from "@meetqa/database/src/faq/faq.module";
import {DomainModule} from "@meetqa/database/src/domains/domain.module";
import {SettingsModule} from "@meetqa/database/src/settings/settings.module";

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
    JobsModule
  ],
  controllers: [],
  providers: [PrismaService, PrismaRepository],
  get exports() {
    return [...this.imports, ...this.providers];
  }
})
export class PrismaModule {}
