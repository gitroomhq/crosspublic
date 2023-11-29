import {Body, Controller, Headers, HttpStatus, Post, Res} from "@nestjs/common";
import {OrganizationCreateValidator} from "@meetfaq/validators/src/organizations/organization.create.validator";
import {OrganizationService} from "@meetfaq/database/src/organization/organization.service";
import {UserService} from "@meetfaq/database/src/users/user.service";
import {ApiOperation, ApiTags} from "@nestjs/swagger";
import {RegistrationValidator} from "@meetfaq/validators/src/auth/registration.validator";
import {Response} from "express";
import {AuthService} from "@meetfaq/helpers/src/auth/auth.service";
import {removeSubdomain} from "@meetfaq/helpers/src/subdomain/subdomain.management";
import {LoginValidator} from "@meetfaq/validators/src/auth/login.validator";
import {compareSync} from "bcrypt";
import {IntegrationsService} from "@meetfaq/database/src/integrations/integrations.service";
@ApiTags('Authentications')
@Controller('/auth')
export class AuthController {
  constructor(
    private _organizationService: OrganizationService,
    private _userService: UserService,
    private _integrationService: IntegrationsService,
  ) {
  }
  @ApiOperation({summary: 'Check org and user', description: 'Checking that the bot that in the server is actually authenticated'})
  @Post('/')
  async checkOrgAndUser(
    @Body() body: OrganizationCreateValidator,
    @Headers('serverkey') serverkey: string
  ) {
    if (serverkey !== process.env.BACKEND_TOKEN_PROTECTOR) {
      return 401;
    }
    const user = await this._integrationService.findByGuildAndId(body.guildId, body.internalId);
    if (!user?.users?.[0]) {
      return ;
    }

    const organization = await this._organizationService.getOrgById(user.organizationId);
    return {
      organization: {
        organizationId: organization.id,
      }
    }
  }

  @ApiOperation({summary: 'Register to MeetFAQ', description: 'This will create an organization and a user'})
  @Post('/registration')
  async register(
    @Body() body: RegistrationValidator,
    @Res() res: Response
  ) {
    const register = await this._organizationService.register(body);
    const obj = {
      id: register.id,
      email: register.email,
      name: register.name,
      organization: register.organization[0],
    }

    res.cookie('auth', AuthService.signJWT(obj), {
      path: '/',
      sameSite: false,
      // secure: true,
      httpOnly: true,
      domain: '.' + new URL(removeSubdomain(process.env.FRONTEND_URL!)).hostname
    });

    return res.status(HttpStatus.OK).json({created: true});
  }

  @ApiOperation({summary: 'Login to MeetFAQ', description: 'This will login the user'})
  @Post('/login')
  async login(
    @Body() body: LoginValidator,
    @Res() res: Response
  ) {
    const user = await this._userService.getUserByEmail(body.email);
    if (!user) {
      return res.status(HttpStatus.UNAUTHORIZED).json({error: 'Invalid credentials'});
    }

    if (!compareSync(body.password, user.password)) {
      return res.status(HttpStatus.UNAUTHORIZED).json({error: 'Invalid credentials'});
    }

    const obj = {
      id: user.id,
      email: user.email,
      name: user.name,
      organization: user.organization[0]
    }

    res.cookie('auth', AuthService.signJWT(obj), {
      path: '/',
      sameSite: false,
      // secure: true,
      httpOnly: true,
      domain: '.' + new URL(removeSubdomain(process.env.FRONTEND_URL!)).hostname
    });

    return res.status(HttpStatus.OK).json({created: true});
  }
}
