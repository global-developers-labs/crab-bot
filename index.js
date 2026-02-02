#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const { startAttack } = require('./engine');

async function run() {
    console.log(chalk.magenta.bold(`
    ██████╗██████╗  █████╗ ██████╗ ██████╗  ██████╗ ████████╗
    ██╔════╝██╔══██╗██╔══██╗██╔══██╗██╔══██╗██╔═══██╗╚══██╔══╝
    ██║     ██████╔╝███████║██████╔╝██████╔╝██║   ██║   ██║   
    ██║     ██╔══██╗██╔══██║██╔══██╗██╔══██╗██║   ██║   ██║   
    ╚██████╗██║  ██║██║  ██║██████╔╝██████╔╝╚██████╔╝   ██║   
     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝ ╚═════╝  ╚═════╝    ╚═╝   
    [ CRABBOT AI AGENT v6.0 - THE ULTIMATE SWARM ]
    `));

    console.log(chalk.cyan('Welcome, Commander. I am your Cyber AI Agent.'));
    console.log(chalk.dim('Inspired by MoltBot & CloudBot | Powered by CrabBot Swarm Engine\n'));

    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What is our mission today?',
            choices: [
                { name: '🚀 Launch Autonomous Swarm Attack', value: 'attack' },
                { name: '🔍 Perform AI File Intelligence (CloudBot Style)', value: 'analyze' },
                { name: '🛡 Full System Security Audit', value: 'audit' }
            ]
        },
        {
            type: 'input',
            name: 'url',
            message: 'Enter Target URL:',
            when: (a) => a.action !== 'analyze'
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: chalk.red.bold('Deploying Multi-Agent Swarm. Are you ready?'),
            default: false
        }
    ]);

    if (answers.confirm) {
        const options = {
            analyzeLocal: answers.action === 'analyze' || answers.action === 'audit',
            botCount: 30000
        };
        
        const results = await startAttack(answers.url || 'http://localhost', options);
        
        console.log(chalk.green.bold(`\n[✓] Mission Accomplished.`));
        console.log(chalk.white(`Total Hits: ${results.stats.success.toLocaleString()}`));
        console.log(chalk.red(`Total Blocked: ${results.stats.blocked.toLocaleString()}`));
    } else {
        console.log(chalk.yellow('\n[!] Mission Aborted. Standing by.'));
    }
}

run().catch(err => {
    console.error(chalk.red('\n[!] Agent Critical Failure:'), err.message);
});
