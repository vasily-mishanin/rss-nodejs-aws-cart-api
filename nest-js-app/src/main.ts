import { NestFactory } from '@nestjs/core';

import helmet from 'helmet';

import { AppModule } from './app.module';

import { Callback, Context, Handler } from 'aws-lambda';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverlessExpress from '@vendia/serverless-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

let server: Handler | void;

const port = process.env.PORT || 4000;

async function bootstrap() {
  if (!server) {
    const expressApp = express();

    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );

    const config = new DocumentBuilder()
      .setTitle('AWS-RSS-Shop-Databases')
      .setDescription(
        'The AWS Developer RDS database documentations for cart service',
      )
      .setVersion('1.0')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);

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

// bootstrap().then(() => {
//   console.log('App is running on %s port', port);
// });

export const handler: Handler = async (
  event: any,
  context: Context,
  callback: Callback,
) => {
  const server = await bootstrap();
  console.log('App is running on %s port', port);
  return server(event, context, callback);
};
