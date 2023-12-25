import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { Construct } from 'constructs';
import {
  ApiKeySourceType,
  Cors,
  LambdaIntegration,
  RestApi,
} from 'aws-cdk-lib/aws-apigateway';

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
        // environment: {
        //   PRODUCTS_TABLE_NAME: productsDbTable.tableName,
        //   STOCK_TABLE_NAME: stockDbTable.tableName,
        // },
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
