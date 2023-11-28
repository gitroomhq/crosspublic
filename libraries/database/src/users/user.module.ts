import { Module } from '@nestjs/common';
import {UserRepository} from "@meetfaq/database/src/users/user.repository";
import {UserService} from "@meetfaq/database/src/users/user.service";

@Module({
  imports: [],
  controllers: [],
  providers: [UserRepository, UserService],
  get exports() {
    return this.providers;
  }
})
export class UserModule {}
