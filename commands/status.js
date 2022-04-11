const request = require('request');
const chalk = require('chalk');

const status = {

    showStatus(handle) {
        return new Promise ((resolve, reject) => {
            const url = `https://codeforces.com/api/user.status?handle=${handle}&from=1&count=1`;
            const requestObject = {
                url,
                timeout: 10000
            };
            request.get(requestObject, (e,res,body) => {
                if (e) return reject(e);
                const data = JSON.parse(body);
                if (data.status === 'FAILED') {
                    console.log(chalk.red(`[-] ${data.comment}`));
                    return reject();
                }
                const verdict = data.result[0].verdict;
                const prob = data.result[0].problem.index + ': ' + data.result[0].problem.name;
                if (!verdict || verdict === '')
                    console.log(prob, chalk.dim('In queue'));
                else if (verdict === 'OK') 
                    console.log(prob, chalk.greenBright('ACCEPTED'));
                else
                    console.log(prob, chalk.red(verdict), `on test ${data.result[0].passedTestCount + 1}`);
                resolve();
            });
        });
    }

};

module.exports = status;