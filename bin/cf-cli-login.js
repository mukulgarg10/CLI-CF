const program = require('commander');
const login = require('../commands/login');
const chalk = require('chalk')

program.action(async function () {
    try {
        const who = await login.checkLoginStatus();
        if (who !== 'Enter') {
            console.log(chalk.blue('[*] Already logged in as:'), chalk.bold.yellow(who.toString()));
            return;
        }
        const CSRF_key = await login.obtainCSRF();
        const handle = await login.signIn(CSRF_key);
        console.log(chalk.green('[+] Successfuly logged in as:'), chalk.bold.yellow(handle.toString()));
    } catch (e) {
        console.log(chalk.red().bold('[-] Error Encountered!'))
        console.log(e);
    }
});

program.parse(process.argv);