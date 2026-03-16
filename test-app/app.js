import express from 'express';
import { monitor } from 'monilog-sdk';

const app = express();
const port = 3000;

// Initialize Monilog SDK middleware
app.use(monitor({
    slackWebhookUrl: process.env.SLACK_WEBHOOK_URL || 'https://hooks.slack.com/services/YOUR_WEBHOOK_URL',
    logFilePath: './test-logs.txt',
    maxLogSize: 1024 * 1024, // 1MB
    maxFiles: 3
}));

app.get('/', (req, res) => {
    res.send('Monilog Test App is running!');
});

app.get('/success', (req, res) => {
    res.json({ message: 'Success! This request is logged.' });
});

app.get('/error-400', (req, res) => {
    res.status(400).json({ error: 'This is a 400 Bad Request. Check your Slack!' });
});

app.get('/error-500', (req, res) => {
    res.status(500).json({ error: 'This is a 500 Internal Server Error. Check your Slack!' });
});

app.listen(port, () => {
    console.log(`Test app listening at http://localhost:${port}`);
    console.log('Try visiting:');
    console.log(`  - http://localhost:${port}/success`);
    console.log(`  - http://localhost:${port}/error-400`);
    console.log(`  - http://localhost:${port}/error-500`);
});
