import {Injectable} from "@nestjs/common";
import {OrganizationCreateValidator} from "@meetqa/validators/src/organizations/organization.create.validator";
import {UserRepository} from "@meetqa/database/src/users/user.repository";

@Injectable()
export class UserService {
  constructor(
    private readonly _userRepository: UserRepository
  ) {}
  getOrCreateUser(orgId: string, body: OrganizationCreateValidator) {
    return this._userRepository.getOrCreateUser(orgId, body);
  }
}
