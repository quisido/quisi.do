import { App, Stack } from 'aws-cdk-lib';
import { LambdaIntegration, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { Role as IamRole, ManagedPolicy } from 'aws-cdk-lib/aws-iam';
import {
  Function as LambdaFunction,
  Runtime as LambdaRuntime,
} from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction as LambdaNodeFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { join } from 'node:path';

const LAMBDA_BASIC_EXECUTION_ROLE: ManagedPolicy =
  ManagedPolicy.fromAwsManagedPolicyName(
    'service-role/AWSLambdaBasicExecutionRole',
  );

export default class StripeEndpoint extends Stack {
  public constructor(app: App, id: string) {
    super(app, id);

    const lambdaFunction: LambdaFunction = new LambdaNodeFunction(
      this,
      'NodejsFunction',
      {
        depsLockFilePath: join(process.cwd(), 'yarn.lock'),
        description: 'Event handler for Stripe API',
        entry: 'src/index.ts',
        functionName: 'stripe-webhook',
        handler: 'handler',
        projectRoot: '..',
        runtime: LambdaRuntime.NODEJS_LATEST,

        bundling: {
          externalModules: [
            'aws-sdk', // Use the 'aws-sdk' available in the Lambda runtime
          ],
        },

        environment: {
          NODE_ENV: 'production',
        },

        role: new IamRole(this, 'Role', {
          assumedBy: {},
          description: 'Event handler for Stripe API',
          inlinePolicies: {},
          managedPolicies: [LAMBDA_BASIC_EXECUTION_ROLE],
          roleName: 'stripe-webook',
        }),
      },
    );

    const { root } = new RestApi(this, 'RestApi', {
      description: 'Event handler for the Stripe API.',
      restApiName: 'Stripe',
    });

    const getWidgetsIntegration = new LambdaIntegration(lambdaFunction, {
      requestTemplates: { 'application/json': '{ "statusCode": "200" }' },
    });

    root.addMethod('GET', getWidgetsIntegration); // GET /
  }

  /*
    const getAllIntegration = new LambdaIntegration(getAllLambda);
    const createOneIntegration = new LambdaIntegration(createOneLambda);
    const getOneIntegration = new LambdaIntegration(getOneLambda);
    const updateOneIntegration = new LambdaIntegration(updateOneLambda);
    const deleteOneIntegration = new LambdaIntegration(deleteOneLambda);


    // Create an API Gateway resource for each of the CRUD operations
    const api = new RestApi(this, 'itemsApi', {
      restApiName: 'Items Service'
      // In case you want to manage binary types, uncomment the following
      // binaryMediaTypes: ["* /*"],
    });

    const items = api.root.addResource('items');
    items.addMethod('GET', getAllIntegration);
    items.addMethod('POST', createOneIntegration);
    addCorsOptions(items);

    const singleItem = items.addResource('{id}');
    singleItem.addMethod('GET', getOneIntegration);
    singleItem.addMethod('PATCH', updateOneIntegration);
    singleItem.addMethod('DELETE', deleteOneIntegration);
    addCorsOptions(singleItem);
  }
}

export function addCorsOptions(apiResource: IResource) {
  apiResource.addMethod('OPTIONS', new MockIntegration({
    // In case you want to use binary media types, uncomment the following line
    // contentHandling: ContentHandling.CONVERT_TO_TEXT,
    integrationResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,X-Amz-User-Agent'",
        'method.response.header.Access-Control-Allow-Origin': "'*'",
        'method.response.header.Access-Control-Allow-Credentials': "'false'",
        'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,GET,PUT,POST,DELETE'",
      },
    }],
    // In case you want to use binary media types, comment out the following line
    passthroughBehavior: PassthroughBehavior.NEVER,
    requestTemplates: {
      "application/json": "{\"statusCode\": 200}"
    },
  }), {
    methodResponses: [{
      statusCode: '200',
      responseParameters: {
        'method.response.header.Access-Control-Allow-Headers': true,
        'method.response.header.Access-Control-Allow-Methods': true,
        'method.response.header.Access-Control-Allow-Credentials': true,
        'method.response.header.Access-Control-Allow-Origin': true,
      },
    }]
  })
  */
}
