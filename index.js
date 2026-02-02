#!/usr/bin/env node

const inquirer = require('inquirer');
const chalk = require('chalk');
const { startAttack } = require('./engine');

async function run() {
    // Cute ASCII Crab
    console.log(chalk.red.bold(`
       __      __
      (  \\____/  )
       \\  o  o  /    <-- Hello! I'm your Cute Cyber Crab!
        (_  v  _)
       /        \\
      /          \\
     (  /      \\  )
      \\_\\      /_/
    `));
    
    console.log(chalk.magenta.bold(`
    ╔══════════════════════════════════════════════════════════╗
    ║             CUTE CRAB BOT AI AGENT v6.1                  ║
    ║        "Small but Mighty" Cyber Security Swarm           ║
    ╚══════════════════════════════════════════════════════════╝
    `));

    console.log(chalk.yellow('Status: ') + chalk.green('Happy & Ready! 🦀✨'));
    console.log(chalk.cyan('Mission: ') + chalk.white('Making the web safer, one pinch at a time.\n'));

    const answers = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What should we do today, Commander?',
            choices: [
                { name: '🚀 Launch Friendly Swarm Attack', value: 'attack' },
                { name: '🔍 Smart File Audit (CloudBot Style)', value: 'analyze' },
                { name: '🛡 Full Security Checkup', value: 'audit' }
            ]
        },
        {
            type: 'input',
            name: 'url',
            message: 'Enter the URL we should check:',
            when: (a) => a.action !== 'analyze'
        },
        {
            type: 'confirm',
            name: 'confirm',
            message: chalk.magenta('Ready to deploy the cute but powerful swarm?'),
            default: true
        }
    ]);

    if (answers.confirm) {
        const options = {
            analyzeLocal: answers.action === 'analyze' || answers.action === 'audit',
            botCount: 30000
        };
        
        const results = await startAttack(answers.url || 'http://localhost', options);
        
        console.log(chalk.green.bold(`\n[✓] Mission Accomplished! The web is a bit safer now. 🦀💖`));
    } else {
        console.log(chalk.yellow('\n[!] Okay, I\'ll stay here and keep an eye on things!'));
    }
}

run().catch(err => {
    console.error(chalk.red('\n[!] Oops! Something went wrong:'), err.message);
});
