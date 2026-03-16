import axios from 'axios';

export async function sendSlackNotification(webhookUrl: string, logData: any) {
    try {
        // Format the message for Slack
        const formattedText = `*${logData.title || 'Monitor Alert'}*\n` +
            `> *Endpoint*: \`${logData.method} ${logData.url}\`\n` +
            `> *Latency*: \`${logData.duration}\`\n` +
            `> *Time*: \`${new Date(logData.timestamp).toLocaleString()}\`\n` +
            `> *IP Address*: \`${logData.ip}\``;

        const axiosClient = (axios as any).default || axios;
        
        await axiosClient.post(webhookUrl, {
            text: formattedText
        });
    } catch (error: any) {
        console.error('[monilog-sdk] Failed to send Slack notification:', error.message);
        if (error.response) {
            console.error('[monilog-sdk] Slack response error:', error.response.data);
        }
    }
}
