import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import {
  ApiKeySourceType,
  Cors,
  LambdaIntegration,
  RestApi,
} from 'aws-cdk-lib/aws-apigateway';

require('dotenv').config();

export class CartServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // monstro - LAMBDA
    const nestJsCartServiceLambda = new lambda.Function(
      this,
      'NestJsCartServiceLambda',
      {
        runtime: lambda.Runtime.NODEJS_18_X,
        code: lambda.Code.fromAsset('../nest-js-app/dist'),
        handler: 'main.handler',
        environment: {
          DATABASE_HOST: process.env.DATABASE_HOST || '',
          DATABASE_PORT: process.env.DATABASE_PORT || '5432',
          DATABASE_USERNAME: process.env.DATABASE_USERNAME || '',
          DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || '',
          DATABASE_NAME: process.env.DATABASE_NAME || '',
        },
      }
    );

    // API Gateway
    const restApi = new RestApi(this, 'cartRestAPI', {
      restApiName: 'cartRestAPI',
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
      },
      apiKeySourceType: ApiKeySourceType.HEADER,
    });

    //const proxyResource = restApi.root.addResource('{proxy+}'); // Catch-all for any subpath
    //proxyResource.addMethod('ANY', cartApiIntegration);

    const cartApiIntegration = new LambdaIntegration(nestJsCartServiceLambda);

    restApi.root.addProxy({
      defaultIntegration: cartApiIntegration,
    });
  }
}
