#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const { startAttack } = require('./engine');

async function run() {
    console.log(chalk.cyan.bold(`
    #######################################
    #                                     #
    #           CRAB BOT v1.0             #
    #    Cyber Security Stress Tester     #
    #                                     #
    #######################################
    `));

    console.log(chalk.yellow('Warning: This tool is for educational and authorized testing only.\n'));

    const answers = await inquirer.prompt([
        {
            type: 'input',
            name: 'url',
            message: 'Enter the Target URL to test (e.g., http://your-site.com):',
            validate: (input) => {
                if (input.startsWith('http://') || input.startsWith('https://')) {
                    return true;
                }
                return 'Please enter a valid URL starting with http:// or https://';
            }
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: 'Are you sure you want to start the 30,000 nodes stress test?',
            default: false
        }
    ]);

    if (answers.confirm) {
        await startAttack(answers.url);
    } else {
        console.log(chalk.red('\n[!] Operation cancelled by user.'));
    }
}

run().catch(err => {
    console.error(chalk.red('An error occurred:'), err.message);
});
