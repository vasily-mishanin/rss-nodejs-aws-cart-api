import { NestFactory } from '@nestjs/core';

import helmet from 'helmet';

import { AppModule } from './app.module';

import { Callback, Context, Handler } from 'aws-lambda';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverlessExpress from '@vendia/serverless-express';

let server: Handler | void;

const port = process.env.PORT || 4000;

async function bootstrap() {
  if (!server) {
    const expressApp = express();
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );
    app.enableCors({
      origin: (req, callback) => callback(null, true),
    });
    app.use(helmet());
    await app.init();
    await app.listen(port);
    server = serverlessExpress({ app: expressApp });
  } else {
    return server;
  }
}

bootstrap().then(() => {
  console.log('App is running on %s port', port);
});

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  const server = await bootstrap();
  console.log('App is running on %s port', port);
  return server(event, context, callback);
};
