import {Injectable} from "@nestjs/common";
import {OrganizationRepository} from "@meetqa/database/src/organization/organization.repository";
import {OrganizationCreateValidator} from "@meetqa/validators/src/organizations/organization.create.validator";

@Injectable()
export class OrganizationService {
  constructor(
    private readonly _organizationRepository: OrganizationRepository
  ) {}
  getOrCreateOrg(body: OrganizationCreateValidator) {
    return this._organizationRepository.getOrCreateOrg(body);
  }

  getOrgById(id: string) {
    return this._organizationRepository.getOrgById(id);
  }
}
