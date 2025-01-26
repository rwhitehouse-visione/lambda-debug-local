import { startPolling } from './lambda-runner';
import { handler } from './example-lambda';

console.log('start');

startPolling({
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
}).then(() => {
    console.log('done');
});