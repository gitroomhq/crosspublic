import {Body, Controller, Delete, Get, Param, Post} from "@nestjs/common";
import {ApiHeaders, ApiTags} from "@nestjs/swagger";
import {GetUserFromRequest} from "@crosspublic/helpers/src/user/user.from.request";
import {UserInterface} from "@crosspublic/helpers/src/user/user.interface";
import {IntegrationsService} from "@crosspublic/database/src/integrations/integrations.service";
import {IntegrationsTypeValidator} from "@crosspublic/validators/src/integrations/integrations.type.validator";
import {CheckPolicies} from "@crosspublic/backend/src/services/authorization/authorization.ability";
import {AuthorizationActions, Sections} from "@crosspublic/backend/src/services/authorization/authorization.service";
import {CreateIntegrationValidator, Discord, Slack} from "@crosspublic/validators/src/integrations/create.integration.validator";
import {IdStringValidator} from "@crosspublic/validators/src/general/id.string.validator";
import { InstallProvider } from "@slack/oauth";
import { slackProps } from "@crosspublic/helpers/src/slack/slack.props";

const installProvider = new InstallProvider({
  ...slackProps
});

@ApiTags('Integrations')
@Controller('/integrations')
@ApiHeaders([{name: 'auth', required: true}])
export class IntegrationsController {
  constructor(
    private readonly _integrationsService: IntegrationsService
  ) {
  }

  @Get('/')
  async getIntegrations(
    @GetUserFromRequest() user: UserInterface
  ) {
    return this._integrationsService.getIntegrationByOrganizationId(user.organization.organizationId);
  }

  @Get('/:type/add')
  @CheckPolicies([AuthorizationActions.Create, Sections.INTEGRATIONS])
  async createIntegration(
    @Param() type: IntegrationsTypeValidator
  ) {
    if (type.type === "discord") {
      return {
        url: `https://discord.com/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT}&response_type=code&permissions=17179880448&scope=identify%20email%20guilds%20bot&redirect_uri=${encodeURIComponent(`${process.env.FRONTEND_URL}/api/integrations/discord`)}`
      }
    }

    if (type.type === 'slack') {
      const url = await installProvider.generateInstallUrl({
        scopes: slackProps.scopes
      });

      return {
        url
      }
    }
  }
  @Post('/')
  @CheckPolicies([AuthorizationActions.Create, Sections.INTEGRATIONS])
  async create(
    @GetUserFromRequest() user: UserInterface,
    @Body() body: CreateIntegrationValidator
  ) {
    if (body.information instanceof Discord) {
      return this._integrationsService.createDiscordIntegration(user.organization.organizationId, body.information);
    }
    if (body.information instanceof Slack) {
      return this._integrationsService.createSlackIntegration(user.organization.organizationId, body.information);
    }
  }

  @Delete('/:id')
  async delete(
    @GetUserFromRequest() user: UserInterface,
    @Param() id: IdStringValidator
  ) {
    return this._integrationsService.deleteIntegration(user.organization.organizationId, id.id);
  }
}
