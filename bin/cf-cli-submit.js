const program = require('commander');
const chalk = require('chalk')

const submit = require('../commands/submit');
const compiler = require('../commands/compiler');

program.action(async function () {
    try {
        console.log(chalk.dim('[*] Submission without logging would throw error.'));
        let submissionParams = await submit.getSubmissionParams();
        submissionParams.compiler = compiler.get();
        await submit.makeSubmission(submissionParams);
        console.log(chalk.green('[+] Submission successful!'));
    } catch (e) {
        console.log(chalk.red().bold('[-] Error Encountered!'))
        console.log(e);
    }
});

program.parse(process.argv);