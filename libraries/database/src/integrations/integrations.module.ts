import { Module } from '@nestjs/common';
import {IntegrationsService} from "@meetfaq/database/src/integrations/integrations.service";
import {IntegrationsRepository} from "@meetfaq/database/src/integrations/integrations.repository";

@Module({
  imports: [],
  controllers: [],
  providers: [IntegrationsService, IntegrationsRepository],
  get exports() {
    return this.providers;
  }
})
export class IntegrationsModule {}
