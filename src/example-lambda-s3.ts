import {
    S3Client, GetObjectCommand, ListObjectsV2Command
} from '@aws-sdk/client-s3';
import { Context, S3Handler } from 'aws-lambda';

export const handler: S3Handler = async (event: any, context: Context) => {
    console.log('testHandler', event, context);

    const region = 'eu-central-1';
    const endpoint = 'http://localhost:4566';
    const forcePathStyle = true;
    const credentials = {
        accessKeyId: 'fake-access-key-id',
        secretAccessKey: 'fake-secret-access-key'
    };

    const client = new S3Client({ 
        region, 
        endpoint,
        forcePathStyle,
        credentials
    });
    const command = new ListObjectsV2Command({
         Bucket: event.bucketName,
    });

    const response = await client.send(command);
    console.log(response);

    if (!response.Contents || response.Contents.length === 0) {
        console.log('No objects found');
        return;
    }

    const getObject = new GetObjectCommand({
        Bucket: event.bucketName,
        Key: event.objectKey
    });

    const object = await client.send(getObject);
    console.log(object);
}
