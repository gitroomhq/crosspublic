import { Module } from '@nestjs/common';
import {IntegrationsService} from "@crosspublic/database/src/integrations/integrations.service";
import {IntegrationsRepository} from "@crosspublic/database/src/integrations/integrations.repository";

@Module({
  imports: [],
  controllers: [],
  providers: [IntegrationsService, IntegrationsRepository],
  get exports() {
    return this.providers;
  }
})
export class IntegrationsModule {}
