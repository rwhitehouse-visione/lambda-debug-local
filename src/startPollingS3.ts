import {
    S3Client, ListObjectsV2Command
} from '@aws-sdk/client-s3';
import { Context, S3Handler } from 'aws-lambda';

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

const testHandler: S3Handler = async (event: any, context: Context) => {
    console.log('s3 handler', event, context);
}

type CheckForMessageParams = {
    bucketName?: string;
    interval?: number;
    region?: string;
    endpoint?: string;
    forcePathStyle?: boolean;
    maxAge?: number;
    credentials?: {
        accessKeyId: string;
        secretAccessKey: string;
    };
    handler?: S3Handler;
};

export const checkForMessage = async ({
    bucketName = 'my-first-bucket',
    region = 'eu-central-1',
    endpoint= 'http://localhost:4566',
    forcePathStyle = true,
    maxAge = 1000 * 60 * 5, // 5 minutes
    credentials = {
        accessKeyId: 'fake-access-key-id',
        secretAccessKey: 'fake-secret-access-key'
    },
    handler = testHandler
}: CheckForMessageParams = {}) => {
    console.log('Checking for new messages in S3');
    const client = new S3Client({ 
        region, 
        endpoint,
        forcePathStyle,
        credentials
    });
    const command = new ListObjectsV2Command({
        Bucket: bucketName,
    });
    const response = await client.send(command);

    if (!response.Contents || response.Contents.length === 0) {
        console.log('No objects found');
        return;
    }

    console.log(response);

    const dateToSearch = new Date(Date.now() - maxAge);
    await Promise.all(response.Contents.map(async (object) => {
        if (!object.Key || !object.LastModified || object.LastModified < dateToSearch) {
            return;
        }

        try {
            console.log('New File:', object.Key);

            const s3Event = {
                Records: [
                    {
                        bucket: { name: bucketName },
                        object: { key: object.Key }
                    }
                ]
            }
            
            await handler(s3Event as any, fakeContext, () => {});
        } catch (error) {   
            console.error('Error processing object', object.Key, error);
        }
    }));
}

export const startPollingS3 = (config: CheckForMessageParams) => {
    setInterval(async () => await checkForMessage(config), config.interval || 5000);
}