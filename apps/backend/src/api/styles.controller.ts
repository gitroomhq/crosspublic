import {Body, Controller, Get, Put} from "@nestjs/common";
import {ApiHeaders, ApiTags} from "@nestjs/swagger";
import {GetUserFromRequest} from "@crosspublic/helpers/src/user/user.from.request";
import {UserInterface} from "@crosspublic/helpers/src/user/user.interface";
import {SubscriptionService} from "@crosspublic/database/src/subscription/subscription.service";
import {OrganizationService} from "@crosspublic/database/src/organization/organization.service";
import {pricing} from "@crosspublic/helpers/src/pricing/pricing";
import {Revalidate} from "@crosspublic/backend/src/services/revalidate";
import {UpdateStyleValidator} from "@crosspublic/validators/src/organizations/update.style.validator";

@ApiTags('Styles')
@Controller('/styles')
@ApiHeaders([{name: 'auth', required: true}])
export class StylesController {
  constructor(
    private readonly _subscriptionService: SubscriptionService,
    private readonly _organizationService: OrganizationService
  ) {
  }

  @Get('/')
  async getStyles(
    @GetUserFromRequest() user: UserInterface
  ) {
    const subscription = await this._subscriptionService.getSubscriptionByOrganizationId(user.organization.organizationId);
    const canEditBranding = !subscription ? false : pricing[subscription.subscriptionTier].domains > 0;
    const {name, brandingText, pageBlockColor, topBarColor, topBarTextColor, backgroundColor, pageTextColor} = await this._organizationService.getOrgById(user.organization.organizationId);
    return {
      name,
      topBarTextColor,
      backgroundColor,
      pageTextColor,
      topBarColor,
      brandingText,
      pageBlockColor,
      canEditBranding
    }
  }

  @Revalidate()
  @Put('/')
  async updateStyles(
    @GetUserFromRequest() user: UserInterface,
    @Body() styles: UpdateStyleValidator
  ) {
    const subscription = await this._subscriptionService.getSubscriptionByOrganizationId(user.organization.organizationId);
    const canEditBranding = !subscription ? false : pricing[subscription.subscriptionTier].domains > 0;
    return this._organizationService.updateStyles(user.organization.organizationId, canEditBranding, styles);
  }
}
