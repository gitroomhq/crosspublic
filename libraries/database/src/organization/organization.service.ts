import {Injectable} from "@nestjs/common";
import {OrganizationRepository} from "@meetfaq/database/src/organization/organization.repository";
import {OrganizationCreateValidator} from "@meetfaq/validators/src/organizations/organization.create.validator";
import {DomainSubDomainOrganizationValidator} from "@meetfaq/validators/src/public/domain.subDomain.organization.validator";

@Injectable()
export class OrganizationService {
  constructor(
    private readonly _organizationRepository: OrganizationRepository
  ) {}
  getOrCreateOrg(body: OrganizationCreateValidator) {
    return this._organizationRepository.getOrCreateOrg(body);
  }

  getOrganizationByApiKey(apiKey: string) {
    return this._organizationRepository.getOrganizationByApiKey(apiKey);
  }

  getOrganizationByDomainSubDomain(body: DomainSubDomainOrganizationValidator) {
    return this._organizationRepository.getOrganizationByDomainSubDomain(body);
  }

  getOrganizationDomainSubdomainByOrgId(id: string) {
    return this._organizationRepository.getOrganizationDomainSubdomainByOrgId(id);
  }

  getOrgById(id: string) {
    return this._organizationRepository.getOrgById(id);
  }
}
