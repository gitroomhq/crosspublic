import {Body, Controller, Headers, Post} from "@nestjs/common";
import {OrganizationCreateValidator} from "@meetfaq/validators/src/organizations/organization.create.validator";
import {OrganizationService} from "@meetfaq/database/src/organization/organization.service";
import {UserService} from "@meetfaq/database/src/users/user.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
@ApiTags('Authentications')
@Controller('/auth')
export class AuthController {
  constructor(
    private _organizationService: OrganizationService,
    private _userService: UserService,
  ) {
  }
  @ApiOperation({summary: 'Get or create organization', description: 'This will mostly be used by the different chat app to SSO without username and password'})
  @Post('/')
  async getOrCreateOrg(
      @Body() body: OrganizationCreateValidator,
      @Headers('serverkey') serverkey: string
  ) {
    if (serverkey !== process.env.BACKEND_TOKEN_PROTECTOR) {
      return 401;
    }
    const org= await this._organizationService.getOrCreateOrg(body);
    return this._userService.getOrCreateUser(org.id, body);
  }
}
