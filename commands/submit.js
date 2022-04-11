const path = require('path');
const fs = require('fs');
const request = require('request');
const inquirer = require('inquirer');

const headerObject = require('../lib/headerObject');
const {cookiePath} = require('../lib/datafilePaths')
const toughcookie = require('tough-cookie-filestore');

const login = require('../commands/login');

const submit = {

    getSubmissionParams() {
        return new Promise ( async (resolve, reject) => {
            try {
                const fileOptions = fs.readdirSync(process.cwd());
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
                    },
                    {
                        type: 'list',
                        name: 'filename',
                        message: 'Select file to be submitted: ',
                        choices: fileOptions
                    }
                ]);
                let submissionParams = {
                    submittedProblemIndex: input.index.toUpperCase(),
                    source: fs.readFileSync(path.join(process.cwd(), input.filename), 'ascii'),
                    url: `https://codeforces.com/contest/${input.cid}/submit`
                };
                resolve(submissionParams);                
            } 
            catch (e) {
                return reject (e);
            }
        });
    },

    makeSubmission(params) {
        return new Promise ( async (resolve, reject) => {
            const formData = {
                action: "submitSolutionFormSubmitted",
                submittedProblemIndex: params.submittedProblemIndex,
                source: params.source,
                programTypeId: params.compiler,
                sourceFile: '',
                csrf_token: await login.obtainCSRF()
            }
            const requestObject = {
                url: params.url,
                headers: headerObject({
                    Origin: 'https://codeforces.com',
                    Referer: 'https://codeforces.com/problemset/submit'
                }),
                jar: request.jar(new toughcookie(cookiePath)),
                timeout: 15000,
                formData
            };
            request.post(requestObject, (e,res,body) => {
                if (e) return reject (e);
                resolve();
            })
        });
    }

}

module.exports = submit;