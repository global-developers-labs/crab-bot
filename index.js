#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const { startAttack } = require('./engine');

async function run() {
    console.log(chalk.red.bold(`
      .---.         .---.
     /     \\  _ _  /     \\
    |  ( )  |(_ _)|  ( )  |
     \\     /   |   \\     /
      '---'    |    '---'
               |
           _...|..._
        .'    |    '.
       /  _...|..._  \\
      |  /    |    \\  |
      | |     |     | |
       \\ \\_   |   _/ /
        '._'--|--'_.'
           '--|--'
    `));
    
    console.log(chalk.red.bold(`
    ╔══════════════════════════════════════════════════════════╗
    ║                 CRAB BOT CYBER AGENT v4.0                ║
    ║          Agent Track DDoS Test & Security Suite          ║
    ╚══════════════════════════════════════════════════════════╝
    `));

    console.log(chalk.yellow('Status: ') + chalk.green('Ready to Deploy'));
    console.log(chalk.yellow('Mode:   ') + chalk.cyan('Cyber Security Stress Testing & Analysis\n'));

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'url',
            message: 'Enter Target URL for Security Assessment:',
            validate: (input) => {
                if (input.startsWith('http://') || input.startsWith('https://')) return true;
                return 'Please enter a valid URL.';
            }
        },
        {
            type: 'list',
            name: 'mode',
            message: 'Select Agent Operation Mode:',
            choices: [
                'Turbo Attack (100x Speed)',
                'Stealth Analysis (JSON/XML Payloads)',
                'Full Security Audit'
            ]
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: chalk.red.bold('WARNING: Deploying 30,000 Super Bots. Proceed?'),
            default: false
        }
    ]);

    if (answers.confirm) {
        await startAttack(answers.url, {
            botCount: 30000,
            mode: answers.mode
        });
    } else {
        console.log(chalk.yellow('\n[!] Mission Aborted by User.'));
    }
}

run().catch(err => {
    console.error(chalk.red('\n[!] Agent Error:'), err.message);
});
