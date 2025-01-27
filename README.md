# Lambda Debugging Wrapper
A wrapper around lambda to facilitate a better development experience.  

Using this library, you are able to run your lambda function code locally but still trigger it with real events, ie. when a file is uploaded to an S3 bucket.  This avoids the need to build, package and deploy your lambda function every time you want to test it.

Package can be found here: https://www.npmjs.com/package/lambda-debug-local

Currently supported triggers:
- S3NewFileTrigger
- SQSReceiveMessageTrigger

## Usage
Full example:

```javascript
import { startPollingS3 } from 'lambda-debug-local';
import { handler } from './example-lambda';

console.log('Debugging example-lambda.ts');

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
```

Install using npm:
```bash
npm install -s lambda-debug-local
```

Import the startPollingS3 method 
```javascript
import { startPollingS3 } from 'lambda-debug-local';
```

Call the startPollingS3 method with the following parameters:
```javascript

startPollingS3({
    handler,
    bucketName: 'my-first-bucket',
    interval: 5000,
    region: 'eu-central-1',
    endpoint: 'http://localhost:4566',
    forcePathStyle: true,
    credentials: {
        accessKeyId: 'fake-access-key-id',
        secretAccessKey: 'fake-secret-access-key'
    }
})
```

### Updates:
- 0.0.5: Adds SQS trigger (startPollingSQS).  Config is very similar to S3, but with queueUrl instead of bucketName.
There is also no forcePathStyle or maxAge.  See example below:
```javascript
{
    handler,
    queueUrl: 'http://localhost:4566/000000000000/my-test-queue',
    interval: 5000,
    region: 'eu-central-1',
    endpoint: 'http://localhost:4566',
    credentials: {
        accessKeyId: 'fake-access-key-id',
        secretAccessKey: 'fake-secret-access-key'
    }
}
```


Full example:

```javascript
import { startPollingSQS } from 'lambda-debug-local';
import { handler } from './example-lambda';

console.log('Debugging example-lambda.ts');

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
```

### Development: 

Please help me to improve this project by contributing to it. 
The main thing needed is more available triggers.

#### Getting started:

Required tools:
- Docker
- Node.js
- npm
- Localstack (brew install localstack/tap/localstack-cli)
- Make

npm install
make localstack-setup
npm run dev
