import { Module } from '@nestjs/common';
import {OrganizationService} from "@meetqa/database/src/organization/organization.service";
import {OrganizationRepository} from "@meetqa/database/src/organization/organization.repository";

@Module({
  imports: [],
  controllers: [],
  providers: [OrganizationService, OrganizationRepository],
  get exports() {
    return this.providers;
  }
})
export class OrganizationModule {}
