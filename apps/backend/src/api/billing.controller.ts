import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {SubscriptionService} from "@meetfaq/database/src/subscription/subscription.service";
import {GetUserFromRequest} from "@meetfaq/helpers/src/user/user.from.request";
import {UserInterface} from "@meetfaq/helpers/src/user/user.interface";
import {BillingSubscribeValidator} from "@meetfaq/validators/src/billing/billing.subscribe.validator";
import {StripeService} from "@meetfaq/helpers/src/stripe/stripe.service";
import {IdStringValidator} from "@meetfaq/validators/src/general/id.string.validator";
import {ApiHeaders, ApiOperation, ApiTags} from "@nestjs/swagger";

@ApiTags('Billings')
@Controller('/billing')
@ApiHeaders([{name: 'auth', required: true}])
export class BillingController {
  constructor(
    private _subscriptionService: SubscriptionService,
    private _stripeService: StripeService,
  ) {
  }

  @Get('/check/:id')
  async checkId(
    @GetUserFromRequest() user: UserInterface,
    @Param() body: IdStringValidator
  ) {
    return {exists: !!await this._subscriptionService.checkSubscription(user.organization.organizationId, body.id)};
  }

  @ApiOperation({summary: 'Subscribe to a plan', description: 'Subscribe to a plan'})
  @Post('/subscribe')
  subscribe(
    @GetUserFromRequest() user: UserInterface,
    @Body() body: BillingSubscribeValidator
  ) {
    return this._stripeService.subscribe(user.organization.organizationId, body);
  }

  @Post('/modify')
  async modifyPayment(
    @GetUserFromRequest() user: UserInterface,
  ) {
    const customer = await this._stripeService.getCustomerByOrganizationId(user.organization.organizationId);
    const {url} = await this._stripeService.createBillingPortalLink(customer);
    return {
      portal: url
    }
  }

  @Get('/')
  getCurrentBilling(
    @GetUserFromRequest() user: UserInterface
  ) {
    return this._subscriptionService.getSubscriptionByOrganizationId(user.organization.organizationId);
  }

  @Post('/cancel')
  cancel(
    @GetUserFromRequest() user: UserInterface,
  ) {
    return this._stripeService.setToCancel(user.organization.organizationId);
  }
}
