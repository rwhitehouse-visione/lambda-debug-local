# Lambda Debugging Wrapper
A wrapper around lambda to facilitate a better development experience

Currently supported triggers:

S3NewFileTrigger

## Usage
Full example:

```javascript
import { startPolling } from './lambda-debug-local';
import { handler } from './example-lambda';

console.log('Debugging example-lambda.ts');

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
})
```

Install using npm:
```bash
npm install -s lambda-debug-local
```

Import the startPolling method 
```javascript
import { startPolling } from './lambda-debug-local';
```

Call the startPolling method with the following parameters:
```javascript

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
