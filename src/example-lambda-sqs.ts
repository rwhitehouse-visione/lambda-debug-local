import { Context, SQSHandler } from 'aws-lambda';

export const handler: SQSHandler = async (event: any, context: Context) => {
    console.log('testHandler', event, context);
}
