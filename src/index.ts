import {
    S3Client, ListObjectsV2Command
} from '@aws-sdk/client-s3';
import { Context } from 'aws-lambda';

const fakeContext: Context = {
    awsRequestId: 'fake-request-id',
    callbackWaitsForEmptyEventLoop: false,
    functionName: 'fake-function-name',
    functionVersion: 'fake-function-version',
    invokedFunctionArn: 'fake-invoked-function-arn',
    logGroupName: 'fake-log-group-name',
    logStreamName: 'fake-log-stream-name',
    memoryLimitInMB: 'fake-memory-limit-in-mb',
    done: () => {},
    fail: () => {},
    getRemainingTimeInMillis: () => 0,
    succeed: () => {}
};

export const startPolling = async () => {
    const client = new S3Client({ 
        region: 'eu-central-1', 
        endpoint: 'http://localhost:4566',
        forcePathStyle: true,
        credentials: {
            accessKeyId: 'fake-access-key-id',
            secretAccessKey: 'fake-secret-access-key'
        }
    });
    const command = new ListObjectsV2Command({
        Bucket: 'fake-bucket',
    });
    const response = await client.send(command);
    console.log(response);
}

startPolling().then(() => {
    console.log('done');
});