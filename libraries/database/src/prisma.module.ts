import {Global, Module} from '@nestjs/common';
import {OrganizationModule} from "@meetfaq/database/src/organization/organization.module";
import {PrismaRepository, PrismaService} from "@meetfaq/database/src/prisma.service";
import {UserModule} from "@meetfaq/database/src/users/user.module";
import {JobsModule} from "@meetfaq/database/src/jobs/jobs.module";
import {SubscriptionModule} from "@meetfaq/database/src/subscription/subscription.module";
import {CategoryModule} from "@meetfaq/database/src/categories/category.module";
import {FaqModule} from "@meetfaq/database/src/faq/faq.module";
import {DomainModule} from "@meetfaq/database/src/domains/domain.module";
import {SettingsModule} from "@meetfaq/database/src/settings/settings.module";

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
