import { NestFactory } from '@nestjs/core';

import helmet from 'helmet';

import { AppModule } from './app.module';

import { Callback, Context, Handler } from 'aws-lambda';
import express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import serverlessExpress from '@vendia/serverless-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

let server: Handler;

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
    await app.listen(port, '0.0.0.0');
    // console.log('App is running on %s port', port);

    server = serverlessExpress({ app: expressApp });
  }
  return server;
}

bootstrap().then(() => {
  console.log('App is running on %s port', port);
  console.log('Database name', process.env.DATABASE_NAME);
});

// ADD "build": "nest build --webpack", to scripts
// export const handler: Handler = async (
//   event: any,
//   context: Context,
//   callback: Callback,
// ) => {
//   console.log(process.env);
//   const server = await bootstrap();
//   console.log('App is running on port ', port);
//   return server(event, context, callback);
// };
