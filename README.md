# Monilog SDK

A simple Node.js SDK to monitor backend logs, save them to a file, and send Slack notifications for 400/500 errors.

## Installation

```bash
npm install monilog-sdk
```

## Features

- **Monitor Logs**: Automatically captures request details (method, URL, status code, duration, IP).
- **Log File Creation**: Appends all logs to a local file (defaults to `logs.txt`).
- **Error Filtering**: Automatically filters for 400 and 500 status codes.
- **Slack Notifications**: Sends alerts to a Slack channel via Webhook URL when errors occur.

## Usage

### Express Middleware

```javascript
import express from 'express';
import { monitor } from 'logger_sdk';

const app = express();

app.use(monitor({
    slackWebhookUrl: 'https://hooks.slack.com/services/YOUR/WEBHOOK/URL',
    logFilePath: './my-logs.txt',
    monitorStatusCodes: [200, 201],
    maxLogSize: 5 * 1024 * 1024, // 5MB limit
    maxFiles: 3                 // Keep 3 rotated files
}));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000);
```

### Options

| Option | Type | Description |
| --- | --- | --- |
| `slackWebhookUrl` | `string` | (Optional) Your Slack incoming webhook URL. |
| `logFilePath` | `string` | (Optional) Path where logs will be saved. Defaults to `./logs.txt`. |
| `monitorStatusCodes` | `number[]` | (Optional) Specific status codes to monitor in addition to 400s and 500s. |
| `maxLogSize` | `number` | (Optional) Max size in bytes before rotation (default 5MB). |
| `maxFiles` | `number` | (Optional) Number of rotated log files to keep (default 2). |


## Development

1. Clone the repository.
2. Install dependencies: `npm install`
3. Build the project: `npm run build`
4. Run the test app: `cd test-app && node app.js`
