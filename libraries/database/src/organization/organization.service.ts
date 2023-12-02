import {HttpException, HttpStatus, Injectable} from "@nestjs/common";
import {OrganizationRepository} from "@meetfaq/database/src/organization/organization.repository";
import {DomainSubDomainOrganizationValidator} from "@meetfaq/validators/src/public/domain.subDomain.organization.validator";
import {RegistrationValidator} from "@meetfaq/validators/src/auth/registration.validator";
import {UserRepository} from "@meetfaq/database/src/users/user.repository";
import {AuthService} from "@meetfaq/helpers/src/auth/auth.service";
import {UpdateStyleValidator} from "@meetfaq/validators/src/organizations/update.style.validator";

@Injectable()
export class OrganizationService {
  constructor(
    private readonly _organizationRepository: OrganizationRepository,
    private readonly _userRepository: UserRepository
  ) {}

  updateStyles(organizationId: string, canEditBranding: boolean, styles: UpdateStyleValidator) {
    return this._organizationRepository.updateStyles(organizationId, canEditBranding, styles);
  }

  getOrganizationStyle(organizationId: string) {
    return this._organizationRepository.getOrgById(organizationId);
  }

  async register(body: RegistrationValidator) {
    const emailExists = await this._userRepository.getUserByEmail(body.email.toLowerCase());
    if (emailExists) {
      throw new HttpException('Email already exists', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const params = [];
    if (body.token) {
      const payload: {guild: string, organizationId: string, internalId: string} = AuthService.verifyJWT(body.token) as never;
      params.push(payload.guild, payload.internalId, payload.organizationId);
    }

    return this._userRepository.register(body,  ...params);
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
