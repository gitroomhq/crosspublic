import {Injectable} from "@nestjs/common";
import {UserRepository} from "@crosspublic/database/src/users/user.repository";

@Injectable()
export class UserService {
  constructor(
    private readonly _userRepository: UserRepository
  ) {}

  getUserByEmail(email: string) {
    return this._userRepository.getUserByEmail(email);
  }

  totalUsersByOrganizationId(orgId: string) {
    return this._userRepository.totalUsersByOrganizationId(orgId);
  }
}
