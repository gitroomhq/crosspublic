import {Body, Controller, Delete, Get, Param, Post} from "@nestjs/common";
import {SettingsService} from "@crosspublic/database/src/settings/settings.service";
import {GetUserFromRequest} from "@crosspublic/helpers/src/user/user.from.request";
import {UserInterface} from "@crosspublic/helpers/src/user/user.interface";
import {CheckSubdomainValidator} from "@crosspublic/validators/src/settings/check.subdomain.validator";
import {IdStringValidator} from "@crosspublic/validators/src/general/id.string.validator";
import {AddDomainValidator} from "@crosspublic/validators/src/settings/add.domain.validator";
import {CheckPolicies} from "@crosspublic/backend/src/services/authorization/authorization.ability";
import {AuthorizationActions, Sections} from "@crosspublic/backend/src/services/authorization/authorization.service";
import {Revalidate} from "@crosspublic/backend/src/services/revalidate";
import {RevalidateService} from "@crosspublic/helpers/src/revalidate/revalidate.service";
import {OrganizationService} from "@crosspublic/database/src/organization/organization.service";
import {ApiHeaders, ApiTags} from "@nestjs/swagger";

@ApiTags('Settings')
@Controller('/settings')
@ApiHeaders([{name: 'auth', required: true}])
export class SettingsController {
  constructor(
    private readonly _settingsService: SettingsService,
    private readonly _organizationService: OrganizationService,
    private _revalidateService: RevalidateService
  ) {
  }

  @Get('/')
  getSettings(
    @GetUserFromRequest() user: UserInterface
  ) {
    return this._settingsService.getSettings(user.organization.organizationId, user.organization.role);
  }

  @Post('/check-subdomain')
  async checkSubdomain(
      @GetUserFromRequest() user: UserInterface,
      @Body() body: CheckSubdomainValidator
  ) {
    const check = await this._settingsService.checkSubdomain(user.organization.organizationId, body.subDomain);
    return {exists: !!check}
  }

  @Get('/check-domain/:id')
  async checkDomain(
      @GetUserFromRequest() user: UserInterface,
      @Param() body: IdStringValidator,
  ) {
    return this._settingsService.checkDomain(user.organization.organizationId, body.id);
  }

  @Revalidate()
  @Delete('/delete-domain/:id')
  async deleteDomain(
      @GetUserFromRequest() user: UserInterface,
      @Param() body: IdStringValidator,
  ) {
    const getCurrentSubdomain = await this._organizationService.getOrganizationDomainSubdomainByOrgId(user.organization.organizationId);
    const domain = await this._settingsService.deleteDomain(user.organization.organizationId, body.id);
    this._revalidateService.revalidate(getCurrentSubdomain?.domains?.[0]?.domain);
    return domain;
  }

  @Revalidate()
  @CheckPolicies([AuthorizationActions.Create, Sections.DOMAIN])
  @Post('/domain')
  async addDomain(
      @GetUserFromRequest() user: UserInterface,
      @Body() body: AddDomainValidator,
  ) {
    const getCurrentSubdomain = await this._organizationService.getOrganizationDomainSubdomainByOrgId(user.organization.organizationId);
    const domain = await this._settingsService.addDomain(user.organization.organizationId, body.domain);
    this._revalidateService.revalidate(getCurrentSubdomain.subDomain);
    return domain;
  }

  @Revalidate()
  @Post('/subDomain')
  async subDomain(
      @GetUserFromRequest() user: UserInterface,
      @Body() body: CheckSubdomainValidator,
  ) {
    const getCurrentSubdomain = await this._organizationService.getOrganizationDomainSubdomainByOrgId(user.organization.organizationId);
    const change = await this._settingsService.changeSubDomain(user.organization.organizationId, body.subDomain);
    this._revalidateService.revalidate(getCurrentSubdomain.subDomain);
    return change;
  }
}
