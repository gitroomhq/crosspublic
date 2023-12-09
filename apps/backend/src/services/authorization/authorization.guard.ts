import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";
import {AbilityPolicy, CHECK_POLICIES_KEY} from "@crosspublic/backend/src/services/authorization/authorization.ability";
import {AppAbility, AuthorizationService} from "@crosspublic/backend/src/services/authorization/authorization.service";
import {UserInterface} from "@crosspublic/helpers/src/user/user.interface";
import {SubscriptionException} from "@crosspublic/backend/src/services/authorization/subscription.exception";
import {Revalidate} from "@crosspublic/backend/src/services/revalidate";


@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private _reflector: Reflector,
    private _authorizationService: AuthorizationService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const revalidate = this._reflector.get(Revalidate, context.getHandler()) || this._reflector.get(Revalidate, context.getClass());
    if (revalidate) {
      context.switchToHttp().getRequest().revalidate = true;
    }

    const policyHandlers =
      this._reflector.get<AbilityPolicy[]>(
        CHECK_POLICIES_KEY,
        context.getHandler(),
      ) || [];

    if (!policyHandlers || !policyHandlers.length) {
      return true;
    }


    const { user } : {user: UserInterface} = context.switchToHttp().getRequest();
    const ability = await this._authorizationService.check(user.organization.organizationId);

    const item = policyHandlers.find((handler) =>
      !this.execPolicyHandler(handler, ability),
    );

    if (item) {
      throw new SubscriptionException({
        section: item[1],
        action: item[0]
      });
    }

    return true;
  }

  private execPolicyHandler(handler: AbilityPolicy, ability: AppAbility) {
    return ability.can(handler[0], handler[1]);
  }
}
