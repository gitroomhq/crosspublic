import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import {Organization} from "@prisma/client";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface OrganizationFromRequest extends Organization {
}

export const GetOrganizationFromRequest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.organization;
  }
);
