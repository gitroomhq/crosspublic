import {SetMetadata} from "@nestjs/common";
import {AuthorizationActions, Sections} from "@meetqa/backend/src/services/authorization/authorization.service";

export const CHECK_POLICIES_KEY = 'check_policy';
export type AbilityPolicy = [AuthorizationActions, Sections];
export const CheckPolicies = (...handlers: AbilityPolicy[]) => SetMetadata(CHECK_POLICIES_KEY, handlers);
