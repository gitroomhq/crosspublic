import {Controller, Post, RawBodyRequest, Req} from "@nestjs/common";
import {StripeService} from "@meetfaq/helpers/src/stripe/stripe.service";
import {ApiHeaders, ApiTags} from "@nestjs/swagger";

@ApiTags('Stripe')
@Controller('/stripe')
@ApiHeaders([{name: 'apikey', required: true}])
export class StripeController {
  constructor(
    private readonly _stripeService: StripeService
  ) {
  }
  @Post('/')
  stripe(
    @Req() req: RawBodyRequest<Request>
  ) {
    const event = this._stripeService.validateRequest(
      req.rawBody,
      req.headers['stripe-signature'],
      process.env.PAYMENT_SIGNING_SECRET
    );

    switch (event.type) {
      case 'customer.subscription.created':
        return this._stripeService.createSubscription(event);
      case 'customer.subscription.updated':
        return this._stripeService.updateSubscription(event);
      case 'customer.subscription.deleted':
        return this._stripeService.deleteSubscription(event);
      default:
        return {ok: true};
    }
  }
}
