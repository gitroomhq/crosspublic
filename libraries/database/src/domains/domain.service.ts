import {Injectable} from "@nestjs/common";
import {DomainRepository} from "@meetqa/database/src/domains/domain.repository";

@Injectable()
export class DomainService {
  constructor(
    private readonly _domainRepository: DomainRepository
  ) {}

  totalDomainsByOrganizationId(organizationId: string) {
    return this._domainRepository.totalDomainsByOrganizationId(organizationId);
  }
}
