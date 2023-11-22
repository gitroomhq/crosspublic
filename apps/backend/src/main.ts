/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger, ValidationPipe} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {AppModule} from "@meetqa/backend/src/app.module";
import cookieParser from 'cookie-parser';
import {SubscriptionExceptionFilter} from "@meetqa/backend/src/services/authorization/subscription.exception";
import morgan from 'morgan';
import {ResponseInterceptor} from "@meetqa/backend/src/services/response.interceptor";
import * as process from "process";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  app.use(cookieParser());
  app.use(morgan(':method :url'));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new SubscriptionExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.use((req, res, next) => {
    const allowedOrigin = req.headers.origin;
    if (!allowedOrigin || (allowedOrigin && typeof allowedOrigin === 'string' && allowedOrigin.indexOf(new URL(process.env.FRONTEND_URL).hostname) > -1)) {
      res.header('Access-Control-Allow-Origin', allowedOrigin || process.env.FRONTEND_URL);
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, apikey, serverkey');
    }

    if (req.method === 'OPTIONS') {
      res.status(200).send();
      return ;
    }

    next();
  });

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}`
  );
}

bootstrap();
