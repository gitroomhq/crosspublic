import {Global, Module} from "@nestjs/common";
import {PrismaModule} from "@meetfaq/database/src/prisma.module";
import {ApiModule} from "@meetfaq/backend/src/api/api.module";
import {ServicesModule} from "@meetfaq/backend/src/services/services.module";
import {APP_GUARD} from "@nestjs/core";
import {PoliciesGuard} from "@meetfaq/backend/src/services/authorization/authorization.guard";

@Global()
@Module({
  imports: [ApiModule, PrismaModule, ServicesModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard
    }
  ]
})
export class AppModule {

}
