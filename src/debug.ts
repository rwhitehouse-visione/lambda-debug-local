import { startPollingSQS } from './startPollingSQS';
import { handler } from './example-lambda-sqs';

console.log('Debugging example-lambda.ts');

/*
startPollingS3({
    handler,
    bucketName: 'my-first-bucket',
    interval: 5000,
    region: 'eu-central-1',
    endpoint: 'http://localhost:4566',
    forcePathStyle: true,
    maxAge: 1000 * 60 * 5, // 5 minutes
    credentials: {
        accessKeyId: 'fake-access-key-id',
        secretAccessKey: 'fake-secret-access-key'
    }
})
*/

startPollingSQS({
    handler,
    queueUrl: 'http://localhost:4566/000000000000/my-test-queue',
    interval: 5000,
    region: 'eu-central-1',
    endpoint: 'http://localhost:4566',
    credentials: {
        accessKeyId: 'fake-access-key-id',
        secretAccessKey: 'fake-secret-access-key'
    }
})