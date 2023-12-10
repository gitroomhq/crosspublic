import {Body, Controller, Post} from "@nestjs/common";
import {ApiHeaders, ApiTags} from "@nestjs/swagger";
import {CheckPolicies} from "@crosspublic/backend/src/services/authorization/authorization.ability";
import {AuthorizationActions, Sections} from "@crosspublic/backend/src/services/authorization/authorization.service";
import { Discord, InvitationsValidator, Slack } from "@crosspublic/validators/src/invitations/create.invitations.validator";
import {AuthService} from "@crosspublic/helpers/src/auth/auth.service";
import {IntegrationsService} from "@crosspublic/database/src/integrations/integrations.service";
import {GetUserFromRequest} from "@crosspublic/helpers/src/user/user.from.request";
import {UserInterface} from "@crosspublic/helpers/src/user/user.interface";

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

    if (body.information instanceof Slack) {
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
