import {Controller, Get} from "@nestjs/common";
import {GetUserFromRequest} from "@meetqa/helpers/src/user/user.from.request";
import {UserInterface} from "@meetqa/helpers/src/user/user.interface";
import {AuthService} from "@meetqa/helpers/src/auth/auth.service";

@Controller('/users')
export class UsersController {
  @Get('/sign-in')
  async signIn(@GetUserFromRequest() user: UserInterface) {
    const url = process.env.FRONTEND_URL + '/dashboard?auth=' + AuthService.signJWT(user);
    return {url};
  }

  @Get('/self')
  getUser(@GetUserFromRequest() user: UserInterface) {
    return user;
  }
}
