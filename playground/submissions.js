const inquirer = require('inquirer');
const request = require('request');
const toughcookie = require('tough-cookie-filestore');

const headerObject = require('../lib/headerObject');
const {cookiePath} = require('../lib/datafilePaths')
const login = require('../commands/login');


async function run() {

    const input = await inquirer.prompt([
        {
            type: 'input',
            name: 'index',
            message: 'Enter index [A/B/C/D/E/F]: '
        },
        {
            type: 'input',
            name: 'cid',
            message: 'Enter contest id: '   
        }
    ]);

    const url = `https://codeforces.com/contest/${input.cid}/submit`;

    const formData = {
        action: "submitSolutionFormSubmitted",
        submittedProblemIndex: input.index,
        source: 'This is the file',
        programTypeId: "50",
        sourceFile: '',
        csrf_token: await login.obtainCSRF()
    }

    const requestObject = {
        url,
        headers: headerObject({
            Origin: 'https://codeforces.com',
            Referer: 'https://codeforces.com/problemset/submit'
        }),
        jar: request.jar(new toughcookie(cookiePath)),
        timeout: 15000,
        formData
    };

    console.log('Post pending');
    request.post(requestObject, (e,res,body) => {
        if (e) console.log(e);
        else console.log(body);    
    })
}

run();

    // {
    //     "csrf_token":"43f0202cebffd99560fc4bc330ccdd2b",
    //     "ftaa":"cosy9ojrskfqfcqq66",
    //     "bfaa":"c0ee77ae8e56544b369112d7be5ac5be",
    //     "action":"submitSolutionFormSubmitted",
    //     "submittedProblemIndex":"F",
    //     "source":"",
    //     "programTypeId":"50",
    //     "sourceFile":"",
    //     "_tta":"821"
    // }