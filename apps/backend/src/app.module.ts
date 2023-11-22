import {Global, Module} from "@nestjs/common";
import {PrismaModule} from "@meetqa/database/src/prisma.module";
import {ApiModule} from "@meetqa/backend/src/api/api.module";
import {ServicesModule} from "@meetqa/backend/src/services/services.module";
import {APP_GUARD, APP_INTERCEPTOR} from "@nestjs/core";
import {PoliciesGuard} from "@meetqa/backend/src/services/authorization/authorization.guard";
import {ResponseInterceptor} from "@meetqa/backend/src/services/response.interceptor";

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
