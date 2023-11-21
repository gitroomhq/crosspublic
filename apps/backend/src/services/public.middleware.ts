import {Injectable, NestMiddleware} from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import {OrganizationService} from "@meetqa/database/src/organization/organization.service";
import {pricing} from "@meetqa/helpers/src/pricing/pricing";
import * as process from "process";

@Injectable()
export class PublicMiddleware implements NestMiddleware {
  constructor(
    private _organizationService: OrganizationService,
  ) {
  }
  async use(req: Request, res: Response, next: NextFunction) {
    if(req.url.indexOf('/public') === -1 || req.url.indexOf('/public/organization') > -1) {
      next();
      return;
    }

    console.log(req);

    const apiKey = req.headers['apikey'];
    const serverKey = req.headers['serverkey'];

    if (!apiKey) {
      res.status(401).send('Unauthorized');
      return;
    }

    const organization = await this._organizationService.getOrganizationByApiKey(apiKey as string);
    if (!organization) {
      res.status(401).json({message: 'Organization not found'});
      return;
    }

    const isApi = pricing[organization?.subscriptions[0]?.subscriptionTier]?.api;
    if (!isApi && serverKey !== process.env.BACKEND_TOKEN_PROTECTOR) {
      res.status(401).json({message: 'Please upgrade your subscription to use this feature'});
      return;
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    req.organization = organization;
    next();
  }
}
