import {NestMiddleware} from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import {AuthService} from "@crosspublic/helpers/src/auth/auth.service";

export class AuthMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    if(req.url.indexOf('/public') > -1) {
      next();
      return;
    }

    if (!req.headers.auth && !req.cookies.auth) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    try {
      const testJwt = AuthService.verifyJWT((req.headers.auth || req.cookies.auth) as string);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      req.user = testJwt;
      next();
    }
    catch (err) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
  }
}
