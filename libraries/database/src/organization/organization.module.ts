import { Module } from '@nestjs/common';
import {OrganizationService} from "@meetfaq/database/src/organization/organization.service";
import {OrganizationRepository} from "@meetfaq/database/src/organization/organization.repository";

@Module({
  imports: [],
  controllers: [],
  providers: [OrganizationService, OrganizationRepository],
  get exports() {
    return this.providers;
  }
})
export class OrganizationModule {}
