import {Body, Controller, Delete, Get, Param, Post, Query} from "@nestjs/common";
import {SettingsService} from "@meetqa/database/src/settings/settings.service";
import {GetUserFromRequest} from "@meetqa/helpers/src/user/user.from.request";
import {UserInterface} from "@meetqa/helpers/src/user/user.interface";
import {CheckSubdomainValidator} from "@meetqa/validators/src/settings/check.subdomain.validator";
import {IdStringValidator} from "@meetqa/validators/src/general/id.string.validator";
import {AddDomainValidator} from "@meetqa/validators/src/settings/add.domain.validator";
import {CheckPolicies} from "@meetqa/backend/src/services/authorization/authorization.ability";
import {AuthorizationActions, Sections} from "@meetqa/backend/src/services/authorization/authorization.service";

@Controller('/settings')
export class SettingsController {
  constructor(
    private readonly settingsService: SettingsService,
  ) {
  }

  @Get('/')
  getSettings(
    @GetUserFromRequest() user: UserInterface
  ) {
    return this.settingsService.getSettings(user.organization.organizationId);
  }

  @Post('/check-subdomain')
  async checkSubdomain(
      @GetUserFromRequest() user: UserInterface,
      @Body() body: CheckSubdomainValidator
  ) {
    const check = await this.settingsService.checkSubdomain(user.organization.organizationId, body.subDomain);
    return {exists: !!check}
  }

  @Get('/check-domain/:id')
  async checkDomain(
      @GetUserFromRequest() user: UserInterface,
      @Param() body: IdStringValidator,
  ) {
    return this.settingsService.checkDomain(user.organization.organizationId, body.id);
  }

  @Delete('/delete-domain/:id')
  async deleteDomain(
      @GetUserFromRequest() user: UserInterface,
      @Param() body: IdStringValidator,
  ) {
    return this.settingsService.deleteDomain(user.organization.organizationId, body.id);
  }

  @CheckPolicies([AuthorizationActions.Create, Sections.DOMAIN])
  @Post('/domain')
  async addDomain(
      @GetUserFromRequest() user: UserInterface,
      @Body() body: AddDomainValidator,
  ) {
    return this.settingsService.addDomain(user.organization.organizationId, body.domain);
  }

  @Post('/subDomain')
  async subDomain(
      @GetUserFromRequest() user: UserInterface,
      @Body() body: CheckSubdomainValidator,
  ) {
    return this.settingsService.changeSubDomain(user.organization.organizationId, body.subDomain);
  }
}
