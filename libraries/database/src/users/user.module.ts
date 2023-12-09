import { Module } from '@nestjs/common';
import {UserRepository} from "@crosspublic/database/src/users/user.repository";
import {UserService} from "@crosspublic/database/src/users/user.service";

@Module({
  imports: [],
  controllers: [],
  providers: [UserRepository, UserService],
  get exports() {
    return this.providers;
  }
})
export class UserModule {}
