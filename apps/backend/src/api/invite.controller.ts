import {Body, Controller, Post} from "@nestjs/common";
import {ApiHeaders, ApiTags} from "@nestjs/swagger";
import {CheckPolicies} from "@meetfaq/backend/src/services/authorization/authorization.ability";
import {AuthorizationActions, Sections} from "@meetfaq/backend/src/services/authorization/authorization.service";
import {Discord, InvitationsValidator} from "@meetfaq/validators/src/invitations/create.invitations.validator";
import {AuthService} from "@meetfaq/helpers/src/auth/auth.service";
import {IntegrationsService} from "@meetfaq/database/src/integrations/integrations.service";
import {GetUserFromRequest} from "@meetfaq/helpers/src/user/user.from.request";
import {UserInterface} from "@meetfaq/helpers/src/user/user.interface";

@ApiTags('Invitations')
@Controller('/invite')
@ApiHeaders([{name: 'auth', required: true}])
export class InviteController {
  constructor(
    private _integrationService: IntegrationsService,
  ) {
  }

  @Post('/')
  @CheckPolicies([AuthorizationActions.Create, Sections.USERS])
  async create(
    @GetUserFromRequest() user: UserInterface,
    @Body() body: InvitationsValidator
  ) {
    if (body.information instanceof Discord) {
      return {
        url: process.env.FRONTEND_URL + '/api/join/' + AuthService.signJWT({
          type: 'discord',
          internalId: body.information.internalId,
          guild: body.information.guild,
          organizationId: user.organization.organizationId
        })
      };
    }

    return false;
  }

  @Post('/add')
  @CheckPolicies([AuthorizationActions.Create, Sections.USERS])
  async add(
    @GetUserFromRequest() user: UserInterface,
    @Body('token') body: string
  ) {
    const token: any = AuthService.verifyJWT(body);
    if (token.type === 'discord') {
      return this._integrationService.addUserToIntegration(user.organization.organizationId, token.guild, token.internalId);
    }
  }
}
