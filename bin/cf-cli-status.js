const program = require('commander');
const chalk = require('chalk')

const CredentialsManager = require('../lib/CredentialsManager');
const status = require('../commands/status');

program.action(async function () {
    try {
        const credentialsManager = new CredentialsManager()
        const me = credentialsManager.getHandle();
        await status.showStatus(me);
    } catch (e) {
        console.log(chalk.red().bold('[-] Error Encountered!'))
        console.log(e);
    }
});

program.parse(process.argv);