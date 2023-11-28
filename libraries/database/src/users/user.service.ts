import {Injectable} from "@nestjs/common";
import {OrganizationCreateValidator} from "@meetfaq/validators/src/organizations/organization.create.validator";
import {UserRepository} from "@meetfaq/database/src/users/user.repository";

@Injectable()
export class UserService {
  constructor(
    private readonly _userRepository: UserRepository
  ) {}
  getOrCreateUser(orgId: string, body: OrganizationCreateValidator) {
    return this._userRepository.getOrCreateUser(orgId, body);
  }
}
