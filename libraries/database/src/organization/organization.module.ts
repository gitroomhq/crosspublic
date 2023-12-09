import { Module } from '@nestjs/common';
import {OrganizationService} from "@crosspublic/database/src/organization/organization.service";
import {OrganizationRepository} from "@crosspublic/database/src/organization/organization.repository";

@Module({
  imports: [],
  controllers: [],
  providers: [OrganizationService, OrganizationRepository],
  get exports() {
    return this.providers;
  }
})
export class OrganizationModule {}
