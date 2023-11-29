import {Controller, Get, Post} from "@nestjs/common";
import {GetUserFromRequest} from "@meetfaq/helpers/src/user/user.from.request";
import {UserInterface} from "@meetfaq/helpers/src/user/user.interface";
import {AuthService} from "@meetfaq/helpers/src/auth/auth.service";
import {OrganizationService} from "@meetfaq/database/src/organization/organization.service";
import * as process from "process";
import {RevalidateService} from "@meetfaq/helpers/src/revalidate/revalidate.service";
import {ApiHeaders, ApiTags} from "@nestjs/swagger";

@ApiTags('Users')
@Controller('/users')
@ApiHeaders([{name: 'apikey', required: true}])
export class UsersController {
  constructor(
    private _organizationService: OrganizationService,
    private _revalidateService: RevalidateService
  ) {
  }
  @Get('/sign-in')
  async signIn(@GetUserFromRequest() user: UserInterface) {
    const url = process.env.FRONTEND_URL + '/?auth=' + AuthService.signJWT(user);
    return {url};
  }

  @Get('/self')
  getUser(@GetUserFromRequest() user: UserInterface) {
    return user;
  }

  @Post('/revalidate')
  async revalidate(@GetUserFromRequest() user: UserInterface) {
    const domainSubDomain = await this._organizationService.getOrganizationDomainSubdomainByOrgId(user.organization.organizationId);
    if (!domainSubDomain) {
      return ;
    }
    const name = domainSubDomain?.domains?.[0]?.domain || domainSubDomain?.subDomain;
    this._revalidateService.revalidate(name);
    return user;
  }
}
