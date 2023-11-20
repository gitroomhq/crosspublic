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

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  app.use(cookieParser());
  app.use(morgan(':method :url'));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new SubscriptionExceptionFilter());

  app.use((req, res, next) => {
    const allowedOrigin = req.headers.origin;
    if (!allowedOrigin || (allowedOrigin && typeof allowedOrigin === 'string' && allowedOrigin.indexOf(new URL(process.env.FRONTEND_URL).hostname) > -1)) {
      res.header('Access-Control-Allow-Origin', allowedOrigin);
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
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
