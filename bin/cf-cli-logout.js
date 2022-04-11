const program = require('commander');
const chalk = require('chalk')

const login = require('../commands/login');
const logout = require('../commands/logout');

program.action(async function () {
    try {
        const who = await login.checkLoginStatus();
        if (who === 'Enter') {
            console.log(chalk.blue('[*] No current login'));
            return;
        }
        const logoutSuffix = await logout.getLogoutSuffix();
        await logout.logoutWithSuffix(logoutSuffix);
        await logout.destroyCookie();
        console.log(chalk.green('[+] Successfuly logged out from CF'));
    } catch (e) {
        console.log(chalk.red().bold('[-] Error Encountered!'))
        console.log(e);
    }
});

program.parse(process.argv);