import {Body, Controller, Post} from "@nestjs/common";
import {OrganizationCreateValidator} from "@meetqa/validators/src/organizations/organization.create.validator";
import {OrganizationService} from "@meetqa/database/src/organization/organization.service";
import {UserService} from "@meetqa/database/src/users/user.service";

@Controller('/auth')
export class AuthController {
  constructor(
    private _organizationService: OrganizationService,
    private _userService: UserService,
  ) {
  }
  @Post('/')
  async getOrCreateOrg(@Body() body: OrganizationCreateValidator) {
    const org= await this._organizationService.getOrCreateOrg(body);
    return this._userService.getOrCreateUser(org.id, body);
  }
}
