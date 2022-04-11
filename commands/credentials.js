const inquirer = require('inquirer');
const CredentialsManager = require('../lib/CredentialsManager');
const chalk = require('chalk');

const credentials = {
    async set() {
        const credentialsManager = new CredentialsManager();
        const input = await inquirer.prompt([
            {
                type: 'input',
                name: 'handle',
                message: 'Enter CF Handle'
            },
            {
                type: 'password',
                name: 'password',
                message: 'Password for this Handle'   
            }
        ]);
        credentialsManager.setCredentials(input.handle, input.password);
        console.log(chalk.green('[+] Handle and Password set successfuly!'));
    },

    show() {
        try {
            const credentialsManager = new CredentialsManager();
            console.log('[+] Submitting as: ', chalk.yellow.bold(credentialsManager.getHandle()));
        } catch(e) {
            console.log(chalk.red(e));
        }
    },

    unset() {
        try {
            const credentialsManager = new CredentialsManager();
            credentialsManager.unsetCredentials();
            console.log(chalk.green('[+] Handle and Password removed successfuly!'));
        } catch(e) {
            console.log(chalk.red(e));
        }
    }
};

module.exports = credentials;