import {Controller, Get} from "@nestjs/common";
import {ApiHeaders, ApiTags} from "@nestjs/swagger";
import {OrganizationService} from "@meetfaq/database/src/organization/organization.service";
import {GetUserFromRequest} from "@meetfaq/helpers/src/user/user.from.request";
import {UserInterface} from "@meetfaq/helpers/src/user/user.interface";

@ApiTags('Styles')
@Controller('/styles')
@ApiHeaders([{name: 'apikey', required: true}])
export class StylesController {
  constructor(
    private readonly _organizationService: OrganizationService
  ) {
  }

  @Get('/')
  async getStyles(
    @GetUserFromRequest() user: UserInterface
  ) {
    const {name, pageColor, primaryColor, removeBranding, secondaryColor, brandingText, topBarColor} = await this._organizationService.getOrgById(user.organization.organizationId);
    return {
      name,
      pageColor,
      primaryColor,
      removeBranding,
      secondaryColor,
      brandingText,
      topBarColor
    }
  }
}
