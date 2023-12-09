import {Controller, Get} from "@nestjs/common";
import {OrganizationService} from "@crosspublic/database/src/organization/organization.service";
import {ApiHeaders, ApiOperation, ApiTags} from "@nestjs/swagger";
import {GetOrganizationFromRequest, OrganizationFromRequest} from "@crosspublic/helpers/src/user/organization.from.request";

@ApiTags('Public')
@Controller('/public/styles')
@ApiHeaders([{name: 'apikey', required: true}])
export class PublicStyleController {
    constructor(
        private _organizationService: OrganizationService,
    ) {
    }

  @Get('/')
  @ApiOperation({summary: 'Get organization style', description: "Get organization style \n\n **[WARNING]**: This endpoint requires the PRO package"})
  async getOrganizationStyle(
    @GetOrganizationFromRequest() organization: OrganizationFromRequest
  ) {
    const {
      name,
      topBarColor,
      topBarTextColor,
      backgroundColor,
      pageTextColor,
      pageBlockColor,
      brandingText
    } = await this._organizationService.getOrganizationStyle(organization.id);

    return {
      name,
      topBarColor,
      topBarTextColor,
      backgroundColor,
      pageTextColor,
      pageBlockColor,
      brandingText,
    }
  }
}
