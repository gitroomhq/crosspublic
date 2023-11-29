import {Injectable} from "@nestjs/common";
import {UserRepository} from "@meetfaq/database/src/users/user.repository";

@Injectable()
export class UserService {
  constructor(
    private readonly _userRepository: UserRepository
  ) {}

  getUserByEmail(email: string) {
    return this._userRepository.getUserByEmail(email);
  }
}
